<?php

/**
 * Rss/Atom Bundle for Symfony.
 *
 *
 * @license http://opensource.org/licenses/lgpl-3.0.html LGPL
 * @copyright (c) 2013, Alexandre Debril
 */
namespace NewsrssBundle\Protocol\Parser;

use Debril\RssAtomBundle\Protocol\Parser\RssParser as BaseRssParser;
use Debril\RssAtomBundle\Protocol\FeedInterface;
use SimpleXMLElement;

/**
 * Class RssParser.
 */
class RssParser extends BaseRssParser
{

    /**
     * @param SimpleXMLElement $xmlBody
     * @param FeedInterface $feed
     * @param array $filters
     *
     * @return FeedInterface
     */
    protected function parseBody(SimpleXMLElement $xmlBody, FeedInterface $feed, array $filters)
    {
        $namespaces = $xmlBody->getNamespaces(true);

        $feed->setPublicId($xmlBody->channel->link);
        $feed->setLink($xmlBody->channel->link);
        $feed->setTitle($xmlBody->channel->title);
        $feed->setDescription($xmlBody->channel->description);

        $latest = new \DateTime('@0');
        $date = new \DateTime('now');
        foreach ($xmlBody->channel->item as $xmlElement) {
            $dcXmlElement = $xmlElement->children('http://purl.org/dc/elements/1.1/');
            $item = $this->newItem();

            $dateItem = $xmlElement->pubDate ?: ($dcXmlElement->date ?: null);
            if ($dateItem) {
                $readDate = trim($dateItem);

                $format = isset($format) ? $format : $this->guessDateFormat($readDate);
                $date = static::convertToDateTime($readDate, $format);
            }

            $item->setTitle($xmlElement->title)
                ->setDescription($xmlElement->description)
                ->setPublicId($xmlElement->guid)
                ->setUpdated($date)
                ->setLink($xmlElement->link)
                ->setComment($xmlElement->comments);

            if ($date > $latest) {
                $latest = $date;
            }

            $this->parseCategories($xmlElement, $item);

            $this->handleAuthor($xmlElement, $item);
            $this->handleDescription($xmlElement, $item);

            $item->setAdditional($this->getAdditionalNamespacesElements($xmlElement, $namespaces));

            $this->handleEnclosure($xmlElement, $item);
            $this->handleMediaExtension($xmlElement, $item);

            $this->addValidItem($feed, $item, $filters);
        }

        $this->detectAndSetLastModified($xmlBody, $feed, $latest);

        return $feed;
    }
}
