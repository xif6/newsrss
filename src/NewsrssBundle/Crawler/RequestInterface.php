<?php

namespace NewsrssBundle\Crawler;

/**
 * interface RequestInterface
 * @package NewsrssBundle\Crawler
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
