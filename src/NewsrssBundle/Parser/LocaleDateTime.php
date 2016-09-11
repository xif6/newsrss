<?php

namespace NewsrssBundle\Parser;

/**
 * Class LocaleDateTime
 * @package NewsrssBundle\Parser
 */
class LocaleDateTime
{
    /**
     * @var array
     */
    private $regexPattern = array();

    /**
     * @var array
     */
    private $regexReplacement = array();

    /**
     * @var \DateTimeZone
     */
    private $timezone;

    /**
     * @param array $regex
     */
    public function __construct(Array $conf)
    {
        $this->regexPattern = array_column($conf['regex'], 'pattern');
        $this->regexReplacement = array_column($conf['regex'], 'replacement');
        if (isset($conf['timezone'])) {
            try {
                $this->timezone = new \DateTimeZone($conf['timezone']);
            } catch (\Exception $e) {
                // nothing
            }
        }
    }

    /**
     * @param string $time
     * @param \DateTimeZone $timezone
     * @return \DateTime
     */
    public function parse($time, \DateTimeZone $timezone = null)
    {
        $return = null;

        if (!empty($time)) {
            try {
                $return = new \DateTime($time, $timezone);
            } catch (\Exception $e) {
                $time = $this->translate($time);
                $return = new \DateTime($time, $this->timezone);
            }
        }

        return $return;
    }

    /**
     * @param string $string
     * @return string
     */
    public function translate($string)
    {
        return preg_replace($this->regexPattern, $this->regexReplacement, $string);
    }
}
