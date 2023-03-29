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
- Get all stops Endpoint
- Update a stop Endpoint
- Delete a stop Endpoint
- Get a stop by id Endpoint 

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
| 8  | GET    | /api/stops/getStops                  | 200 OK       | public      | Retrieve all stops                         |
| 9  | GET    | /api/stops/getStop/:id               | 200 OK       | public      | Retrieve a stop by a given ID              |
| 10 | POST   | /api/stops/createStop                | 201 CREATED  | public      | Create a new stop                          |
| 11 | PUT    | /api/stops/updateStop/:id            | 200 OK       | public      | Update a stop of a given ID                |
| 12 | DELETE | /api/stops/deleteStop/:id            | 200 OK       | public      | Delete a stop of a given ID                |

