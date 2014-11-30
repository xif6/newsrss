<?php

namespace Xif6\UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class Xif6UserBundle extends Bundle
{
    public function getParent()
    {
        return 'FOSUserBundle';
    }
}
