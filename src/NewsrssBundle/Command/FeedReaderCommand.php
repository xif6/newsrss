<?php

namespace NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;

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
        $reader = $this->getContainer()->get('debril.reader');

        $url = 'http://www.clubic.com/articles.rss';
        $url = 'http://www.nextinpact.com/rss/news.xml';

        $feed = $reader->getFeedContent($url);
        var_dump($feed->getItems()[0]);
    }

}
