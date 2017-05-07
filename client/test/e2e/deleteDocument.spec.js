import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(`${config.url}login`)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 3000)
      .setValue('input[type=email]', 'efdee@g.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000);
  },
  'Delete document': (browser) => {
    browser
      .click('div[class=doc-card-icon]')
      .pause(2000)
      .waitForElementVisible('div[class="toolbar"]', 4000)
      .click('div.del-document > div > button')
      .pause(2000)
      .click('.delete-btn > button')
      .pause(2000)
      .assert.urlContains('dashboard');
  },
  after: browser => browser.end()
};
