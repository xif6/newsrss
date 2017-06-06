<?php

namespace AppBundle\Api\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\Annotations as REST;
use FOS\RestBundle\Controller\FOSRestController;

/**
 * @REST\Prefix("v1")
 * @REST\NamePrefix("api_v1_")
 */
class DefaultController extends FOSRestController
{
    /**
     * @REST\Get("/flux")
     */
    public function getFluxAction(Request $request)
    {
        dump($this->container);
        $fluxes = $this->getDoctrine()->getRepository('AppBundle:Flux')
            ->findAll();
        $view = $this->view($fluxes, 200);
        return $view;
    }
}
