# Clicka API

## Overall Objective
Create restful APIs for a communications application in Vue, Node.js, Express, MongoDB, and Swagger.

## Project setup

- [Install Node](https://nodejs.org/en/download/) if you do not have it already.
- [Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) if you do not have it already.
- Clone the repo `git clone https://github.com/Odumz/clientelleAPI.git`
- Create a env file by running `touch .env`
- Copy the fields from `sample_env` and replace with correct fields in your `.env` file.
- Install all dependencies by running `npm install || npm i`
- Seed the database by running `npm run seed`

### Compiles and hot-reloads for development
Run `npm run dev` to start the development server. It will automatically rebuild the app upon file change.

local url for development: http://localhost:5000 //or PORT

### Compiles and hot-reloads for production
Run `npm run build` to start the production server.

### Run tests
Run `npm run test` in the terminal to run the tests.

## Project links
- [GitHub](https://github.com/Odumz/clickaAPI.git)
- [Swagger Documentation](https://clicka-be.herokuapp.com/api-docs)
- [Demo Link](https://clicka-be.herokuapp.com/
- [Front-end Demo](https://clicka.vercel.app/)
- [Postman](https://www.getpostman.com/collections/d01055eb12328d0cfc15)

### How to use the Swagger Documentation
#### Live Documenation
 - Click on [this link](https://clicka-be.herokuapp.com/api-docs) to open the hosted swagger documentation
 - Change the schemes to `https` and click on `Try it out` to execute the request

#### Local Documenation
 - Click on [this link](http://localhost:5000/api-docs) or copy and paste `http://localhost:PORT/api-docs` to your browser to open the local swagger documentation where port is your defined port variable in the env file.
 - Change the schemes to `http` and click on `Try it out` to execute the request

### How to use the Postman Documentation
 - Click on [this link](https://www.postman.com/downloads) to download and install postman for your system if you do not have it already.
 - Open the postman application and click on `Import` to import the postman collection. 
 - Click on `Import` and select the `Link` from the options.
 - Copy [this link](https://www.getpostman.com/collections/d01055eb12328d0cfc15) `https://www.getpostman.com/collections/d01055eb12328d0cfc15` and paste it in the `Link` field.
 - Click on `Continue` to finish import and it will automatically open the postman collection.
```
Postman environment variables:
 {{ URL }} : http://localhost:5000 //or PORT - local url for development
 {{ URL_API }} : http://localhost:5000/api/v1 //or PORT/api/v1 - local api url for development
 {{ AUTH_API }} : http://localhost:5000/api/v1/auth //or PORT/api/v1/auth - local api url for development
 {{ USER_API }} : http://localhost:5000/api/v1/user //or PORT/api/v1/user - local api url for development
 {{ PLANS_API }} : http://localhost:5000/api/v1/userplan //or PORT/api/v1/userplan - local api url for development
 {{ LURL }} : https://clicka-be.herokuapp.com/- live url for development
 {{ URL_LAPI }} : https://clicka-be.herokuapp.com/api/v1 - live api url for development
 {{ AUTH_LAPI }} : https://clicka-be.herokuapp.com/api/v1/auth // auth - live api url for development
 {{ USER_LAPI }} : https://clicka-be.herokuapp.com/api/v1/user // user - live api url for development
 {{ PLANS_LAPI }} : https://clicka-be.herokuapp.com/api/v1/userplan // userplan - live api url for development
 ```