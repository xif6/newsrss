<?php

namespace NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;

class CrawlerCommand extends ContainerAwareCommand
{
    /**
     * @const
     */
    const LOCK_FILE_DIR = '/tmp/newsrss/lock_file_parser/';

    protected function configure()
    {
        $this
            ->setName('newsrss:crawler')
            ->setDescription('Crawl all rss flux');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $fs = new Filesystem();
        $fs->mkdir(self::LOCK_FILE_DIR);

        $options = $this->getContainer()->getParameter('newsrss.crawler.flux.options_request');
        $directory = $this->getContainer()->getParameter('newsrss.crawler.flux.xml_dir');

        $crawler = $this->getContainer()->get('newsrss.crawler.flux');

        //$all = $this->em->getRepository('NewsrssBundle:Flux')->findBy(['id' => 686], null/*, 500*/);
        $allFlux = $this->em->getRepository('NewsrssBundle:Flux')->findAll();

        foreach ($allFlux as $flux) {
            $lockFilePath = self::LOCK_FILE_DIR . ($flux->getId() % 100) . '/' . $flux->getId() . '.lock';
            $fs->mkdir(dirname($lockFilePath));
            $lockFile = new \SplFileObject($lockFilePath, 'w');
            $lock = $lockFile->flock(LOCK_EX | LOCK_NB);
            if (!$lock) {
                continue;
            }
            $fluxRequest = new \NewsrssBundle\Crawler\FluxRequest($flux, $this->em);
            $fluxRequest->setDirectory($directory)
                ->getRequest()->setOptions($options);
            $crawler->add($fluxRequest);
            $crawler->send();

            $this->em->flush();
            $lockFile->flock(LOCK_UN);
        }
    }

}
