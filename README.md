# iAmDocuman
## Visit: [iAmDocuman](http://iamdocuman-staging.herokuapp.com)

[![Code Climate](https://codeclimate.com/github/andela-iamao/documan/badges/gpa.svg)](https://codeclimate.com/github/andela-iamao/documan) [![Build Status](https://travis-ci.org/andela-iamao/iamdocuman.svg?branch=development)](https://travis-ci.org/andela-iamao/iamdocuman)
[![Coverage Status](https://coveralls.io/repos/github/andela-iamao/iamdocuman/badge.svg?branch=development)](https://coveralls.io/github/andela-iamao/iamdocuman?branch=development)

---
Document management system, complete with roles and privileges. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published.


>This document management system manages documents users and user roles.

The document:
  - Access rights according to roles
  - Specifies the date it was published

## What is it?
---
  A system that manages documents, users and user roles. Each document defines access rights, the document defines which roles can access it. Each document specifies the date it was published. Users are categorized by roles, each user has a role defined for them.

## What to expect
---
  iAmDocuman provides to you a platform to CREATE, MANAGE and EXTEND your documents. With us, you can create a document, choose one of three access levels i.e. public(visible to the entire platform), private(only visible to you) or even role(only visible to people who have the save role access as you). Organize your documents in folders for ease of reach. Have total administrative control over your documents i.e. delete and update at will. Get access to publicly shared documents by other members of the platform. So hurry now and sign up. #iAmDocuman.


## Pre-requisites
---
  * Postgresql
  * NodeJS
  * Postman

## Installation
---
  * Have all the Pre-requisites installed
  * Copy the project path from repo
  * In your terminal run `git clone` _project path_
  * `cd` into the project root
  * In the project root run `npm install` to install dependencies
  * To start app `node server.js` OR `npm start`
  * To run tests `npm test`

## Testing with Postman
  ---
  ### Read the docs: [Documentation](http://iamdocuman-staging.herokuapp.com)

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

    3.`http://localhost:5000/api/v1/users/:id`

        find-one : GET
        update-one : PUT
        delete-one : DELETE

    4.`http://localhost:5000/api/v1/users/:id`

        find-documents-user : GET

  * documents

    1.`http://localhost:5000/api/v1/documents`

        create : POST
        all : GET

    2.`http://localhost:5000/api/v1/documents/:document_id`

        find-one : GET
        update-one : PUT
        delete-one : DELETE

## Contribute to this project
---
##### For fellow folks who have an idea/bug fix or two(even more is fine). You can easily contribute to this project by following the steps below   

1. Fork this repository to your account.
2. Clone your repository: git clone https://github.com/andela-iamao/iamdocuman
3. Create your feature branch: git checkout -b feature/<story-id>/<branch-name>
4. Commit your changes: git commit -m "feature:<awesome-idea>[<story-id>]"
5. Push to the remote branch: git push origin feature/<story-id>/<branch-name>
6. Open a pull request.


## LICENSE
---
iamdocuman is [MIT LICENSED](https://github.com/andela-iamao/documan/blob/production/LICENSE)
