# Express Angular Seed with EveryAuth and Bootstrap


_This repo is inspired by [Angular Express Seed] (https://github.com/btford/angular-express-seed)._

_I could not find a single example application that worked fine with oauth. I always wanted a setup with
angular, server side ( rails or node! ) exposing api's with oauth for authentication and any nosql db. I couldnt find any
so I started writing my own. This would be my ideal setup for a project as well. Eventually I plan to expand this setup to
include all the technologies I mentioned above._

Start an awesome app with AngularJS on the front, Express + Node on the back. This project is an
application skeleton for a typical [AngularJS][AngularJS] web app for those who want
to use Node to serve their app.

The seed app shows how to wire together Angular client-side components with Express on the server and have OAuth setup, so that you dont have to worry about
authentication of your user.

##Note :

Unlike _Angular Express Seed_ this project uses html itself as the templating engine which I personally find more comfortable.

## How to use

### Prepare your environment

Clone the express-angular repository

You might need to download some node modules

    npm install

Set the following environment variables if using Twitter authentication.  These defaults are from the everyauth module, but you should get your own at [Twitter's Developer site][Twitter]

    TWITTER_CONSUMER_KEY=JLCGyLzuOK1BjnKPKGyQ
    TWITTER_CONSUMER_SECRET=GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0


### Running the app

Runs like a typical express app:

    node app.js
    
Or you can run it this way to automatically reload any changes you make

    nodemon app.js

## References

* [AngularJS][AngularJS]
* [Express][Express]
* [everyauth][everyauth]
* [Twitter Developers] [Twitter]

[AngularJS]: http://angularjs.org/ "AngularJS"
[Express]: http://expressjs.com/ "Express"
[everyauth]: https://github.com/bnoguchi/everyauth "everyauth"
[Twitter]: https://dev.twitter.com "Twitter Developers"
