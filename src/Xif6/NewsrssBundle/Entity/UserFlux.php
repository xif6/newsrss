<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * UserFlux
 *
 * @ORM\Table(name="user_flux",
 *      uniqueConstraints={@ORM\UniqueConstraint(columns={"user_id", "flux_id"})}
 * )
 * @ORM\Entity(repositoryClass="Xif6\NewsrssBundle\Entity\UserFluxRepository")
 */
class UserFlux
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @JMS\Exclude
     */
    private $id;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="userFlux", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     *
     * @JMS\Exclude
     */
    private $user;

    /**
     * @var Flux
     *
     * @ORM\ManyToOne(targetEntity="Flux", inversedBy="userFlux", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="flux_id", referencedColumnName="id", nullable=false)
     */
    private $flux;

    /**
     * @var boolean
     *
     * @ORM\Column(name="date", type="boolean")
     * @Assert\Type(type="bool")
     */
    private $date = true;

    /**
     * @var boolean
     *
     * @ORM\Column(name="category", type="boolean")
     * @Assert\Type(type="bool")
     */
    private $category = true;

    /**
     * @var boolean
     *
     * @ORM\Column(name="description", type="boolean")
     * @Assert\Type(type="bool")
     */
    private $description = true;

    /**
     * @var integer
     *
     * @ORM\Column(name="flux_nb", type="smallint")
     * @Assert\Type(type="int")
     */
    private $fluxNb = 10;

    /**
     * @var integer
     *
     * @ORM\Column(name="rank", type="smallint")
     * @Assert\Type(type="int")
     */
    private $rank = 1;

    /**
     * @var string
     *
     * @ORM\Column(name="style", type="string", length=20)
     */
    private $style = '';

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255, nullable=true)
     */
    private $name;

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
     * Set date
     *
     * @param boolean $date
     * @return UserFlux
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return boolean
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set category
     *
     * @param boolean $category
     * @return UserFlux
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return boolean
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set description
     *
     * @param boolean $description
     * @return UserFlux
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return boolean
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set fluxNb
     *
     * @param integer $fluxNb
     * @return UserFlux
     */
    public function setFluxNb($fluxNb)
    {
        $this->fluxNb = $fluxNb;

        return $this;
    }

    /**
     * Get fluxNb
     *
     * @return integer
     */
    public function getFluxNb()
    {
        return $this->fluxNb;
    }

    /**
     * Set rank
     *
     * @param integer $rank
     * @return UserFlux
     */
    public function setRank($rank)
    {
        $this->rank = $rank;

        return $this;
    }

    /**
     * Get rank
     *
     * @return integer
     */
    public function getRank()
    {
        return $this->rank;
    }

    /**
     * Set style
     *
     * @param string $style
     * @return UserFlux
     */
    public function setStyle($style)
    {
        $this->style = $style;

        return $this;
    }

    /**
     * Get style
     *
     * @return string
     */
    public function getStyle()
    {
        return $this->style;
    }

    /**
     * Set user
     *
     * @param \Xif6\NewsrssBundle\Entity\User $user
     * @return UserFlux
     */
    public function setUser(\Xif6\NewsrssBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Xif6\NewsrssBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set flux
     *
     * @param \Xif6\NewsrssBundle\Entity\Flux $flux
     * @return UserFlux
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
     * Set name
     *
     * @param string $name
     * @return UserFlux
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
}
