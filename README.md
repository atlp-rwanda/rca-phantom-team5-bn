# PHANTOM-BACKEND

ELEVATE THE PUBLIC TRANSPORT EXPERIENCE

[![Maintainability](https://api.codeclimate.com/v1/badges/bc1821d415fdc0f19d72/maintainability)](https://codeclimate.com/github/atlp-rwanda/rca-phantom-team5-bn/maintainability)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/rca-phantom-team5-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/rca-phantom-team5-bn/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/rca-phantom-team5-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/rca-phantom-team5-bn?branch=develop)
[![codecov](https://codecov.io/gh/atlp-rwanda/rca-phantom-team5-bn/branch/develop/graph/badge.svg?token=6QCWS8ES5Q)](https://codecov.io/gh/atlp-rwanda/rca-phantom-team5-bn)

#### Hosted Swagger Documentation

https://unavailable.com/api/documentation

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
- Get all routes Endpoint
- Update a route Endpoint
- Delete a route Endpoint
- Get a route by id Endpoint 

## POSTMAN COLLECTION URL
https://documenter.getpostman.com/view/8596310/2s93RRxZYQ


#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION


|NO  | VERBS  | ENDPOINTS                            | STATUS       | ACCESS      | DESCRIPTION                                |
|----|--------|--------------------------------------|--------------|-------------|--------------------------------------------|
| 1  | GET    | /api/any-etc                         | 200 OK   
    | public      | Handle all intial or wrong GET requests    |
| 2  | POST   | /api/auth/signin                     | 200 OK       | public      | signin a user with email and password      |
| 3  | POST   | /api/auth/register-user              | 201 CREATED  | privated    | register user & generate password in email |
| 4  | DELETE | /api/auth/logout                     | 200 OK       | public      | logout authanticated user                  |
| 5  | GET    | /api/users/get-profile               | 200 OK       | privated    | view user profile                          |
| 6  | GET    | /api/users/get-user/:id              | 200 OK       | privated    | admin and super admin can view users by id |
| 7  | PUT    | /api/users/update-profile            | 200 OK       | privated    | update user profile                        |
| 8  | GET    | /api/routes/get-routes               | 200 OK       | public      | Retrieve all routes                        |
| 9  | GET    | /api/routes/get-route/:id            | 200 OK       | public      | Retrieve a route by a given ID             |
| 10 | POST   | /api/routes/create-routes            | 201 CREATED  | privated    | Create a new route                         |
| 11 | PUT    | /api/routes/update-route/:id         | 200 OK       | privated    | Update a route of a given ID               |
| 12 | DELETE | /api/routes/delete-route/:id         | 200 OK       | privated    | Delete a route of a given ID               |

