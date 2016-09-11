<?php

namespace NewsrssBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use NewsrssBundle\Annotation\CanonicalLink;
use Symfony\Component\HttpFoundation\Request;
use NewsrssBundle\Entity\Category;

class CategoryController extends Controller
{
    /**
     * @Template()
     * @CanonicalLink()
     */
    public function indexAction(Category $category, $_format, Request $request)
    {
        $fluxes = $this->getDoctrine()->getRepository('NewsrssBundle:Flux')->mostUsersByCategory(
            $category->getId()
        );
        return ['category' => $category, 'fluxes' => $fluxes];
    }

    /**
     * @Template()
     */
    public function arboAction()
    {
        /*
        $categories = $this->getDoctrine()
            ->getRepository('NewsrssBundle:Category')
            ->findBy(['parent' => null]);
        //*/
        $categories = $this->getDoctrine()
            ->getRepository('NewsrssBundle:Category')
            ->childrenHierarchy();

        return ['categories' => $categories];
    }
}
