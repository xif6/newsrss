<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Book;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as REST;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Request\ParamFetcher;

/**
 * Class ApiController
 * @package AppBundle\Controller
 *
 * @REST\Prefix("v1")
 * @REST\NamePrefix("api_v1_")
 */
class ApiController extends FOSRestController
{

    /**
     * @REST\Put("/book/{id}")
     * @REST\RequestParam(name="title", nullable=false)
     * @REST\RequestParam(name="content", nullable=false)
     *
     */
    public function putBookAction(ParamFetcher $paramFetcher, $id)
    {
        $em = $this->getDoctrine()->getManager();
        $book = $this->getDoctrine()->getRepository('AppBundle:Book')
            ->find($id);
        if ($book) {
            $book->setTitle($paramFetcher->get('title'));
            $book->setContent($paramFetcher->get('content'));
            $em->persist($book);
            $em->flush();
        }
        $view = $this->view(null, 200);
        return $view;
    }

    /**
     * @REST\Get("/book/{id}")
     *
     */
    public function getBookAction($id)
    {
        dump($this->container);
        $book = $this->getDoctrine()->getRepository('AppBundle:Book')
            ->find($id);
        $view = $this->view($book, 200);
        return $view;
    }

    /**
     * @REST\Get("/book")
     *
     */
    public function getBooksAction()
    {
        $books = $this->getDoctrine()->getRepository('AppBundle:Book')
            ->findAll();
        $view = $this->view($books, 200);
        return $view;
    }

    /**
     * @REST\Post("/book")
     * @REST\RequestParam(name="title", nullable=false)
     * @REST\RequestParam(name="content", nullable=false)
     *
     */
    public function postBookAction(ParamFetcher $paramFetcher)
    {
        $em = $this->getDoctrine()->getManager();
        $book = new Book();
        $book->setTitle($paramFetcher->get('title'));
        $book->setContent($paramFetcher->get('content'));
        $em->persist($book);
        $em->flush();

        $view = $this->view(null, 200);
        return $view;
    }


    /**
     * @REST\Delete("/book/{id}")
     */
    public function deleteBookAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $book = $this->getDoctrine()->getRepository('AppBundle:Book')
            ->find($id);
        $em->remove($book);
        $em->flush();
        $view = $this->view(null, 200);
        return $view;
    }
}