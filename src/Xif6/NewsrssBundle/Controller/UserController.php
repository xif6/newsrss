<?php

namespace Xif6\NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Xif6\NewsrssBundle\Annotation\CanonicalLink;
use Xif6\NewsrssBundle\Entity\Flux;
use Xif6\NewsrssBundle\Entity\UserFlux;
use \Doctrine\ORM\Query;

use Doctrine\Common\Collections\Criteria;

class UserController extends Controller
{
    /**
     */
    public function itemsAction()
    {
        $userFluxAll = $this->getDoctrine()
            ->getRepository('Xif6NewsrssBundle:UserFlux')
            ->findBy(
                array('user' => $this->getUser()->getId()),
                array('rank' => 'ASC')
            );
        $allItems = [];
        foreach ($userFluxAll as $userFlux) {
            /*
            $fluxItems = ['flux' => $userFlux->getFlux()];

            $fluxItems['items'] = $this->get('doctrine_mongodb')
            */
            $fluxItems = $this->get('doctrine_mongodb')
                ->getRepository('Xif6NewsrssBundle:Item')
                ->findBy(
                    array('flux_id' => $userFlux->getFlux()->getId()),
                    array('date' => 'DESC'),
                    $userFlux->getFluxNb()
                );
            $allItems['flux_' . $userFlux->getFlux()->getId()] = $fluxItems;
        }

        $serializer = $this->get('jms_serializer');
        $allItems = $serializer->serialize($allItems, 'json');
        return new Response($allItems);
    }

    /**
     */
    public function fluxesAction()
    {
        /*
                $data = $this->getDoctrine()
                    ->getManager()
                    ->getRepository('Xif6NewsrssBundle:UserFlux')
                    ->findAll(Query::HYDRATE_ARRAY);
                var_dump($data);
                $serializer = $this->get('jms_serializer');
                $response = $serializer->serialize($data, 'json');

                return new JsonResponse($data);
                /*
                $userFlux = $this->getDoctrine()
                    ->getRepository('Xif6NewsrssBundle:UserFlux')
                    ->findBy(
                        array('user' => $this->getUser()->getId()),
                        array('rank' => 'ASC')
                    );

                //*/
        $qb = $this->getDoctrine()
            ->getRepository('Xif6NewsrssBundle:UserFlux')
            ->createQueryBuilder('uf');

        $qb
            ->join('uf.flux', 'f')
            ->andWhere($qb->expr()->eq('uf.user', ':user'))
            ->setParameter('user', $this->getUser()->getId())
            ->addOrderBy('uf.rank', 'ASC');

        $userFlux = $qb
            ->getQuery()
            ->execute();
//            ->getArrayResult();

        $serializer = $this->get('jms_serializer');
        $userFlux = $serializer->serialize($userFlux, 'json');
        return new Response($userFlux);
    }

}
