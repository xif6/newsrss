<?php

namespace Xif6\NewsrssBundle\Exception;

/**
 * Interface for HTTP error exceptions.
 */
interface HttpExceptionInterface
{
    /**
     * Returns url.
     *
     * @return string An HTTP response url
     */
    public function getUrl();

    /**
     * Returns the status code.
     *
     * @return integer An HTTP response status code
     */
    public function getStatusCode();

    /**
     * Returns response headers.
     *
     * @return array Response headers
     */
    public function getHeaders();
}
