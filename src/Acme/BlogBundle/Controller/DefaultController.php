<?php

namespace Acme\BlogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Acme\BlogBundle\Entity\Author;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    public function indexAction($name)
	{
		return $this->render('AcmeStoreBundle:Default:index.html.twig', array('name' => $name));
	}

    /**
	 * @Route("/blog/valid/", defaults={"name" = ""})
	 * @Route("/blog/valid/{name}")
     */
	public function validAction($name)
	{
		$author = new Author();
		$author->setName($name);
		$validator = $this->get('validator');
	    $errorList = $validator->validate($author);

		if (count($errorList) > 0) {
		return $this->render('AcmeBlogBundle:Author:validate.html.twig', array(
				'errorList' => $errorList,
			));
		} else {
			return new Response('The author is valid! Yes!');
		}
	}
}
