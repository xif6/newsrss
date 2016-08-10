<?php

namespace NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use NewsrssBundle\Entity;
use NewsrssBundle\Document;

class DefaultController extends Controller
{
    /**
     * @Route("/time/{time}")
     */
    public function timeAction($time)
    {
        return $this->render('NewsrssBundle:Default:hello.html.twig', array('name' => 'time'));
    }

    public function indexAction($_locale)
    {
//        var_dump($_locale);
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
        $pfd = $this->get('newsrss.parser.french_date_time');
        $pfr = $this->get('newsrss.parser.rss');
        $c = $pfr->parse($xml);
//        var_dump('-----------', $c, '-----------', $c->items);
        $date = $pfd->parse($dateRaw);
//*/
        //$date = new \NewsrssBundle\Service\DateTime($dateRaw);
//        var_dump($date->format('c'));
        $name = 'bienvenue';
        $name = 'Jane &#140; &#146; &#128; &#169; Œ &amp; &#039;Tarzan&#039;';

        return $this->render('NewsrssBundle:Default:index.html.twig', array('name' => $name));
    }

    public function helloAction(Request $request)
    {
//        $request->setLocale('fr_ZZPPPP');
        return $this->render('NewsrssBundle:Default:hello.html.twig', array('name' => 'rr'));
    }
}
