# iamdocuman

[![Code Climate](https://codeclimate.com/github/andela-iamao/documan/badges/gpa.svg)](https://codeclimate.com/github/andela-iamao/documan) [![Build Status](https://travis-ci.org/andela-iamao/iamdocuman.svg?branch=development)](https://travis-ci.org/andela-iamao/iamdocuman)
[![Coverage Status](https://coveralls.io/repos/github/andela-iamao/iamdocuman/badge.svg?branch=development)](https://coveralls.io/github/andela-iamao/iamdocuman?branch=development)

Document management system, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.


>This document management system manages documents users and user roles.

The document:
  - Access rights according to roles
  - Specifies the date it was published

  ## Description

  The system manages documents, users and user roles. Each document defines access rights, the document defines which roles can access it.  Each document specifies the date it was published. Users are categorized by roles, each user has a role defined for them.

  ## Pre-requisites

  * MongoDB
  * NodeJS
  * Postman

  ## Installation

  * Copy the project path from repo
  * In your terminal run `git clone` _project path_
  * `cd` into the project root
  * In the project root run `npm install` to install dependencies
  * To start app `node server.js` OR `npm start`
  * To run tests `npm test`

  ## Testing with Postman

  * Create a user [POST] `http://localhost:5000/api/v1/users`
  * Login the said user [POST] `http://localhost:5000/api/v1/users/login`
  * Then play around with the availed routes

  ## Routes

  * users:

    1.`http://localhost:5000/api/v1/users/login`

        login : POST

    2.`http://localhost:5000/api/v1/users`

        create : POST
        all : GET

    3.`http://localhost:5000/api/v1/users/:user_id`

        find-one : GET
        update-one : PUT
        delete-one : DELETE

    4.`http://localhost:5000/api/v1/users/:user_id`

        find-documents-user : GET

  * documents

    1.`http://localhost:5000/api/v1/documents`

        create : POST
        all : GET

    2.`http://localhost:5000/api/v1/documents/:document_id`

        find-one : GET
        update-one : PUT
        delete-one : DELETE

iamdocuman is [MIT LICENSED](https://github.com/andela-iamao/documan/blob/production/LICENSE)
