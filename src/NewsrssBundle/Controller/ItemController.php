<?php

namespace NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use NewsrssBundle\Entity\Flux;
use NewsrssBundle\Entity\UserFlux;

/**
 * Class ItemController
 * @package NewsrssBundle\Controller
 */
class ItemController extends Controller
{
    /**
     * @ParamConverter("flux", class="NewsrssBundle:Flux", options={"mapping": {"id": "id"}})
     * @Template()
     */
    public function indexAction($type, Flux $flux)
    {
        //*
        if ($type == 'user' && $this->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $userFlux = $this->getDoctrine()
                ->getRepository('NewsrssBundle:UserFlux')
                ->findOneBy(array('flux' => $flux->getId(), 'user' => $this->getUser()->getId()));
            $item_nb = $userFlux->getFluxNb();
        } else {
            $userFlux = new UserFlux();
        }
        $items = $this->getItems($flux, $userFlux->getFluxNb());

        return array('items' => $items, 'userFlux' => $userFlux, 'flux' => $flux);
    }

    /**
     * @Template("NewsrssBundle:Item:index.html.twig")
     */
    public function mostUsersAction()
    {
        $flux = $this->getDoctrine()->getRepository('NewsrssBundle:Flux')->mostUsers(1, [], false, true)[0];
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
            ->getRepository('NewsrssBundle:Item')
            ->findBy(array('flux_id' => $flux->getId()), array('date' => 'DESC'), $fluxNb);
    }
}
