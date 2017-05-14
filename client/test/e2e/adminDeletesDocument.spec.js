import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(`${config.url}login`)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 1000)
      .setValue('input[type=email]', 'testuser@gmail.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .pause(2000)
      .waitForElementVisible('.manage', 2000);
  },
  'Admin Deletes Document': (browser) => {
    browser
      .click('span.manage')
      .pause(1000)
      .click('.doc-tab')
      .pause(2000)
      .click('.delete-doc-row')
      .pause(2000)
      .click('.delete-btn')
      .pause(2000)
      .assert.urlContains('manage');
  },
  after: browser => browser.end()
};
