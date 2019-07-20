# Configs:

**install**
````bash
yarn add @pluswerk/webpack-config --dev
````
**package.json**
````json
{
  "scripts": {
    "build": "webpack --mode production --config node_modules/@pluswerk/webpack-config/webpack.config.js --hide-modules",
    "build:watch": "webpack --watch --mode production --config node_modules/@pluswerk/webpack-config/webpack.config.js --hide-modules",
    "build:dev": "webpack --mode development --config node_modules/@pluswerk/webpack-config/webpack.config.js --hide-modules",
    "build:dev:watch": "webpack --watch --mode development --config node_modules/@pluswerk/webpack-config/webpack.config.js --hide-modules",
    "serve": "webpack-dev-server --config node_modules/@pluswerk/webpack-config/webpack.hmr.config.js --mode development --colors --progress --inline --hide-modules"
  },
  "sideEffects": true
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
you can overwrite `tsconfig.json`, `tslint.json` and `stylelint.config.js`.
- Either name the file exactly the same and put it in the root directory.
- Or you can adjust the path in build.settings.js and put the file wherever you like.

These files should extend the defaults of the package. See:

**example tsconfig.json**
````json
{
  "extends": "./node_modules/@pluswerk/webpack-config/tsconfig",
  "files": [
    "pathToYourTsFiles/index.ts",
    "pathToYourTsFiles/types.d.ts",
    "pathToYourTsFiles/vue-shims.d.ts",
  ],
  "include": [
    "pathToYourTsFiles/**/*.ts",
    "pathToYourTsFiles/**/*.vue"
  ],
  "exclude": [
    "node_modules/"
  ],
  "types": [
    "node"
  ]
}
````

**example overwrite tslint.json**
````json
{
  "extends": "./node_modules/@pluswerk/webpack-config/tslint.json"
}
````

**example overwrite stylelint.config.js**
````js
module.exports = {
  extends: './node_modules/@pluswerk/webpack-config/stylelint.config.js'
}
````


# Options of build.settings.js:
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
  // more info on definePlugin: https://webpack.js.org/plugins/define-plugin/
  definePlugin: {
    BOOLEAN_ENV: !!process.env.BOOLEAN_ENV,
    STRING_ENV: JSON.stringify(process.env.STRING_ENV),
  },
  webpackConfig: {},
}
````

> !!! TIP: you can overwrite all the webpackConfig parameters within build.settings.js

# Example .vue file

`Component.vue`
````.vue
<!-- currently it is not possible to use inline Typescript files. -->
<script lang="ts" src="./Component.ts"></script>

<template>
  <div class="background--red">
    Green
  </div>
</template>

<!-- to bundle vue's css into js and not bundle "normal" css, it is required to set the lang to vue-scss -->
<style lang="vue-scss" type="text/scss" scoped>
  .background--red { 
    background: red;
  }
</style>
````

`Component.ts`
````typescript
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  props: {
    value: Array,
  },
})
export default class FilterMultiSelect extends Vue {
  get internalValue() {
    return this.$props.value.filter(el => !!el);
  }
}
````

# TODO:
- dosn't lint scss inside vue
- `sideEffects:true` https://github.com/vuejs/vuepress/issues/718
