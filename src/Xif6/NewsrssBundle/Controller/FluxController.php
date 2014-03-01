<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class FluxController extends Controller
{
    public function indexAction($id)
    {
        return $this->render('Xif6NewsrssBundle:Flux:index.html.twig', array('name' => 'flux'));
    }
}
