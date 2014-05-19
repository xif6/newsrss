<?php

namespace Xif6\NewsrssBundle\Crawler;

/**
 * interface RequestInterface
 * @package Xif6\NewsrssBundle\Crawler
 */
interface RequestInterface
{
    /**
     * Generate request
     *
     * @return \http\client\Request
     */
    public function getRequest();

    /**
     * @param \http\Client\Response $response
     * @return bool
     */
    public function callbackResponse(\http\Client\Response $response);

}