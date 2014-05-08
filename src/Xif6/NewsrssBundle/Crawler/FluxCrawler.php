<?php

namespace Xif6\NewsrssBundle\Crawler;

use Xif6\NewsrssBundle\Entity\Flux;

class FluxCrawler
{
    /**
     * @var Flux
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

    public function __construct(Flux $flux)
    {
        $this->flux = $flux;
        $this->generateRequest();
    }

    public function callbackResponse(\http\Client\Response $response)
    {
        $this->response = $response;
        $http = $this->flux->getHttp();

        var_dump($this->response);
        /*
        $http->setResponseCode($this->response->getResponseCode());
        $http->setResponseStatus($this->response->getResponseCode());
        $http->setUrlRedirection($this->response->getTransferInfo('effective_url'));
        if ($this->response->getResponseCode() == 200) {

        }*/

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
        return true;
    }

    /**
     * Get flux
     *
     * @return \Xif6\NewsrssBundle\Entity\Flux
     */
    public function getFlux()
    {
        return $this->flux;
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
        $this->request->setOptions(
            [
                'redirect' => 10,
                'postredir' => \http\Client\Curl\POSTREDIR_ALL,
                'compress' => true,
                'useragent' => '',
                'etag' => '',
                'lastmodified' => 0, // timestamp
                'timeout' => 100,
            ]
        );
        //var_dump($this->request->getContentType());

        return $this;
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
}

