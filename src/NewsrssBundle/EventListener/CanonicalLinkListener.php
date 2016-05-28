<?php

namespace NewsrssBundle\EventListener;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use NewsrssBundle\Exception\HttpExceptionInterface;
use Doctrine\Common\Annotations\Reader;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use NewsrssBundle\Exception\CanonicalLinkException;
use NewsrssBundle\Annotation\CanonicalLink;
use Symfony\Bundle\FrameworkBundle\Routing\Router;

class CanonicalLinkListener
{
    /**
     * @param Reader $reader
     */
    protected $reader;

    /**
     * @param Router $router
     */
    protected $router;

    public function __construct(Reader $reader, Router $router)
    {
        $this->reader = $reader;
        $this->router = $router;
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        $controller = $event->getController();

        if (!is_array($controller)) {
            return;
        }
        $method = new \ReflectionMethod($controller[0], $controller[1]);

        $request = $event->getRequest();
        $url = $request->getRequestUri();
        $route = $request->attributes->get('_route');
        $routeParams = $routeParamsCanonical = $request->attributes->get('_route_params');

        $configurations = $this->getConfigurations($this->reader->getMethodAnnotations($method));

        foreach ($configurations as $configuration) {
            $object = $this->getParameters($method->getParameters(), $request, $configuration->getValue());

            foreach ($routeParamsCanonical as $property => &$value) {
                $property = $this->getProperty($property, $configuration->getMapping());
                if ($property[0] == '_') {
                    continue;
                }

                $getMethod = 'get' . ucfirst($property);
                $isMethod = 'is' . ucfirst($property);
                if (method_exists($object, $getMethod)) {
                    $objectMethod = $getMethod;
                } elseif (method_exists($object, $isMethod)) {
                    $objectMethod = $isMethod;
                } else {
                    continue;
                }

                $value = $object->$objectMethod();
            }

            if ($routeParamsCanonical !== $routeParams) {
                $urlCanonical = $this->router->generate($route, $routeParamsCanonical);
                if ($url !== $urlCanonical) {
                    throw new CanonicalLinkException($urlCanonical);
                }
            }
        }
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();
        if ($exception instanceof HttpExceptionInterface) {
            $event->setResponse(
                new RedirectResponse($exception->getUrl(), $exception->getStatusCode(), $exception->getHeaders())
            );
        }
    }

    protected function getParameters(array $params, $request, $name = null)
    {
        if ($name) {
            $object = $request->attributes->get($name);
            if (is_object($object)) {
                return $object;
            } else {
                throw new \UnexpectedValueException(sprintf('Configurations : the "%s" parameter is not valid', $name));
            }
        }
        foreach ($params as $param) {
            if ($param->getClass() && !$param->getClass()->isInstance($request)) {
                return $request->attributes->get($param->getName());
            }
        }
    }

    protected function getConfigurations(array $annotations)
    {
        $configurations = array();
        foreach ($annotations as $configuration) {
            if ($configuration instanceof CanonicalLink) {
                $configurations[] = $configuration;
            }
        }

        return $configurations;
    }

    protected function getProperty($property, array $mapping)
    {
        if ($mapping && isset($mapping[$property])) {
            return $mapping[$property];
        }
        return $property;
    }
}
