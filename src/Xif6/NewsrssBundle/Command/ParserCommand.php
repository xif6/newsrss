<?php

namespace Xif6\NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Xif6\NewsrssBundle\Crawler\FluxCrawler;

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
        $parser = $this->getContainer()->get('xif6_newsrss.parser.rss');
        $directory = $this->getDirectory();
        /*
        $files = [];
        $cmd = 'ls -tr ' . escapeshellcmd($directory) . '*.xml';
        passthru($cmd, $files);

        //*
        foreach ($files as $file) {
            $fp = fopen($file, 'r');
            if(flock($fp, LOCK_EX | LOCK_NB)) {
                var_dump('OK');
                unlink($file);
                flock($fp, LOCK_UN);
                fclose($fp);
            }
        }
        //*/

        $it = new \FilesystemIterator($directory);
        foreach ($it as $path => $fileInfo) {
            if ($fileInfo->isFile() && $fileInfo->isReadable()) {
                $file = $fileInfo->openFile('r');
                if (!$file->flock(LOCK_EX | LOCK_NB)) {
                    continue;
                }
                $file->setFlags(\SplFileObject::READ_AHEAD | \SplFileObject::SKIP_EMPTY);
                $s = '';
                foreach ($file as $line) {
                    $s .= $line;
                }
                var_dump($parser->parse($s));
                //unlink($path);
                $file->flock(LOCK_UN);
                unset($file);
                var_dump($path, $fileInfo);
            }
        }

        /*
        if ($dh = opendir($directory)) {
            while (($file = readdir($dh)) !== false) {
                var_dump($file);
    //sleep(10);
            }
        }
        //*/


    }

    protected
    function getDirectory()
    {
        $directory = $this->getContainer()->getParameter('xif6.newsrss.crawler.flux.xml_dir');
        $dir = realpath($directory);
        if ($dir === false) {
            throw new \RuntimeException('Directory does not exist : "' . $directory . '"');
        } elseif (!is_dir($dir)) {
            throw new \RuntimeException('Path is not a directory : "' . $directory . '"');
        }
        return $dir . '/';
    }
}
