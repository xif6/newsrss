<?php

namespace Xif6\NewsrssBundle\Service;

/**
 * Class Encoding
 * @package Xif6\NewsrssBundle\Service
 */
class Encoding
{
    /**
     * @var string
     */
    const ENCODING_DESTINATION = 'UTF-8';

    /**
     * @var array
     */
    protected $detectOrder = [];

    /**
     * @var array
     */
    protected $htmlEntityMaps = [];

    function __construct()
    {
        $this->detectOrder = mb_detect_order();
    }

    /**
     * Finds whether a string in a utf8
     *
     * @param string $string
     * @return bool
     */
    public function isUtf8($string)
    {
        $encoding = $this->detect($string);
        if ('UTF-8' === $encoding) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param string $string
     * @return bool
     */
    public function isUnicode($string)
    {
        $encoding = $this->detect($string);
        if ('UTF' === substr($encoding, 0, 3)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param string $string
     * @return string
     */
    public function detect($string)
    {
        return mb_detect_encoding($string, $this->detectOrder, true);
    }

    /**
     * @param string $string
     * @param string $encodingDest
     * @return string
     */
    public function convert($string, $encodingDest = self::ENCODING_DESTINATION)
    {
        $encoding = $this->detect($string);
        if ($encoding === false) {
            $encoding = mb_internal_encoding();
        }
        if ($encoding !== $encodingDest) {
            $string = iconv($encoding, $encodingDest . '//TRANSLIT', $string);
        }

        return $string;
    }

    /**
     * @param string $string
     * @param string $encodingDest
     * @return string
     */
    public function htmlEntityDecode($string, $encodingDest = self::ENCODING_DESTINATION)
    {
        do {
            $lastString = $string;
            $string = $this->htmlEntityDecodeAll($lastString, $encodingDest);
        } while ($lastString !== $string);

        return $string;
    }

    protected function htmlEntityDecodeAll($string, $encodingDest = self::ENCODING_DESTINATION)
    {
        $string = html_entity_decode($string, ENT_QUOTES | ENT_HTML5, $encodingDest);
        if ($encodingDest === 'UTF-8') {
            $string = $this->htmlEntityChrUtf8Decode($string);
        }
        return $string;
    }

    /*
        public function hasHtmlEntity($string)
        {
            foreach (get_html_translation_table(HTML_ENTITIES, ENT_QUOTES | ENT_HTML5) as $entity) {
                if (strpos($string, $entity) !== false) {
                    return true;
                }
            }
            return false;
        }
    //*/
    public function htmlEntityChrUtf8Decode($string)
    {
        return preg_replace_callback('/&#(x?)([^;]+);/u', [$this, 'htmlEntityChrUtf8Replace'], $string);
    }

    public function htmlEntityChrUtf8Replace($matches)
    {
        if ($matches[1] === 'x') {
            $code = hexdec($matches[2]);
        } else {
            $code = (int)$matches[2];
        }
        $s = $this->chrUtf8($code);
        if ($s === $code) {
            $s = $mathes[0];
        }
        return $s;
    }

    /**
     * Set detectOrder
     *
     * @param array $detectOrder
     * @return Encoding
     */
    public function setDetectOrder($detectOrder)
    {
        $this->detectOrder = $detectOrder;
        return $this;
    }

    /**
     * Get detectOrder
     *
     * @return array
     */
    public function getDetectOrder()
    {
        return $this->detectOrder;
    }

    /**
     * Set htmlEntityMaps
     *
     * @param array $htmlEntitiesMaps
     * @return Encoding
     */
    public function setHtmlEntityMaps($htmlEntitiesMaps)
    {
        $this->htmlEntityMaps = $htmlEntitiesMaps;
        return $this;
    }

    /**
     * Get htmlEntityMaps
     *
     * @return array
     */
    public function getHtmlEntityMaps()
    {
        return $this->htmlEntityMaps;
    }

    public function htmlEntityDecodeUtf8($string)
    {
    }

    protected function htmlEntityMapping($code)
    {
        if (isset($this->htmlEntityMaps[$code])) {
            return $this->htmlEntityMaps[$code];
        } else {
            return $code;
        }
    }

    public function chrUtf8($code)
    {
        $code = $this->htmlEntityMapping($code);
        $s = '';

        if ($code < 128) {
            $s = chr($code);
        } elseif ($code < 2048) {
            $s = chr(192 | ($code >> 6))
                . chr(128 | ($code & 63));
        } elseif ($code < 65536) {
            $s = chr(224 | ($code >> 12))
                . chr(128 | (($code >> 6) & 63))
                . chr(128 | ($code & 63));
        } else {
            $s = chr(240 | ($code >> 18))
                . chr(128 | (($code >> 12) & 63))
                . chr(128 | (($code >> 6) & 63))
                . chr(128 | ($code & 63));
        }
        return $s;
    }
}