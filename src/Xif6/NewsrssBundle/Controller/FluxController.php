<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Xif6\NewsrssBundle\Entity\Flux;

class FluxController extends Controller
{
    /**
     * @Template()
     * @ParamConverter("flux", class="Xif6NewsrssBundle:Flux", options={"mapping": {"id": "id", "display": "display"}})
     */
    public function indexAction(Flux $flux)
    {
        /*
        $flux = $this->getDoctrine()
                    ->getrepository('Xif6NewsrssBundle:Flux')
                    ->findOneBy(array('id' => $id, 'display' => true));
         */
        var_dump($flux->getSite());

        return array('flux' => $flux);
    }
}
