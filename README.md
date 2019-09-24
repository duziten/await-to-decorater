# await-to-decorater

> Async/await decorater for easy error handling in js, inspired by await-to-js

## Pre-requisites
You development need support use async/await functionality.
You can decorate your class property functions with decorator, if you use babel to support class properties

## Feature
- No `try catch` statement, auto catch error
- Very simple to use, support decorate class properties function
- Don't `import to from 'await-to-js'` everywhere, just in `api service` file

## Install
```sh
npm i --save await-to-decorater
# use yarn
yarn add await-to-decorater
```

## Usage
```js
// api.js --- your api service file
import Atd from 'await-to-decorater';
import axios from 'axios';

class ZooService {
  @Atd()
  getAnimal() {
    return axios.get('xxx/animals');
  }

  // class properties and with query
  @Atd()
  getTigers = (type) => {
    return axios.get(`xxx/tigers/${type}`);
  }

  // error extra
  @Atd({ extra: 'example' })
  getLions = () => {
    return axios.get('xxx/tigers');
  }
}
export default new ZooService();

// app.js -- your app or components file etc
import api from './xxx/ZooService';

loadAnimals = async () => {
  //auto catch your async function error, no try catch
  const [err, res] = await api.getAnimal();
  if (err) {
    // error
  } else {
    // 
  }
}

loadTigers = async () => {
  // pass query
  const [err, res] = await api.getTigers('siberian');
  // ...
}

loadLions = async () => {
  const [err, res] = await api.getLions();
  if (err) {
    // err.extra === 'example' same to await-to-js extra
  }
}

```

## Info
These are stage-0 decorators because while the decorators spec has changed and is now stage-2, which is very incompatible with stage-2.
But the js compiler is not yet supported the new decorater proposal,seems to take a long time, so it's safely to use in your project

## License

MIT © duziten
