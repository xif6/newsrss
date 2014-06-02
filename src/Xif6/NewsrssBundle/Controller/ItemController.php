<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Xif6\NewsrssBundle\Entity\Flux;
use Xif6\NewsrssBundle\Entity\UserFlux;

class ItemController extends Controller
{
    /**
     * @Template()
     */
    public function indexAction($id, $type)
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
