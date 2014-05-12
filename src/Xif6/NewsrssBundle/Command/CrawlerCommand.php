<?php

namespace Xif6\NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;

class CrawlerCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('newsrss:crawler')
            ->setDescription('Crawl all rss flux');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->em = $this->getContainer()->get('doctrine.orm.entity_manager');


        $urls = [ //*
            //'http://www.google.fr',
            //'http://www.google.com',
            //'http://127.0.0.1:8081/app_dev.php/time/10',
            //'http://www.notexist.think', //*/
            //'http://yahoo.com',
            'http://com.clubic.feedsportal.com/c/33464/f/581979/index.rss',
            //'http://feeds.feedburner.com/Revioo',
            //'http://www.newsrss.net/ddd',
            //'http://127.0.0.1:8081/app_dev.php/time/5',
        ];
        $this->http2($urls);
        return;
        $this->peclHttp2($urls);
        $this->peclHttp1($urls);


        $flux1 = $this->em->getRepository('Xif6NewsrssBundle:Flux')->find(1);
        //$httpClient = new \http\client();
        $httpRequestPool = new \HttpRequestPool();
        $a = [];
        foreach ($urls as $url) {
            //$httpRequest = new \http\Client\FluxCrawler('GET', $url);
            $httpRequest = new \HttpRequest($url);
            $httpRequest->setOptions(
                [
                    'compress' => true,
                    'redirect' => 10,
                ]
            );
            //$flux = clone $flux1;
            //$flux->setUrl($url);
            $a[] = $httpRequest;
            $httpRequestPool->attach($httpRequest);
        };
        try {
            $httpRequestPool->send();
        } catch (\Exception $e) {
        }
        var_dump(count($httpRequestPool->getFinishedRequests()));
        //$httpClient->send();
    }

    protected function http2($allFlux)
    {
        /*
        $fluxRequest = new \Xif6\NewsrssBundle\Crawler\FluxCrawler([
            'compress' => true,
            'redirect' => 10,
            'postredir' => \http\Client\Curl\POSTREDIR_ALL,
        ]);
        //*/
        $fluxRequest = $this->getContainer()->get('xif6.newsrss.crawler.flux');

        $allFlux = array($this->em->getRepository('Xif6NewsrssBundle:Flux')->find(1));
        foreach ($allFlux as $flux) {
            $fluxRequest->add($flux);
        }
        $fluxRequest->send();
        $this->em->flush();
        $this->em->clear();
    }


    protected function peclHttp2($urls)
    {
        $httpClient = new \http\client();
        foreach ($urls as $url) {
            $httpRequest = new \http\Client\Request('GET', $url);
            $httpRequest->setOptions(
                [
                    'compress' => true,
                    'redirect' => 10,
                    'postredir' => \http\Client\Curl\POSTREDIR_ALL,
                ]
            );
            $httpClient->enqueue(
                $httpRequest,
                function ($res) {
                    printf(
                        "%s returned %d %s\n",
                        $res->getTransferInfo('effective_url'),
                        $res->getResponseCode(),
                        $res->getType()
                    );
                    return true;
                }
            );
        };
        var_dump(count($httpClient));
        //*
        while ($httpClient->once()) {
            //$httpClient->wait();
        }
        var_dump(count($httpClient));
        //*/
        return;
        try {
            $httpClient->send();
        } catch (\Exception $e) {
            var_dump($e->getMessage());
        }
        var_dump(count($httpClient));


        while ($res = $httpClient->getResponse()) {
            if ($res->getType() == \http\Message::TYPE_RESPONSE) {
                printf(
                    "%s returned %d %s\n",
                    $res->getTransferInfo('effective_url'),
                    $res->getResponseCode(),
                    $res->getType()
                );
            } else {
                var_dump($res->getTransferInfo('error'));
            }
            //$httpClient->dequeue($res->getParentMessage());
        }
        $httpClient->reset();
        var_dump(count($httpClient));
    }

    protected function peclHttp1($urls)
    {
        $httpRequestPool = new \HttpRequestPool();
        foreach ($urls as $url) {
            $httpRequest = new \HttpRequest($url);
            $httpRequest->setOptions(
                [
                    'compress' => true,
                    'redirect' => 10,
                ]
            );
            $httpRequestPool->attach($httpRequest);
        };
        try {
            $httpRequestPool->send();
        } catch (\Exception $e) {
        }
        var_dump(count($httpRequestPool->getFinishedRequests()));
    }

}
