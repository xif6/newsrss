<?php

namespace Xif6\NewsrssBundle\Annotation;

/**
 * Class CanonicalLink
 * @Annotation
 */
class CanonicalLink
{
    /**
     * @var string
     */
    protected $value;

    /**
     * @var array
     */
    protected $mapping = array();

    public function __construct(array $values)
    {
        foreach ($values as $k => $v) {
            if (!method_exists($this, $name = 'set' . $k)) {
                throw new \RuntimeException(sprintf('Unknown key "%s" for annotation "@%s".', $k, get_class($this)));
            }

            $this->$name($v);
        }
    }

    /**
     * Set mapping
     *
     * @param mixed $options
     * @return CanonicalLink
     */
    public function setMapping(array $options)
    {
        $this->mapping = $options;
        return $this;
    }

    /**
     * Get mapping
     *
     * @return mixed
     */
    public function getMapping()
    {
        return $this->mapping;
    }

    /**
     * Set value
     *
     * @param string $value
     * @return CanonicalLink
     */
    public function setValue($value)
    {
        $this->value = $value;
        return $this;
    }

    /**
     * Get value
     *
     * @return string
     */
    public function getValue()
    {
        return $this->value;
    }
}