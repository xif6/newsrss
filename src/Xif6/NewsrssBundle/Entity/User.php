<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Entity\User as BaseUser;

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
     * @ORM\Column(name="user_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="Flux", inversedBy="users")
     * @ORM\JoinTable(name="user_flux",
     *		joinColumns={@ORM\JoinColumn(name="user_id", referencedColumnName="user_id", onDelete="cascade")},
     *		inverseJoinColumns={@ORM\JoinColumn(name="flux_id", referencedColumnName="flux_id")}
     *		)
     */
    private $flux;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->flux = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add flux
     *
     * @param  \Xif6\NewsrssBundle\Entity\Flux $flux
     * @return User
     */
    public function addFlux(\Xif6\NewsrssBundle\Entity\Flux $flux)
    {
        $this->flux[] = $flux;

        return $this;
    }

    /**
     * Remove flux
     *
     * @param \Xif6\NewsrssBundle\Entity\Flux $flux
     */
    public function removeFlux(\Xif6\NewsrssBundle\Entity\Flux $flux)
    {
        $this->flux->removeElement($flux);
    }

    /**
     * Get flux
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFlux()
    {
        return $this->flux;
    }
}
