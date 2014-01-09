<?php
namespace Acme\DemoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Acl\Domain\ObjectIdentity;
use Symfony\Component\Security\Acl\Domain\UserSecurityIdentity;
use Symfony\Component\Security\Acl\Permission\MaskBuilder;

class BlogController
{
    // ...

    public function addCommentAction(Post $post)
    {
        $comment = new Comment();

        // préparation du $form et liaison (bind) des données

        if ($form->isValid()) {
            $entityManager = $this->get('doctrine.orm.default_entity_manager');
            $entityManager->persist($comment);
            $entityManager->flush();

            // création de l'ACL
            $aclProvider = $this->get('security.acl.provider');
            $objectIdentity = ObjectIdentity::fromDomainObject($comment);
            $acl = $aclProvider->createAcl($objectIdentity);

            // retrouve l'identifiant de sécurité de l'utilisateur actuellement connecté
            $securityContext = $this->get('security.context');
            $user = $securityContext->getToken()->getUser();
            $securityIdentity = UserSecurityIdentity::fromAccount($user);

            // donne accès au propriétaire
            $acl->insertObjectAce($securityIdentity, MaskBuilder::MASK_OWNER);
            $aclProvider->updateAcl($acl);
        }
    }


    public function editCommentAction(Comment $comment)
    {
        $securityContext = $this->get('security.context');

        // check for edit access
        if (false === $securityContext->isGranted('EDIT', $comment))
        {
            throw new AccessDeniedException();
        }

        // ... récupérez le bon objet « comment », et éditez-le ici
    }

}

