import config from './config';

module.exports = {
  beforeEach: (browser) => {
    browser
      .url(`${config.url}login`)
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('#react-app', 3000)
      .setValue('input[type=email]', 'jane@doe.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000);
  },
  'View document': (browser) => {
    browser
      .click('div[class=doc-card-icon]')
      .pause(2000)
      .assert.visible('div.document-title > h5')
      .assert.urlContains('document')
      .expect.element('div.document-title > h5').text.to.equal('e2e testNew');
  },
  after: browser => browser.end()
};
