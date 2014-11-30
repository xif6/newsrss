<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Xif6\NewsrssBundle\Entity\Flux;
use Xif6\NewsrssBundle\Entity\UserFlux;

/**
 * Class ItemController
 * @package Xif6\NewsrssBundle\Controller
 */
class ItemController extends Controller
{
    /**
     * @ParamConverter("flux", class="Xif6NewsrssBundle:Flux", options={"mapping": {"id": "id"}})
     * @Template()
     */
    public function indexAction($type, Flux $flux)
    {
        //*
        if ($type == 'user' && $this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $userFlux = $this->getDoctrine()
                ->getrepository('Xif6NewsrssBundle:UserFlux')
                ->findOneBy(array('flux' => $flux->getId(), 'user' => $this->getUser()->getId()));
            $item_nb = $userFlux->getFluxNb();
        } else {
            $userFlux = new UserFlux();
        }
        $items = $this->getItems($flux, $userFlux->getFluxNb());

        return array('items' => $items, 'userFlux' => $userFlux, 'flux' => $flux);
    }

    /**
     * @Template("Xif6NewsrssBundle:Item:index.html.twig")
     */
    public function mostUsersAction()
    {
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->mostUsers(1, [], false, true)[0];
        $userFlux = new UserFlux();
        $items = $this->getItems($flux, $userFlux->getFluxNb());

        return array('items' => $items, 'userFlux' => $userFlux, 'flux' => $flux);
    }

    /**
     * @param Flux $flux
     * @param $fluxNb
     * @return array
     */
    protected function getItems(Flux $flux, $fluxNb)
    {
        return $this->get('doctrine_mongodb')
            ->getrepository('Xif6NewsrssBundle:Item')
            ->findBy(array('flux_id' => $flux->getId()), array('date' => 'DESC'), $fluxNb);
    }
}
