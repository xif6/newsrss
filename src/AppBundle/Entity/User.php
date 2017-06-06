<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class User extends BaseUser
{
    /**
     * Hook timestampable behavior
     * updates createdAt, updatedAt fields
     */
    use TimestampableEntity;

    /**
     * @var ArrayCollection
     *
     * @ORM\OneToMany(targetEntity="Flux", mappedBy="user", cascade={"remove", "persist", "merge"}, orphanRemoval=true)
     * @ORM\OrderBy({"rank" = "ASC"})
     */
    protected $fluxes;

    /**
     * @var \Ramsey\Uuid\Uuid
     *
     * @ORM\Id
     * @ORM\Column(type="uuid")
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class="Ramsey\Uuid\Doctrine\UuidGenerator")
     */
    protected $id;

    /**
     * Constructor
     */
    public function __construct()
    {
        parent::__construct();
        $this->fluxes = new ArrayCollection();
    }

    /**
     * Add fluxes
     *
     * @param Flux $userFlux
     * @return User
     */
    public function addFlux(Flux $flux)
    {
        $this->fluxes[] = $flux;
        return $this;
    }

    /**
     * Remove fluxes
     *
     * @param Flux $flux
     * @return User
     */
    public function removeFlux(Flux $flux)
    {
        $this->fluxes->removeElement($flux);
        return $this;
    }

    /**
     * Get fluxes
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFlux()
    {
        return $this->fluxes;
    }
}
