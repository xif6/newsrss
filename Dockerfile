FROM php:7.4-fpm AS php
MAINTAINER François PASINI <francois.pasini@gmail.com>

# composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1

# Debian 11 (bullseye) est archivé
RUN sed -i -e 's|deb.debian.org|archive.debian.org|g' -e '/bullseye-updates/d' /etc/apt/sources.list

#
RUN apt-get update \
    && apt-get install -y \
        rsyslog \
        cron \
        supervisor \
        git \
        unzip \
        libbz2-dev \
        libzip-dev \
        libicu-dev \
        libcurl4-openssl-dev \
        libssl-dev \
        libxml2-dev \
        libonig-dev


ENV PHP_EXT curl bz2 zip pdo pdo_mysql opcache intl mbstring iconv json phar xml
# versions fixées : les dernières versions ne supportent plus PHP 7.4
ENV PHP_PECL apcu mongodb-1.9.0 xdebug-3.0.1

RUN docker-php-ext-install -j$(nproc) ${PHP_EXT}
RUN pecl install ${PHP_PECL}
RUN docker-php-ext-enable apcu mongodb xdebug

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
RUN sed -i -e "s/^memory_limit = .*$/memory_limit = -1/g" "$PHP_INI_DIR/php.ini"

COPY ./docker/php/supervisor.conf /etc/supervisor/conf.d/symfony.conf

COPY ./docker/php/cron /etc/cron.d/symfony
RUN chmod 644 /etc/cron.d/symfony

RUN mkdir /var/log/cron
RUN chmod 777 /var/log/cron


CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
