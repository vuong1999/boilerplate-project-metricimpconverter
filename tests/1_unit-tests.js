const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  suite('ConvertHandler', () => {
    test('1. read a whole number input', (done) => {
      let input = '4L';
      assert.equal(convertHandler.getNum(input), 4);
      done();
    });

    test('2. read a decimal number input', (done) => {
      let input = '4.9L';
      assert.equal(convertHandler.getNum(input), 4.9);
      done();
    });

    test('3. read a fractional input', (done) => {
      let input = '4/9L';
      let output = 4 / 9;
      output = output.toFixed(5);
      assert.equal(convertHandler.getNum(input), output);
      done();
    });

    test('4. read a fractional input with a decimal', (done) => {
      let input = '4.9/9.4L';
      let output = 4.9 / 9.4;
      output = output.toFixed(5);
      assert.equal(convertHandler.getNum(input), output);
      done();
    });

    test('5. error on a double-fraction', (done) => {
      let input = '4/9/9L';
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test('6. default 1 when no numerical input is provided', (done) => {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });

    test('7. each valid input unit', (done) => {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
      let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((e, index) => assert.equal(convertHandler.getUnit(e), output[index]));
      done();
    });

    test('8. error for an invalid input unit', (done) => {
      let input = ['gala', 'l2', 'mi1', 'km/', 'lbs(', 'kg:'];
      input.forEach((e, index) => assert.equal(convertHandler.getUnit(e), undefined));
      done();
    });

    test('9. unit for each valid input unit', (done) => {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let output = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
      input.forEach((e, index) => assert.equal(convertHandler.getReturnUnit(e), output[index]));
      done();
    });

    test('10. spelled-out string unit for each valid input unit', (done) => {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let output = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((e, index) => assert.equal(convertHandler.spellOutUnit(e), output[index]));
      done();
    });

    test('11. convert gal to L', (done) => {
      let input = '1gal';
      let num = convertHandler.getNum(input);
      let unit = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(num, unit), 3.78541);
      done();
    });

    test('12. convert L to gal', (done) => {
      let input = '1L';
      let num = convertHandler.getNum(input);
      let unit = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(num, unit), 0.26417);
      done();
    });

    test('13. convert mi to km', (done) => {
      let input = '1mi';
      let num = convertHandler.getNum(input);
      let unit = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(num, unit), 1.60934);
      done();
    });

    test('14. convert km to mi', (done) => {
      let input = '1km';
      let num = convertHandler.getNum(input);
      let unit = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(num, unit), 0.62137);
      done();
    });

    test('15. convert lbs to kg', (done) => {
      let input = '1lbs';
      let num = convertHandler.getNum(input);
      let unit = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(num, unit), 0.45359);
      done();
    });

    test('16. convert kg to lbs', (done) => {
      let input = '1kg';
      let num = convertHandler.getNum(input);
      let unit = convertHandler.getUnit(input);
      assert.equal(convertHandler.convert(num, unit), 2.20462);
      done();
    });
  });
});
