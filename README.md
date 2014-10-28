passport-local-ng-example
=========================

###Explanation
This is a really simple example of how to use Express, Passport (local), Mongo (Mongoose) and Angular to achieve a single page application that honors authentication.

###Considerations
1. You would absolutely want to encrypt password fields. Check out `bcrypt` for hashing passwords
1. Check out other resources like those below, to learn more.
  * [Tutorial that uses bcrypt for hashing](http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt)
  * [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose), could make your life easier
  * You'd want to make sure you check if a user exists before trying to create another (your /auth/register endpoint would need to be more complete).
  * [Tutorial](http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619)
