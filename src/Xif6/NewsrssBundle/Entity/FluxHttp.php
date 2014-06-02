<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

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
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var Flux
     *
     * @ORM\OneToOne(targetEntity="Flux", inversedBy="http", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="flux_id", referencedColumnName="id", onDelete="CASCADE")
     */
    private $flux;

    /**
     * @var integer
     *
     * @ORM\Column(name="response_code", type="smallint")
     */
    private $responseCode;

    /**
     * @var string
     *
     * @ORM\Column(name="response_status", type="string", length=255)
     */
    private $responseStatus;

    /**
     * @var string
     *
     * @ORM\Column(name="url_redirection", type="string", length=255)
     */
    private $urlRedirection;

    /**
     * @var string
     *
     * @ORM\Column(name="error", type="string", length=255)
     */
    private $error;

    /**
     * @var string
     *
     * @ORM\Column(name="if_none_match", type="string", length=255, nullable=true)
     */
    private $ifNoneMatch;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="if_modified_since", type="datetime", nullable=true)
     * @Assert\DateTime()
     */
    private $ifModifiedSince;

    /**
     * @var string
     *
     * @ORM\Column(name="hash", type="string", length=50, nullable=true)
     */
    private $hash;

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
    public function setResponseCode($statusCode)
    {
        $this->responseCode = $statusCode;

        return $this;
    }

    /**
     * Get statusCode
     *
     * @return integer
     */
    public function getResponseCode()
    {
        return $this->responseCode;
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
     * Set responseStatus
     *
     * @param  string $statusCodeResponse
     * @return FluxHttp
     */
    public function setResponseStatus($statusCodeResponse)
    {
        $this->responseStatus = $statusCodeResponse;

        return $this;
    }

    /**
     * Get responseStatus
     *
     * @return string
     */
    public function getResponseStatus()
    {
        return $this->responseStatus;
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
     * @param  \DateTime $ifModifiedSince
     * @return FluxHttp
     */
    public function setIfModifiedSince(\DateTime $ifModifiedSince = null)
    {
        $this->ifModifiedSince = $ifModifiedSince;

        return $this;
    }

    /**
     * Get ifModifiedSince
     *
     * @return \DateTime
     */
    public function getIfModifiedSince()
    {
        return $this->ifModifiedSince;
    }

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
     * Get flux_id
     *
     * @return integer
     */
    public function getFluxId()
    {
        if ($this->flux) {
            return $this->flux->getId();
        }
        return null;
    }

    /**
     * Set updatedSucces
     *
     * @param \DateTime $updatedSucces
     * @return FluxHttp
     */
    public function setUpdatedSucces(\DateTime $updatedSucces = null)
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

    /**
     * Set hash
     *
     * @param string $hash
     * @return Flux
     */
    public function setHash($hash)
    {
        $this->hash = $hash;

        return $this;
    }

    /**
     * Get hash
     *
     * @return string
     */
    public function getHash()
    {
        return $this->hash;
    }

}
