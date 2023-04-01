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
- Register Endpoint.
- Signin Endpoint.
- Get profile Endpoint.
- Get all users profile for admins and super admin Endpoint.
- Update profile Endpoint.
- Create bus Endpoint
- Get all buses Endpoint
- Get one bus Endpoint
- Update a bus Endpoint
- Delete a bus Endpoint

## POSTMAN COLLECTION URL
https://documenter.getpostman.com/view/8596310/2s93RRxZYQ


#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION


|NO  | VERBS  | ENDPOINTS                            | STATUS       | ACCESS      | DESCRIPTION                                |
|----|--------|--------------------------------------|--------------|-------------|--------------------------------------------|
| 1  | GET    | /api/any-etc                         | 200 OK       | public      | Handle all intial or wrong GET requests    |
| 2  | POST   | /api/auth/signin                     | 200 OK       | public      | signin a user with email and password      |
| 3  | POST   | /api/auth/register-user              | 201 CREATED  | privated    | register user & generate password in email |
| 4  | DELETE | /api/auth/logout                     | 200 OK       | public      | logout authanticated user                  |
| 5  | GET    | /api/users/get-profile               | 200 OK       | privated    | view user profile                          |
| 6  | GET    | /api/users/get-user/:id              | 200 OK       | privated    | admin and super admin can view users by id |
| 7  | PUT    | /api/users/update-profile            | 200 OK       | privated    | update user profile                        |
|8   | GET    | /api/buses/get-buses                 | 200 OK       | public      | get all buses                              |
|9   | GET    | /api/buses/get-bus/:id               | 200 OK       | public      | get one bus by bus id                      |
|10  | POST   | /api/buses/create-bus                | 2001 CREATED | privated    | create a bus                               |
|11  | DELETE | /api/buses/delete-bus/:id            | 200 OK       | privated    | delete by by bus id                        |
|12  | UPDATE | /api/buses/update-bus/:id            | 200 OK       | privated    | update a bus by bus id                     |