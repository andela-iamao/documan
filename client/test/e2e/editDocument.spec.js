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
      .pause(1000)
      .click('div[class=create-document]')
      .pause(2000)
      .setValue('input[name=title]', 'e2e test')
      .setValue('textarea', 'yada yada random stuff')
      .click('div.create-doc-btn > button')
      .waitForElementVisible('div.document-name > span');
  },
  'Edit document': (browser) => {
    browser
      .click('div[class=doc-card-icon]')
      .pause(2000)
      .waitForElementVisible('div[class="toolbar"]', 4000)
      .click('div.edit-document > div > button')
      .pause(2000)
      .setValue('input[name=title]', 'New')
      .setValue('textarea', 'yada yada random stuff')
      .click('div.update-document > button')
      .pause(2000)
      .expect.element('div.document-title > h5').text.to.contain('e2e testNew');
  },
  after: browser => browser.end()
};
