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
      .pause(1000)
      .waitForElementVisible('.create-document', 3000);
  },
  'Create document': (browser) => {
    browser
      .click('div[class=create-document]')
      .pause(2000)
      .setValue('input[name=title]', 'e2e test')
      .setValue('textarea', 'yada yada random stuff')
      .click('div.create-doc-btn > button')
      .pause(2000)
      .expect.element('div.document-name > span').text.to.contain('e2e test');
  },
  after: browser => browser.end()
};
