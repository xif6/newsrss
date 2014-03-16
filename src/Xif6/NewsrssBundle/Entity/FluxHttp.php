<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * FluxHttp
 *
 * @ORM\Table(name="flux_http")
 * @ORM\Entity(repositoryClass="Xif6\NewsrssBundle\Entity\FluxHttpRepository")
 */
class FluxHttp
{
    /**
     * @var integer
     *
     * @ORM\Column(name="flux_http_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
	 * @ORM\OneToOne(targetEntity="Flux")
	 * @ORM\JoinColumn(name="flux_id", referencedColumnName="flux_id", onDelete="CASCADE")
     */
    private $flux;

    /**
     * @var integer
     *
     * @ORM\Column(name="flux_http_status_code", type="smallint")
     */
    private $statusCode;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_http_url_redirection", type="string", length=255)
     */
    private $urlRedirection;

    /**
     * @var integer
     *
     * @ORM\Column(name="flux_http_status_code_orig", type="smallint")
     */
    private $statusCodeOrig;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_http_status_code_response", type="string", length=255)
     */
    private $statusCodeResponse;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_http_error", type="string", length=255)
     */
    private $error;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_http_if_none_match", type="string", length=255)
     */
    private $ifNoneMatch;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_http_if_modified_since", type="string", length=255)
     */
	private $ifModifiedSince;

    /**
     * @var \DateTime
     *
	 * @ORM\Column(name="flux_http_created", type="datetime")
	 * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @var \DateTime
     *
	 * @ORM\Column(name="flux_http_updated", type="datetime")
	 * @Gedmo\Timestampable(on="update")
     */
    private $updated;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set statusCode
     *
     * @param integer $statusCode
     * @return FluxHttp
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Get statusCode
     *
     * @return integer 
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Set urlRedirection
     *
     * @param string $urlRedirection
     * @return FluxHttp
     */
    public function setUrlRedirection($urlRedirection)
    {
        $this->urlRedirection = $urlRedirection;

        return $this;
    }

    /**
     * Get urlRedirection
     *
     * @return string 
     */
    public function getUrlRedirection()
    {
        return $this->urlRedirection;
    }

    /**
     * Set statusCodeOrig
     *
     * @param integer $statusCodeOrig
     * @return FluxHttp
     */
    public function setStatusCodeOrig($statusCodeOrig)
    {
        $this->statusCodeOrig = $statusCodeOrig;

        return $this;
    }

    /**
     * Get statusCodeOrig
     *
     * @return integer 
     */
    public function getStatusCodeOrig()
    {
        return $this->statusCodeOrig;
    }

    /**
     * Set statusCodeResponse
     *
     * @param string $statusCodeResponse
     * @return FluxHttp
     */
    public function setStatusCodeResponse($statusCodeResponse)
    {
        $this->statusCodeResponse = $statusCodeResponse;

        return $this;
    }

    /**
     * Get statusCodeResponse
     *
     * @return string 
     */
    public function getStatusCodeResponse()
    {
        return $this->statusCodeResponse;
    }

    /**
     * Set error
     *
     * @param string $error
     * @return FluxHttp
     */
    public function setError($error)
    {
        $this->error = $error;

        return $this;
    }

    /**
     * Get error
     *
     * @return string 
     */
    public function getError()
    {
        return $this->error;
    }

    /**
     * Set ifNoneMatch
     *
     * @param string $ifNoneMatch
     * @return FluxHttp
     */
    public function setIfNoneMatch($ifNoneMatch)
    {
        $this->ifNoneMatch = $ifNoneMatch;

        return $this;
    }

    /**
     * Get ifNoneMatch
     *
     * @return string 
     */
    public function getIfNoneMatch()
    {
        return $this->ifNoneMatch;
    }

    /**
     * Set ifModifiedSince
     *
     * @param string $ifModifiedSince
     * @return FluxHttp
     */
    public function setIfModifiedSince($ifModifiedSince)
    {
        $this->ifModifiedSince = $ifModifiedSince;

        return $this;
    }

    /**
     * Get ifModifiedSince
     *
     * @return string 
     */
    public function getIfModifiedSince()
    {
        return $this->ifModifiedSince;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return FluxHttp
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime 
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     * @return FluxHttp
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime 
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * Set flux
     *
     * @param \Xif6\NewsrssBundle\Entity\Flux $flux
     * @return FluxHttp
     */
    public function setFlux(\Xif6\NewsrssBundle\Entity\Flux $flux = null)
    {
        $this->flux = $flux;

        return $this;
    }

    /**
     * Get flux
     *
     * @return \Xif6\NewsrssBundle\Entity\Flux 
     */
    public function getFlux()
    {
        return $this->flux;
    }
}
