# 如何优雅的处理你的`async/await`函数

> 优雅处理`async`异步错误

## 现阶段

现阶段我们使用`async`函数的优化我们异步逻辑的时候，也面临着如何处理`async`函数错误的问题，一般而言我们有下面两种方式：

```js
/* 一： 将api函数放在`try catch`代码块中，捕获异步错误 */
async function getUserInfo(userId) {
  let user;
  try {
    user = await getUser(userId);
  } catch (error) {
    user = null;
  }
  if (user) {
    // todu
  }
}
```

```js
/* 二： 将api函数后cantch，捕获异步错误 */
async function getUserInfo(userId) {
  let user;
  user = await getUser(userId).catch(error => {
    // catch error
  });
  if (user) {
    // todu
  }
}
```

以上无论哪种方法都会在我们的业务逻辑中充斥着大量的`catch`语句，不够简洁易读，实际上我们不想写太多的错误处理逻辑，我们想要达到的**目标**如下:

```js
/* 没有try catch, 类似于node的回调风格 */
async function getUserInfo(userId) {
  const [err, user] = await getUser(userId);
  if (err) {
    // 出错了
  } else {
    // 请求成功
  }
}
```

对的，上面的处理逻辑更加优雅，请求成功`err = null; user = data`，请求出错 `err = [Error Object]; user = null`。你应该看过大量的文章如何做到:

```js
// 内部处理api函数的错误的工具函数
async function asyncWrapper(fn) {
  return fn
    .then(function(data) {
      return [null, data];
    })
    .catch(function(err) {
      return [err, undefined];
    });
}

/* 非常简单的使用  */
import { asyncWrapper } from './utils';

async function getUserInfo(userId) {
  const [err, user] = await asyncWrapper(getUser(userId));
  if (err) {
    // 出错了
  } else {
    // 请求成功
  }
}
```

如你所见，你以为我是要向你安利一个工具函数吗，错了实际上我们不需要重复造轮子了[await-to-js](https://www.npmjs.com/package/await-to-js),早就有人为我们写出来了!
所以使用`await-to-js`去捕获你的异步逻辑,非常清爽~：

```js
import to from 'await-to-js';

async function getUserInfo(userId) {
  const [err, user] = await to(getUser(userId));
  if (err) {
    // 出错了
  } else {
    // 请求成功
  }
}
```

这就结束了吗？你会发现每次用到`async`函数的时候都需要去导入工具函数`to`，使用的时候去包裹`api`函数。所以，能不能更近一步，根本不想每个文件都去导入工具函数，像我们一开始期望那样，直接使用`api`函数？
当然可以，基于`await-to-js`我写了一个[await-to-decorater](https://www.npmjs.com/package/await-to-decorater):

```js
/* 为了使用装饰器，你的service文件应该导出一个类实例 */
import Catch from 'await-to-decorater';

class UserApi {
  @Catch()
  getUser() {
    return request('http://xxxx');
  }

  // 或者箭头函数也是支持的！
  @Catch()
  getUser = () => {
    return request('http://xxxx');
  };
}

export default new UserApi();
```

```js
/* 现在我们可以这么用,没有了引入工具函数，没有了try catch*/
import { getUser } from 'service/user';

async function getUserInfo(userId) {
  const [err, user] = await getUser(userId);
  if (err) {
    // 出错了
  } else {
    // 请求成功
  }
}
```

装饰器是默认导出的，当然也可以像`await-to-js`一样引入工具函数直接使用：`import { to } from 'await-to-decorater'`，如果你使用`await-to-docorater`就不需要再次引入`await-to-js`。
**原理**：实际上原理也很简单，使用装饰器在 api 函数导出的时候加入了捕获错误的逻辑，使用的时候就不需要再任一文件中引入工具函数了；同时，为了使用装饰器我们需要将`service`文件导出一个类实例，和单纯导出
一个函数相比也没有任何成本。
最后，请为你的`async`函数添加上错误逻辑处理吧！
