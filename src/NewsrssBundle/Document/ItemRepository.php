<?php

namespace NewsrssBundle\Document;

use Doctrine\ODM\MongoDB\DocumentRepository;
use Doctrine\ODM\MongoDB\Events;

/**
 * ItemRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ItemRepository extends DocumentRepository
{
    public function checkUnique(Item $item)
    {
        $qb = $this->createQueryBuilder();

        $result = $qb->find()
            ->addAnd(
                $qb->expr()->field('flux_id')->equals($item->getFluxId())
                    ->addOr($qb->expr()->field('title')->equals($item->getTitle()))
                    ->addOr($qb->expr()->field('url')->equals($item->getUrl()))
            )
            ->getQuery()
            ->getSingleResult();

        if ($result) {
            $item->setId($result->getId());
        }
    }

    public function upsert(Item $item, \DateTime $dateUpdate = null)
    {
        $preEvents = array(
            Events::prePersist,
            Events::preUpdate,
            Events::preFlush,
            Events::onFlush,
        );
        $postEvents = array(
            Events::postPersist,
            Events::postUpdate,
            Events::postFlush,
        );
        $this->invokeLifecycle($preEvents, $item);

        $qb = $this->createQueryBuilder();
        $update = $qb->update();
        $itemData = $this->dm->getUnitOfWork()->getDocumentActualData($item);
        $emptyDate = false;
        foreach ($itemData as $field => $value) {
            switch ($field) {
                case 'id':
                    // ignore
                    break;
                case 'date':
                    if ($value === null) {
                        $emptyDate = true;
                        break;
                    }
                default:
                    $update->field($field)->set($value);
                    break;
            }
        }
        $update->addAnd(
            $qb->expr()->field('flux_id')->equals($itemData['fluxId'])
                ->addOr($qb->expr()->field('title')->equals($itemData['title']))
                ->addOr($qb->expr()->field('url')->equals($itemData['url']))
        )
            ->upsert(true)
            ->getQuery()
            ->execute();

        if ($emptyDate) { // update date if null by current date
            $this->createQueryBuilder()->update()
                ->multiple(true)
                ->field('date')->set(($dateUpdate ? : new \DateTime()))
                ->field('date')->equals(null)
                ->field('fluxId')->equals($itemData['fluxId'])
                ->getQuery()
                ->execute();
        }

        $this->invokeLifecycle($preEvents, $item);
    }

    protected function invokeLifecycle(array $events, $object)
    {
        $class = $this->dm->getClassMetadata(get_class($object));
        foreach ($events as $event) {
            if ($class->hasLifecycleCallbacks($event)) {
                $class->invokeLifecycleCallbacks($event, $object);
            }
        }
    }
}