# Table of contents
- [Table of contents](#table-of-contents)
- [Introduction](#introduction)
- [How to use ?](#how-to-use-)
  - [Example 1 - `Typescript/NodeEnvironment`](#example-1---typescriptnodeenvironment)
  - [Example 2 - `Javascript/NodeEnvironment`](#example-2---javascriptnodeenvironment)


# Introduction

- `debounceCallback` works similar to `useDebounceCallback` hook in [`@react-hook/debounce`](https://www.npmjs.com/package/@react-hook/debounce) library. However `debounceCallback` is not a hook in react.
- `debounceCallback` can work in the backend-node and in other frameworks like ReactJs, VueJs, React Native,....
- Module : `CommonJs`


# How to use ?

## Example 1 - `Typescript/NodeEnvironment`
```ts
import { sleep } from 'sakura-time-service';
import { debounceCallback } from 'debounce-callback';

async function main(){
    const sums:number[] = [];

    const calcSumDebounce = debounceCallback(async (a: number, b: number) => {
        sums.push(a + b);
    }, 600); // wait 600 ms


    for (let i = 0; i < 10; i++) {
        calcSumDebounce(5, i);
        await sleep(100); // waiting for 100 ms
    }

    // latest invoke
    calcSumDebounce(5, 10);
    
    await sleep(1000); // waiting for 1000 ms

    console.log('sums =', sums); // sums = [ 15 ]
}

main();

```


## Example 2 - `Javascript/NodeEnvironment`

```js
const { sleep } = require('sakura-time-service');
const { debounceCallback } = require('debounce-callback');

async function main(){
    const sums = [];

    const calcSumDebounce = debounceCallback(async (a, b) => {
        sums.push(a + b);
    }, 600); // wait 600 ms


    for (let i = 0; i < 10; i++) {
        calcSumDebounce(5, i);
        await sleep(100); // waiting for 100 ms
    }

    // latest invoke
    calcSumDebounce(5, 10);
    
    await sleep(1000); // waiting for 1000 ms

    console.log('sums =', sums); // sums = [ 15 ]
}

main();

```

