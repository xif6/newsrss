<?php

namespace Xif6\NewsrssBundle\Crawler;

use Doctrine\ORM\EntityManager;
use Xif6\NewsrssBundle\Entity;

/**
 * Class Flux
 * @package Xif6\NewsrssBundle\Crawler
 */
class Flux
{
    /**
     * @var Entity\Flux
     */
    protected $flux;

    /**
     * @var \http\client\Request
     */
    protected $request;

    /**
     * @var \http\Client\Response
     */
    protected $response;

    /**
     * @var String
     */
    protected $directory;

    /**
     * @var String
     */
    protected $fileName;

    /**
     * @var Array
     */
    protected $options = [];

    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * @param Entity\Flux $flux
     */
    function __construct(Entity\Flux $flux, EntityManager $em)
    {
        $this->flux = $flux;
        $this->em = $em;
    }

    /**
     * Set options
     *
     * @param Array $options
     * @return Flux
     */
    public function setOptions($options)
    {
        $this->options = $options;
        return $this;
    }

    /**
     * Set directory
     *
     * @param String $directory
     * @return Flux
     */
    public function setDirectory($directory)
    {
        $dir = realpath($directory);
        if ($dir === false) {
            if (mkdir($directory, 0777, true) === false) {
                throw new \RuntimeException('Directory could not be created : "' . $directory . '"');
            } else {
                $dir = realpath($directory);
            }
        }
        $this->directory = $dir . '/';
        return $this;
    }

    /**
     * Set fileName
     *
     * @param String $fileName
     * @return Flux
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;
        return $this;
    }

    /**
     * Get request
     *
     * @return \http\client\Request
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * Get request
     *
     * @return FluxCrawler
     */
    public function generateRequest()
    {
        $this->request = new \http\client\Request('GET', $this->flux->getUrl());

        $http = $this->flux->getHttp();
        if ($http->getIfNoneMatch()) {
            $this->options['etag'] = $http->getIfNoneMatch();
        }
        if ($http->getIfModifiedSince()) {
            $this->options['lastmodified'] = $http->getIfModifiedSince()->getTimestamp();
        }

        $this->request->setOptions($this->options);

        return $this->request;
    }

    /**
     * Get response
     *
     * @return \http\Client\Response
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * @param \http\Client\Response $response
     * @return bool
     */
    public function callbackResponse(\http\Client\Response $response)
    {
        $this->response = $response;
        $http = $this->flux->getHttp();

        if ($this->response->getHeader('last-modified')) {
            $ifModifiedSince = new \DateTime($this->response->getHeader('last-modified'));
        } else {
            $ifModifiedSince = null;
        }
        $hash = $this->response->getBody()->etag();


        $http->setError($this->response->getTransferInfo('error'));
        $http->setUrlRedirection($this->response->getTransferInfo('effective_url'));
        $http->setResponseStatus($this->response->getResponseStatus());
        $http->setResponseCode($this->response->getResponseCode());

        // the server responded
        if ($this->response->getType() == 2) {

            // the content is good AND different from the previous download
            if ($this->response->getResponseCode() == 200 && $hash != $http->getHash()) {

                $http->setUpdatedSucces(new \DateTime());
                $http->setIfModifiedSince($ifModifiedSince);
                $http->setIfNoneMatch($this->response->getHeader('etag'));
                $http->setHash($hash);


                $path = $this->directory . $this->fileName;
                $file = fopen($path, 'c');
                if (flock($file, LOCK_EX)) {
                    $file = fopen($path, 'c');
                    flock($file, LOCK_EX);
                }
                $this->response->getBody()->toStream($file);
                flock($file, LOCK_UN);
                fclose($file);

            } //the content is the same as in previous download
            elseif ($this->response->getResponseCode() == 304 || $hash == $http->getHash()) {
                $http->setUpdatedSucces(new \DateTime());
                $http->setIfModifiedSince($ifModifiedSince);
                $http->setIfNoneMatch($this->response->getHeader('etag'));

            } // problem when downloading
            else {
            }
        }
        $this->em->persist($http);
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
        $http->setResponseCode($this->response->getResponseCode());
        $http->setResponseStatus($this->response->getResponseCode());
        $http->setUrlRedirection($this->response->getTransferInfo('effective_url'));
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