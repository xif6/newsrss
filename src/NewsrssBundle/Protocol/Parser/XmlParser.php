<?php

namespace NewsrssBundle\Protocol\Parser;

use Debril\RssAtomBundle\Protocol\Parser\XmlParser as BaseXmlParser;
use NewsrssBundle\Service\Encoding;

/**
 * Created by PhpStorm.
 * User: xif6
 * Date: 02/06/2016
 * Time: 13:52
 */
class XmlParser extends BaseXmlParser
{

    /**
     * @param LocaleDateTime $localeDateTime
     */
    public function __construct(Encoding $mbString)
    {
        $this->mbString = $mbString;
    }

    /**
     * Parse a string and return an XML element
     * Pretty much a no-op there, but you may want top override it ti add more
     *
     * @param string $xmlString
     * @return \SimpleXMLElement
     */
    public function parseString($xmlString)
    {
        try {
            $xml = new \SimpleXMLElement($xmlString);
        } catch (\Exception $e) {
            try {
                $xml = new \SimpleXMLElement($this->recoverXml($xmlString));
            } catch (\Exception $e) {
            }
        }
        return $xml;
    }

    /**
     * @param string $string
     * @return string
     */
    protected function recoverXml($string)
    {
        $string = trim($string);
        if (substr($string, 0, 5) !== '<?xml'
            || stripos($string, '<html') !== false
            || strripos($string, '</html>') !== false
        ) {
            throw new \InvalidArgumentException('String is not a xml');
        }
        $string = str_replace('&amp;', '&', $string);
        $string = str_replace('&amp;', '&', $string); // double decode for bad encoding
        $string = str_replace('&', '&amp;', $string); // char '&' illegal on xml out of a cdata
        $string = str_replace('xmlns=', 'ns=', $string); // bug xpath for other namespace
        $string = preg_replace('/<!DOCTYPE[^>]*>/i', '', $string); // RSS 0.91 use tag <!DOCTYPE that is invalid xml
        //$string = preg_replace('/encoding=("|\')ISO-8859-[0-9+]\1/i', 'encoding="UTF-8"', $string);
        //$string = $this->mbString->convert($string, 'UTF-8');
        $domDocument = new \DOMDocument();
        $domDocument->recover = true;
        $domDocument->preserveWhiteSpace = false;
        $internalErrors = libxml_use_internal_errors(true);
        $domDocument->loadXML($string);
        libxml_use_internal_errors($internalErrors);
        $lastError = libxml_get_last_error();
        if ($lastError) {
            switch ($lastError->code) {
                case 9: // Error XML_ERR_INVALID_CHAR : encoding error
                    $string = $this->mbString->convert($string, strtoupper($domDocument->encoding));
                    $domDocument->loadXML($string);
                    break;
                case 77: // Error XML_ERR_TAG_NOT_FINISHED : error tag end
                case 5: // Error XML_ERR_DOCUMENT_END : Extra content at the end of the document
                    // no problem recover will try to fix it
                    break;
                default:
                    //throw new \InvalidArgumentException('libxml last error : ' . $lastError->message, $lastError->code);
                    break;
            }
        }
        $domDocument->normalizeDocument();
        unset($string);
        return $domDocument->saveXML();
    }
}
