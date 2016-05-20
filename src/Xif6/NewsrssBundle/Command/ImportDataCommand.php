<?php
namespace Xif6\NewsrssBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\ArrayInput;
use Xif6\NewsrssBundle\Entity;
use Symfony\Component\Validator\Constraints\Url;

class ImportDataCommand extends ContainerAwareCommand
{
    /**
     * @var InputInterface
     */
    protected $input;

    /**
     * @var OutputInterface
     */
    protected $output;

    /**
     * @var \Doctrine\Bundle\DoctrineBundle\Registry
     */
    protected $doctrine;

    /**
     * @var \Doctrine\ORM\EntityManager
     */
    protected $em;

    /**
     * @var \Doctrine\DBAL\Connection
     */
    protected $conn;

    /**
     * @var \Symfony\Component\Console\Helper\ProgressHelper
     */
    protected $progress;


    protected function configure()
    {
        $this
            ->setName('newsrss:import:data')
            ->setDescription('Import data from old database')
            ->addArgument(
                'table',
                InputArgument::OPTIONAL | InputArgument::IS_ARRAY,
                'List of tables to import IF NOT all tables'
            )
            ->addOption(
                'reverse',
                null,
                InputOption::VALUE_NONE,
                'If defined inverse behavior table'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $text = '';
        $this->input = $input;
        $this->output = $output;
        $this->doctrine = $this->getContainer()->get('doctrine');
        $this->progress = $this->getHelperSet()->get('progress');

        $this->em = $this->doctrine->getManager();
        $this->conn = $this->em->getConnection();
        $this->connOld = $this->getContainer()->get('doctrine.dbal.old_connection');
        $this->removeTimestampableListener();


        $this->conn->executeQuery('SET foreign_key_checks = 0');
        if ($this->isRun('category')) {
            $this->conn->executeQuery('TRUNCATE `category`');
        }
        if ($this->isRun('flux')) {
            $this->conn->executeQuery('TRUNCATE `flux`');
        }
        if ($this->isRun('flux_category')) {
            $this->conn->executeQuery('TRUNCATE `flux_category`');
        }
        if ($this->isRun('flux_http')) {
            $this->conn->executeQuery('TRUNCATE `flux_http`');
        }
        if ($this->isRun('site')) {
            $this->conn->executeQuery('TRUNCATE `site`');
        }
        if ($this->isRun('user')) {
            $this->conn->executeQuery('TRUNCATE `user`');
        }
        if ($this->isRun('user_flux')) {
            $this->conn->executeQuery('TRUNCATE `user_flux`');
        }
        if ($this->isRun('search_user')) {
            $this->conn->executeQuery('TRUNCATE `search_user`');
        }
        $this->conn->executeQuery('SET foreign_key_checks = 1');


        if ($this->isRun('site')) {
            $this->ImportSite();
        }
        if ($this->isRun('flux')) {
            $this->ImportFlux();
        }
        if ($this->isRun('flux_http')) {
            $this->ImportFluxHttp();
        }
        if ($this->isRun('category')) {
            $this->ImportCategory();
        }
        if ($this->isRun('flux_category')) {
            $this->ImportFluxCategory();
        }
        if ($this->isRun('user')) {
            $this->ImportUser();
        }
        if ($this->isRun('user_flux')) {
            $this->ImportUserFlux();
        }
        if ($this->isRun('search_user')) {
            $this->ImportSearchUser();
        }

        $this->output->writeln(
            '<info>EXECUTION TIME : ' . number_format(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 2) . ' s</info>'
        );
    }

    protected function isRun($table)
    {
        if (!$this->input->getArgument('table')
            || (in_array($table, $this->input->getArgument('table')) && !$this->input->getOption('reverse'))
            || (!in_array($table, $this->input->getArgument('table')) && $this->input->getOption('reverse'))
        ) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * Import site from old database
     */
    protected function ImportSite()
    {
        $this->output->writeln('<info>START ImportSite</info>');
        $sql = 'SELECT * FROM (
                    (SELECT
                        site AS name_and_url,
                        MIN(date_insert) AS created,
                        MAX(date_insert) AS updated
                    FROM news
                    GROUP BY site
                    ORDER BY idnews)
                UNION
                    (SELECT
                        site AS name_and_url,
                        MIN(date_insert) AS created,
                        MAX(date_insert) AS updated
                    FROM news_perso
                    WHERE site != ""
                    GROUP BY site
                    ORDER BY idnews)) tmp
                GROUP BY name_and_url';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());

        while ($news = $statement->fetch()) {
            $site = new Entity\Site();
            $news['name_and_url'] = preg_replace('%/$%', '', $news['name_and_url']);

            $site->setName($news['name_and_url'])
                ->setUrl('http://' . $news['name_and_url'])
                ->setCreatedAt($this->toDateTime($news['created']))
                ->setUpdatedAt($this->toDateTime($news['updated']));
            $this->em->persist($site);
            $this->progress->advance();
        }
        $this->em->flush();
        $this->progress->finish();
    }

    /**
     * Import flux from old database
     */
    protected function ImportFlux()
    {
        $this->output->writeln('<info>START ImportFlux</info>');
        $sql = 'SELECT * FROM (
                    SELECT
                        idnews AS id,
                        nom AS name,
                        site AS site,
                        url AS url,
                        `desc` AS description,
                        date_insert AS created,
                        `date` AS updated,
                        false AS new
                    FROM news
                    UNION
                    SELECT
                        null AS id,
                        nom AS name,
                        site AS site,
                        url AS url,
                        `desc` AS description,
                        date_insert AS created,
                        `date` AS updated,
                        false AS new
                    FROM news_perso
                    UNION
                    SELECT
                        null AS id,
                        null AS name,
                        null AS site,
                        flux AS url,
                        null AS description,
                        MIN(`date`) AS created,
                        MAX(`date`) AS updated,
                        true AS new
                    FROM nouveau
                    GROUP BY flux) t
                GROUP BY url
                ORDER BY id DESC';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());

        $urls = array();
        $nbUrlNotExist = 0;

        while ($news = $statement->fetch()) {
            if (!preg_match('%^http%', $news['url'])) {
                $news['url'] = 'http://' . $news['url'];
            }
            $urlConstraint = new Url();
            $errorList = $this->getContainer()->get('validator')->validate($news['url'], $urlConstraint);

            if (count($errorList) != 0 || in_array($news['url'], $urls)) {
                $this->progress->advance();
                continue;
            }
            $urls[] = $news['url'];
            if ($news['new'] && !$this->urlExist($news['url'])) {
                $nbUrlNotExist++;
                $this->progress->advance();
                continue;
            }


            $flux = new Entity\Flux();

            $flux->setName($news['name'])
                ->setUrl($news['url'])
                ->setDescription($news['description'])
                ->setCreatedAt($this->toDateTime($news['created']))
                ->setUpdatedAt($this->toDateTime($news['updated']))
                ->setDisplay(false)
                ->setNew($news['new']);

            $news['site'] = preg_replace('%/$%', '', $news['site']);
            if (!empty($news['site'])) {
                $site = $this->em->getRepository('Xif6NewsrssBundle:Site')->findOneByName($news['site']);
                $flux->setSite($site);
            }

            if ($news['id']) {
                $flux->setId($news['id'])
                    ->setDisplay(true);
                $this->disabledAutoIncrement($flux);
            }

            $this->em->persist($flux);

            $this->progress->advance();
        }

        $this->em->flush();
        $this->progress->finish();
        $this->output->writeln('nbUrlNotExist : ' . $nbUrlNotExist);
        $this->output->writeln('');
    }

    /**
     * Import fluxhttp from old database
     */
    protected function ImportFluxHttp()
    {
        $this->output->writeln('<info>START ImportFluxHttp</info>');
        $sql = 'SELECT
                    idnews AS id,
                    statut AS status_code,
                    url_redirection AS url_redirection,
                    url AS url,
                    code_reponse AS status_code_response,
                    erreur AS error,
                    `If-None-Match` AS if_none_match,
                    `If-Modified-Since` AS if_modified_since,
                    date_insert AS created,
                    `date` AS updated
                FROM news
                UNION
                SELECT
                    null AS id,
                    statut AS status_code,
                    url_redirection AS url_redirection,
                    url AS url,
                    code_reponse AS status_code_response,
                    erreur AS error,
                    `If-None-Match` AS if_none_match,
                    `If-Modified-Since` AS if_modified_since,
                    date_insert AS created,
                    `date` AS updated
                FROM news_perso';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());
        $this->progress->setRedrawFrequency(10);

        while ($news = $statement->fetch()) {
            if (!preg_match('%^http%', $news['url'])) {
                $news['url'] = 'http://' . $news['url'];
            }
            $urlConstraint = new Url();
            $errorList = $this->getContainer()->get('validator')->validateValue($news['url'], $urlConstraint);
            if (count($errorList) != 0) {
                $this->progress->advance();
                continue;
            }
            $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->findOneByUrl($news['url']);

            $fluxHttp = new Entity\FluxHttp();

            $updateSuccess = null;
            if ($news['status_code'] == 200) {
                $updateSuccess = $this->toDateTime($news['updated']);
            }

            $ifModifiedSince = null;
            if ($news['if_modified_since']) {
                $ifModifiedSince = new \DateTime($news['if_modified_since']);
            }

            $fluxHttp->setFlux($flux)
                ->setResponseCode($news['status_code'])
                ->setUrlRedirection($news['url_redirection'])
                ->setResponseStatus($news['status_code_response'])
                ->setError($news['error'])
                ->setIfNoneMatch($news['if_none_match'])
                ->setIfModifiedSince($ifModifiedSince)
                ->setUpdatedSucces($updateSuccess)
                ->setCreatedAt($this->toDateTime($news['created']))
                ->setUpdatedAt($this->toDateTime($news['updated']));

            $this->em->persist($fluxHttp);

            $this->progress->advance();
        }

        $this->em->flush();
        $this->progress->finish();
    }

    /**
     * Import category from old database
     */
    protected function ImportCategory()
    {
        $this->output->writeln('<info>START ImportCategory</info>');
        $sql = 'SELECT
                    idrub AS id,
                    idrub1 AS parent_id,
                    rub AS name
                FROM rubrique
                ORDER BY rang';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount() * 2);
        $rubs = $statement->fetchAll();

        foreach ($rubs as $rub) {
            $category = new Entity\Category();

            $category->setId($rub['id'])
                ->setName($rub['name']);

            $this->disabledAutoIncrement($category);

            $this->em->persist($category);

            $this->progress->advance();
        }
        $this->em->flush();


        foreach ($rubs as $rub) {
            if ($rub['parent_id']) {
                $category = $this->em->getRepository('Xif6NewsrssBundle:Category')->find($rub['id']);
                $parent = $this->em->getRepository('Xif6NewsrssBundle:Category')->find($rub['parent_id']);

                $category->setParent($parent);

                $this->em->persist($category);
            }

            $this->progress->advance();
        }

        $this->em->flush();
        $this->progress->finish();
    }

    /**
     * Import fluxcategory from old database
     */
    protected function ImportFluxCategory()
    {
        $this->output->writeln('<info>START ImportFluxCategory</info>');
        $sql = 'SELECT
                    idnews AS flux_id,
                    idrub AS category_id
                FROM news_rub';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());
        $this->progress->setRedrawFrequency(10);

        while ($newsrub = $statement->fetch()) {
            $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->find($newsrub['flux_id']);
            $category = $this->em->getRepository('Xif6NewsrssBundle:Category')->find($newsrub['category_id']);
            if (!is_null($flux) && !is_null($category)) {

                $flux->addCategory($category);
                $this->em->persist($flux);
            }

            $this->progress->advance();
        }

        $this->em->flush();
        $this->progress->finish();
    }

    /**
     * Import user from old database
     */
    protected function ImportUser()
    {
        $this->output->writeln('<info>START ImportUser</info>');
        $sql = 'SELECT
                    idlogin AS id,
                    log AS username,
                    pass AS password,
                    mail AS email,
                    verif AS enabled,
                    `date` AS created,
                    dernieremodif AS updated
                FROM login';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());
        $this->progress->setRedrawFrequency(10);

        while ($login = $statement->fetch()) {
            $user = new Entity\User();

            $user->setId($login['id'])
                ->setUsername($login['username'])
                ->setPlainPassword($login['password'])
                ->setEmail($login['email'])
                ->setEnabled((bool)$login['enabled'])
                ->setCreatedAt($this->toDateTime($login['created']))
                ->setUpdatedAt($this->toDateTime($login['updated']));

            $this->disabledAutoIncrement($user);

            $this->em->persist($user);
            $this->progress->advance();
        }

        $this->em->flush();
        $this->progress->finish();

        $command = $this->getApplication()->find('fos:user:promote');
        $arguments = array(
            'command' => 'fos:user:promote',
            'username' => 'xif6',
            '--super' => true,
        );
        $inputFos = new ArrayInput($arguments);
        $command->run($inputFos, $this->output);
    }

    /**
     * Import userflux from old database
     */
    public function ImportUserFlux()
    {
        $this->output->writeln('<info>START ImportUserFlux</info>');
        $sql = 'SELECT
                    log_news.idlogin AS user_id,
                    log_news.idnews AS flux_id,
                    log_news.`date` AS display_date,
                    log_news.category AS display_category,
                    log_news.`desc` AS display_description,
                    log_news.nb AS flux_nb,
                    log_news.rang AS rank_nb,
                    log_news.col AS rank_col,
                    log_news.color AS style,
                    news_perso.url AS url
                FROM log_news
                LEFT JOIN news_perso USING (idnews)
                ORDER BY user_id, rank_nb, rank_col';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());
        $this->progress->setRedrawFrequency(10);

        $rank = array();

        while ($lognews = $statement->fetch()) {
            $user = $this->em->getRepository('Xif6NewsrssBundle:User')->find($lognews['user_id']);
            if (!empty($lognews['url'])) {
                $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->findOneByUrl($lognews['url']);
            } else {
                $flux = $this->em->getRepository('Xif6NewsrssBundle:Flux')->find($lognews['flux_id']);
            }

            if ($user && $flux) {
                if (!isset($rank[$lognews['user_id']])) {
                    $rank[$lognews['user_id']] = 0;
                }

                $userFlux = new Entity\UserFlux();

                $userFlux->setUser($user)
                    ->setFlux($flux)
                    ->setDate($lognews['display_date'] == 'oui')
                    ->setCategory($lognews['display_category'] == 'oui')
                    ->setDescription($lognews['display_description'] == 'oui')
                    ->setFluxNb($lognews['flux_nb'])
                    ->setStyle(substr($lognews['style'], 0, -4))
                    ->setRank(++$rank[$lognews['user_id']]);

                $this->em->persist($userFlux);
            }
            $this->progress->advance();
        }
        $this->em->flush();
        $this->progress->finish();
    }

    /**
     * Import searchuser from old database
     */
    public function ImportSearchUser()
    {
        $this->output->writeln('<info>START ImportSearchUser</info>');

        $sql = 'SELECT
                    recherche AS query,
                    nb,
                    `date` AS created
                FROM recherche';

        $statement = $this->connOld->executeQuery($sql);
        $this->progress->start($this->output, $statement->rowCount());
        $this->progress->setRedrawFrequency(10);

        while ($recherche = $statement->fetch()) {

            for ($i = 0; $i < $recherche['nb']; $i++) {
                $searchUser = new Entity\SearchUser();

                $searchUser->setQuery($recherche['query'])
                    ->setCreatedAt($this->toDateTime($recherche['created']))
                    ->setUpdatedAt($this->toDateTime($recherche['created']));

                $this->em->persist($searchUser);
                $recherche['created'] = '0000-00-00 00:00:00';
            }
            $this->progress->advance();
        }
        $this->em->flush();
        $this->progress->finish();
    }

    protected function urlExist($url)
    {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 5);
        $result = curl_exec($curl);

        if ($result !== false) {
            $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            if (in_array($statusCode, array(200, 301, 302))) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * @param string $date
     * @return \DateTime|null
     */
    protected function toDateTime($date)
    {
        if ($date == '0000-00-00 00:00:00') {
            return null;
        } else {
            return new \DateTime($date);
        }
    }

    protected function removeTimestampableListener()
    {
        $evm = $this->em->getEventManager();
        $lcm = $evm->getListeners('loadClassMetadata');
        foreach ($lcm as $listener) {
            if (get_class($listener) == 'Gedmo\Timestampable\TimestampableListener') {
                $evm->removeEventSubscriber($listener);
            }
        }
    }

    protected function disabledAutoIncrement($object)
    {
        $metadata = $this->em->getClassMetaData(get_class($object));
        $metadata->setIdGeneratorType(\Doctrine\ORM\Mapping\ClassMetadata::GENERATOR_TYPE_NONE);
    }
}
