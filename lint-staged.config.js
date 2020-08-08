'use strict';

module.exports = {
  '**/*.ts?(x)': (filenames) => [
    `env NODE_ENV=production tslint --fix ${filenames.join(' ')}`,
  ],
};
