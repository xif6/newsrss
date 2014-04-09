<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * FluxHttp
 *
 * @ORM\Table(name="flux_http")
 * @ORM\Entity(repositoryClass="Xif6\NewsrssBundle\Entity\FluxHttpRepository")
 * @ORM\HasLifecycleCallbacks
 */
class FluxHttp
{
    /**
     * Hook timestampable behavior
     * add created, updated fields
     */
    use TimestampableEntity;

    /**
     * @var integer
     */
    private $id;

    /**
     * @var Flux
     *
     * @ORM\Id
     * @ORM\OneToOne(targetEntity="Flux", inversedBy="http", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="flux_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $flux;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_code", type="smallint")
     */
    private $statusCode;

    /**
     * @var string
     *
     * @ORM\Column(name="url_redirection", type="string", length=255)
     */
    private $urlRedirection;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_code_orig", type="smallint")
     */
    private $statusCodeOrig;

    /**
     * @var string
     *
     * @ORM\Column(name="status_code_response", type="string", length=255)
     */
    private $statusCodeResponse;

    /**
     * @var string
     *
     * @ORM\Column(name="error", type="string", length=255)
     */
    private $error;

    /**
     * @var string
     *
     * @ORM\Column(name="if_none_match", type="string", length=255)
     */
    private $ifNoneMatch;

    /**
     * @var string
     *
     * @ORM\Column(name="if_modified_since", type="string", length=255)
     */
    private $ifModifiedSince;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_success", type="datetime", nullable=true)
     */
    private $updatedSucces;

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updateActiveOnFlux()
    {
        $dateMin = new \DateTime();
        $dateMin->sub(new \DateInterval('P3M'));
        if ($this->updatedSucces === null || $this->updatedSucces > $dateMin) {
            $this->flux->setActive(true);
        } else {
            $this->flux->setActive(false);
        }
    }

    /**
     * Set statusCode
     *
     * @param  integer $statusCode
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
     * @param  string $urlRedirection
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
     * @param  string $statusCodeResponse
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
     * @param  string $error
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
     * @param  string $ifNoneMatch
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
     * @param  string $ifModifiedSince
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
     * load user
     *
     * @return FluxHttp
     */
    protected function loadUserId()
    {
        $this->id = $this->flux->getId();
        return $this;
    }
    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        if (!$this->id) {
            $this->loadUserId();
        }
        return $this->id;
    }

    /**
     * Set updatedSucces
     *
     * @param \DateTime $updatedSucces
     * @return FluxHttp
     */
    public function setUpdatedSucces($updatedSucces)
    {
        $this->updatedSucces = $updatedSucces;

        return $this;
    }

    /**
     * Get updatedSucces
     *
     * @return \DateTime
     */
    public function getUpdatedSucces()
    {
        return $this->updatedSucces;
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
        $this->loadUserId();

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
