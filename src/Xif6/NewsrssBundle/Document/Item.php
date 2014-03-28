<?php

namespace Xif6\NewsrssBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ODM\Document(
 *        collection="item",
 *        indexes={
 *			@ODM\Index(keys={"flux_id"="asc", "url"="asc"}, options={"unique"=true}),
 *			@ODM\Index(keys={"flux_id"="asc", "date"="desc"})
 *        }
 * )
 */
class Item
{
    /**
     * @ODM\Id
     */
    protected $id;

    /**
     * @Gedmo\ReferenceOne(class="Xif6\NewsrssBundle\Entity\Flux", inversedBy="items", identifier="fluxId")
     */
    protected $flux;

    /**
     * @ODM\Field(name="flux_id", type="int")
     */
    protected $fluxId;

    /**
     * @ODM\Field(name="title", type="string")
     */
    protected $title;

    /**
     * @ODM\Field(name="url", type="string")
     */
    protected $url;

    /**
     * @ODM\Field(name="description", type="string")
     */
    protected $description;

    /**
     * @ODM\Field(name="category", type="string")
     */
    protected $itemCategory;

    /**
     * @ODM\Field(name="date", type="date")
     */
    protected $itemDate;

    /**
     * @ODM\Field(name="flux_date", type="date")
     */
    protected $fluxDate;

    /**
     * Get id
     *
     * @return id $id
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
     * Set itemCategory
     *
     * @param  string $itemCategory
     * @return self
     */
    public function setItemCategory($itemCategory)
    {
        $this->itemCategory = $itemCategory;

        return $this;
    }

    /**
     * Get itemCategory
     *
     * @return string $itemCategory
     */
    public function getItemCategory()
    {
        return $this->itemCategory;
    }

    /**
     * Set itemDate
     *
     * @param  date $itemDate
     * @return self
     */
    public function setItemDate($itemDate)
    {
        $this->itemDate = $itemDate;

        return $this;
    }

    /**
     * Get itemDate
     *
     * @return date $itemDate
     */
    public function getItemDate()
    {
        return $this->itemDate;
    }

    /**
     * Set fluxDate
     *
     * @param  date $fluxDate
     * @return self
     */
    public function setFluxDate($fluxDate)
    {
        $this->fluxDate = $fluxDate;

        return $this;
    }

    /**
     * Get fluxDate
     *
     * @return date $fluxDate
     */
    public function getFluxDate()
    {
        return $this->fluxDate;
    }

    /**
     * Set flux
     *
     * @param  \Xif6\NewsrssBundle\Entity\Flux $flux
     * @return self
     */
    public function setFlux(\Xif6\NewsrssBundle\Entity\Flux $flux)
    {
        $this->flux = $flux;

        return $this;
    }

    /**
     * Get flux
     *
     * @return \Xif6\NewsrssBundle\Entity\Flux $flux
     */
    public function getFlux()
    {
        return $this->flux;
    }

    /**
     * Set fluxId
     *
     * @param  int $fluxId
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
     * @return int $fluxId
     */
    public function getFluxId()
    {
        return $this->fluxId;
    }
}
