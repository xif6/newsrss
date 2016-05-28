<?php

namespace NewsrssBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Gedmo\Mapping\Annotation as Gedmo;
use NewsrssBundle\Entity\Flux;
use JMS\Serializer\Annotation as JMS;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ODM\Document(collection="item", repositoryClass="NewsrssBundle\Document\ItemRepository")
 * @ODM\Indexes({
 *      @ODM\Index(keys={"flux_id"="asc", "url"="asc"}, options={"unique"=true}),
 *      @ODM\Index(keys={"flux_id"="asc", "title"="asc"}, options={"unique"=true}),
 *      @ODM\Index(keys={"flux_id"="asc", "date"="desc"})
 * })
 * @ODM\HasLifecycleCallbacks
 */
class Item
{
    /**
     * @var string
     *
     * @ODM\Id
     * @JMS\Exclude
     */
    protected $id;

    /**
     * @var Flux
     *
     * @Gedmo\ReferenceOne(class="NewsrssBundle\Entity\Flux", inversedBy="items", identifier="fluxId")
     * @JMS\Exclude
     */
    protected $flux;

    /**
     * @var integer
     *
     * @ODM\Field(name="flux_id", type="int")
     * @JMS\Exclude
     */
    protected $fluxId;

    /**
     * @var string
     *
     * @ODM\Field(name="title", type="string")
     * @Assert\NotBlank()
     */
    protected $title;

    /**
     * @var string
     *
     * @ODM\Field(name="url", type="string")
     * @Assert\Url()
     */
    protected $url;

    /**
     * @var string
     *
     * @ODM\Field(name="description", type="string")
     */
    protected $description;

    /**
     * @var string
     *
     * @ODM\Field(name="image", type="string")
     */
    protected $image;

    /**
     * @var string
     *
     * @ODM\Field(name="category", type="string")
     */
    protected $category;

    /**
     * @var \DateTime
     *
     * @ODM\Field(name="date", type="date")
     * @Assert\DateTime()
     */
    protected $date;

    /**
     * @ODM\PrePersist
     * @ODM\PreUpdate
     *
     * @return self
     */
    public function loadFluxId()
    {
        if ($this->flux) {
            $this->fluxId = $this->flux->getId();
        }
        return $this;
    }

    /**
     * Set id
     *
     * @param  string $id
     * @return self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get id
     *
     * @return string $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param  string $title
     * @return self
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string $title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set url
     *
     * @param  string $url
     * @return self
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string $url
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set description
     *
     * @param  string $description
     * @return self
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string $description
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set category
     *
     * @param  string $category
     * @return self
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return string $category
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set image
     *
     * @param string $image
     * @return self
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * Get image
     *
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     * @return self
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime $date
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set flux
     *
     * @param Flux $flux
     * @return self
     */
    public function setFlux(Flux $flux)
    {
        $this->flux = $flux;

        return $this;
    }

    /**
     * Get flux
     *
     * @return Flux $flux
     */
    public function getFlux()
    {
        return $this->flux;
    }

    /**
     * Set fluxId
     *
     * @param  integer $fluxId
     * @return self
     */
    public function setFluxId($fluxId)
    {
        $this->fluxId = $fluxId;

        return $this;
    }

    /**
     * Get fluxId
     *
     * @return integer $fluxId
     */
    public function getFluxId()
    {
        if (!$this->fluxId) {
            $this->loadFluxId();
        }
        return $this->fluxId;
    }
}
