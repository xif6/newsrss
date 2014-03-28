<?php
namespace Xif6\NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class GenerateFluxSlugCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('newsrss:generate:flux:slug')
            ->setDescription('Generate slug from flux');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $text = '';
        $doctrine = $this->getContainer()->get('doctrine');
        $progress = $this->getHelperSet()->get('progress');

        $this->em = $doctrine->getManager();
        $fluxAll = $doctrine->getRepository('Xif6NewsrssBundle:Flux')->findAll();
        $progress->start($output, count($fluxAll));
        $progress->setRedrawFrequency(10);
        foreach ($fluxAll as $flux) {
            $flux->setSlug(null);
            $this->em->persist($flux);
            $progress->advance();
        }
        $this->em->flush();

        $output->writeln($text);
    }
}
