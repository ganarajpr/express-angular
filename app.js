
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    everyauth = require('everyauth'),
    api = require('./routes/api');

/**
 * EVERYAUTH AUTHENTICATION
 * -------------------------------------------------------------------------------------------------
 * allows users to log in and register using OAuth services
 **/

everyauth.debug = true;

// Configure Facebook auth
var usersById = {},
    nextUserId = 0,
    usersByFacebookId = {},
    usersByTwitId = {},
    usersByLogin = {
        'user@example.com': addUser({ email: 'user@example.com', password: 'azure'})
    };

everyauth.
    everymodule.
    findUserById(function (id, callback) {
        callback(null, usersById[id]);
    });


/**
 * FACEBOOK AUTHENTICATION
 * -------------------------------------------------------------------------------------------------
 * uncomment this section if you want to enable facebook authentication.  To use this, you will need
 * to get a facebook application Id and Secret, and add those to settings.json.  See:
 * http://developers.facebook.com/
 **/

//everyauth.
//    facebook.
//    appId(nconf.get('facebook:applicationId')).
//    appSecret(nconf.get('facebook:applicationSecret')).
//    findOrCreateUser(
//	function(session, accessToken, accessTokenExtra, fbUserMetadata){
//	    return usersByFacebookId[fbUserMetadata.claimedIdentifier] ||
//		(usersByFacebookId[fbUserMetadata.claimedIdentifier] =
//		 addUser('facebook', fbUserMetadata));
//	}).
//    redirectPath('/');


/**
 * TWITTER AUTHENTICATION
 * -------------------------------------------------------------------------------------------------
 * uncomment this section if you want to enable twitter authentication.  To use this, you will need
 * to get a twitter key and secret, and add those to settings.json.  See:
 * https://dev.twitter.com/
 **/

everyauth
    .twitter
    .consumerKey("JLCGyLzuOK1BjnKPKGyQ")
    .consumerSecret("GNqKfPqtzOcsCtFbGTMqinoATHvBcy1nzCTimeA9M0")
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
        return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/');

// add a user to the in memory store of users.  If you were looking to use a persistent store, this
// would be the place to start
function addUser (source, sourceUser) {
    var user;
    if (arguments.length === 1) {
        user = sourceUser = source;
        user.id = ++nextUserId;
        return usersById[nextUserId] = user;
    } else { // non-password-based
        user = usersById[++nextUserId] = {id: nextUserId};
        user[source] = sourceUser;
    }
    return user;
}

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
    app.register('.html', require('ejs'));
    app.set('view engine', 'html');
    app.set('view options', {
        layout: false
    });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'omgnodeworks' }));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// Routes
everyauth.helpExpress(app);
app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/partials/:name', routes.partials);

// JSON API

app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);

app.post('/api/addPost', api.addPost);
app.post('/api/editPost', api.editPost);
app.post('/api/deletePost', api.deletePost);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
