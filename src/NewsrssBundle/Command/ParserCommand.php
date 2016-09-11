<?php

namespace NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use NewsrssBundle\Document\Item;

class ParserCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('newsrss:parser')
            ->setDescription('Parse all rss flux');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $this->dm = $this->getContainer()->get('doctrine.odm.mongodb.document_manager');
        $this->itemRepository = $this->dm->getRepository('NewsrssBundle:Item');
        $parser = $this->getContainer()->get('newsrss.parser.rss');
        $directory = $this->getContainer()->getParameter('newsrss.crawler.flux.xml_dir');
        $fs = new Filesystem();

        $finder = new Finder();
        $finder->files()->name('*.xml')->depth(1)->size('> 0k')->sortByModifiedTime()->in($directory);
        //$finder->files()->name('686.xml')->depth(1)->size('> 0k')->sortByModifiedTime()->in($directory);
        //$finder->files()->name('1.xml')->depth(1)->size('> 0k')->sortByModifiedTime()->in($directory);
        //$finder->files()->name('rss.xml')->depth(1)->size('> 0k')->sortByModifiedTime()->in('/tmp/');

        foreach ($finder as $fileInfo) {
            $output->writeln($fileInfo->getRealpath());
            if ($fileInfo->isFile() && $fileInfo->isReadable() && $fileInfo->getSize()) {
                $file = $fileInfo->openFile('r');
                if (!$file->flock(LOCK_EX | LOCK_NB)) {
                    continue;
                }
                $file->setFlags(\SplFileObject::READ_AHEAD | \SplFileObject::SKIP_EMPTY);
                $s = '';
                foreach ($file as $line) {
                    $s .= $line;
                }
                $a = $parser->parse($s);
                if ($a) {
                    $this->saveItems($a, $this->getFluxId($fileInfo->getFilename()));
                } else {
                    $output->writeln('ERROR PARSE REQUIRE');
                }
                $fs->remove($fileInfo->getRealpath());
                $file->flock(LOCK_UN);
                unset($file);
            }
        }
    }

    protected function saveItems($flux, $fluxId)
    {
        foreach ($flux->items as $itemRss) {
            $item = new Item();
            $item
                ->setTitle($itemRss->title)
                ->setDescription($itemRss->description)
                ->setCategory($itemRss->category)
                ->setUrl($itemRss->link)
                ->setDate($itemRss->date)
                ->setImage($itemRss->image)
                ->setFluxId($fluxId);
            $this->itemRepository->upsert($item, $flux->head->date);
        }
    }

    protected function getFluxId($fileName)
    {
        return (int)str_replace('.xml', '', $fileName);
    }
}
