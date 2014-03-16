<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Flux
 *
 * @ORM\Table(name="flux")
 * @ORM\Entity(repositoryClass="Xif6\NewsrssBundle\Entity\FluxRepository")
 */
class Flux
{
    /**
     * @var integer
     *
     * @ORM\Column(name="flux_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var Site
	 *
	 * @ORM\ManyToOne(targetEntity="Site", inversedBy="flux")
     * @ORM\JoinColumn(name="flux_site_id", referencedColumnName="site_id")
     */
    private $site;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_url", type="string", length=255)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_description", type="text", nullable=true)
     */
    private $description;

	/**
	 * @var ArrayCollection
	 *
	 * @ORM\ManyToMany(targetEntity="Category", inversedBy="flux")
	 * @ORM\JoinTable(name="flux_category",
	 *		joinColumns={@ORM\JoinColumn(name="flux_id", referencedColumnName="flux_id")},
	 *		inverseJoinColumns={@ORM\JoinColumn(name="category_id", referencedColumnName="category_id")}
	 *		)
	 */
	private $categories;

    /**
     * @var \DateTime
     *
	 * @ORM\Column(name="flux_created", type="datetime")
	 * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @var \DateTime
     *
	 * @ORM\Column(name="flux_updated", type="datetime")
	 * @Gedmo\Timestampable(on="update")
     */
    private $updated;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->categories = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set name
     *
     * @param string $name
     * @return Flux
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set url
     *
     * @param string $url
     * @return Flux
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string 
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Flux
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     * @return Flux
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
     * @return Flux
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
     * Set site
     *
     * @param \Xif6\NewsrssBundle\Entity\Site $site
     * @return Flux
     */
    public function setSite(\Xif6\NewsrssBundle\Entity\Site $site = null)
    {
        $this->site = $site;

        return $this;
    }

    /**
     * Get site
     *
     * @return \Xif6\NewsrssBundle\Entity\Site 
     */
    public function getSite()
    {
        return $this->site;
    }

    /**
     * Add categories
     *
     * @param \Xif6\NewsrssBundle\Entity\Category $categories
     * @return Flux
     */
    public function addCategory(\Xif6\NewsrssBundle\Entity\Category $categories)
    {
        $this->categories[] = $categories;

        return $this;
    }

    /**
     * Remove categories
     *
     * @param \Xif6\NewsrssBundle\Entity\Category $categories
     */
    public function removeCategory(\Xif6\NewsrssBundle\Entity\Category $categories)
    {
        $this->categories->removeElement($categories);
    }

    /**
     * Get categories
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getCategories()
    {
        return $this->categories;
    }
}
