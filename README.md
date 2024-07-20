# README.md

## Steps to Set Up the Pipposas Project

1. Clone the repository to your computer using the following command:
    ```bash
    git clone https://github.com/RomanNerez/pipposas.git

    cd pipposas
    ```

2. Copy the configuration file located in the project root directory. To do this, enter the following command:
    ```bash
    cp .env.example .env
    ```

3. In the project root directory, run the following command:
    ```bash
    docker run --rm \
        -u "$(id -u):$(id -g)" \
        -v "$(pwd):/var/www/html" \
        -w /var/www/html \
        laravelsail/php83-composer:latest \
        composer install --ignore-platform-reqs
    ```
    **Note:** Docker must be installed on your computer to run the project using Docker.

4. Start the project by entering the following command in the project root directory:
    ```bash
    ./vendor/bin/sail up
    ```

5. Once all dependencies are installed by Docker, enter the `laravel.test` container by running the following command in the project root directory:
    ```bash
    docker-compose exec laravel.test bash
    ```

6. Once inside the container, run the following commands:
    ```bash
    php artisan migrate
    npm run build
    ```

7. After running all the above commands, go to the following link:
    [http://localhost/](http://localhost/)
