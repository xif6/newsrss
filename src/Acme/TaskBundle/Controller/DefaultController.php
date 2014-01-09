<?php

namespace Acme\TaskBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Acme\TaskBundle\Entity\Task;
use Acme\TaskBundle\Entity\Category;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Acme\TaskBundle\Form\Type\TaskType;

class DefaultController extends Controller
{
	/**
	 * @Route("/task/new", name="task_new")
	 */
	public function newAction(Request $request)
	{
		// crée une tâche et lui donne quelques données par défaut pour cet exemple
		$task = new task();
		//$task->setTask('Write a blog post');
		//$task->setDueDate(new \DateTime('tomorrow'));

		$form = $this->createFormBuilder($task)
			->add('task', 'text')
			->add('dueDate', 'date', array(
				'widget' => 'single_text',
				'label' => 'Date la tâche'
			))
			->add('save', 'submit')
			->add('saveAndAdd', 'submit')
			->getform();

		$form->handleRequest($request);

		if ($form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($task);
			$em->flush();
			$nextAction = $form->get('saveAndAdd')->isClicked() ? 'task_new' : 'task_success';
			return $this->redirect($this->generateUrl($nextAction));
		} else {
			return $this->render('AcmeTaskBundle:Default:new.html.twig', array('form' => $form->createView()));
		}
	}

	/**
	 * @Route("/task/new2", name="task_new2")
	 */
	public function new2Action(Request $request)
	{
		// crée une tâche et lui donne quelques données par défaut pour cet exemple
		$task = new task();

		// sans service
//		$form = $this->createForm(new TaskType(), $task);
		// avec le formulaire défini en tant que service (cf: src/Acme/TaskBundle/Resources/config/services.yml)
		$form = $this->createForm('task', $task);

		$form->handleRequest($request);

		if ($form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($task->getCategory());
			$em->persist($task);
			$em->flush();
			$nextAction = $form->get('saveAndAdd')->isClicked() ? 'task_new2' : 'task_success';
			return $this->redirect($this->generateUrl($nextAction));
		} else {
			return $this->render('AcmeTaskBundle:Default:new.html.twig', array('form' => $form->createView()));
		}
	}

	/**
	 * @Route("/task/success", name="task_success")
	 */
	public function successAction()
	{
		return new Response('ok');
	}
}
