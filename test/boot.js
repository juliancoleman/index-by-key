process.env.NODE_ENV = "test";

require("co-mocha");
const chai = require("chai");
const chaiSubset = require("chai-subset");

chai.use(chaiSubset);

global.expect = chai.expect;
