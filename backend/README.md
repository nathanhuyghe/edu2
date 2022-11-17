## Installation instruction

* Install [git](https://git-scm.com/downloads) and [Docker Desktop](https://www.docker.com/products/docker-desktop).
* Start the Docker Desktop application
* Run from your terminal/cmd

```shel
git clone https://gitlab.com/ikdoeict/atal.abdulkhalil/edu2.git
```

* When Docker is up and running, run from your terminal/cmd
```shel
cd edu2\backend
docker-compose up 
```

* When the containers are up and running, run from a new terminal/cmd
```shel
cd edu2\backend
docker-compose exec php-web bash
```

* From the Bash terminal in the php-web container, run the following commands:
```shel
composer install
cp .env.example .env
php artisan key:generate
```
* From the Bash terminal in the php-web container, execute the migrate Artisan command:
```shel
php artisan migrate
```
* Then run the following command to seed the database:
```shel
php artisan db:seed
```

* Browse to http://localhost:8080 for server side 
* Stop the environment in your terminal/cmd by pressing `Ctrl+C`
* In order to avoid conflicts with your lab environment, run from your terminal/cmd
```shel
docker-compose down
```
