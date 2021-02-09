# Response

## usage

```javascript
const SeedResponse = require('yyl-seed-respnse')

const iRes = new SeedResponse()

iRes
  .on('msg', (...argv) => {
    console.log(argv) // hello, world
  })
  .on('finished', (a, b) => {
    console.log(a) // hello
    console.log(b) // world
  })

iRes.trigger('msg', ['hello', 'world'])
iRes.trigger('finished', ['hello', 'world'])
```

## sdk

### iRes

```
const iRes = new seedResponse();
```

### iRes.on()

```
/**
 * @param {String}   eventName   事件名称
 * @param {Function} fn(...argv) 回调函数
 * @param {Array}    ...argv     函数内 arguments
 */
iRes.on(eventName, fn);
```

### iRes.trigger()

```
/**
 * @param {String} eventName 事件名称
 * @param {Array}  argv      参数
 */
iRes.trigger(eventName, argv);
```
