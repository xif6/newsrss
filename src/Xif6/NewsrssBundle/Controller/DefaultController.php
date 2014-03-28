<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('Xif6NewsrssBundle:Default:index.html.twig', array('name' => 'bienvenue'));
    }

    public function helloAction($name)
    {
        return $this->render('Xif6NewsrssBundle:Default:hello.html.twig', array('name' => $name));
    }
}
