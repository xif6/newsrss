<?php

namespace Xif6\NewsrssBundle\Crawler;

use Doctrine\ORM\EntityManager;
use Xif6\NewsrssBundle\Entity;

/**
 * Class FluxRequest
 * @package Xif6\NewsrssBundle\Crawler
 */
class FluxRequest implements FluxRequestInterface
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
     * @var Array
     */
    protected $optionsRequest = [];

    /**
     * @var EntityManager
     */
    protected $em;

    /**
     * @var String
     */
    protected $directory = '/tmp/';

    /**
     *
     */
    function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
        $this->httpClient = new \http\client();
    }

    /**
     * Add request to call
     *
     * @param Entity\Flux $flux
     * @return FluxRequest
     */
    public function add(Entity\Flux $flux, $fileName = null, $directory = null)
    {
        $hash = spl_object_hash($flux);
        $this->allFlux[$hash] = new Flux($flux, $this->em);
        $this->allFlux[$hash]->setOptions($this->optionsRequest)
            ->setFileName(($fileName ? : $flux->getId() . '.xml'))
            ->setDirectory(($directory ? : $this->directory));

        $this->httpClient->enqueue(
            $this->allFlux[$hash]->generateRequest(),
            [$this->allFlux[$hash], 'callbackResponse']
        );
        return $this;
    }

    /**
     * Remove request to call
     *
     * @param Entity\Flux $flux
     * @return FluxRequest
     */
    public function remove(Entity\Flux $flux)
    {
        $hash = spl_object_hash($flux);

        $this->httpClient->dequeue($this->allFlux[$hash]);
        unset($this->allFlux[$hash]);

        return $this;
    }

    /**
     * Send all request
     *
     * @return FluxRequest
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
     * @return FluxRequest
     */
    public function reset()
    {
        $this->allFlux = [];
        $this->httpClient->reset();
        return $this;
    }

    /**
     * Set directory
     *
     * @param String $directory
     * @return FluxRequest
     */
    public function setDirectory($directory)
    {
        $this->directory = $directory;
        return $this;
    }

    /**
     * Get directory
     *
     * @return String
     */
    public function getDirectory()
    {
        return $this->directory;
    }

    /**
     * Set optionsRequest
     *
     * @param Array $optionsRequest
     * @return FluxRequest
     */
    public function setOptionsRequest(Array $optionsRequest)
    {
        $this->optionsRequest = $optionsRequest;
        return $this;
    }

    /**
     * Get optionsRequest
     *
     * @return Array
     */
    public function getOptionsRequest()
    {
        return $this->optionsRequest;
    }

    /**
     * Set allFlux
     *
     * @param Array $allFlux
     * @return FluxRequest
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