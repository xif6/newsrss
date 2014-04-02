<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Xif6\NewsrssBundle\Entity;
use Xif6\NewsrssBundle\Document;

class DefaultController extends Controller
{
    public function indexAction()
    {
        $this->em = $this->getDoctrine()->getManager();
//        $fluxAll = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->findAll();
        $fluxAll = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->createQueryBuilder('f')->where(
            'slug LIKE :slug'
        )->setParameter('slug', 'dddd%')->getQuery()->execute();
        var_dump(count($fluxAll));
        foreach ($fluxAll as $flux) {
            $flux->setSlug(null);
            $this->em->persist($flux);
            $this->em->flush();
            break;
        }

        return $this->render('Xif6NewsrssBundle:Default:index.html.twig', array('name' => 'bienvenue'));
    }

    public function helloAction($name)
    {

        $this->em = $this->getDoctrine()->getManager();
        $this->dm = $this->get('doctrine_mongodb')->getManager();
        //*
        $flux = new Entity\Flux();
        $flux->setName('testi é lol .ff.' . time());
        $flux->setUrl('http://google.fr/' . time());


        $this->em->persist($flux);
        $this->em->flush();
        $name = $flux->getSlug();
        //*/

        /*
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(1);
        $flux->setDescription($name);
        $this->em->flush();
        //*/

        /*
        $item = new Document\Item();
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(1);
        $item->setTitle('test title dd');
        $item->setUrl('ddd'.time());
$item->setFlux($flux);
$item->setItemDate(time()-rand(10000000, 50000000));
        $this->dm->persist($item);
        $this->dm->flush();
        $name = $name . ' ' . $item->getId();
        $id = $item->getId();
        $this->dm->clear();
        $this->em->clear();
//*/
        /*
                        $id = '532cc0c4a35440c2048b4591';
                        $item = $this->get('doctrine_mongodb')->getRepository('Xif6NewsrssBundle:Item')->find($id);
        var_dump($item->getFlux()->getUrl());
        var_dump($item, '============================');
                        $this->dm->clear();
                        $this->em->clear();
                //*/
        /*
                $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(1);
var_dump($flux->getItems());
foreach($flux->getItems() as $a) {
    var_dump('------------', $a);
}
    //*/

        //*/
        /*
        $item = $this->get('doctrine_mongodb')->getRepository('Xif6NewsrssBundle:Item')->find('532c8adda35440c2048b456d');
        $flux = new Entity\Flux();
        $flux->setUrl('http://google.fr/'.time());
        $flux->addItem($item);
        $this->em->persist($flux);
        $this->em->flush();
        $this->dm->persist($item);
        $this->dm->flush();
        //*/


        return $this->render('Xif6NewsrssBundle:Default:hello.html.twig', array('name' => $name));
    }
}
