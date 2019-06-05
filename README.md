# Configs:

**install**
````bash
yarn add @pluswerk/webpack-config --dev
````
**package.json**
````json
{
  "scripts": {
    "build": "./node_modules/.bin/webpack --mode production --config node_modules/@pluswerk/webpack-config/webpack.config.js",
    "build:watch": "./node_modules/.bin/webpack -w --mode production --config node_modules/@pluswerk/webpack-config/webpack.config.js",
    "build:dev": "./node_modules/.bin/webpack --mode development --config node_modules/@pluswerk/webpack-config/webpack.config.js",
    "build:dev:watch": "./node_modules/.bin/webpack -w --mode development --config node_modules/@pluswerk/webpack-config/webpack.config.js",
    "serve": "webpack-dev-server --config node_modules/@pluswerk/webpack-config/webpack.hmr.config.js --mode development --colors --progress --inline"
  },
  "devDependencies": {
    "@pluswerk/webpack-config": "file:./webpack-config"
  }
}
````
**build.settings.js**
````js
module.exports = {
  directory: {
    typescript: 'Typescript/',
    scss: 'Scss/',
    generated: 'Generated/',
  },
  entry: {
    main: ['./Typescript/index.ts', './Scss/index.scss']
  }
};
````

# Overwrite configs:
you can overwrite `tsconfig.json`, `tslint.json` and `stylelint.config.js` .
- Either name the file exactly the same and put it in the root directory.
- Or you can adjust the path in build.settings.js and put the file wherever you like.

# Options:
````js
module.exports = {
  directory: {
    typescript: 'Typescript/',
    scss: 'Scss/',
    generated: 'Generated/',
  },
  files: {
    tsConfig: './tsconfig.json',
    tsLint: './tslint.json',
    stylelint: './stylelint.config.js',
  },
  entry: {
    main: ['./Typescript/index.ts', './Scss/index.scss']
  },
  envPath: '.env',
  serverActiveEnv: 'NODE_ACTIVE=TRUE',
  serverInactiveEnv: 'NODE_ACTIVE=FALSE',
}
````

#TODO:
- dosn't lint scss inside vue

