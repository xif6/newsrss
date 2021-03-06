<?php

namespace NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as JMS;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Flux
 *
 * @ORM\Table(name="flux",
 *        indexes={@ORM\Index(columns={"id", "display"})}
 * )
 * @ORM\Entity(repositoryClass="NewsrssBundle\Entity\FluxRepository")
 */
class Flux
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
     * @var FluxHttp
     *
     * @ORM\OneToOne(targetEntity="FluxHttp", mappedBy="flux", cascade={"remove", "persist", "merge"})
     * @JMS\Exclude
     */
    private $http;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @var string
     *
     * @Gedmo\Slug(fields={"name"})
     * @ORM\Column(name="slug", type="string", length=255, nullable=true)
     */
    private $slug;

    /**
     * @var Site
     *
     * @ORM\ManyToOne(targetEntity="Site", inversedBy="flux", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="site_id", referencedColumnName="id")
     */
    private $site;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     * @Assert\Url()
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var boolean
     *
     * @ORM\Column(name="display", type="boolean", options={"default"=false})
     * @Assert\Type(type="bool")
     */
    private $display = false;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean", options={"default"=true})
     * @Assert\Type(type="bool")
     */
    private $active = true;

    /**
     * @var boolean
     *
     * @ORM\Column(name="new", type="boolean", options={"default"=false})
     * @Assert\Type(type="bool")
     */
    private $new = false;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Category", inversedBy="flux", cascade={"persist", "merge"})
     * @ORM\JoinTable(name="flux_category",
     *        joinColumns={@ORM\JoinColumn(name="flux_id", referencedColumnName="id")},
     *        inverseJoinColumns={@ORM\JoinColumn(name="category_id", referencedColumnName="id")}
     * )
     * @JMS\Exclude
     */
    private $categories;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="UserFlux", mappedBy="flux", cascade={"persist", "merge"})
     * @JMS\Exclude
     */
    private $userFlux;

    /**
     * @var ArrayCollection
     *
     * @Gedmo\ReferenceMany(class="NewsrssBundle\Document\Item", mappedBy="flux")
     * @JMS\Exclude
     */
    private $items;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->categories = new ArrayCollection();
        $this->sites = new ArrayCollection();
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updateDisplay()
    {
        if (!$this->name) {
            $this->display = false;
        }
    }

    /**
     * Set id
     *
     * @param integer $id
     * @return Flux
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
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
     * Set site
     *
     * @param  \NewsrssBundle\Entity\Site $site
     * @return Flux
     */
    public function setSite(\NewsrssBundle\Entity\Site $site = null)
    {
        $this->site = $site;

        return $this;
    }

    /**
     * Get site
     *
     * @return \NewsrssBundle\Entity\Site
     */
    public function getSite()
    {
        return $this->site;
    }

    /**
     * Add categories
     *
     * @param  \NewsrssBundle\Entity\Category $categories
     * @return Flux
     */
    public function addCategory(\NewsrssBundle\Entity\Category $categories)
    {
        $this->categories[] = $categories;

        return $this;
    }

    /**
     * Remove categories
     *
     * @param \NewsrssBundle\Entity\Category $categories
     */
    public function removeCategory(\NewsrssBundle\Entity\Category $categories)
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
     * @param  \NewsrssBundle\Entity\User $users
     * @return Flux
     */
    public function addUser(\NewsrssBundle\Entity\User $users)
    {
        $this->users[] = $users;

        return $this;
    }

    /**
     * Remove users
     *
     * @param \NewsrssBundle\Entity\User $users
     */
    public function removeUser(\NewsrssBundle\Entity\User $users)
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
     * @param  \NewsrssBundle\Document\Item $items
     * @return Flux
     */
    public function addItem(\NewsrssBundle\Document\Item $items)
    {
        $this->items[] = $items;

        return $this;
    }

    /**
     * Remove items
     *
     * @param \NewsrssBundle\Document\Item $items
     */
    public function removeItem(\NewsrssBundle\Document\Item $items)
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

    /**
     * Add userFlux
     *
     * @param \NewsrssBundle\Entity\UserFlux $userFlux
     * @return Flux
     */
    public function addUserFlux(\NewsrssBundle\Entity\UserFlux $userFlux)
    {
        $this->userFlux[] = $userFlux;

        return $this;
    }

    /**
     * Remove userFlux
     *
     * @param \NewsrssBundle\Entity\UserFlux $userFlux
     */
    public function removeUserFlux(\NewsrssBundle\Entity\UserFlux $userFlux)
    {
        $this->userFlux->removeElement($userFlux);
    }

    /**
     * Get userFlux
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUserFlux()
    {
        return $this->userFlux;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return Flux
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set new
     *
     * @param boolean $new
     * @return Flux
     */
    public function setNew($new)
    {
        $this->new = $new;

        return $this;
    }

    /**
     * Get new
     *
     * @return boolean
     */
    public function getNew()
    {
        return $this->new;
    }

    /**
     * Set http
     *
     * @param \NewsrssBundle\Entity\FluxHttp $http
     * @return Flux
     */
    public function setHttp(\NewsrssBundle\Entity\FluxHttp $http = null)
    {
        $this->http = $http;

        return $this;
    }

    /**
     * Get http
     *
     * @return \NewsrssBundle\Entity\FluxHttp
     */
    public function getHttp()
    {
        return $this->http;
    }
}
