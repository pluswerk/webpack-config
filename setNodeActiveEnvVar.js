const fs = require('fs');
const os = require('os');

module.exports = function (settings, state = false) {
  let test = 'serverActiveEnv';
  let set = 'serverInactiveEnv';
  if (state) {
    test = 'serverInactiveEnv';
    set = 'serverActiveEnv';
  }
  try {
    let contents = fs.readFileSync(settings.envPath, 'utf8');
    if (!contents.includes(settings[set])) {
      if (contents.includes(settings[test])) {
        contents = contents.replace(settings[test], settings[set]);
      } else {
        contents += os.EOL + settings[set];
      }
      fs.writeFile(settings.envPath, contents, (err) => {
        if (err) throw err;
      });
    }
  } catch (e) {
    console.log('\x1b[31m', os.EOL + os.EOL + 'No env file was found, a valid env-file is needed to run the HMR Server!' + os.EOL);
  }
};
