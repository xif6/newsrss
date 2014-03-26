<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Flux
 *
 * @ORM\Table(name="flux",
 *		indexes={@ORM\Index(columns={"flux_id", "flux_display"})}
 * )
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
     * $var string
     *
     * @Gedmo\Slug(fields={"name"})
     * @ORM\Column(name="flux_slug", type="string", length=255, nullable=true)
     */
    private $slug;

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
     * @ORM\Column(name="flux_url", type="string", length=255, unique=true)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="flux_description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var boolean
     *
     * @ORM\Column(name="flux_display", type="boolean", options={"default"=false})
     */
    private $display = false;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="flux")
     * @ORM\JoinTable(name="flux_category",
     *		joinColumns={@ORM\JoinColumn(name="flux_id", referencedColumnName="flux_id")},
     *		inverseJoinColumns={@ORM\JoinColumn(name="category_id", referencedColumnName="category_id")}
     * )
     */
    private $categories;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="User", mappedBy="flux")
     */
    private $users;

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
     * @var ArrayCollection
     *
     * @Gedmo\ReferenceMany(class="Xif6\NewsrssBundle\Document\Item", mappedBy="flux")
     */
    private $items;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->categories = new \Doctrine\Common\Collections\ArrayCollection();
        $this->sites = new \Doctrine\Common\Collections\ArrayCollection();
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
     * @param  string $name
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
     * @param  string $url
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
     * @param  string $description
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
     * @param  \DateTime $created
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
     * @param  \DateTime $updated
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
     * @param  \Xif6\NewsrssBundle\Entity\Site $site
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
     * @param  \Xif6\NewsrssBundle\Entity\Category $categories
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

    /**
     * Add users
     *
     * @param  \Xif6\NewsrssBundle\Entity\User $users
     * @return Flux
     */
    public function addUser(\Xif6\NewsrssBundle\Entity\User $users)
    {
        $this->users[] = $users;

        return $this;
    }

    /**
     * Remove users
     *
     * @param \Xif6\NewsrssBundle\Entity\User $users
     */
    public function removeUser(\Xif6\NewsrssBundle\Entity\User $users)
    {
        $this->users->removeElement($users);
    }

    /**
     * Get users
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

    /**
     * Set display
     *
     * @param  boolean $display
     * @return Flux
     */
    public function setDisplay($display)
    {
        $this->display = $display;

        return $this;
    }

    /**
     * Get display
     *
     * @return boolean
     */
    public function getDisplay()
    {
        return $this->display;
    }

    /**
     * Add items
     *
     * @param  \Xif6\NewsrssBundle\Document\Item $items
     * @return Flux
     */
    public function addItem(\Xif6\NewsrssBundle\Document\Item $items)
    {
        $this->items[] = $items;

        return $this;
    }

    /**
     * Remove items
     *
     * @param \Xif6\NewsrssBundle\Document\Item $items
     */
    public function removeItem(\Xif6\NewsrssBundle\Document\Item $items)
    {
        $this->items->removeElement($items);
    }

    /**
     * Get items
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getItems()
    {
        return $this->items;
    }

    /**
     * Set slug
     *
     * @param  string $slug
     * @return Flux
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * Get slug
     *
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }
}
