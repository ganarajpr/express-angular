var satisfy = require('./util/satisfy')
  , creds = require('./creds.js');

describe('twitter', function () {
  var app;

  before( function () {
    app = require('./app');
  });

  after( function () {
    app.close();
  });

  it('should successfully login with the right username, password', function (done) {
    this.timeout(10000);
    satisfy('http://local.host:3000/auth/twitter')
      .fill('#oauth_form', {
          'session[username_or_email]': creds.twitter.login
        , 'session[password]': creds.twitter.password })
      .submit()

      .expect('.happy.notice h2').to.have.text('Redirecting you back to the application. This may take a few moments.')

      .click('.happy.notice a')

      .expect('h2').to.have.text('Authenticated')
      .expect('h2').to.not.have.text('Not Authenticated')

      .run(done);
  });
});
