<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * User
 *
 * @ORM\Table(name="user")
 * @ORM\Entity(repositoryClass="Xif6\NewsrssBundle\Entity\UserRepository")
 */
class User extends BaseUser
{
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
     * @ORM\oneToMany(targetEntity="UserFlux", mappedBy="user", cascade={"remove", "persist", "merge"}, orphanRemoval=true)
     * @ORM\OrderBy({"rank" = "ASC"})
     */
    protected $userFlux;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created", type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated", type="datetime")
     * @Gedmo\Timestampable(on="update")
     */
    private $updated;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->userFlux = new ArrayCollection();
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
     * @param \Xif6\NewsrssBundle\Entity\UserFlux $userFlux
     * @return User
     */
    public function addUserFlux(\Xif6\NewsrssBundle\Entity\UserFlux $userFlux)
    {
        $this->userFlux[] = $userFlux;

        return $this;
    }

    /**
     * Remove userFlux
     *
     * @param \Xif6\NewsrssBundle\Entity\UserFlux $userFlux
     */
    public function removeUserFlux(\Xif6\NewsrssBundle\Entity\UserFlux $userFlux)
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
     * Set created
     *
     * @param \DateTime $created
     * @return User
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
     * @return User
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
}
