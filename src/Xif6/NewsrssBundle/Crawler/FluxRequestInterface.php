<?php

namespace Xif6\NewsrssBundle\Crawler;

use Xif6\NewsrssBundle\Entity\Flux;

/**
 * Interface FluxRequestInterface
 * @package Xif6\NewsrssBundle\Crawler
 */
interface FluxRequestInterface
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