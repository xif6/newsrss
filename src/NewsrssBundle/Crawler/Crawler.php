<?php

namespace NewsrssBundle\Crawler;

/**
 * Class Crawler
 * @package NewsrssBundle\Crawler
 */
class Crawler
{
    /**
     * @var \http\client
     */
    protected $httpClient;

    /**
     * @var Array
     */
    protected $allFlux = [];

    /**
     *
     */
    public function __construct($url)
    {
        $this->httpClient = new \http\client();
    }

    /**
     * Hash
     *
     * @param Mixed
     * @return String
     */
    protected function hash($handle)
    {
        if (is_object($handle)) {
            return spl_object_hash($handle);
        } elseif (is_array($handle)) {
            return md5(serialize($handle));
        } elseif (is_resource($handle)) {
            return md5((string)$handle . '_' . get_resource_type($handle));
        } else {
            return md5($handle);
        }
    }

    /**
     * Add request to call
     *
     * @param Array $request
     * @return FluxCrawler
     */
    public function add(RequestInterface $request)
    {
        $hash = $this->hash($request);
        $this->allFlux[$hash] = $request;
        $this->httpClient->enqueue(
            $request->getRequest(),
            [$request, 'callbackResponse']
        );

        return $this;
    }

    /**
     * Remove request to call
     *
     * @param Array $request
     * @return FluxCrawler
     */
    public function remove($request)
    {
        $hash = $this->hash($request);

        $this->httpClient->dequeue($this->allFlux[$hash]);
        unset($this->allFlux[$hash]);

        return $this;
    }

    /**
     * Send all request
     *
     * @return FluxCrawler
     */
    public function send()
    {
        while (@$this->httpClient->once()) {
            //$this->httpClient->wait();
        }
        $this->reset();
        return $this;
    }

    /**
     * Remove all request
     *
     * @return FluxCrawler
     */
    public function reset()
    {
        $this->allFlux = [];
        $this->httpClient->reset();
        return $this;
    }

    /**
     * Set allFlux
     *
     * @param Array $allFlux
     * @return FluxCrawler
     */
    public function setAllFlux(Array $allFlux)
    {
        $this->allFlux = $allFlux;
        return $this;
    }

    /**
     * Get allFlux
     *
     * @return Array
     */
    public function getAllFlux()
    {
        return $this->allFlux;
    }

    /**
     * Get httpClient
     *
     * @return \http\client
     */
    public function getHttpClient()
    {
        return $this->httpClient;
    }
}
