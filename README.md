# Index By Key

[![Build Status](https://semaphoreci.com/api/v1/juliancoleman/index-by-key/branches/master/badge.svg)](https://semaphoreci.com/juliancoleman/index-by-key)
[![npm version](https://badge.fury.io/js/%40juliancoleman%2Findex-by-key.svg)](https://badge.fury.io/js/%40juliancoleman%2Findex-by-key)

A curried function using Ramda that transforms an array of
objects into an object of objects, where the key is the key
specified and the value is the rest of the object. The
function will return a new object and will not mutate or
destroy the original array.

## Install

### `yarn`

```sh
yarn add @juliancoleman/index-by-key
```

### `npm`

```sh
npm i -S @juliancoleman/index-by-key
```

### Setup

This package provides the single function mentioned above.
You can specify the key on `require`, or you can specify a
key to `indexBy` later on.

```js
// initialize without specified key
const indexByKey = require("@juliancoleman/index-by-key");

// initialize with specified key at require
const indexById = require("@juliancoleman/index-by-key")("id");

// initialize with specified key later
const indexByFirstName = indexByKey("first_name");
```

Once required and a key is specified, you can then call the
function on your data to see the transformation. Again, the
function will return a new object and will not mutate or
destroy the original array.

Below is an example use on a `Promise` object returned by
an asynchronous database call:

```js
const indexByKey = require("@juliancoleman/index-by-key");

const { getUsers } = appRequire("path/to/API");

(async () => {
  const indexById = indexByKey("id");
  const users = await getUsers();

  /*
  Example `users`

  [ { "id": 1,
      "first_name": "Julian",
      "last_name": "Coleman",
      "email_address": "julcol03@gmail.com" },
    { "id": 2,
      "first_name": "Bob",
      "last_name": "Sagget",
      "email_address": "bob@sagget.com" } ]
  */

  if (!users) {
    throw new Error("Unable to retrieve users");
  }

  return indexById(users);

})();

/*
results in the following output

  { "1": { "first_name": "Julian",
           "last_name": "Coleman",
           "email_address": "julcol03@gmail.com"
         },
    "2": { "first_name": "Bob",
           "last_name": "Sagget",
           "email_address": "bob@sagget.com" } }
*/
```

Alternatively, this same thing can be achieved by doing the
following:

```js
API.getUsers().then(indexByKey("id"));
```
