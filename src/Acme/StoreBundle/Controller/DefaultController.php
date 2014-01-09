<?php

namespace Acme\StoreBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Acme\StoreBundle\Entity\Category;
use Acme\StoreBundle\Entity\Product;
use Symfony\Component\HttpFoundation\Response;

// pour show2 paramconverter
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('AcmeStoreBundle:Default:index.html.twig', array('name' => $name));
    }

	public function createAction()
	{
		$product = new Product();
		$product->setName('A Foo Bar');
		$product->setPrice('19.99');
		$product->setDescription('Lorem ipsum dolor');

		$em = $this->getDoctrine()->getManager();
		$em->persist($product);
		$em->flush();

		return new Response('Id du produit créé : '.$product->getId());
	}

	public function showAction($id)
	{
		$product = $this->getDoctrine()->getRepository('AcmeStoreBundle:Product')->find($id);

		if (!$product) {
			throw $this->createNotFoundException('Aucun produit trouvé pour cet id : '.$id);
		}

		return new Response($product->getId() . ' - ' . $product->getName() . ' - ' . $product->getPrice() . ' - ' . $product->getDescription());
	}

	/**
	 * @Route("/product/show2/{id}")
	 * @ParamConverter("product", class="AcmeStoreBundle:Product")
	 */
	public function show2Action(Product $product)
	{
		if (!$product) {
			throw $this->createNotFoundException('Aucun produit trouvé pour cet id : '.$id);
		}

		return new Response($product->getId() . ' - ' . $product->getName() . ' - ' . $product->getPrice() . ' - ' . $product->getDescription());
	}

	/**
	 * @Route("/product/show3/{id}")
	 */
	public function show3Action(Product $product)
	{
		return new Response($product->getId() . ' - ' . $product->getName() . ' - ' . $product->getPrice() . ' - ' . $product->getDescription());
	}

	/**
	 * @Route("/product/update/{id}")
	 */
	public function updateAction(Product $product)
	{
		$em = $this->getDoctrine()->getManager();

		$product->setName('Nom du nouveau produit!');
		$em->flush();

		return new Response($product->getId() . ' - ' . $product->getName() . ' - ' . $product->getPrice() . ' - ' . $product->getDescription());
	}


	/**
	 * @Route("/product/remove/{id}")
	 */
	public function removeAction(Product $product)
	{
		$em = $this->getDoctrine()->getManager();
		$em->remove($product);
		$em->flush();

		return new Response('Produit summprimé');
	}

	/**
	 * @Route("/product/all")
	 */
	public function showallAction()
	{
		$em = $this->getDoctrine()->getManager();
		$products = $em->getRepository('AcmeStoreBundle:Product')
			            ->findAllOrderedByName();

		return $this->render('AcmeStoreBundle:Product:showall.html.twig', array('products' => $products));
	}

	/**
	 * @Route("/product/createwithcat")
	 */
    public function createProductAction()
    {
        $category = new Category();
        $category->setName('Main Products');

        $product = new Product();
        $product->setName('Foo');
        $product->setPrice(19.99);
        $product->setDescription('test cat');
        // lie ce produit à une catégorie
        $product->setCategory($category);

        $em = $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->persist($product);
        $em->flush();

        return new Response(
            'Id du produit créé : '.$product->getId().' et id de la catégorie : '.$category->getId()
        );
    }
}
