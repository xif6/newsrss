<?php
namespace Xif6\NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Xif6\NewsrssBundle\Entity;
use Symfony\Component\Validator\Constraints\Url;

class ImportDataCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('newsrss:import:data')
            ->setDescription('Import data from old database');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $text = '';
        $this->doctrine = $this->getContainer()->get('doctrine');
        $progress = $this->getHelperSet()->get('progress');

        $this->em = $this->doctrine->getManager();
        $this->conn = $this->em->getConnection();

        $this->conn->executeQuery('SET foreign_key_checks = 0');
//        $this->conn->executeQuery('TRUNCATE `category`');
//        $this->conn->executeQuery('TRUNCATE `flux`');
//        $this->conn->executeQuery('TRUNCATE `flux_category`');
//        $this->conn->executeQuery('TRUNCATE `flux_http`');
//        $this->conn->executeQuery('TRUNCATE `site`');
//        $this->conn->executeQuery('TRUNCATE `user`');
        $this->conn->executeQuery('TRUNCATE `user_flux`');
        $this->conn->executeQuery('SET foreign_key_checks = 1');

//        $this->ImportSite($input, $output);
//        $this->ImportFlux($input, $output);
//        $this->ImportFluxHttp($input, $output);
//        $this->ImportCategory($input, $output);
//        $this->ImportFluxCategory($input, $output);
//        $this->ImportUser($input, $output);
        $this->ImportUserFlux($input, $output);
        die();
        $fluxAll = $this->doctrine->getRepository('Xif6NewsrssBundle:Flux')->findAll();
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

    /**
     * Import site from old database
     */
    protected function ImportSite(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportSite');
        $sql = 'SELECT * FROM (
                    (SELECT
                        site AS name_and_url,
                        MIN(date_insert) AS created,
                        MAX(date_insert) AS updated
                    FROM newsrss.news
                    GROUP BY site
                    ORDER BY idnews)
                UNION
                    (SELECT
                        site AS name_and_url,
                        MIN(date_insert) AS created,
                        MAX(date_insert) AS updated
                    FROM newsrss.news_perso
                    WHERE site != ""
                    GROUP BY site
                    ORDER BY idnews)) tmp
                GROUP BY name_and_url';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount());

        while ($news = $statement->fetch()) {
            $site = new Entity\Site();
            $news['name_and_url'] = preg_replace('%/$%', '', $news['name_and_url']);

            $site->setName($news['name_and_url'])
                ->setUrl('http://' . $news['name_and_url'])
                ->setCreated(new \DateTime($news['created']))
                ->setUpdated(new \DateTime($news['updated']));
            $this->em->persist($site);
            $progress->advance();
        }
        $this->em->flush();
        $output->writeln('');
    }

    /**
     * Import flux from old database
     */
    protected function ImportFlux(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportFlux');
        $sql = 'SELECT
                    idnews AS id,
                    nom AS name,
                    site AS site,
                    url AS url,
                    `desc` AS description,
                    date_insert AS created,
                    `date` AS updated
                FROM newsrss.news
                UNION
                SELECT
                    null AS id,
                    nom AS name,
                    site AS site,
                    url AS url,
                    `desc` AS description,
                    date_insert AS created,
                    `date` AS updated
                FROM newsrss.news_perso';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount());
        $progress->setRedrawFrequency(10);

        while ($news = $statement->fetch()) {
            if (!preg_match('%^http%', $news['url'])) {
                $news['url'] = 'http://' . $news['url'];
            }
            $urlConstraint = new Url();
            $errorList = $this->getContainer()->get('validator')->validateValue($news['url'], $urlConstraint);
            if (count($errorList) != 0) {
                $progress->advance();
                continue;
            }

            $flux = new Entity\Flux();

            $flux->setName(utf8_decode($news['name']))
                ->setUrl($news['url'])
                ->setDescription(utf8_decode($news['description']))
                ->setCreated(new \DateTime($news['created']))
                ->setUpdated(new \DateTime($news['updated']))
                ->setDisplay(true);

            $news['site'] = preg_replace('%/$%', '', $news['site']);
            if (!empty($news['site'])) {
                $site = $this->em->getRepository('Xif6NewsrssBundle:Site')->findOneByUrl($news['site']);
                $flux->setSite($site);
            }

            if ($news['id']) {
                $flux->setId($news['id']);
                // deactivate GeneratedValue AUTO
                $metadata = $this->em->getClassMetaData(get_class($flux));
                $metadata->setIdGeneratorType(\Doctrine\ORM\Mapping\ClassMetadata::GENERATOR_TYPE_NONE);
            }

            $this->em->persist($flux);

            $progress->advance();
        }

        $this->em->flush();
        $output->writeln('');
    }

    /**
     * Import fluxhttp from old database
     */
    protected function ImportFluxHttp(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportFluxHttp');
        $sql = 'SELECT
                    idnews AS id,
                    statut AS status_code,
                    url_redirection AS url_redirection,
                    url AS url,
                    statut_init AS status_code_orig,
                    code_reponse AS status_code_response,
                    erreur AS error,
                    `If-None-Match` AS if_none_match,
                    `If-Modified-Since` AS if_modified_since,
                    date_insert AS created,
                    `date` AS updated
                FROM newsrss.news
                UNION
                SELECT
                    null AS id,
                    statut AS status_code,
                    url_redirection AS url_redirection,
                    url AS url,
                    statut_init AS status_code_orig,
                    code_reponse AS status_code_response,
                    erreur AS error,
                    `If-None-Match` AS if_none_match,
                    `If-Modified-Since` AS if_modified_since,
                    date_insert AS created,
                    `date` AS updated
                FROM newsrss.news_perso';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount());
        $progress->setRedrawFrequency(10);

        while ($news = $statement->fetch()) {
            if (!preg_match('%^http%', $news['url'])) {
                $news['url'] = 'http://' . $news['url'];
            }
            $urlConstraint = new Url();
            $errorList = $this->getContainer()->get('validator')->validateValue($news['url'], $urlConstraint);
            if (count($errorList) != 0) {
                $progress->advance();
                continue;
            }
            $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->findOneByUrl($news['url']);

            $fluxHttp = new Entity\FluxHttp();

            $fluxHttp->setId($flux)
                ->setStatusCode($news['status_code'])
                ->setUrlRedirection(utf8_decode($news['url_redirection']))
                ->setStatusCodeOrig($news['status_code_orig'])
                ->setStatusCodeResponse(utf8_decode($news['status_code_response']))
                ->setError(utf8_decode($news['error']))
                ->setIfNoneMatch(utf8_decode($news['if_none_match']))
                ->setIfModifiedSince(utf8_decode($news['if_modified_since']))
                ->setCreated(new \DateTime($news['created']))
                ->setUpdated(new \DateTime($news['updated']));

            $this->em->persist($fluxHttp);

            $progress->advance();
        }

        $this->em->flush();
        $output->writeln('');
    }

    /**
     * Import category from old database
     */
    protected function ImportCategory(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportCategory');
        $sql = 'SELECT
                    idrub AS id,
                    idrub1 AS parent_id,
                    rub AS name
                FROM newsrss.rubrique';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount() * 2);
        $rubs = $statement->fetchAll();

        foreach ($rubs as $rub) {
            $category = new Entity\Category();

            $category->setId($rub['id'])
                ->setName($rub['name']);

            $metadata = $this->em->getClassMetaData(get_class($category));
            $metadata->setIdGeneratorType(\Doctrine\ORM\Mapping\ClassMetadata::GENERATOR_TYPE_NONE);

            $this->em->persist($category);

            $progress->advance();
        }
        $this->em->flush();


        foreach ($rubs as $rub) {
            if ($rub['parent_id']) {
                $category = $this->em->getRepository('Xif6NewsrssBundle:Category')->find($rub['id']);
                $parent = $this->em->getRepository('Xif6NewsrssBundle:Category')->find($rub['parent_id']);

                $category->setParent($parent);

                $this->em->persist($category);
            }

            $progress->advance();
        }

        $this->em->flush();
        $output->writeln('');
    }

    /**
     * Import fluxcategory from old database
     */
    protected function ImportFluxCategory(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportFluxCategory');
        $sql = 'SELECT
                    idnews AS flux_id,
                    idrub AS category_id
                FROM newsrss.news_rub';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount());
        $progress->setRedrawFrequency(10);

        while ($newsrub = $statement->fetch()) {
            $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->find($newsrub['flux_id']);
            $category = $this->em->getRepository('Xif6NewsrssBundle:Category')->find($newsrub['category_id']);
            if (!is_null($flux) && !is_null($category)) {

                $flux->addCategory($category);
                $this->em->persist($flux);
            }

            $progress->advance();
        }

        $this->em->flush();
        $output->writeln('');
    }

    /**
     * Import user from old database
     */
    protected function ImportUser(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportUser');
        $sql = 'SELECT
                    idlogin AS id,
                    log AS username,
                    pass AS password,
                    mail AS email,
                    verif AS enabled,
                    `date` AS created,
                    dernieremodif AS updated
                FROM newsrss.login';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount());
        $progress->setRedrawFrequency(10);

        while ($login = $statement->fetch()) {
            $user = new Entity\User();

            $user->setId($login['id'])
                ->setUsername(utf8_decode($login['username']))
                ->setPlainPassword(utf8_decode($login['password']))
                ->setEmail(utf8_decode($login['email']))
                ->setEnabled((bool)$login['enabled'])
                ->setCreated(new \DateTime($login['created']))
                ->setUpdated(new \DateTime($login['updated']));

            // deactivate GeneratedValue AUTO
            $metadata = $this->em->getClassMetaData(get_class($user));
            $metadata->setIdGeneratorType(\Doctrine\ORM\Mapping\ClassMetadata::GENERATOR_TYPE_NONE);

            $this->em->persist($user);
            $progress->advance();
        }

        $this->em->flush();

        $command = $this->getApplication()->find('fos:user:promote');
        $arguments = array(
            'command' => 'fos:user:promote',
            'username' => 'xif6',
            '--super' => true,
        );
        $inputFos = new ArrayInput($arguments);
        $command->run($inputFos, $output);

        $output->writeln('');
    }

    /**
     * Import userflux from old database
     */
    public function ImportUserFlux(InputInterface $input, OutputInterface $output)
    {
        $output->writeln('START ImportUserFlux');
        $sql = 'SELECT
                    idlogin AS user_id,
                    idnews AS flux_id,
                    `date` AS display_date,
                    category AS display_category,
                    `desc` AS display_description,
                    nb AS flux_nb,
                    rang AS rank_nb,
                    col AS rank_col,
                    color AS style
                FROM newsrss.log_news
                ORDER BY user_id, rank_nb, rank_col';

        $progress = $this->getHelperSet()->get('progress');
        $statement = $this->conn->executeQuery($sql);
        $progress->start($output, $statement->rowCount());
        $progress->setRedrawFrequency(10);

        $rank = array();

        while ($lognews = $statement->fetch()) {
            $user = $this->em->getRepository('Xif6NewsrssBundle:User')->find($lognews['user_id']);
            $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->find($lognews['flux_id']);

            if ($user && $flux) {
                if (!isset($rank[$lognews['user_id']])) {
                    $rank[$lognews['user_id']] = 0;
                }

                $userFlux = new Entity\UserFlux();

                $userFlux->setUser($user)
                    ->setFlux($flux)
                    ->setDisplayDate($lognews['display_date'] == 'oui')
                    ->setDisplayCategory($lognews['display_category'] == 'oui')
                    ->setDisplayDescription($lognews['display_description'] == 'oui')
                    ->setFluxNb($lognews['flux_nb'])
                    ->setStyle(substr($lognews['style'], 0, -4))
                    ->setRank(++$rank[$lognews['user_id']]);

                $this->em->persist($userFlux);
            }
            $progress->advance();
        }
        $this->em->flush();
        $output->writeln('');
    }
}
