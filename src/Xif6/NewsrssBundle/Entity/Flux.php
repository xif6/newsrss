<?php

namespace Xif6\NewsrssBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Flux
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Xif6\NewsrssBundle\Entity\FluxRepository")
 */
class Flux
{
    /**
     * @var integer
     *
     * @ORM\Column(name="idflux", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $idflux;

    /**
     * @var string
     *
     * @ORM\Column(name="site", type="string", length=50)
     */
    private $site;

    /**
     * @var string
     *
     * @ORM\Column(name="nom", type="string", length=255)
     */
    private $nom;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="desc", type="text")
     */
    private $desc;

    /**
     * @var integer
     *
     * @ORM\Column(name="nb", type="integer")
     */
    private $nb;

    /**
     * @var integer
     *
     * @ORM\Column(name="abonnes", type="integer")
     */
    private $abonnes;

    /**
     * @var string
     *
     * @ORM\Column(name="statut", type="string", length=100)
     */
    private $statut;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date_insert", type="datetime")
     */
    private $date_insert;

    /**
     * @var string
     *
     * @ORM\Column(name="url_destination", type="string", length=255)
     */
    private $url_destination;

    /**
     * @var string
     *
     * @ORM\Column(name="statut_init", type="string", length=100)
     */
    private $statut_init;

    /**
     * @var string
     *
     * @ORM\Column(name="code_reponde", type="string", length=255)
     */
    private $code_reponde;

    /**
     * @var string
     *
     * @ORM\Column(name="erreur", type="string", length=255)
     */
    private $erreur;

    /**
     * @var string
     *
     * @ORM\Column(name="IfNoneMatch", type="string", length=255)
     */
    private $IfNoneMatch;

    /**
     * @var string
     *
     * @ORM\Column(name="IfModifiedSince", type="string", length=255)
     */
    private $IfModifiedSince;


    /**
     * Get idflux
     *
     * @return integer 
     */
    public function getIdflux()
    {
        return $this->idflux;
    }

    /**
     * Set site
     *
     * @param string $site
     * @return Flux
     */
    public function setSite($site)
    {
        $this->site = $site;

        return $this;
    }

    /**
     * Get site
     *
     * @return string 
     */
    public function getSite()
    {
        return $this->site;
    }

    /**
     * Set nom
     *
     * @param string $nom
     * @return Flux
     */
    public function setNom($nom)
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * Get nom
     *
     * @return string 
     */
    public function getNom()
    {
        return $this->nom;
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
     * Set desc
     *
     * @param string $desc
     * @return Flux
     */
    public function setDesc($desc)
    {
        $this->desc = $desc;

        return $this;
    }

    /**
     * Get desc
     *
     * @return string 
     */
    public function getDesc()
    {
        return $this->desc;
    }

    /**
     * Set nb
     *
     * @param integer $nb
     * @return Flux
     */
    public function setNb($nb)
    {
        $this->nb = $nb;

        return $this;
    }

    /**
     * Get nb
     *
     * @return integer 
     */
    public function getNb()
    {
        return $this->nb;
    }

    /**
     * Set abonnes
     *
     * @param integer $abonnes
     * @return Flux
     */
    public function setAbonnes($abonnes)
    {
        $this->abonnes = $abonnes;

        return $this;
    }

    /**
     * Get abonnes
     *
     * @return integer 
     */
    public function getAbonnes()
    {
        return $this->abonnes;
    }

    /**
     * Set statut
     *
     * @param string $statut
     * @return Flux
     */
    public function setStatut($statut)
    {
        $this->statut = $statut;

        return $this;
    }

    /**
     * Get statut
     *
     * @return string 
     */
    public function getStatut()
    {
        return $this->statut;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     * @return Flux
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime 
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set date_insert
     *
     * @param \DateTime $dateInsert
     * @return Flux
     */
    public function setDateInsert($dateInsert)
    {
        $this->date_insert = $dateInsert;

        return $this;
    }

    /**
     * Get date_insert
     *
     * @return \DateTime 
     */
    public function getDateInsert()
    {
        return $this->date_insert;
    }

    /**
     * Set url_destination
     *
     * @param string $urlDestination
     * @return Flux
     */
    public function setUrlDestination($urlDestination)
    {
        $this->url_destination = $urlDestination;

        return $this;
    }

    /**
     * Get url_destination
     *
     * @return string 
     */
    public function getUrlDestination()
    {
        return $this->url_destination;
    }

    /**
     * Set statut_init
     *
     * @param string $statutInit
     * @return Flux
     */
    public function setStatutInit($statutInit)
    {
        $this->statut_init = $statutInit;

        return $this;
    }

    /**
     * Get statut_init
     *
     * @return string 
     */
    public function getStatutInit()
    {
        return $this->statut_init;
    }

    /**
     * Set code_reponde
     *
     * @param string $codeReponde
     * @return Flux
     */
    public function setCodeReponde($codeReponde)
    {
        $this->code_reponde = $codeReponde;

        return $this;
    }

    /**
     * Get code_reponde
     *
     * @return string 
     */
    public function getCodeReponde()
    {
        return $this->code_reponde;
    }

    /**
     * Set erreur
     *
     * @param string $erreur
     * @return Flux
     */
    public function setErreur($erreur)
    {
        $this->erreur = $erreur;

        return $this;
    }

    /**
     * Get erreur
     *
     * @return string 
     */
    public function getErreur()
    {
        return $this->erreur;
    }

    /**
     * Set IfNoneMatch
     *
     * @param string $ifNoneMatch
     * @return Flux
     */
    public function setIfNoneMatch($ifNoneMatch)
    {
        $this->IfNoneMatch = $ifNoneMatch;

        return $this;
    }

    /**
     * Get IfNoneMatch
     *
     * @return string 
     */
    public function getIfNoneMatch()
    {
        return $this->IfNoneMatch;
    }

    /**
     * Set IfModifiedSince
     *
     * @param string $ifModifiedSince
     * @return Flux
     */
    public function setIfModifiedSince($ifModifiedSince)
    {
        $this->IfModifiedSince = $ifModifiedSince;

        return $this;
    }

    /**
     * Get IfModifiedSince
     *
     * @return string 
     */
    public function getIfModifiedSince()
    {
        return $this->IfModifiedSince;
    }
}
