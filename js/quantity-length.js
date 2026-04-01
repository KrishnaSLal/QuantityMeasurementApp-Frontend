const measurementData = {
    length: {
        units: ["millimeter", "centimeter", "meter", "kilometer", "inch", "foot", "yard"],
        base: "meter",
        toBase: {
            millimeter: (v) => v / 1000,
            centimeter: (v) => v / 100,
            meter: (v) => v,
            kilometer: (v) => v * 1000,
            inch: (v) => v * 0.0254,
            foot: (v) => v * 0.3048,
            yard: (v) => v * 0.9144
        },
        fromBase: {
            millimeter: (v) => v * 1000,
            centimeter: (v) => v * 100,
            meter: (v) => v,
            kilometer: (v) => v / 1000,
            inch: (v) => v / 0.0254,
            foot: (v) => v / 0.3048,
            yard: (v) => v / 0.9144
        }
    },

    weight: {
        units: ["gram", "kilogram", "ton", "pound"],
        base: "gram",
        toBase: {
            gram: (v) => v,
            kilogram: (v) => v * 1000,
            ton: (v) => v * 1000000,
            pound: (v) => v * 453.592
        },
        fromBase: {
            gram: (v) => v,
            kilogram: (v) => v / 1000,
            ton: (v) => v / 1000000,
            pound: (v) => v / 453.592
        }
    },

    temperature: {
        units: ["celsius", "fahrenheit", "kelvin"],
        base: "celsius",
        toBase: {
            celsius: (v) => v,
            fahrenheit: (v) => (v - 32) * 5 / 9,
            kelvin: (v) => v - 273.15
        },
        fromBase: {
            celsius: (v) => v,
            fahrenheit: (v) => (v * 9 / 5) + 32,
            kelvin: (v) => v + 273.15
        }
    },

    volume: {
        units: ["milliliter", "liter", "gallon"],
        base: "liter",
        toBase: {
            milliliter: (v) => v / 1000,
            liter: (v) => v,
            gallon: (v) => v * 3.78541
        },
        fromBase: {
            milliliter: (v) => v * 1000,
            liter: (v) => v,
            gallon: (v) => v / 3.78541
        }
    }
};

function convertValue(type, value, fromUnit, toUnit) {
    const config = measurementData[type];
    const baseValue = config.toBase[fromUnit](value);
    return config.fromBase[toUnit](baseValue);
}

function compareValues(type, value1, unit1, value2, unit2) {
    const base1 = measurementData[type].toBase[unit1](value1);
    const base2 = measurementData[type].toBase[unit2](value2);

    if (base1 > base2) return `${value1} ${unit1} > ${value2} ${unit2}`;
    if (base1 < base2) return `${value1} ${unit1} < ${value2} ${unit2}`;
    return `${value1} ${unit1} = ${value2} ${unit2}`;
}

function arithmeticValues(type, value1, unit1, value2, unit2, operator) {
    const normalizedValue2 = convertValue(type, value2, unit2, unit1);

    switch (operator) {
        case "+":
            return value1 + normalizedValue2;
        case "-":
            return value1 - normalizedValue2;
        case "*":
            return value1 * normalizedValue2;
        case "/":
            if (normalizedValue2 === 0) {
                throw new Error("Cannot divide by zero");
            }
            return value1 / normalizedValue2;
        default:
            throw new Error("Invalid operator");
    }
}