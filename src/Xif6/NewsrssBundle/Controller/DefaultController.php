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
    /**
     * @Route("/time/{time}")
     */
    public function timeAction($time)
    {
        sleep($time);
        return $this->render('Xif6NewsrssBundle:Default:hello.html.twig', array('name' => 'time'));
    }

    public function indexAction($_locale)
    {
        var_dump($_locale);
        /*
        $dateRaw = 'mar 22 avr 2014';
        $xml = '<?xml version="1.0" encoding="utf-8"?>
<feed ns="http://www.w3.org/2005/Atom">

 <title>Fil dexemple</title>
 <subtitle>Un titre secondaire.</subtitle>
 <link href="http://example.org/"/>
 <updated>2010-05-13T18:30:02Z</updated>
 <author>
   <name>Paul Martin</name>
   <email>paulmartin@example.com</email>
 </author>
 <id>urn:uuid:60a76c80-d399-11d9-b91C-0003939e0af6</id>

 <entry>
   <title>Des robots propulsés par Atom deviennent fous</title>
   <link href="http://example.org/2003/12/13/atom03"/>
   <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id>
   <updated>2010-04-01T18:30:02Z</updated>
   <summary>Poisson davril !</summary>
 </entry>

</feed>';
//*
        $xml = '<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" >
    <channel>
        <title>Mon site</title>
        <description>Ceci est un exemple de flux RSS 2.0</description>
        <lastBuildDate>mardi 22 avril 2014</lastBuildDate>
        <link>http://www.example.org</link>
        <item>
            <title>Actualité N°1</title>
            <description>Ceci est ma première actualité</description>
            <pubDate>Sat, 07 Sep 2002 00:00:01 GMT</pubDate>
            <dc:date>Sat, 07 Sep 2002 00:00:01 GMT</dc:date>
            <link>http://www.example.org/actu1</link>
        </item>
        <item>
            <title>Actualité N°2</title>
            <description>Ceci est ma seconde actualité</description>
            <pubDate>Sat, 07 Sep 2012 00:00:01 GMT</pubDate>
            <link>://www.example.org/actu2</link>
        </item>
        <item>
            <title>Actualité N°3</title>
            <description>Ceci est ma troisième actualité</description>
            <pubDate>Sat, 07 Sep 2010 00:00:01 GMT</pubDate>
        </item>
    </channel>
</rss>';
//* /
        $pfd = $this->get('xif6_newsrss.parser.french_date_time');
        $pfr = $this->get('xif6_newsrss.parser.rss');
        $c = $pfr->parse($xml);
//        var_dump('-----------', $c, '-----------', $c->items);
        $date = $pfd->parse($dateRaw);
//*/
        //$date = new \Xif6\NewsrssBundle\Service\DateTime($dateRaw);
//        var_dump($date->format('c'));
        $name = 'bienvenue';
        $name = 'Jane &#140; &#146; &#128; &#169; Œ &amp; &#039;Tarzan&#039;';

        return $this->render('Xif6NewsrssBundle:Default:index.html.twig', array('name' => $name));
    }

    public function helloAction($name)
    {
        $this->em = $this->getDoctrine()->getManager();
        $this->dm = $this->get('doctrine_mongodb')->getManager();

        /*
        $flux = $this->getDoctrine()->getRepository('Xif6NewsrssBundle:Flux')->find(2);
        var_dump($flux->getError());
        $flux->setError('toto5 ');
        $this->em->persist($flux);
        $this->em->flush();
        $this->em->clear();
        var_dump($flux->getError());
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
