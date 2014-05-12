<?php

namespace Xif6\NewsrssBundle\Crawler;

use Xif6\NewsrssBundle\Entity\Flux;

/**
 * Interface CrawlerInterface
 * @package Xif6\NewsrssBundle\Crawler
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