const R = require("ramda");
const indexByKey = require("../src/indexByKey");

const data = [
  {
    "id": 1,
    "first_name": "Julian",
    "last_name": "Coleman",
    "email_address": "julcol03@gmail.com",
  },
];

describe("#indexByKey", () => {
  it("should return a function", () => {
    const indexById = indexByKey("id");

    expect(indexById).to.be.a("function");
  });

  it("should not mutate or destroy the original array", () => {
    indexByKey("id")(data);

    expect(data).to.be.an("array");
  });

  context("should throw the following error if an object is passed in", () => {
    it("reduce: list must be array or iterable", () => {
      const indexById = indexByKey("id");
      const badFn = () => indexById({});

      expect(badFn).to.throw(TypeError, "reduce: list must be array or iterable");
    });
  });

  it("should return an empty object when a string is passed in", () => {
    const indexById = indexByKey("id");

    expect(indexById("")).to.be.an.instanceOf(Object);
  });

  it("should return an object", () => {
    const indexById = indexByKey("id");
    const obj = indexById(data);

    expect(obj).to.be.an.instanceOf(Object);
  });

  it("should not have the property specified as the indexer", () => {
    const key = "id";
    const indexById = indexByKey(key);
    const obj = indexById(data);

    const predicate = R.map(R.complement(R.has(key)));
    const isTrue = R.equals(true);

    const sanitizedData = R.values(predicate(obj));
    const result = R.all(isTrue, sanitizedData);

    expect(result).to.be.true;
  });
});
