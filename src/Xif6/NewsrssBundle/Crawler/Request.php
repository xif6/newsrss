<?php

namespace Xif6\NewsrssBundle\Crawler;

/**
 * Class Request
 * @package Xif6\NewsrssBundle\Crawler
 */
class Request
{
    /**
     * @var \http\client\Request
     */
    protected $request;

    /**
     * @var \http\Client\Response
     */
    protected $response;

    /**
     * @var String
     */
    private $directory = '/tmp/';

    /**
     * @var String
     */
    private $fileName;

    /**
     * @var String
     */
    private $path;

    /**
     * @var String
     */
    protected $url;

    /**
     * @var Array
     */
    protected $options = [];

    /**
     * @var String
     */
    protected $method = 'GET';

    /**
     * @var Array
     */
    protected $headers = [];

    /**
     * @param Entity\Flux $flux
     */
    function __construct($url)
    {
        $this->url = $url;
    }

    /**
     * Set directory
     *
     * @param String $directory
     * @return FluxRequest
     */
    public function setDirectory($directory)
    {
        $dir = realpath($directory);
        if ($dir === false) {
            if (mkdir($directory, 0777, true) === false) {
                throw new \RuntimeException('Directory could not be created : "' . $directory . '"');
            } else {
                $dir = realpath($directory);
            }
        }
        $this->directory = $dir . '/';
        $this->generatePath();
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
     * Set fileName
     *
     * @param String $fileName
     * @return FluxRequest
     */
    public function setFileName($fileName)
    {
        $this->fileName = $fileName;
        $this->generatePath();
        return $this;
    }

    /**
     * Get fileName
     *
     * @return String
     */
    public function getFileName()
    {
        return $this->fileName;
    }

    /**
     * Set options
     *
     * @param Array $options
     * @return FluxRequest
     */
    public function setOptions($options)
    {
        $this->options = $options;
        return $this;
    }

    /**
     * Get options
     *
     * @return Array
     */
    public function getOptions()
    {
        return $this->options;
    }

    /**
     * Set method
     *
     * @param String $method
     * @return Request
     */
    public function setMethod($method)
    {
        $this->method = $method;
        return $this;
    }

    /**
     * Get method
     *
     * @return String
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * Set headers
     *
     * @param Array $headers
     * @return Request
     */
    public function setHeaders($headers)
    {
        $this->headers = $headers;
        return $this;
    }

    /**
     * Get headers
     *
     * @return Array
     */
    public function getHeaders()
    {
        return $this->headers;
    }

    /**
     * Get url
     *
     * @return String
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Get path
     *
     * @return String
     */
    public function getPath()
    {
        return $this->path;
    }

    /**
     * Generate Path
     *
     * @return String
     */
    protected function generatePath()
    {
        $fileName = ($this->fileName ? : md5($this->url));
        return $this->path = $this->directory . $fileName;
    }

    /**
     * Get request
     *
     * @return \http\client\Request
     */
    public function getRequest()
    {
        return $this->request;
    }

    /**
     * Generate request
     *
     * @return \http\client\Request
     */
    public function generateRequest()
    {
        $this->request = new \http\client\Request($this->method, $this->url);

        $this->request->setOptions($this->options);
        $this->request->addHeaders($this->headers, true);

        return $this->request;
    }

    /**
     * Get response
     *
     * @return \http\Client\Response
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * @param \http\Client\Response $response
     * @return bool
     */
    public function callbackResponse(\http\Client\Response $response)
    {
        $this->response = $response;

        // the server responded
        if ($this->response->getType() == 2) {
            $file = fopen($this->getPath(), 'w');
            $this->response->getBody()->toStream($file);
            fclose($file);
            return true;
        }
        return false;

    }

}