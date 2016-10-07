<?php

namespace NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Filesystem\Filesystem;
use NewsrssBundle\Document\Item;
use NewsrssBundle\Entity\FluxHttp;
use Symfony\Component\Security\Acl\Exception\Exception;

class FeedReaderCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('newsrss:feed-reader')
            ->setDescription('Read feed')
            ->addOption(
                'all',
                null,
                InputOption::VALUE_NONE,
                'Parse ALL flux (include flux without user)'
            )
            ->addOption(
                'id',
                null,
                InputOption::VALUE_OPTIONAL,
                'ID flux'
            )
            ->addOption(
                'user',
                null,
                InputOption::VALUE_OPTIONAL,
                'ID uesr'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->em = $this->getContainer()->get('doctrine.orm.entity_manager');
        $this->dm = $this->getContainer()->get('doctrine.odm.mongodb.document_manager');
        $reader = $this->getContainer()->get('debril.reader');
        $itemRepository = $this->dm->getRepository('NewsrssBundle:Item');

        if ($input->getOption('all')) {
            $allFlux = $this->em->getRepository('NewsrssBundle:Flux')->findAll();
        } elseif ($fluxId = $input->getOption('id')) {
            $allFlux = $this->em->getRepository('NewsrssBundle:Flux')->findBy(['id' => $fluxId]);
        } elseif ($userId = $input->getOption('user')) {
            $allFlux = $this->em->getRepository('NewsrssBundle:Flux')->findWithUser($userId);
        } else {
            $allFlux = $this->em->getRepository('NewsrssBundle:Flux')->findWithUser();
        }

        foreach ($allFlux as $flux) {
            $output->writeln($flux->getUrl());
            try {
                $feed = $reader->getFeedContent($flux->getUrl()/*, $flux->getHttp()->getUpdatedSucces()*/);
            } catch (\Exception $e) {
                $output->writeln('ERROR :' . $e->getMessage());
                continue;
            }
            if (!$flux->getHttp()) {
                $flux->setHttp(new FluxHttp());
            }
            $flux->getHttp()->setUpdatedSucces(new \DateTime());
            $this->em->flush();

            foreach ($feed->getItems() as $itemRss) {
                $item = new Item();
                $category = $image = null;
                if (count($itemRss->getCategories())) {
                    $category = current($itemRss->getCategories())->getName();
                }
                if (count($itemRss->getMedias())) {
                    foreach ($itemRss->getMedias() as $media) {
                        if (substr($media->getType(), 0, 5) == 'image') {
                            $image = $media->geturl();
                        }
                    }
                }
                $item
                    ->setTitle($this->cleanString($itemRss->getTitle()))
                    ->setDescription($this->cleanString($itemRss->getDescription()))
                    ->setCategory($category)
                    ->setUrl($itemRss->getLink())
                    ->setDate($itemRss->getUpdated())
                    ->setImage($image)
                    ->setFluxId($flux->getId());
                $itemRepository->upsert($item, $itemRss->getUpdated());
            }

        }

    }

    private function cleanString($s)
    {
        $s = strip_tags($s);
        $s = trim(preg_replace(['/(\r\n|\n|\r)/', '/\s+/'], ' ', $s));
        return html_entity_decode($s, ENT_QUOTES | ENT_HTML5);
    }


}
