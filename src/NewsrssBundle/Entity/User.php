<?php

namespace NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
use Gedmo\Mapping\Annotation as Gedmo;
use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="NewsrssBundle\Entity\UserRepository")
 */
class User extends BaseUser
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
    protected $id;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="UserFlux", mappedBy="user", cascade={"remove", "persist", "merge"}, orphanRemoval=true)
     * @ORM\OrderBy({"rank" = "ASC"})
     *
     * @JMS\Exclude
     */
    protected $userFlux;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="SearchUser", mappedBy="user", cascade={"persist", "merge"})
     * @ORM\OrderBy({"createdAt" = "DESC"})
     */
    protected $search;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->userFlux = new ArrayCollection();
        $this->search = new ArrayCollection();
    }

    /**
     * Set id
     *
     * @param integer $id
     * @return User
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
     * Add userFlux
     *
     * @param \NewsrssBundle\Entity\UserFlux $userFlux
     * @return User
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
     * Add search
     *
     * @param \NewsrssBundle\Entity\SearchUser $search
     * @return User
     */
    public function addSearch(\NewsrssBundle\Entity\SearchUser $search)
    {
        $this->search[] = $search;

        return $this;
    }

    /**
     * Remove search
     *
     * @param \NewsrssBundle\Entity\SearchUser $search
     */
    public function removeSearch(\NewsrssBundle\Entity\SearchUser $search)
    {
        $this->search->removeElement($search);
    }

    /**
     * Get search
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSearch()
    {
        return $this->search;
    }
}
