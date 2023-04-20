# PHANTOM-BACKEND

ELEVATE THE PUBLIC TRANSPORT EXPERIENCE

[![Maintainability](https://api.codeclimate.com/v1/badges/bc1821d415fdc0f19d72/maintainability)](https://codeclimate.com/github/atlp-rwanda/rca-phantom-team5-bn/maintainability)
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/atlp-rwanda/rca-phantom-team5-bn/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/atlp-rwanda/rca-phantom-team5-bn/tree/develop)
[![Coverage Status](https://coveralls.io/repos/github/atlp-rwanda/rca-phantom-team5-bn/badge.svg?branch=develop)](https://coveralls.io/github/atlp-rwanda/rca-phantom-team5-bn?branch=develop)
[![codecov](https://codecov.io/gh/atlp-rwanda/rca-phantom-team5-bn/branch/develop/graph/badge.svg?token=6QCWS8ES5Q)](https://codecov.io/gh/atlp-rwanda/rca-phantom-team5-bn)

## HOSTED SERVER URL

https://phatom-team-5.herokuapp.com

#### Hosted Swagger Documentation

https://phatom-team-5.herokuapp.com/api/api-docs

#### Github Repository For Phantom Backend

https://github.com/atlp-rwanda/rca-phantom-team5-bn


<br>

## COMPLETED FEATURES

- Initial Endpoint.
- Register Endpoint.
- Signin Endpoint.
- Get profile Endpoint.
- Get all users profile for admins and super admin Endpoint.
- Get paginated list of drivers by operator endpoint
- Assign bus to driver by operator endpoint
- Update profile Endpoint.
- Get all routes Endpoint
- Update a route Endpoint
- Delete a route Endpoint
- Get a route by id Endpoint
- Create bus Endpoint
- Get all buses Endpoint
- Get one bus Endpoint
- Update a bus Endpoint
- Delete a bus Endpoint
- Reset Password Endpoint
- Delete driver or operator

## POSTMAN COLLECTION URL
https://documenter.getpostman.com/view/8596310/2s93RRxZYQ


#### TABLE OF API ENDPOINTS SPECIFICATION AND DESCRIPTION


|NO  | VERBS  | ENDPOINTS                            | STATUS       | ACCESS      | DESCRIPTION                                |
|----|--------|--------------------------------------|--------------|-------------|--------------------------------------------|
| 1  | GET    | /api/any-etc                         | 200 OK       | public      | Handle all intial or wrong GET requests    |
| 2  | POST   | /api/auth/signin                     | 200 OK       | public      | signin a user with email and password      |
| 3  | POST   | /api/auth/register-user              | 201 CREATED  | private     | register user & generate password in email |
| 4  | DELETE | /api/auth/logout                     | 200 OK       | public      | logout authanticated user                  |
| 5  | GET    | /api/users/get-profile               | 200 OK       | private     | view user profile                          |
| 6  | GET    | /api/users/get-user/:id              | 200 OK       | private     | admin and super admin can view users by id |
| 7  | GET    | /api/users/get-drivers               | 200 OK       | private     | Operator able to get list of drivers       |
| 8  | DELETE | /api/users/delete-user/:id           | 200 OK       | private     | Delete user by id                          |  
| 9  | POST   | /api/buses/assign-bus                | 200 OK       | private     | Operator able to assign bus to driver      |
| 10 | PUT    | /api/users/update-profile            | 200 OK       | private     | update user profile                        |
| 11 | GET    | /api/routes/get-routes               | 200 OK       | public      | Retrieve all routes                        |
| 12 | GET    | /api/routes/get-route/:id            | 200 OK       | public      | Retrieve a route by a given ID             |
| 13 | POST   | /api/routes/create-routes            | 201 CREATED  | private     | Create a new route                         |
| 14 | PUT    | /api/routes/update-route/:id         | 200 OK       | private     | Update a route of a given ID               |
| 15 | DELETE | /api/routes/delete-route/:id         | 200 OK       | private     | Delete a route of a given ID               |
| 16 | POST   | /api/buses/create-bus                | 2001 CREATED | private     | create a bus                               |
| 17 | GET    | /api/buses/get-buses                 | 200 OK       | public      | get all buses                              |
| 18 | GET    | /api/buses/get-bus/:id               | 200 OK       | public      | get one bus by bus id                      |
| 19 | UPDATE | /api/buses/update-bus/:id            | 200 OK       | private     | update a bus by bus id                     |
| 20 | DELETE | /api/buses/delete-bus/:id            | 200 OK       | private     | delete by by bus id                        |
| 21 | POST   | /api/auth/reset-password             | 200 OK       | public      | Send Reset Password Email                  | 
| 22 | POST   | /api/auth/reset-password/:token      | 200 OK       | public      | Reset password                             |  



