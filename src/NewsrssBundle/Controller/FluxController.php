<?php

namespace NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use NewsrssBundle\Annotation\CanonicalLink;
use NewsrssBundle\Entity\Flux;
use NewsrssBundle\Entity\UserFlux;

class FluxController extends Controller
{
    /**
     * @CanonicalLink()
     * @ParamConverter("flux", class="NewsrssBundle:Flux", options={"mapping": {"id": "id", "display": "display"}})
     * @Template(vars={"flux"})
     */
    public function indexAction(Flux $flux)
    {
    }

    /**
     * @Template()
     */
    public function mostUsersAction()
    {
        $fluxes = $this->getDoctrine()->getRepository('NewsrssBundle:Flux')->mostUsers();

        return ['fluxes' => $fluxes];
    }

    /**
     * @Template()
     */
    public function lastFluxAction()
    {
        $fluxes = $this->getDoctrine()->getRepository('NewsrssBundle:Flux')->lastFlux();

        return ['fluxes' => $fluxes];
    }
}
