<?php

namespace NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;
use NewsrssBundle\Document\Item;

class FeedReaderCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('newsrss:feed-reader')
            ->setDescription('Read feed');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $reader = $this->getContainer()->get('debril.reader');
        $itemRepository = $this->dm->getRepository('NewsrssBundle:Item');

        $url = 'http://www.clubic.com/articles.rss';
        $url = 'http://www.nextinpact.com/rss/news.xml';
        $feed = $reader->getFeedContent($url);
        var_dump($feed->getItems()[0]);
        die();

        //$all = $this->em->getRepository('NewsrssBundle:Flux')->findBy(['id' => 686], null/*, 500*/);
        $allFlux = $this->em->getRepository('NewsrssBundle:Flux')->findAll();

        foreach ($allFlux as $flux) {
            $feed = $reader->getFeedContent($flux->getUrl());

            foreach ($feed->getItems() as $itemRss) {
                $item = new Item();
                $item
                    ->setTitle($itemRss->title)
                    ->setDescription($itemRss->description)
                    ->setCategory($itemRss->category)
                    ->setUrl($itemRss->link)
                    ->setDate($itemRss->date)
                    ->setImage($itemRss->image)
                    ->setFluxId($flux->getId());
                $itemRepository->upsert($item, $flux->head->date);
            }

        }

        $feed = $reader->getFeedContent($url);
        var_dump($feed->getItems()[0]);
    }


}
