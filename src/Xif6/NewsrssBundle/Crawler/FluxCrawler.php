<?php

namespace Xif6\NewsrssBundle\Crawler;

use Doctrine\ORM\EntityManager;
use Xif6\NewsrssBundle\Entity;

/**
 * Class FluxCrawler
 * @package Xif6\NewsrssBundle\Crawler
 */
class FluxCrawler extends Crawler
{
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
    protected $directory;

    /**
     *
     */
    function __construct(EntityManager $entityManager)
    {
        parent::__construct();
        $this->em = $entityManager;
        $this->setRequestClass(__NAMESPACE__ . '\FluxRequest');
    }

    /**
     * Add request to call
     *
     * @param Entity\Flux $flux
     * @return FluxCrawler
     */
    public function add($flux, $request = [])
    {
        if (!($flux instanceof Entity\Flux)) {
            throw new \InvalidArgumentException('Class "' . get_class($flux) . '" does not extend Entity\Flux');
        }

        $hash = $this->hash($flux);
        $className = $this->getRequestClass();
        if (empty($request['fileName'])) {
            $request['fileName'] = $flux->getId() . '.xml';
        }
        if (empty($request['directory']) && !empty($this->directory)) {
            $request['directory'] = $this->directory;
        }
        if (empty($request['options'])) {
            $request['options'] = $this->optionsRequest;
        } else {
            $request['options'] += $this->optionsRequest;
        }
        $this->allFlux[$hash] = new $className($flux, $this->em);

        return $this->addRequest($this->allFlux[$hash], $request);
    }

    /**
     * Set optionsRequest
     *
     * @param Array $optionsRequest
     * @return FluxCrawler
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
     * Set directory
     *
     * @param String $directory
     * @return FluxCrawler
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

}