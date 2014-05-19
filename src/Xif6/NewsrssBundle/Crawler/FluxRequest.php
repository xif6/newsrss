<?php

namespace Xif6\NewsrssBundle\Crawler;

use Doctrine\ORM\EntityManager;
use Xif6\NewsrssBundle\Entity;

/**
 * Class FluxRequest
 * @package Xif6\NewsrssBundle\Crawler
 */
class FluxRequest extends Request
{
    /**
     * @var Entity\Flux
     */
    protected $flux;

    /**
     * @var Entity\FluxHttp
     */
    protected $fluxHttp;

    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * @param Entity\Flux $flux
     * @param EntityManager $em
     */
    public function __construct(Entity\Flux $flux, EntityManager $em)
    {
        parent::__construct();
        $this->flux = $flux;
        $this->fluxHttp = $this->flux->getHttp();
        if ($this->fluxHttp === null) {
            $this->createFluxHttp();
        }
        $this->em = $em;
        $this->setFileName($flux->getId() . '.xml');
        $this->setParamRequest();
    }

    /**
     * Set directory
     *
     * @param String $directory
     * @return FluxRequest
     */
    public function setDirectory($directory)
    {
        $directory = $directory . ($this->flux->getId() % 100) . '/';
        return parent::setDirectory($directory);
    }

    /**
     * Create new Entity\FluxHttp
     *
     * @return Entity\FluxHttp
     */
    protected function createFluxHttp()
    {
        $this->fluxHttp = new Entity\FluxHttp();
        $this->fluxHttp->setFlux($this->flux);
        return $this->fluxHttp;
    }

    /**
     * Get request
     *
     * @return \http\client\Request
     */
    protected function setParamRequest()
    {
        $this->request->setRequestUrl($this->flux->getUrl());
        $this->request->setRequestMethod('GET');

        if ($this->fluxHttp->getIfNoneMatch()) {
            $this->request->setOptions(['etag' => $this->fluxHttp->getIfNoneMatch()]);
        }
        if ($this->fluxHttp->getIfModifiedSince()) {
            $this->request->setOptions(['lastmodified' => $this->fluxHttp->getIfModifiedSince()->getTimestamp()]);
        }

        return $this;
    }

    /**
     * @param \http\Client\Response $response
     * @return bool
     */
    public function callbackResponse(\http\Client\Response $response)
    {
        $this->response = $response;

        if ($this->getResponseHeader('last-modified')) {
            $ifModifiedSince = new \DateTime($this->getResponseHeader('last-modified'));
        } else {
            $ifModifiedSince = null;
        }
        $hash = $this->response->getBody()->etag();


        $this->fluxHttp->setError($this->response->getTransferInfo('error'));
        $this->fluxHttp->setUrlRedirection($this->response->getTransferInfo('effective_url'));
        $this->fluxHttp->setResponseStatus($this->response->getResponseStatus());
        $this->fluxHttp->setResponseCode($this->response->getResponseCode());

        // the server responded
        if ($this->response->getType() == 2) {

            // the content is good AND different from the previous download
            if ($this->response->getResponseCode() == 200
                && $this->response->getBody()->stat('size')
                //&& $hash != $this->fluxHttp->getHash()
            ) {

                $this->fluxHttp->setUpdatedSucces(new \DateTime());
                $this->fluxHttp->setIfModifiedSince($ifModifiedSince);
                $this->fluxHttp->setIfNoneMatch($this->getResponseHeader('etag'));
                $this->fluxHttp->setHash($hash);


                $file = fopen($this->getPath(), 'c');
                var_dump($this->getPath());
                if (flock($file, LOCK_EX)) {
                    $file = fopen($this->getPath(), 'c');
                    flock($file, LOCK_EX);
                }
                $this->response->getBody()->toStream($file);
                flock($file, LOCK_UN);
                fclose($file);

            } //the content is the same as in previous download
            elseif ($this->response->getResponseCode() == 304 || $hash == $this->fluxHttp->getHash()) {
                $this->fluxHttp->setUpdatedSucces(new \DateTime());
                $this->fluxHttp->setIfModifiedSince($ifModifiedSince);
                $this->fluxHttp->setIfNoneMatch($this->getResponseHeader('etag'));

            } // problem when downloading
            else {
            }
        }
        $this->em->persist($this->fluxHttp);
        return true;


        //*/
        /*
                printf(
                    "%s returned %d %s %s Error : %s\n",
                    $this->response->getTransferInfo('effective_url'),
                    $this->response->getResponseCode(),
                    $this->response->getResponseStatus(),
                    $this->response->getType(),
                    $this->response->getTransferInfo('error')
                );
                var_dump($this->response->getHeaders());
                var_dump($this->response->getHeader('etag'));
                var_dump($this->response->getHeader('last-modified'));
                var_dump(new \DateTime($this->response->getHeader('last-modified')));
                return true;
        //*/

        /*
        var_dump($this->response);
        $this->fluxHttp->setResponseCode($this->response->getResponseCode());
        $this->fluxHttp->setResponseStatus($this->response->getResponseCode());
        $this->fluxHttp->setUrlRedirection($this->response->getTransferInfo('effective_url'));
        if ($this->response->getResponseCode() == 200) {

        }//* /

        var_dump($this->response->getTransferInfo());
        //var_dump($this->response->getResponseCode());
        /*
        var_dump($this->response->getResponseStatus());
        var_dump($this->response->getHeader('etag'));
        //var_dump($this->response->getHeaders());
        /*
        var_dump($this->response->getHeaders());
        var_dump($this->response->getHeader('date'));
        var_dump((string)$this->response->getBody());
        //* /
        var_dump($this->response->getBody()->etag());
        var_dump(hash('crc32b', $this->response->getBody()->__toString()));
        $file = '/tmp/'.$this->response->getBody()->etag().'.html';
        $f = fopen($file, 'w');
        $this->response->getBody()->toStream($f);
        fclose($f);
        var_dump($this->flux->getUrl(), $file);
        //*/
    }

}