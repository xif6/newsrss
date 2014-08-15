<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Debug\Debug;

// If you don't want to setup permissions the proper way, just uncomment the following PHP line
// read http://symfony.com/doc/current/book/installation.html#configuration-and-setup for more information
//umask(0000);

// This check prevents access to debug front controllers that are deployed by accident to production servers.
// Feel free to remove this, extend it, or make something more sophisticated.
if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(
            md5(@$_SERVER['REMOTE_ADDR']),
            array(md5('127.0.0.1'), md5('fe80::1'), md5('::1'), '9e9dde078c7b9e881a50bf3feee2e449')
        )
        || substr(@$_SERVER['REMOTE_ADDR'], 0, 8) === '192.168.'
    )
) {
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file. Check ' . basename(__FILE__) . ' for more information.');
}

$loader = require_once __DIR__ . '/../app/bootstrap.php.cache';
Debug::enable();

require_once __DIR__ . '/../app/AppKernel.php';

$kernel = new AppKernel('dev', true);
$kernel->loadClassCache();
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
