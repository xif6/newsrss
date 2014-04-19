<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Xif6\NewsrssBundle\Entity;
use Xif6\NewsrssBundle\Document;

class DefaultController extends Controller
{
    public function indexAction()
    {

        return $this->render('Xif6NewsrssBundle:Default:index.html.twig', array('name' => 'bienvenue'));
    }

    public function helloAction($name)
    {
        $this->em = $this->getDoctrine()->getManager();
        $this->dm = $this->get('doctrine_mongodb')->getManager();

        /*
        $fluxHttp = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:FluxHttp')->find(2);
        var_dump($fluxHttp->getError());
        $fluxHttp->setError('toto5 ');
        $this->em->persist($fluxHttp);
        $this->em->flush();
        $this->em->clear();
        var_dump($fluxHttp->getError());
        //*/
        /*
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(5);
        $item = $this->get('doctrine_mongodb')->getRepository('Xif6NewsrssBundle:Item')->find(
            '532cbecca35440c2048b458d'
        );
        var_dump($item->getFluxId(), $item->getFlux()->getId(), '****');
        $item->setFlux($flux)->setCategory('cat ' . time());
        $this->dm->persist($item);
        $this->dm->flush();
        $this->dm->clear();
        var_dump($item->getFluxId(), $item->getFlux()->getId());
        //*/
        //*
        $a = array(
            'title' => 'test title dd',
            'url' => 'ddd' . time(),
            'date' => time() - rand(10000000, 50000000),
            'flux_id' => 5,
        );

        /*
        $result = $this->get('doctrine_mongodb')
            ->getRepository('Xif6NewsrssBundle:Item')
            ->createQueryBuilder();

        $result->update()
            ->field('title')->set($a['title'])
            ->field('url')->set($a['url'])
            ->field('date')->set($a['date'])
            ->field('flux_id')->set($a['flux_id'])
            ->addAnd(
                $result->expr()->field('flux_id')->equals($a['flux_id'])
                    ->addOr($result->expr()->field('title')->equals($a['title']))
                    ->addOr($result->expr()->field('url')->equals($a['url']))
            )
            ->upsert(true)
            ->getQuery()
            ->execute();
        //*/
        //var_dump($result);
        /*
                $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find($a['flux_id']);

                $item = new Document\Item();
                $item->setTitle($a['title']);
                $item->setUrl($a['url']);
                $item->setDate($a['date']);
                $item->setFlux($flux);
                $this->dm->persist($item);
                $this->dm->flush();
                $this->dm->clear();
                /*
                //*
                $flux = new Entity\Flux();
                $flux->setName('testi é lol .ff.' . time());
                $flux->setUrl('http://google.fr/' . time());


                $this->em->persist($flux);
                $this->em->flush();
                $name = $flux->getSlug();
                //*/
        //*/

        /*
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(1);
        $flux->setDescription($name);
        $this->em->flush();
        //*/

        //*
        $a = time();
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(8);
        /*
        $item = new Document\Item();
        $item->setTitle('test title ddvvvvvvv'.$a);
        $item->setUrl('ddd'.microtime());
        $item->setFlux($flux);
        $item->setDate(time()-rand(10000000, 50000000));
        $this->get('doctrine_mongodb')->getRepository('Xif6NewsrssBundle:Item')->upsert($item);die();
        //*/
        $itemRepository = $this->get('doctrine_mongodb')->getRepository('Xif6NewsrssBundle:Item');
        for ($i = 1; $i <= 10; $i++) {
            $item = new Document\Item();
            $item->setTitle('test title ddvvvvvvv' . $a);
            $item->setUrl('ddd' . microtime());
            $item->setFlux($flux);
            $item->setDate(time() - rand(10000000, 50000000));
            $itemRepository->upsert($item);
        }

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
