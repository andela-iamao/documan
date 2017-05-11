import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(`${config.url}login`)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 1000);
  },
  'Admin Users': (browser) => {
    browser
      .setValue('input[type=email]', 'testuser@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .assert.urlContains('app')
      .pause(2000)
      .expect.element('span.manage > div > div > div:nth-of-type(2)').to.be.present;
  },
  after: browser => browser.end()
};
