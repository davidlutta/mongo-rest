# Mongo Rest Api
Node **REST** API that utilizes jwt authentication and has some pagination. The api persists data in a local mongo no-sql database.
#### Libraries used:
* bcryptjs
* body-parser
* cors
* dotenv
* express
* helmet
* jsonwebtoken
* mongoose
* mongoose-paginate-v2
* morgan
* nodemon

## Getting Started 
1. Run `npm install` to install all the required packages
2. Create a .env file and add:
    * A `DATABASE_URL` path
    * A mongodb `DATABASE_NAME`
    * A free `PORT` number. The default port is 3000
    * The `CONFIG` secret to sign jwt users
3. Run `npm start` to start the server
4. Head over to `localhost:3000/api/auth/register` to register a new user and you will receive a token which expires in 24 hours ! 😢 
5. Use the token with the header `api-key` to access the other routes
#### Have Fun !! 😊
