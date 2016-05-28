<?php

namespace NewsrssBundle\Exception;

class CanonicalLinkException extends \RuntimeException implements HttpExceptionInterface
{
    /**
     * @var string
     */
    protected $url;

    /**
     * @var int
     */
    protected $statusCode;

    /**
     * @var array
     */
    protected $headers;


    /**
     * @param string $url
     * @param int $statusCode
     * @param array $headers
     */
    public function __construct($url, $statusCode = 301, $headers = [])
    {
        parent::__construct(sprintf('Redirect to "%s" status code : %d.', $url, $statusCode), $statusCode);
        $this->url = $url;
        $this->statusCode = $statusCode;
        $this->headers = $headers;
    }

    /**
     * Returns url.
     *
     * @return string An HTTP response url
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Returns the status code.
     *
     * @return integer An HTTP response status code
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Returns response headers.
     *
     * @return array Response headers
     */
    public function getHeaders()
    {
        return $this->headers;
    }
}
