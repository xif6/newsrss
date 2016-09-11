<?php

namespace NewsrssBundle\Protocol\Parser;

use Debril\RssAtomBundle\Protocol\Parser\AtomParser as BaseAtomParser;
use Debril\RssAtomBundle\Protocol\FeedInterface;
use SimpleXMLElement;

/**
 * Class AtomParser.
 */
class AtomParser extends BaseAtomParser
{
    protected $mandatoryFields = array(
        'id',
        'title',
        'link',
        'entry',
    );

    /**
     * @param SimpleXMLElement $xmlBody
     * @param FeedInterface $feed
     * @param array $filters
     *
     * @return FeedInterface
     *
     * @throws ParserException
     */
    protected function parseBody(SimpleXMLElement $xmlBody, FeedInterface $feed, array $filters)
    {
        $this->parseHeaders($xmlBody, $feed);

        $namespaces = $xmlBody->getNamespaces(true);

        foreach ($xmlBody->entry as $xmlElement) {
            $updated = $xmlElement->updated ?: $xmlElement->published;
            $itemFormat = isset($itemFormat) ? $itemFormat : $this->guessDateFormat($updated);

            $item = $this->newItem();
            $item->setTitle($xmlElement->title)
                ->setPublicId($xmlElement->id)
                ->setSummary($this->parseContent($xmlElement->summary))
                ->setDescription($this->parseContent($xmlElement->content))
                ->setUpdated(static::convertToDateTime($updated, $itemFormat));

            $item->setLink($this->detectLink($xmlElement, 'alternate'));

            if ($xmlElement->author) {
                $item->setAuthor($xmlElement->author->name);
            }

            $item->setAdditional($this->getAdditionalNamespacesElements($xmlElement, $namespaces));
            $this->handleEnclosure($xmlElement, $item);

            $this->parseCategories($xmlElement, $item);

            $this->addValidItem($feed, $item, $filters);
        }

        return $feed;
    }

    /**
     * @param SimpleXMLElement $xmlBody
     * @param FeedInterface $feed
     *
     * @throws ParserException
     */
    protected function parseHeaders(SimpleXMLElement $xmlBody, FeedInterface $feed)
    {
        $feed->setPublicId($xmlBody->id);

        $feed->setLink(current($this->detectLink($xmlBody, 'self')));
        $feed->setTitle($xmlBody->title);
        $feed->setDescription($xmlBody->subtitle);

        $updated = $xmlBody->updated ?: $xmlBody->published;
        $date = new \DateTime();

        try {
            $format = $this->guessDateFormat($updated);
            $date = static::convertToDateTime($updated, $format);
        } catch (\Exception $e) {
        }
        $feed->setLastModified($date);
    }

    /**
     * @param SimpleXMLElement $xmlElement
     * @param string $type
     */
    protected function detectLink(SimpleXMLElement $xmlElement, $type)
    {
        $link = parent::detectLink($xmlElement, $type);

        if (empty($link)) {
            $link = (string)$xmlElement->link[0];
        }

        if (is_string($link)) {
            $link = [$link];
        }

        return $link;
    }
}
