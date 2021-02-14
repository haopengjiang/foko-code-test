# foko-code-test
It is built for code test of fokoRetail.

***Features***

* Language - [JavasScript]
* SQL Database - [MySQL](https://www.mysql.com/)
* Library to parse CSV file - [fast-csv](https://c2fo.github.io/fast-csv/docs/introduction/getting-started/)
* Library to write CSV file - [csv-writer](https://www.npmjs.com/package/csv-writer)
* Validation - [fast-csv library ](https://c2fo.github.io/fast-csv/docs/parsing/examples#validation)
* Testing - [Mocha](https://mochajs.org/) [Chai](http://www.chaijs.com/)
* Code Style - [Prettier](https://prettier.io/)


## Installation & Run
* open terminal cd to \foko-code-challeng
* *docker-compose up -d* (compose and run, it creates the mysql database)
* cd to \foko-code-challeng\solution
* *npm install* - Install dependencies
* *npm start* - Start application
* *docker-compose down* (Destroy application and mysql containers)

## Test
* cd to \foko-code-challeng\solution
* *npm run test* - Run all test cases