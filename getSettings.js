const path = require('path');
const fs = require('fs');

function resolvePath(file) {
  if (fs.existsSync(path.resolve(__dirname, '../../../' + file))) {
    return './' + file;
  }
  return './node_modules/@pluswerk/webpack-config/' + file;
}

const defaultSettings = {
  directory: {
    typescript: 'Typescript/',
    scss: 'Scss/',
    generated: 'Generated/',
  },
  files: {
    tsConfig: resolvePath('tsconfig.json'),
    tsLint: resolvePath('tslint.json'),
    stylelint: resolvePath('stylelint.config.js'),
  },
  entry: {},
  envPath: '.env',
  serverActiveEnv: 'NODE_ACTIVE=TRUE',
  serverInactiveEnv: 'NODE_ACTIVE=FALSE',
};

module.exports = function () {
  let settings = defaultSettings;
  const buildSettingsFile = path.resolve(__dirname, '../../../build.settings.js');
  let buildSettings = {};
  try {
    buildSettings = require(buildSettingsFile);
  } catch (e) {
    throw new Error('You need to have a build.settings.js file at location: ' + buildSettingsFile + '.' + '\n' + (e.message || ''));
  }
  Object.assign(settings, buildSettings);
  return settings;
};
