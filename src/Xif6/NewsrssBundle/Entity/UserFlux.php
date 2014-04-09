<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

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
     */
    private $id;

    /**
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User", inversedBy="userFlux", cascade={"persist", "merge"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
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
     * @ORM\Column(name="display_date", type="boolean")
     */
    private $displayDate;

    /**
     * @var boolean
     *
     * @ORM\Column(name="display_category", type="boolean")
     */
    private $displayCategory;

    /**
     * @var boolean
     *
     * @ORM\Column(name="display_description", type="boolean")
     */
    private $displayDescription;

    /**
     * @var integer
     *
     * @ORM\Column(name="flux_nb", type="smallint")
     */
    private $fluxNb;

    /**
     * @var integer
     *
     * @ORM\Column(name="rank", type="smallint")
     */
    private $rank;

    /**
     * @var string
     *
     * @ORM\Column(name="style", type="string", length=20)
     */
    private $style;

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
     * Set displayDate
     *
     * @param boolean $displayDate
     * @return UserFlux
     */
    public function setDisplayDate($displayDate)
    {
        $this->displayDate = $displayDate;

        return $this;
    }

    /**
     * Get displayDate
     *
     * @return boolean
     */
    public function getDisplayDate()
    {
        return $this->displayDate;
    }

    /**
     * Set displayCategory
     *
     * @param boolean $displayCategory
     * @return UserFlux
     */
    public function setDisplayCategory($displayCategory)
    {
        $this->displayCategory = $displayCategory;

        return $this;
    }

    /**
     * Get displayCategory
     *
     * @return boolean
     */
    public function getDisplayCategory()
    {
        return $this->displayCategory;
    }

    /**
     * Set displayDescription
     *
     * @param boolean $displayDescription
     * @return UserFlux
     */
    public function setDisplayDescription($displayDescription)
    {
        $this->displayDescription = $displayDescription;

        return $this;
    }

    /**
     * Get displayDescription
     *
     * @return boolean
     */
    public function getDisplayDescription()
    {
        return $this->displayDescription;
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
