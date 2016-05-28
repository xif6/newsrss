<?php

namespace NewsrssBundle\Parser;

use Symfony\Component\Validator\Validator\RecursiveValidator;
use NewsrssBundle\Service\Encoding;

/**
 * Class Xml
 * @package NewsrssBundle\Parser
 */
class Xml
{
    /**
     * @var Array
     */
    protected $parserConfig;

    /**
     * @var RecursiveValidator
     */
    protected $validator;

    /**
     * @var LocaleDateTime
     */
    protected $localeDateTime;

    /**
     * @var Encoding
     */
    protected $mbString;

    /**
     * @var Array
     */
    protected $parser;

    /**
     * @param Array $parserConfig
     * @param LocaleDateTime $localeDateTime
     */
    public function __construct(Array $parserConfig, Encoding $mbString)
    {
        $this->parserConfig = $parserConfig;
        $this->mbString = $mbString;
    }

    /**
     * Set localeDateTime
     *
     * @param LocaleDateTime $localeDateTime
     * @return Xml
     */
    public function setLocaleDateTime(LocaleDateTime $localeDateTime)
    {
        $this->localeDateTime = $localeDateTime;
        return $this;
    }

    /**
     * Set validator
     *
     * @param RecursiveValidator $validator
     * @return Xml
     */
    public function setValidator(RecursiveValidator $validator)
    {
        $this->validator = $validator;
        return $this;
    }

    /**
     * @param string $stringXml
     * @return null|\stdClass
     */
    public function parse($stringXml)
    {
        try {
            $stringXml = $this->recoverXml($stringXml);
        } catch (\Exception $e) {
            return false;
        }

        if (!$stringXml) {
            return false;
        }

        $xml = new \SimpleXMLElement($stringXml, $this->getOptionsXml());

        $this->parser = $this->generateParser($xml);

        return $this->parseNode($this->parser, $xml);
    }

    /**
     * @param Array $parser
     * @param \SimpleXMLElement $xml
     * @return null|\stdClass
     */
    protected function parseNode($parser, \SimpleXMLElement $xml)
    {
        $out = new \stdClass();
        foreach ($parser as $rootNode => $data) {
            $nodes = array();

            try {
                $xpath = $xml->xpath($data['xpath']);
            } catch (\Exception $e) {
            }

            foreach ($xpath as $xmlElmt) {
                if (isset($data['node'])) {
                    $nodes[] = $this->parseNode($data['node'], $xmlElmt);
                } else {
                    $nodes[] = $this->parseValue($data, $xmlElmt);
                }
            }
            $nodes = array_values(array_filter($nodes)); // delete all FALSE (==) values in the array
            if (isset($data['required']) && $data['required'] && empty($nodes)) {
                return null;
            }
            if (isset($data['multiple']) && $data['multiple']) {
                $out->$rootNode = $nodes;
            } else {
                $out->$rootNode = (reset($nodes) ? : null);
            }
        }
        return $out;

    }

    /**
     * @param Array $parser
     * @param \SimpleXMLElement $xml
     * @return null|\SimpleXMLElement
     */
    protected function parseValue($parser, \SimpleXMLElement $xml)
    {
        if (isset($parser['modifiers']) && is_array($parser['modifiers'])) {
            $xml = $this->modifiers($xml, $parser['modifiers']);
        }
        if (isset($parser['constraints']) && is_array($parser['constraints'])) {
            $xml = $this->validators($xml, $parser['constraints']);
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
            var_dump('ERROR');
            return false;
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
                    throw new \InvalidArgumentException('libxml last error : ' . $lastError->message, $lastError->code);
                    break;
            }
        }
        $domDocument->normalizeDocument();
        unset($string);
        return $domDocument->saveXML();
    }

    /**
     * @param \SimpleXMLElement $xml
     * @return Array
     */
    protected function generateParser(\SimpleXMLElement $xml)
    {
        $nameSpaces = array_keys($xml->getNamespaces(true));

        return $this->generateXpathNode($this->parserConfig, $nameSpaces);
    }

    /**
     * @param Array $parserConfig
     * @param Array $nameSpaces
     * @return Array
     */
    protected function generateXpathNode($parserConfig, $nameSpaces)
    {
        foreach ($parserConfig as $node => &$parser) {
            $parser['xpath'] = $this->generateXpath($parser['xpath'], $nameSpaces);
            $parser['name'] = $node;
            if (isset($parser['node']) && is_array($parser['node'])) {
                $parser['node'] = $this->generateXpathNode($parser['node'], $nameSpaces);
            }
        }
        return $parserConfig;
    }

    /**
     * @param Array $xpathNs
     * @param Array $nameSpaces
     * @return string
     */
    protected function generateXpath($xpathNs, $nameSpaces)
    {
        $xpath = $xpathNs['ns'];
        foreach ($nameSpaces as $ns) {
            if (isset($xpathNs[$ns])) {
                $xpath = array_merge($xpath, $xpathNs[$ns]);
            }
        }
        return implode(' | ', array_unique($xpath));
    }

    /**
     * @return int
     */
    protected function getOptionsXml()
    {
        return LIBXML_COMPACT | LIBXML_NOBLANKS | LIBXML_NOEMPTYTAG | LIBXML_NOWARNING | LIBXML_NOCDATA | LIBXML_NSCLEAN;
    }

    /**
     * @param mixed $value
     * @param Array $validators
     * @return mixed
     */
    protected function validators($value, $validators)
    {
        foreach ($validators as $validator) {
            $validator = 'Symfony\\Component\\Validator\\Constraints\\' . $validator;
            $errorList = $this->validator->validateValue($value, new $validator());
            if (count($errorList) != 0) {
                $value = null;
                break;
            }
        }
        return $value;
    }

    /**
     * @param mixed $value
     * @param Array $modifiers
     * @return mixed
     */
    protected function modifiers($value, $modifiers)
    {
        foreach ($modifiers as $modifier) {
            $value = $this->{$modifier . 'Modifier'}($value);
        }
        return $value;
    }

    /**
     * @param $xml
     * @return string
     */
    protected function toUtf8Modifier($xml)
    {
        return $this->mbString->convert($xml, 'UTF-8');
    }

    /**
     * @param $xml
     * @return string
     */
    protected function htmlEntityDecodeModifier($xml)
    {
        return $this->mbString->htmlEntityDecode($xml, 'UTF-8');
    }

    /**
     * @param $xml
     * @return string
     */
    protected function stringModifier($xml)
    {
        return trim((string)$xml);
    }

    /**
     * @param $date
     * @return \DateTime|null
     */
    protected function localeDateTimeModifier($date)
    {
        try {
            return $this->localeDateTime->parse((string)$date);
        } catch (\Exception $e) {
            return null;
        }
    }
}