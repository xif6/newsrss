<?php

namespace NewsrssBundle\EventListener;

use Doctrine\ODM\MongoDB\Event\LifecycleEventArgs;
use NewsrssBundle\Document\Item;

class DocumentListener
{
    public function prePersist(LifecycleEventArgs $args)
    {
        $document = $args->getDocument();
        $dm = $args->getDocumentManager();

        if ($document instanceof Item && $document->getId() === null) {
            $dm->getRepository(get_class($document))->checkUnique($document);
        }
    }
} 