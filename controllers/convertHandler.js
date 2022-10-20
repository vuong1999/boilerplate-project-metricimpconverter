function ConvertHandler() {
  this.getNum = function (input) {
    let cut_index = /[a-z]/i.exec(input)?.index;
    if (!cut_index) return 1;
    if (cut_index <= -1) return null;
    if (cut_index === 0) return 1;

    let result = input.slice(0, cut_index);

    let tmp_result = `${result[result.length - 1]}`;
    if (/[0-9]|[,]/i.exec(tmp_result)?.index !== 0) return null;

    let count = result.split('/').length - 1;
    if (count > 1) return null;
    if (count === 1) {
      let arr = result.split('/');
      result = Number(arr[0]) / Number(arr[1]);
      return parseFloat(result.toFixed(5));
    } else {
      result = Number(result);
      if (isNaN(result)) return null;
      return parseFloat(result.toFixed(5));
    }
  };

  this.getUnit = function (input) {
    let cut_index = /[a-z]/i.exec(input).index;
    if (cut_index <= -1) return null;

    const arr_unit = Object.entries(UNIT).map((e) => e[0]);
    let unit = input.slice(cut_index, input.length);
    let index = arr_unit.indexOf(unit.toUpperCase());
    if (index > -1) return UNIT[`${arr_unit[index]}`].unit;

    return null;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit?.toUpperCase()) {
      case UNIT.GAL.unit.toUpperCase():
        result = UNIT.L.unit;
        break;
      case UNIT.L.unit.toUpperCase():
        result = UNIT.GAL.unit;
        break;
      case UNIT.MI.unit.toUpperCase():
        result = UNIT.KM.unit;
        break;
      case UNIT.KM.unit.toUpperCase():
        result = UNIT.MI.unit;
        break;
      case UNIT.LBS.unit.toUpperCase():
        result = UNIT.KG.unit;
        break;
      case UNIT.KG.unit.toUpperCase():
        result = UNIT.LBS.unit;
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit?.toUpperCase()) {
      case UNIT.GAL.unit.toUpperCase():
        result = UNIT.GAL.spell;
        break;
      case UNIT.L.unit.toUpperCase():
        result = UNIT.L.spell;
        break;
      case UNIT.MI.unit.toUpperCase():
        result = UNIT.MI.spell;
        break;
      case UNIT.KM.unit.toUpperCase():
        result = UNIT.KM.spell;
        break;
      case UNIT.LBS.unit.toUpperCase():
        result = UNIT.LBS.spell;
        break;
      case UNIT.KG.unit.toUpperCase():
        result = UNIT.KG.spell;
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case UNIT.GAL.unit:
        result = initNum * galToL;
        break;
      case UNIT.L.unit:
        result = initNum / galToL;
        break;
      case UNIT.LBS.unit:
        result = initNum * lbsToKg;
        break;
      case UNIT.KG.unit:
        result = initNum / lbsToKg;
        break;
      case UNIT.MI.unit:
        result = initNum * miToKm;
        break;
      case UNIT.KM.unit:
        result = initNum / miToKm;
        break;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;
    initUnit = this.spellOutUnit(initUnit);
    returnUnit = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
}

module.exports = ConvertHandler;

const UNIT = {
  GAL: {
    unit: 'gal',
    spell: 'gallons',
  },
  L: {
    unit: 'L',
    spell: 'liters',
  },
  KM: {
    unit: 'km',
    spell: 'kilometers',
  },
  MI: {
    unit: 'mi',
    spell: 'miles',
  },
  LBS: {
    unit: 'lbs',
    spell: 'pounds',
  },
  KG: {
    unit: 'kg',
    spell: 'kilograms',
  },
};
