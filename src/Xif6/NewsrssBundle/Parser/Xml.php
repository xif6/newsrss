<?php

namespace Xif6\NewsrssBundle\Parser;

use Symfony\Component\Validator\Validator;

/**
 * Class Xml
 * @package Xif6\NewsrssBundle\Parser
 */
class Xml
{
    /**
     * @var Array
     */
    protected $parserConfig;

    /**
     * @var Validator
     */
    protected $validator;

    /**
     * @var LocaleDateTime
     */
    protected $localeDateTime;

    /**
     * @var Array
     */
    protected $parser;

    /**
     * @param Array $parserConfig
     * @param Validator $validator
     * @param LocaleDateTime $localeDateTime
     */
    public function __construct(Array $parserConfig)
    {
        $this->parserConfig = $parserConfig;
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
     * @param Validator $validator
     * @return Xml
     */
    public function setValidator(Validator $validator)
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
        $xml = new \SimpleXMLElement($this->recoverXml(
            $stringXml
        ), LIBXML_COMPACT | LIBXML_NOWARNING | LIBXML_NOCDATA | LIBXML_NSCLEAN);

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
            if (isset($data['node']) && isset($data['multiple']) && $data['multiple']) {
                $nodes = array();
            } else {
                $nodes = null;
            }
            $xpath = $xml->xpath($data['xpath']);
            foreach ($xpath as $xmlElmt) {
                if (isset($data['node'])) {
                    if ($outNode = $this->parseNode($data['node'], $xmlElmt)) {
                        if (is_array($nodes)) {
                            $nodes[] = $outNode;
                        } else {
                            $nodes = $outNode;
                        }
                        unset($outNode);
                    }
                } else {
                    $nodes = $this->parseValue($data, $xmlElmt);
                }
            }
            if (isset($data['required']) && $data['required'] && empty($nodes)) {
                return null;
            }
            $out->$rootNode = $nodes;
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
        $string = str_replace('xmlns=', 'ns=', $string);
        $string = preg_replace('/encoding=("|\')ISO-8859-[0-9+]\1/i', 'encoding="UTF-8"', $string);
        $domDocument = new \DOMDocument();
        $domDocument->recover = true;
        $domDocument->loadXML($string);
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
                $xpath += $xpathNs[$ns];
            }
        }
        return implode(' | ', array_unique($xpath));
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
     * @param \SimpleXMLElement $xml
     * @return string
     */
    protected function stringModifier(\SimpleXMLElement $xml)
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