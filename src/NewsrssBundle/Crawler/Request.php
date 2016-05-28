<?php

namespace NewsrssBundle\Crawler;

use Symfony\Component\Filesystem\Filesystem;

/**
 * Class Request
 * @package NewsrssBundle\Crawler
 */
class Request implements RequestInterface
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
     * @var Filesystem
     */
    protected $fs;

    /**
     * @param Entity\Flux $flux
     */
    public function __construct()
    {
        $this->fs = new Filesystem();
        $this->request = new \http\client\Request();
    }

    /**
     * Set directory
     *
     * @param String $directory
     * @return FluxRequest
     */
    public function setDirectory($directory)
    {
        $this->fs->mkdir($directory);
        $this->directory = $directory;
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

    protected function getResponseHeader($header)
    {
        if ($this->response) {
            $responseHeader = $this->response->getHeader($header);
            if (is_array($responseHeader)) {
                return end($responseHeader);
            } else {
                return $responseHeader;
            }
        }
        return null;
    }

}