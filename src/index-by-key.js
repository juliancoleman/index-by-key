const {
  indexBy,
  map,
  omit,
  pipe,
  prop,
} = require("ramda");

const indexByKey = key => pipe(
  indexBy(prop(key)),
  map(omit([key])) // eslint-disable-line
);

module.exports = indexByKey;
