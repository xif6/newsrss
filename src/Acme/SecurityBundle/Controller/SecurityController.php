<?php
namespace Acme\SecurityBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Response;

// for annotation
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Lsw\SecureControllerBundle\Annotation\Secure;

class SecurityController extends Controller
{
    public function loginAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();
        // get the login error if there is one
        if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        }
        return $this->render('AcmeSecurityBundle:Security:login.html.twig', array(
            // last username entered by the user
            'last_username' => $session->get(SecurityContext::LAST_USERNAME),
            'error'         => $error,
        ));
	}

	public function adminAction()
	{
		return new Response('ok | autorisation accepté | admin');
	}

	/**
	 * @Route("/admin/users")
	 */
	public function adminusersAction()
	{
		return new Response('ok | autorisation accepté | adminuser');
	}

	/**
	 * @Secure(roles="ROLE_ADMIN")
	 * @Route("/testadmin")
	 */
	public function testAction()
	{
		return new Response('ok | autorisation accepté | test');	
	}
}
