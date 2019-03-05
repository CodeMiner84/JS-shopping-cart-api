[![DeepScan grade](https://deepscan.io/api/teams/2725/projects/4431/branches/35847/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=2725&pid=4431&bid=35847)

# JS shopping cart API

API part of JS-shopping-cart application

* [docker](https://github.com/CodeMiner84/JS-shopping-cart-docker) - docker application
* [ui](https://github.com/CodeMiner84/JS-shopping-cart-ui) - UI application

```
yarn install
```
```
yarn start
```

After all packages will be installed, application swagger will available at: `http://localhost:3010/api`

# Fixtures

To add product fixtures run this page: `http://localhost:3010/product/import`

## Additionally

### Generate migrations
yarn  typeorm migration:generate -n migration_file_name

### Run migrations
yarn  typeorm migration:run

## Running the tests

@TODO

## Built With

* [NestJS](https://reactjs.org/) - A progressive Node.js web framework
* [Typescript](https://www.typescriptlang.org/) - Strict syntactical superset of JavaScript
* [Docker](https://www.docker.com/) - Allow to run application in containers

## Author

* [**Michał Pietrasz**](http://michalpietrasz.pl)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
