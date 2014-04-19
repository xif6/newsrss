<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Xif6\NewsrssBundle\Entity\Flux;
use Xif6\NewsrssBundle\Entity\UserFlux;

class FluxController extends Controller
{
    /**
     * @ParamConverter("flux", class="Xif6NewsrssBundle:Flux", options={"mapping": {"id": "id", "display": "display"}})
     * @Template()
     */
    public function indexAction(Flux $flux)
    {
        /*
        $flux = $this->getDoctrine()
                    ->getrepository('Xif6NewsrssBundle:Flux')
                    ->findOneBy(array('id' => $id, 'display' => true));
         */

        return array('flux' => $flux);
    }

    /**
     * @Template()
     */
    public function itemsAction($id, $type)
    {
        //*
        if ($type == 'user' && $this->get('security.context')->isGranted('IS_AUTHENTICATED_FULLY')) {
            $userFlux = $this->getDoctrine()
                ->getrepository('Xif6NewsrssBundle:UserFlux')
                ->findOneBy(array('flux' => $id, 'user' => $this->getUser()->getId()));
            $item_nb = $userFlux->getFluxNb();
        } else {
            $userFlux = new UserFlux();
        }
        //*/
        $items = $this->get('doctrine_mongodb')
            ->getrepository('Xif6NewsrssBundle:Item')
            ->findBy(array('flux_id' => (int)$id), array('date' => 'DESC'), $userFlux->getFluxNb());
        //*/

        return array('items' => $items, 'userFlux' => $userFlux);
    }
}
