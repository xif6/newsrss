<?php

namespace Xif6\NewsrssBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\Config\Loader\LoaderResolver;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class Xif6NewsrssExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $resolver = new LoaderResolver(array(
            $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config')),
            new Loader\XmlFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config')),
            new Loader\IniFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config')),
            new Loader\PhpFileLoader($container, new FileLocator(__DIR__ . '/../Resources/config')),
            new Loader\ClosureLoader($container, new FileLocator(__DIR__ . '/../Resources/config')),
        ));
        $loader->setResolver($resolver);

        $loader->load('services.yml');
    }
}
