# e-commerce-system-expressjs

## features
- Login (User will login using username & password).
- User can View products from list
	•	Each item has category, name, brand, price
	•	Users can only see the products its prices less or equal his maximum allowed limit
	•	Once user requested a product its price deducted from his allowed limit and
	•	If the request failed the deducted amount should be released and returned to his limit
- request products
- cancel requests if it is not delivered
****
- **Framework Used (expressJS with MySql)**

- **Node App deployed on Heroku and DB on AWS personal RDS instance**

## flow
- use **register/test** api for creating sample user for testing.
	the api will create and return a username
	this username is auto generated with word "test" then "-" then random number.

	this random number is the password you can use to test
	**ex**: test-1635381942 then **username** is test-1635381942 and **password** is 1635381942
	 api public end-point (POST): https://dry-atoll-52485.herokuapp.com/api/v1/auth/register/test

- then you can **login** using your username and password using login api
api public end-point (POST): https://dry-atoll-52485.herokuapp.com/api/v1/auth/login
	 login will return a **token** and you have to place this token in the header as Bearer token for subsequent APIs

- then logged in user can **fetch** within limit products using this api (GET): https://dry-atoll-52485.herokuapp.com/api/v1/product/

- then the user can **request a product** (*I assumed that the user can request same product mutliple times so for each one a new request created normally*) using this api (POST): https://dry-atoll-52485.herokuapp.com/api/v1/product/:productId/request
	the request will deduct from user allowed limit

- and user can cancel the request using this API (PATCH):  https://dry-atoll-52485.herokuapp.com/api/v1/product/:productId/request/:requestId/cancel
	and canceling the request **if request is not deleivered or canceled before** will refund the user with the deducted amount upon request

## Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/264883-9dd183ac-57bf-4063-a64c-cb14cb4fc48b?action=collection%2Ffork&collection-url=entityId%3D264883-9dd183ac-57bf-4063-a64c-cb14cb4fc48b%26entityType%3Dcollection%26workspaceId%3D1cf49d09-22c4-45ac-8e99-393b0beea99d)