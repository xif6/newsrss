<?php

namespace Xif6\NewsrssBundle\Listener;

use Doctrine\ODM\MongoDB\Event\LifecycleEventArgs;
use Xif6\NewsrssBundle\Document\Item;

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