<?php

namespace Xif6\NewsrssBundle\Crawler;

/**
 * Class Crawler
 * @package Xif6\NewsrssBundle\Crawler
 */
class Crawler
{
    /**
     * @const String
     */
    const REQUEST_CLASS = 'Xif6\NewsrssBundle\Crawler\Request';

    /**
     * @var \http\client
     */
    protected $httpClient;

    /**
     * @var Array
     */
    protected $allFlux = [];

    /**
     * @var String
     */
    private $requestClass = self::REQUEST_CLASS;

    /**
     *
     */
    function __construct()
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
    public function add($request)
    {
        $hash = $this->hash($request);
        $className = $this->getRequestClass();
        $this->allFlux[$hash] = new $className($request['url']);

        return $this->addRequest($this->allFlux[$hash], $hash);
    }

    /**
     * Add request object
     *
     * @param Object $requestObject
     * @param Array $data
     * @return $this
     * @throws \InvalidArgumentException
     */
    protected function addRequest($requestObject, $data)
    {
        if (!is_subclass_of($requestObject, self::REQUEST_CLASS)) {
            throw new \InvalidArgumentException('Class "' . get_class(
                $requestObject
            ) . '" does not extend ' . self::REQUEST_CLASS);
        }

        if (!empty($data['fileName'])) {
            $requestObject->setFileName($data['fileName']);
        }
        if (!empty($data['directory'])) {
            $requestObject->setDirectory($data['directory']);
        }
        if (!empty($data['options'])) {
            $requestObject->setOptions($data['options']);
        }
        if (!empty($data['method'])) {
            $requestObject->setMethod($data['method']);
        }
        if (!empty($data['headers'])) {
            $requestObject->addHeaders($data['headers']);
        }

        $this->httpClient->enqueue(
            $requestObject->generateRequest(),
            [$requestObject, 'callbackResponse']
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
        while ($this->httpClient->once()) {
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
     * Set requestClass
     *
     * @param String $requestClass
     * @return Crawler
     */
    public function setRequestClass($requestClass)
    {
        if (!is_subclass_of($requestClass, self::REQUEST_CLASS)) {
            throw new \InvalidArgumentException('Class "' . $requestClass . '" does not extend ' . self::REQUEST_CLASS);
        }
        $this->requestClass = $requestClass;
        return $this;
    }

    /**
     * Get requestClass
     *
     * @return String
     */
    public function getRequestClass()
    {
        return $this->requestClass;
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