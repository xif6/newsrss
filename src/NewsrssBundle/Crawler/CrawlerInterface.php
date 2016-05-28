<?php

namespace NewsrssBundle\Crawler;

use NewsrssBundle\Entity\Flux;

/**
 * Interface CrawlerInterface
 * @package NewsrssBundle\Crawler
 */
interface CrawlerInterface
{
    /**
     * Add request to call
     *
     * @param Flux $request
     * @return mixed
     */
    public function add(Flux $request);

    /**
     * Remove request to call
     *
     * @param Flux $request
     * @return mixed
     */
    public function remove(Flux $request);

    /**
     * Send all request
     *
     * @return mixed
     */
    public function send();

    /**
     * Remove all request
     *
     * @return mixed
     */
    public function reset();
}