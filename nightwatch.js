require('babel-register')();

module.exports = {
  src_folders: ['client/test/e2e/'],
  output_folder: './examples/reports',

  selenium: {
    start_process: true,
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.ie.driver': ''
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      chrome: {
        desiredCapabilities: {
          browserName: 'chrome',
          javascriptEnabled: true // turn off to test progressive enhancement
        }
      },
      exclude: './examples/unittests/*'
    },

    unittests: {
      selenium: {
        start_process: false,
        start_session: false
      },
      filter: './examples/unittests/*',
      exclude: ''
    }
  }
};
