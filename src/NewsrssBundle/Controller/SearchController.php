<?php

namespace NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;

class SearchController extends Controller
{

    /**
     * @Template()
     */
    public function indexAction(Request $request)
    {
        $query = $request->query->get('q');
        $finderFlux = $this->container->get('fos_elastica.finder.newsrss.flux');
        $finderCategory = $this->container->get('fos_elastica.finder.newsrss.category');

        //$resultsFlux = $finderFlux->findHybrid($query); // with stats to results

        $queryStringCategory = new \Elastica\Query\QueryString();
        $queryStringCategory->setQuery($query)->setFields(['name']);
        $resultsCategory = $finderCategory->find($queryStringCategory);


        $queryStringFlux = new \Elastica\Query\QueryString();
        $queryStringFlux->setQuery($query)->setFields(['name', 'description']);
        $paginator = $this->get('knp_paginator');
        $fluxPaginator = $paginator->paginate(
            $finderFlux->createPaginatorAdapter($queryStringFlux),
            $request->query->get('page', 1),
            10
        );

        return ['categories' => $resultsCategory, 'fluxes' => $fluxPaginator];
    }

}
