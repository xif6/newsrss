<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Xif6\NewsrssBundle\Annotation\CanonicalLink;
use Xif6\NewsrssBundle\Entity\Flux;
use Xif6\NewsrssBundle\Entity\UserFlux;

class FluxController extends Controller
{
    /**
     * @CanonicalLink()
     * @ParamConverter("flux", class="Xif6NewsrssBundle:Flux", options={"mapping": {"id": "id", "display": "display"}})
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
        $fluxes = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->mostUsers();

        return ['fluxes' => $fluxes];
    }

    /**
     * @Template()
     */
    public function lastFluxAction()
    {
        $fluxes = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->lastFlux();

        return ['fluxes' => $fluxes];
    }
}
