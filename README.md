# PHANTOM-BACKEND

ELEVATE THE PUBLIC TRANSPORT EXPERIENCE

[![Maintainability](https://api.codeclimate.com/v1/badges/bc1821d415fdc0f19d72/maintainability)](https://codeclimate.com/github/atlp-rwanda/rca-phantom-team5-bn/maintainability)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/rca-phantom-team5-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/rca-phantom-team5-bn/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/rca-phantom-team5-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/rca-phantom-team5-bn?branch=develop)
[![codecov](https://codecov.io/gh/atlp-rwanda/rca-phantom-team5-bn/branch/develop/graph/badge.svg?token=6QCWS8ES5Q)](https://codecov.io/gh/atlp-rwanda/rca-phantom-team5-bn)

#### Hosted Swagger Documentation

https://phatom-team-5.onrender.com/api-docs 

#### Github Repository For Phantom Backend

https://github.com/atlp-rwanda/rca-phantom-team5-bn


<br>

## COMPLETED FEATURES

- Initial Endpoint.
- Signin Endpoint.


#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION


|NO  | VERBS  | ENDPOINTS                            | STATUS       | ACCESS      | DESCRIPTION                                |
|----|--------|--------------------------------------|--------------|-------------|--------------------------------------------|
| 1  | GET    | /api/any-etc                         | 200 OK       | public      | Handle all intial or wrong GET requests    |
| 2  | POST   | /api/auth/signin                     | 200 OK       | public      | signin a user with email and password      |
| 3  | POST   | /api/auth/register-user              | 201 CREATED  | privated    | register user & generate password in email |
| 3  | PUT    | /api/users/update-profile/:id        | 200 OK       | public      | update user names, email and password      |
