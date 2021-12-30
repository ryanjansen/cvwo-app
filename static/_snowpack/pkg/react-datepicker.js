import { r as react } from './common/index-c277be94.js';
import { c as createCommonjsModule } from './common/_commonjsHelpers-eb5a497e.js';
import { r as reactDom } from './common/index-61588a8d.js';
import { r as reactFastCompare } from './common/index-f500590d.js';
import { c as createPopper } from './common/popper-4868b91d.js';

var global = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {*} value - the value to check
 * @returns {boolean} true if the given value is a date
 * @throws {TypeError} 1 arguments required
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */

function isDate(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Now `isValid` doesn't throw an exception
 *   if the first argument is not an instance of Date.
 *   Instead, argument is converted beforehand using `toDate`.
 *
 *   Examples:
 *
 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
 *   |---------------------------|---------------|---------------|
 *   | `new Date()`              | `true`        | `true`        |
 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
 *   | `new Date('')`            | `false`       | `false`       |
 *   | `new Date(1488370835081)` | `true`        | `true`        |
 *   | `new Date(NaN)`           | `false`       | `false`       |
 *   | `'2016-01-01'`            | `TypeError`   | `false`       |
 *   | `''`                      | `TypeError`   | `false`       |
 *   | `1488370835081`           | `TypeError`   | `true`        |
 *   | `NaN`                     | `TypeError`   | `false`       |
 *
 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
 *   that try to coerce arguments to the expected type
 *   (which is also the case with other *date-fns* functions).
 *
 * @param {*} date - the date to check
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */

function isValid(dirtyDate) {
  requiredArgs(1, arguments);

  if (!isDate(dirtyDate) && typeof dirtyDate !== 'number') {
    return false;
  }

  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

var formatDistance = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
};

function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};

var formatRelative = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

function buildLocalizeFn(args) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var context = options.context ? String(options.context) : 'standalone';
    var valuesArray;

    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;

      var _width = options.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }

    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!

    return valuesArray[index];
  };
}

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};

var ordinalNumber = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';

      case 2:
        return number + 'nd';

      case 3:
        return number + 'rd';
    }
  }

  return number + 'th';
};

var localize = {
  ordinalNumber: ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};

function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }

    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }

  return undefined;
}

function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }

  return undefined;
}

function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */

function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}

/**
 * @name subMilliseconds
 * @category Millisecond Helpers
 * @summary Subtract the specified number of milliseconds from the given date.
 *
 * @description
 * Subtract the specified number of milliseconds from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the milliseconds subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:29.250
 */

function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}

function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();

  while (output.length < targetLength) {
    output = '0' + output;
  }

  return sign + output;
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

var formatters = {
  // Year
  y: function (date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
  },
  // Month
  M: function (date, token) {
    var month = date.getUTCMonth();
    return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function (date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function (date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
        return dayPeriodEnumValue.toUpperCase();

      case 'aaa':
        return dayPeriodEnumValue;

      case 'aaaaa':
        return dayPeriodEnumValue[0];

      case 'aaaa':
      default:
        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
    }
  },
  // Hour [1-12]
  h: function (date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function (date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function (date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function (date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function (date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}

var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCWeek(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCWeekYear(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var firstWeekOfNextYear = new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
  var firstWeekOfThisYear = new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
  var year = getUTCWeekYear(dirtyDate, dirtyOptions);
  var firstWeek = new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, dirtyOptions);
  return date;
}

var MILLISECONDS_IN_WEEK$1 = 604800000; // This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376

function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}

var dayPeriodEnum = {
  am: 'am',
  pm: 'pm',
  midnight: 'midnight',
  noon: 'noon',
  morning: 'morning',
  afternoon: 'afternoon',
  evening: 'evening',
  night: 'night'
};
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

var formatters$1 = {
  // Era
  G: function (date, token, localize) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;

    switch (token) {
      // AD, BC
      case 'G':
      case 'GG':
      case 'GGG':
        return localize.era(era, {
          width: 'abbreviated'
        });
      // A, B

      case 'GGGGG':
        return localize.era(era, {
          width: 'narrow'
        });
      // Anno Domini, Before Christ

      case 'GGGG':
      default:
        return localize.era(era, {
          width: 'wide'
        });
    }
  },
  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === 'yo') {
      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, {
        unit: 'year'
      });
    }

    return formatters.y(date, token);
  },
  // Local week-numbering year
  Y: function (date, token, localize, options) {
    var signedWeekYear = getUTCWeekYear(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

    if (token === 'YY') {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    } // Ordinal number


    if (token === 'Yo') {
      return localize.ordinalNumber(weekYear, {
        unit: 'year'
      });
    } // Padding


    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function (date, token) {
    var isoWeekYear = getUTCISOWeekYear(date); // Padding

    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'Q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'QQ':
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'Qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'QQQ':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'QQQQQ':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'formatting'
        });
      // 1st quarter, 2nd quarter, ...

      case 'QQQQ':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone quarter
  q: function (date, token, localize) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

    switch (token) {
      // 1, 2, 3, 4
      case 'q':
        return String(quarter);
      // 01, 02, 03, 04

      case 'qq':
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th

      case 'qo':
        return localize.ordinalNumber(quarter, {
          unit: 'quarter'
        });
      // Q1, Q2, Q3, Q4

      case 'qqq':
        return localize.quarter(quarter, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

      case 'qqqqq':
        return localize.quarter(quarter, {
          width: 'narrow',
          context: 'standalone'
        });
      // 1st quarter, 2nd quarter, ...

      case 'qqqq':
      default:
        return localize.quarter(quarter, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Month
  M: function (date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      case 'M':
      case 'MM':
        return formatters.M(date, token);
      // 1st, 2nd, ..., 12th

      case 'Mo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'MMM':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // J, F, ..., D

      case 'MMMMM':
        return localize.month(month, {
          width: 'narrow',
          context: 'formatting'
        });
      // January, February, ..., December

      case 'MMMM':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone month
  L: function (date, token, localize) {
    var month = date.getUTCMonth();

    switch (token) {
      // 1, 2, ..., 12
      case 'L':
        return String(month + 1);
      // 01, 02, ..., 12

      case 'LL':
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th

      case 'Lo':
        return localize.ordinalNumber(month + 1, {
          unit: 'month'
        });
      // Jan, Feb, ..., Dec

      case 'LLL':
        return localize.month(month, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // J, F, ..., D

      case 'LLLLL':
        return localize.month(month, {
          width: 'narrow',
          context: 'standalone'
        });
      // January, February, ..., December

      case 'LLLL':
      default:
        return localize.month(month, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // Local week of year
  w: function (date, token, localize, options) {
    var week = getUTCWeek(date, options);

    if (token === 'wo') {
      return localize.ordinalNumber(week, {
        unit: 'week'
      });
    }

    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function (date, token, localize) {
    var isoWeek = getUTCISOWeek(date);

    if (token === 'Io') {
      return localize.ordinalNumber(isoWeek, {
        unit: 'week'
      });
    }

    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function (date, token, localize) {
    if (token === 'do') {
      return localize.ordinalNumber(date.getUTCDate(), {
        unit: 'date'
      });
    }

    return formatters.d(date, token);
  },
  // Day of year
  D: function (date, token, localize) {
    var dayOfYear = getUTCDayOfYear(date);

    if (token === 'Do') {
      return localize.ordinalNumber(dayOfYear, {
        unit: 'dayOfYear'
      });
    }

    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();

    switch (token) {
      // Tue
      case 'E':
      case 'EE':
      case 'EEE':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'EEEEE':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'EEEEEE':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'EEEE':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Local day of week
  e: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case 'e':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'ee':
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th

      case 'eo':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'eee':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'eeeee':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'eeeeee':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'eeee':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

    switch (token) {
      // Numerical value (same as in `e`)
      case 'c':
        return String(localDayOfWeek);
      // Padded numerical value

      case 'cc':
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th

      case 'co':
        return localize.ordinalNumber(localDayOfWeek, {
          unit: 'day'
        });

      case 'ccc':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'standalone'
        });
      // T

      case 'ccccc':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'standalone'
        });
      // Tu

      case 'cccccc':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'standalone'
        });
      // Tuesday

      case 'cccc':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'standalone'
        });
    }
  },
  // ISO day of week
  i: function (date, token, localize) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

    switch (token) {
      // 2
      case 'i':
        return String(isoDayOfWeek);
      // 02

      case 'ii':
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd

      case 'io':
        return localize.ordinalNumber(isoDayOfWeek, {
          unit: 'day'
        });
      // Tue

      case 'iii':
        return localize.day(dayOfWeek, {
          width: 'abbreviated',
          context: 'formatting'
        });
      // T

      case 'iiiii':
        return localize.day(dayOfWeek, {
          width: 'narrow',
          context: 'formatting'
        });
      // Tu

      case 'iiiiii':
        return localize.day(dayOfWeek, {
          width: 'short',
          context: 'formatting'
        });
      // Tuesday

      case 'iiii':
      default:
        return localize.day(dayOfWeek, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM or PM
  a: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

    switch (token) {
      case 'a':
      case 'aa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'aaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();

      case 'aaaaa':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'aaaa':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
    }

    switch (token) {
      case 'b':
      case 'bb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'bbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        }).toLowerCase();

      case 'bbbbb':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'bbbb':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;

    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case 'B':
      case 'BB':
      case 'BBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'abbreviated',
          context: 'formatting'
        });

      case 'BBBBB':
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'narrow',
          context: 'formatting'
        });

      case 'BBBB':
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: 'wide',
          context: 'formatting'
        });
    }
  },
  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === 'ho') {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return formatters.h(date, token);
  },
  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === 'Ho') {
      return localize.ordinalNumber(date.getUTCHours(), {
        unit: 'hour'
      });
    }

    return formatters.H(date, token);
  },
  // Hour [0-11]
  K: function (date, token, localize) {
    var hours = date.getUTCHours() % 12;

    if (token === 'Ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function (date, token, localize) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;

    if (token === 'ko') {
      return localize.ordinalNumber(hours, {
        unit: 'hour'
      });
    }

    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function (date, token, localize) {
    if (token === 'mo') {
      return localize.ordinalNumber(date.getUTCMinutes(), {
        unit: 'minute'
      });
    }

    return formatters.m(date, token);
  },
  // Second
  s: function (date, token, localize) {
    if (token === 'so') {
      return localize.ordinalNumber(date.getUTCSeconds(), {
        unit: 'second'
      });
    }

    return formatters.s(date, token);
  },
  // Fraction of second
  S: function (date, token) {
    return formatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return 'Z';
    }

    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`

      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`

      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`

      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`

      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimiter

      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();

    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long

      case 'zzzz':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Seconds timestamp
  t: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1000);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function (date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};

function formatTimezoneShort(offset, delimiter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;

  if (minutes === 0) {
    return sign + String(hours);
  }

  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }

  return formatTimezone(offset, dirtyDelimiter);
}

function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

function dateLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'P':
      return formatLong.date({
        width: 'short'
      });

    case 'PP':
      return formatLong.date({
        width: 'medium'
      });

    case 'PPP':
      return formatLong.date({
        width: 'long'
      });

    case 'PPPP':
    default:
      return formatLong.date({
        width: 'full'
      });
  }
}

function timeLongFormatter(pattern, formatLong) {
  switch (pattern) {
    case 'p':
      return formatLong.time({
        width: 'short'
      });

    case 'pp':
      return formatLong.time({
        width: 'medium'
      });

    case 'ppp':
      return formatLong.time({
        width: 'long'
      });

    case 'pppp':
    default:
      return formatLong.time({
        width: 'full'
      });
  }
}

function dateTimeLongFormatter(pattern, formatLong) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  var dateTimeFormat;

  switch (datePattern) {
    case 'P':
      dateTimeFormat = formatLong.dateTime({
        width: 'short'
      });
      break;

    case 'PP':
      dateTimeFormat = formatLong.dateTime({
        width: 'medium'
      });
      break;

    case 'PPP':
      dateTimeFormat = formatLong.dateTime({
        width: 'long'
      });
      break;

    case 'PPPP':
    default:
      dateTimeFormat = formatLong.dateTime({
        width: 'full'
      });
      break;
  }

  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
}

var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

var protectedDayOfYearTokens = ['D', 'DD'];
var protectedWeekYearTokens = ['YY', 'YYYY'];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
  if (token === 'YYYY') {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'YY') {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'D') {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  } else if (token === 'DD') {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
  }
}

// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps

var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The second argument is now required for the sake of explicitness.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   format(new Date(2016, 0, 1))
 *
 *   // v2.0.0 onward
 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
 *   ```
 *
 * - New format string API for `format` function
 *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
 *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
 *
 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
 *
 * @param {Date|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://git.io/fxCyr
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://git.io/fxCyr
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */

function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};
  var locale$1 = options.locale || locale;
  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  if (!locale$1.localize) {
    throw new RangeError('locale must contain localize property');
  }

  if (!locale$1.formatLong) {
    throw new RangeError('locale must contain formatLong property');
  }

  var originalDate = toDate(dirtyDate);

  if (!isValid(originalDate)) {
    throw new RangeError('Invalid time value');
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale$1,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {
    var firstCharacter = substring[0];

    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale$1.formatLong, formatterOptions);
    }

    return substring;
  }).join('').match(formattingTokensRegExp).map(function (substring) {
    // Replace two single quote characters with one single quote character
    if (substring === "''") {
      return "'";
    }

    var firstCharacter = substring[0];

    if (firstCharacter === "'") {
      return cleanEscapedString(substring);
    }

    var formatter = formatters$1[firstCharacter];

    if (formatter) {
      if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
      }

      if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
      }

      return formatter(utcDate, substring, locale$1.localize, formatterOptions);
    }

    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
    }

    return substring;
  }).join('');
  return result;
}

function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}

var MILLISECONDS_IN_MINUTE = 60000;
/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */

function addMinutes(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}

var MILLISECONDS_IN_HOUR = 3600000;
/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of hours to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the hours added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */

function addHours(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR);
}

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */

function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of week to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */

function addWeeks(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  var days = amount * 7;
  return addDays(dirtyDate, days);
}

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 */

function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  var dayOfMonth = date.getDate(); // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.

  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();

  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */

function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @description
 * Subtract the specified number of days from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the days subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */

function subDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addDays(dirtyDate, -amount);
}

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of weeks to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the weeks subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */

function subWeeks(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addWeeks(dirtyDate, -amount);
}

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of months to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the months subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */

function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of years to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} the new date with the years subtracted
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */

function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the seconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */

function getSeconds(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the minutes
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */

function getMinutes(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the hours
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */

function getHours(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var hours = date.getHours();
  return hours;
}

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */

function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}

/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the day of month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */

function getDate(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth;
}

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfWeek(dirtyDate, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * var result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `getISOYear` to `getISOWeekYear`.
 *   "ISO week year" is short for [ISO week-numbering year](https://en.wikipedia.org/wiki/ISO_week_date).
 *   This change makes the name consistent with
 *   locale-dependent week-numbering year helpers, e.g., `getWeekYear`.
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */

function getISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of an ISO week-numbering year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */

function startOfISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getISOWeekYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}

var MILLISECONDS_IN_WEEK$2 = 604800000;
/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the ISO week
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */

function getISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)

  return Math.round(diff / MILLISECONDS_IN_WEEK$2) + 1;
}

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */

function getMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  return month;
}

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2))
 * //=> 3
 */

function getQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
}

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */

function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the timestamp
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */

function getTime(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  return timestamp;
}

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date.
 *
 * @description
 * Set the seconds to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} seconds - the seconds of the new date
 * @returns {Date} the new date with the seconds set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */

function setSeconds(dirtyDate, dirtySeconds) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var seconds = toInteger(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}

/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} minutes - the minutes of the new date
 * @returns {Date} the new date with the minutes set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */

function setMinutes(dirtyDate, dirtyMinutes) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var minutes = toInteger(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}

/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * var result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */

function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date.setHours(hours);
  return date;
}

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the given date
 * @returns {Number} the number of days in a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */

function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} month - the month of the new date
 * @returns {Date} the new date with the month set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */

function setMonth(dirtyDate, dirtyMonth) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth); // Set the last day of the new month
  // if the original date was the last day of the longer month

  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}

/**
 * @name setQuarter
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} quarter - the quarter of the new date
 * @returns {Date} the new date with the quarter set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */

function setQuarter(dirtyDate, dirtyQuarter) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var quarter = toInteger(dirtyQuarter);
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
  var diff = quarter - oldQuarter;
  return setMonth(date, date.getMonth() + diff * 3);
}

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} year - the year of the new date
 * @returns {Date} the new date with the year set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */

function setYear(dirtyDate, dirtyYear) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var year = toInteger(dirtyYear); // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date

  if (isNaN(date.getTime())) {
    return new Date(NaN);
  }

  date.setFullYear(year);
  return date;
}

/**
 * @name min
 * @category Common Helpers
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `min` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   const date1 = new Date(1989, 6, 10)
 *   const date2 = new Date(1987, 1, 11)
 *   const minDate = min(date1, date2)
 *
 *   // v2.0.0 onward:
 *   const dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   const minDate = min(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} - the earliest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */

function min(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if (typeof dirtyDatesArray === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = toDate(dirtyDate);

    if (result === undefined || result > currentDate || isNaN(currentDate.getDate())) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - `max` function now accepts an array of dates rather than spread arguments.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   var date1 = new Date(1989, 6, 10)
 *   var date2 = new Date(1987, 1, 11)
 *   var maxDate = max(date1, date2)
 *
 *   // v2.0.0 onward:
 *   var dates = [new Date(1989, 6, 10), new Date(1987, 1, 11)]
 *   var maxDate = max(dates)
 *   ```
 *
 * @param {Date[]|Number[]} datesArray - the dates to compare
 * @returns {Date} the latest of the dates
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which of these dates is the latest?
 * var result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */

function max(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray; // `dirtyDatesArray` is Array, Set or Map, or object with custom `forEach` method

  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === 'function') {
    datesArray = dirtyDatesArray; // If `dirtyDatesArray` is Array-like Object, convert to Array.
  } else if (typeof dirtyDatesArray === 'object' && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    // `dirtyDatesArray` is non-iterable, return Invalid Date
    return new Date(NaN);
  }

  var result;
  datesArray.forEach(function (dirtyDate) {
    var currentDate = toDate(dirtyDate);

    if (result === undefined || result < currentDate || isNaN(Number(currentDate))) {
      result = currentDate;
    }
  });
  return result || new Date(NaN);
}

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

var MILLISECONDS_IN_DAY$1 = 86400000;
/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar days
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight); // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY$1);
}

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar months
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * var result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */

function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the later date
 * @param {Date|Number} dateRight - the earlier date
 * @returns {Number} the number of calendar years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * )
 * //=> 2
 */

function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() - dateRight.getFullYear();
}

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a month
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a quarter
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */

function startOfQuarter(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */

function startOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var cleanDate = toDate(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the end of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */

function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Boolean} the dates are equal
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * var result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */

function isEqual(dirtyLeftDate, dirtyRightDate) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyLeftDate);
  var dateRight = toDate(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day?
 *
 * @description
 * Are the given dates in the same day?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * var result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 */

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month?
 *
 * @description
 * Are the given dates in the same month?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same month
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * var result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * var result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */

function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */

function isSameYear(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same year quarter?
 *
 * @description
 * Are the given dates in the same year quarter?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same quarter
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * var result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 */

function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft);
  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
}

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be after the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */

function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */

function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The function was renamed from `isWithinRange` to `isWithinInterval`.
 *   This change was made to mirror the use of the word "interval" in standard ISO 8601:2004 terminology:
 *
 *   ```
 *   2.1.3
 *   time interval
 *   part of the time axis limited by two instants
 *   ```
 *
 *   Also, this function now accepts an object with `start` and `end` properties
 *   instead of two arguments as an interval.
 *   This function now throws `RangeError` if the start of the interval is after its end
 *   or if any date in the interval is `Invalid Date`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *
 *   isWithinRange(
 *     new Date(2014, 0, 3),
 *     new Date(2014, 0, 1), new Date(2014, 0, 7)
 *   )
 *
 *   // v2.0.0 onward
 *
 *   isWithinInterval(
 *     new Date(2014, 0, 3),
 *     { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) }
 *   )
 *   ```
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date }) // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end }) // => true
 */
function isWithinInterval(dirtyDate, interval) {
  requiredArgs(2, arguments);
  var time = toDate(dirtyDate).getTime();
  var startTime = toDate(interval.start).getTime();
  var endTime = toDate(interval.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  return time >= startTime && time <= endTime;
}

function assign(target, dirtyObject) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }

  dirtyObject = dirtyObject || {};

  for (var property in dirtyObject) {
    if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
      target[property] = dirtyObject[property];
    }
  }

  return target;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
  requiredArgs(2, arguments);
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);

  if (day % 7 === 0) {
    day = day - 7;
  }

  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

// See issue: https://github.com/date-fns/date-fns/issues/376

function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}

var MILLISECONDS_IN_HOUR$1 = 3600000;
var MILLISECONDS_IN_MINUTE$1 = 60000;
var MILLISECONDS_IN_SECOND = 1000;
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999

};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

function parseNumericPattern(pattern, string, valueCallback) {
  var matchResult = string.match(pattern);

  if (!matchResult) {
    return null;
  }

  var value = parseInt(matchResult[0], 10);
  return {
    value: valueCallback ? valueCallback(value) : value,
    rest: string.slice(matchResult[0].length)
  };
}

function parseTimezonePattern(pattern, string) {
  var matchResult = string.match(pattern);

  if (!matchResult) {
    return null;
  } // Input is 'Z'


  if (matchResult[0] === 'Z') {
    return {
      value: 0,
      rest: string.slice(1)
    };
  }

  var sign = matchResult[1] === '+' ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * MILLISECONDS_IN_HOUR$1 + minutes * MILLISECONDS_IN_MINUTE$1 + seconds * MILLISECONDS_IN_SECOND),
    rest: string.slice(matchResult[0].length)
  };
}

function parseAnyDigitsSigned(string, valueCallback) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
}

function parseNDigits(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);

    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);

    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);

    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);

    default:
      return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), string, valueCallback);
  }
}

function parseNDigitsSigned(n, string, valueCallback) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);

    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);

    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);

    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);

    default:
      return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), string, valueCallback);
  }
}

function dayPeriodEnumToHours(enumValue) {
  switch (enumValue) {
    case 'morning':
      return 4;

    case 'evening':
      return 17;

    case 'pm':
    case 'noon':
    case 'afternoon':
      return 12;

    case 'am':
    case 'midnight':
    case 'night':
    default:
      return 0;
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0; // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC

  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;

  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // User for validation

function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */


var parsers = {
  // Era
  G: {
    priority: 140,
    parse: function (string, token, match, _options) {
      switch (token) {
        // AD, BC
        case 'G':
        case 'GG':
        case 'GGG':
          return match.era(string, {
            width: 'abbreviated'
          }) || match.era(string, {
            width: 'narrow'
          });
        // A, B

        case 'GGGGG':
          return match.era(string, {
            width: 'narrow'
          });
        // Anno Domini, Before Christ

        case 'GGGG':
        default:
          return match.era(string, {
            width: 'wide'
          }) || match.era(string, {
            width: 'abbreviated'
          }) || match.era(string, {
            width: 'narrow'
          });
      }
    },
    set: function (date, flags, value, _options) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['R', 'u', 't', 'T']
  },
  // Year
  y: {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
    priority: 130,
    parse: function (string, token, match, _options) {
      var valueCallback = function (year) {
        return {
          year: year,
          isTwoDigitYear: token === 'yy'
        };
      };

      switch (token) {
        case 'y':
          return parseNDigits(4, string, valueCallback);

        case 'yo':
          return match.ordinalNumber(string, {
            unit: 'year',
            valueCallback: valueCallback
          });

        default:
          return parseNDigits(token.length, string, valueCallback);
      }
    },
    validate: function (_date, value, _options) {
      return value.isTwoDigitYear || value.year > 0;
    },
    set: function (date, flags, value, _options) {
      var currentYear = date.getUTCFullYear();

      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }

      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']
  },
  // Local week-numbering year
  Y: {
    priority: 130,
    parse: function (string, token, match, _options) {
      var valueCallback = function (year) {
        return {
          year: year,
          isTwoDigitYear: token === 'YY'
        };
      };

      switch (token) {
        case 'Y':
          return parseNDigits(4, string, valueCallback);

        case 'Yo':
          return match.ordinalNumber(string, {
            unit: 'year',
            valueCallback: valueCallback
          });

        default:
          return parseNDigits(token.length, string, valueCallback);
      }
    },
    validate: function (_date, value, _options) {
      return value.isTwoDigitYear || value.year > 0;
    },
    set: function (date, flags, value, options) {
      var currentYear = getUTCWeekYear(date, options);

      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }

      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date, options);
    },
    incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
  },
  // ISO week-numbering year
  R: {
    priority: 130,
    parse: function (string, token, _match, _options) {
      if (token === 'R') {
        return parseNDigitsSigned(4, string);
      }

      return parseNDigitsSigned(token.length, string);
    },
    set: function (_date, _flags, value, _options) {
      var firstWeekOfYear = new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    },
    incompatibleTokens: ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
  },
  // Extended year
  u: {
    priority: 130,
    parse: function (string, token, _match, _options) {
      if (token === 'u') {
        return parseNDigitsSigned(4, string);
      }

      return parseNDigitsSigned(token.length, string);
    },
    set: function (date, _flags, value, _options) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']
  },
  // Quarter
  Q: {
    priority: 120,
    parse: function (string, token, match, _options) {
      switch (token) {
        // 1, 2, 3, 4
        case 'Q':
        case 'QQ':
          // 01, 02, 03, 04
          return parseNDigits(token.length, string);
        // 1st, 2nd, 3rd, 4th

        case 'Qo':
          return match.ordinalNumber(string, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'QQQ':
          return match.quarter(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'QQQQQ':
          return match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // 1st quarter, 2nd quarter, ...

        case 'QQQQ':
        default:
          return match.quarter(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.quarter(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 4;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Stand-alone quarter
  q: {
    priority: 120,
    parse: function (string, token, match, _options) {
      switch (token) {
        // 1, 2, 3, 4
        case 'q':
        case 'qq':
          // 01, 02, 03, 04
          return parseNDigits(token.length, string);
        // 1st, 2nd, 3rd, 4th

        case 'qo':
          return match.ordinalNumber(string, {
            unit: 'quarter'
          });
        // Q1, Q2, Q3, Q4

        case 'qqq':
          return match.quarter(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

        case 'qqqqq':
          return match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // 1st quarter, 2nd quarter, ...

        case 'qqqq':
        default:
          return match.quarter(string, {
            width: 'wide',
            context: 'standalone'
          }) || match.quarter(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.quarter(string, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 4;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Month
  M: {
    priority: 110,
    parse: function (string, token, match, _options) {
      var valueCallback = function (value) {
        return value - 1;
      };

      switch (token) {
        // 1, 2, ..., 12
        case 'M':
          return parseNumericPattern(numericPatterns.month, string, valueCallback);
        // 01, 02, ..., 12

        case 'MM':
          return parseNDigits(2, string, valueCallback);
        // 1st, 2nd, ..., 12th

        case 'Mo':
          return match.ordinalNumber(string, {
            unit: 'month',
            valueCallback: valueCallback
          });
        // Jan, Feb, ..., Dec

        case 'MMM':
          return match.month(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // J, F, ..., D

        case 'MMMMM':
          return match.month(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // January, February, ..., December

        case 'MMMM':
        default:
          return match.month(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.month(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.month(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Stand-alone month
  L: {
    priority: 110,
    parse: function (string, token, match, _options) {
      var valueCallback = function (value) {
        return value - 1;
      };

      switch (token) {
        // 1, 2, ..., 12
        case 'L':
          return parseNumericPattern(numericPatterns.month, string, valueCallback);
        // 01, 02, ..., 12

        case 'LL':
          return parseNDigits(2, string, valueCallback);
        // 1st, 2nd, ..., 12th

        case 'Lo':
          return match.ordinalNumber(string, {
            unit: 'month',
            valueCallback: valueCallback
          });
        // Jan, Feb, ..., Dec

        case 'LLL':
          return match.month(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // J, F, ..., D

        case 'LLLLL':
          return match.month(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // January, February, ..., December

        case 'LLLL':
        default:
          return match.month(string, {
            width: 'wide',
            context: 'standalone'
          }) || match.month(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.month(string, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Local week of year
  w: {
    priority: 100,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'w':
          return parseNumericPattern(numericPatterns.week, string);

        case 'wo':
          return match.ordinalNumber(string, {
            unit: 'week'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 53;
    },
    set: function (date, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date, value, options), options);
    },
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
  },
  // ISO week of year
  I: {
    priority: 100,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'I':
          return parseNumericPattern(numericPatterns.week, string);

        case 'Io':
          return match.ordinalNumber(string, {
            unit: 'week'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 53;
    },
    set: function (date, _flags, value, options) {
      return startOfUTCISOWeek(setUTCISOWeek(date, value, options), options);
    },
    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
  },
  // Day of the month
  d: {
    priority: 90,
    subPriority: 1,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'd':
          return parseNumericPattern(numericPatterns.date, string);

        case 'do':
          return match.ordinalNumber(string, {
            unit: 'date'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (date, value, _options) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);
      var month = date.getUTCMonth();

      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
  },
  // Day of year
  D: {
    priority: 90,
    subPriority: 1,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'D':
        case 'DD':
          return parseNumericPattern(numericPatterns.dayOfYear, string);

        case 'Do':
          return match.ordinalNumber(string, {
            unit: 'date'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (date, value, _options) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);

      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']
  },
  // Day of week
  E: {
    priority: 90,
    parse: function (string, token, match, _options) {
      switch (token) {
        // Tue
        case 'E':
        case 'EE':
        case 'EEE':
          return match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // T

        case 'EEEEE':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'EEEEEE':
          return match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tuesday

        case 'EEEE':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function (date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T']
  },
  // Local day of week
  e: {
    priority: 90,
    parse: function (string, token, match, options) {
      var valueCallback = function (value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };

      switch (token) {
        // 3
        case 'e':
        case 'ee':
          // 03
          return parseNDigits(token.length, string, valueCallback);
        // 3rd

        case 'eo':
          return match.ordinalNumber(string, {
            unit: 'day',
            valueCallback: valueCallback
          });
        // Tue

        case 'eee':
          return match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // T

        case 'eeeee':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tu

        case 'eeeeee':
          return match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
        // Tuesday

        case 'eeee':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.day(string, {
            width: 'short',
            context: 'formatting'
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function (date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']
  },
  // Stand-alone local day of week
  c: {
    priority: 90,
    parse: function (string, token, match, options) {
      var valueCallback = function (value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };

      switch (token) {
        // 3
        case 'c':
        case 'cc':
          // 03
          return parseNDigits(token.length, string, valueCallback);
        // 3rd

        case 'co':
          return match.ordinalNumber(string, {
            unit: 'day',
            valueCallback: valueCallback
          });
        // Tue

        case 'ccc':
          return match.day(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.day(string, {
            width: 'short',
            context: 'standalone'
          }) || match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // T

        case 'ccccc':
          return match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tu

        case 'cccccc':
          return match.day(string, {
            width: 'short',
            context: 'standalone'
          }) || match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
        // Tuesday

        case 'cccc':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'standalone'
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'standalone'
          }) || match.day(string, {
            width: 'short',
            context: 'standalone'
          }) || match.day(string, {
            width: 'narrow',
            context: 'standalone'
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 6;
    },
    set: function (date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']
  },
  // ISO day of week
  i: {
    priority: 90,
    parse: function (string, token, match, _options) {
      var valueCallback = function (value) {
        if (value === 0) {
          return 7;
        }

        return value;
      };

      switch (token) {
        // 2
        case 'i':
        case 'ii':
          // 02
          return parseNDigits(token.length, string);
        // 2nd

        case 'io':
          return match.ordinalNumber(string, {
            unit: 'day'
          });
        // Tue

        case 'iii':
          return match.day(string, {
            width: 'abbreviated',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'short',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
        // T

        case 'iiiii':
          return match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
        // Tu

        case 'iiiiii':
          return match.day(string, {
            width: 'short',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
        // Tuesday

        case 'iiii':
        default:
          return match.day(string, {
            width: 'wide',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'abbreviated',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'short',
            context: 'formatting',
            valueCallback: valueCallback
          }) || match.day(string, {
            width: 'narrow',
            context: 'formatting',
            valueCallback: valueCallback
          });
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 7;
    },
    set: function (date, _flags, value, options) {
      date = setUTCISODay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']
  },
  // AM or PM
  a: {
    priority: 80,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'a':
        case 'aa':
        case 'aaa':
          return match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'aaaaa':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'aaaa':
        default:
          return match.dayPeriod(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T']
  },
  // AM, PM, midnight
  b: {
    priority: 80,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'b':
        case 'bb':
        case 'bbb':
          return match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'bbbbb':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'bbbb':
        default:
          return match.dayPeriod(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T']
  },
  // in the morning, in the afternoon, in the evening, at night
  B: {
    priority: 80,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'B':
        case 'BB':
        case 'BBB':
          return match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'BBBBB':
          return match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });

        case 'BBBB':
        default:
          return match.dayPeriod(string, {
            width: 'wide',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'abbreviated',
            context: 'formatting'
          }) || match.dayPeriod(string, {
            width: 'narrow',
            context: 'formatting'
          });
      }
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'b', 't', 'T']
  },
  // Hour [1-12]
  h: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'h':
          return parseNumericPattern(numericPatterns.hour12h, string);

        case 'ho':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 12;
    },
    set: function (date, _flags, value, _options) {
      var isPM = date.getUTCHours() >= 12;

      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }

      return date;
    },
    incompatibleTokens: ['H', 'K', 'k', 't', 'T']
  },
  // Hour [0-23]
  H: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'H':
          return parseNumericPattern(numericPatterns.hour23h, string);

        case 'Ho':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 23;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T']
  },
  // Hour [0-11]
  K: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'K':
          return parseNumericPattern(numericPatterns.hour11h, string);

        case 'Ko':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 11;
    },
    set: function (date, _flags, value, _options) {
      var isPM = date.getUTCHours() >= 12;

      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }

      return date;
    },
    incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T']
  },
  // Hour [1-24]
  k: {
    priority: 70,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'k':
          return parseNumericPattern(numericPatterns.hour24h, string);

        case 'ko':
          return match.ordinalNumber(string, {
            unit: 'hour'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 1 && value <= 24;
    },
    set: function (date, _flags, value, _options) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    },
    incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T']
  },
  // Minute
  m: {
    priority: 60,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 'm':
          return parseNumericPattern(numericPatterns.minute, string);

        case 'mo':
          return match.ordinalNumber(string, {
            unit: 'minute'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 59;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    },
    incompatibleTokens: ['t', 'T']
  },
  // Second
  s: {
    priority: 50,
    parse: function (string, token, match, _options) {
      switch (token) {
        case 's':
          return parseNumericPattern(numericPatterns.second, string);

        case 'so':
          return match.ordinalNumber(string, {
            unit: 'second'
          });

        default:
          return parseNDigits(token.length, string);
      }
    },
    validate: function (_date, value, _options) {
      return value >= 0 && value <= 59;
    },
    set: function (date, _flags, value, _options) {
      date.setUTCSeconds(value, 0);
      return date;
    },
    incompatibleTokens: ['t', 'T']
  },
  // Fraction of second
  S: {
    priority: 30,
    parse: function (string, token, _match, _options) {
      var valueCallback = function (value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };

      return parseNDigits(token.length, string, valueCallback);
    },
    set: function (date, _flags, value, _options) {
      date.setUTCMilliseconds(value);
      return date;
    },
    incompatibleTokens: ['t', 'T']
  },
  // Timezone (ISO-8601. +00:00 is `'Z'`)
  X: {
    priority: 10,
    parse: function (string, token, _match, _options) {
      switch (token) {
        case 'X':
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

        case 'XX':
          return parseTimezonePattern(timezonePatterns.basic, string);

        case 'XXXX':
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

        case 'XXXXX':
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

        case 'XXX':
        default:
          return parseTimezonePattern(timezonePatterns.extended, string);
      }
    },
    set: function (date, flags, value, _options) {
      if (flags.timestampIsSet) {
        return date;
      }

      return new Date(date.getTime() - value);
    },
    incompatibleTokens: ['t', 'T', 'x']
  },
  // Timezone (ISO-8601)
  x: {
    priority: 10,
    parse: function (string, token, _match, _options) {
      switch (token) {
        case 'x':
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

        case 'xx':
          return parseTimezonePattern(timezonePatterns.basic, string);

        case 'xxxx':
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

        case 'xxxxx':
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

        case 'xxx':
        default:
          return parseTimezonePattern(timezonePatterns.extended, string);
      }
    },
    set: function (date, flags, value, _options) {
      if (flags.timestampIsSet) {
        return date;
      }

      return new Date(date.getTime() - value);
    },
    incompatibleTokens: ['t', 'T', 'X']
  },
  // Seconds timestamp
  t: {
    priority: 40,
    parse: function (string, _token, _match, _options) {
      return parseAnyDigitsSigned(string);
    },
    set: function (_date, _flags, value, _options) {
      return [new Date(value * 1000), {
        timestampIsSet: true
      }];
    },
    incompatibleTokens: '*'
  },
  // Milliseconds timestamp
  T: {
    priority: 20,
    parse: function (string, _token, _match, _options) {
      return parseAnyDigitsSigned(string);
    },
    set: function (_date, _flags, value, _options) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    },
    incompatibleTokens: '*'
  }
};

var TIMEZONE_UNIT_PRIORITY = 10; // This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps

var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp$1 = /^'([^]*?)'?$/;
var doubleQuoteRegExp$1 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - Old `parse` was renamed to `toDate`.
 *   Now `parse` is a new function which parses a string using a provided format.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward (toDate no longer accepts a string)
 *   toDate(1392098430000) // Unix to timestamp
 *   toDate(new Date(2014, 1, 11, 11, 30, 30)) // Cloning the date
 *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
 *   ```
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the string of tokens
 * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
 *   see: https://git.io/fxCyr
 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
 *   see: https://git.io/fxCyr
 * @returns {Date} the parsed date
 * @throws {TypeError} 3 arguments required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
 * @throws {RangeError} format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */

function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, dirtyOptions) {
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var options = dirtyOptions || {};
  var locale$1 = options.locale || locale;

  if (!locale$1.match) {
    throw new RangeError('locale must contain match property');
  }

  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
  }

  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  if (formatString === '') {
    if (dateString === '') {
      return toDate(dirtyReferenceDate);
    } else {
      return new Date(NaN);
    }
  }

  var subFnOptions = {
    firstWeekContainsDate: firstWeekContainsDate,
    weekStartsOn: weekStartsOn,
    locale: locale$1
  }; // If timezone isn't specified, it will be set to the system timezone

  var setters = [{
    priority: TIMEZONE_UNIT_PRIORITY,
    subPriority: -1,
    set: dateToSystemTimezone,
    index: 0
  }];
  var i;
  var tokens = formatString.match(longFormattingTokensRegExp$1).map(function (substring) {
    var firstCharacter = substring[0];

    if (firstCharacter === 'p' || firstCharacter === 'P') {
      var longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale$1.formatLong, subFnOptions);
    }

    return substring;
  }).join('').match(formattingTokensRegExp$1);
  var usedTokens = [];

  for (i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
      throwProtectedError(token, formatString, dirtyDateString);
    }

    if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
      throwProtectedError(token, formatString, dirtyDateString);
    }

    var firstCharacter = token[0];
    var parser = parsers[firstCharacter];

    if (parser) {
      var incompatibleTokens = parser.incompatibleTokens;

      if (Array.isArray(incompatibleTokens)) {
        var incompatibleToken = void 0;

        for (var _i = 0; _i < usedTokens.length; _i++) {
          var usedToken = usedTokens[_i].token;

          if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
            incompatibleToken = usedTokens[_i];
            break;
          }
        }

        if (incompatibleToken) {
          throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
        }
      } else if (parser.incompatibleTokens === '*' && usedTokens.length) {
        throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
      }

      usedTokens.push({
        token: firstCharacter,
        fullToken: token
      });
      var parseResult = parser.parse(dateString, token, locale$1.match, subFnOptions);

      if (!parseResult) {
        return new Date(NaN);
      }

      setters.push({
        priority: parser.priority,
        subPriority: parser.subPriority || 0,
        set: parser.set,
        validate: parser.validate,
        value: parseResult.value,
        index: setters.length
      });
      dateString = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
      } // Replace two single quote characters with one single quote character


      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString$1(token);
      } // Cut token from string, or, if string doesn't match the token, return Invalid Date


      if (dateString.indexOf(token) === 0) {
        dateString = dateString.slice(token.length);
      } else {
        return new Date(NaN);
      }
    }
  } // Check if the remaining input contains something other than whitespace


  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return new Date(NaN);
  }

  var uniquePrioritySetters = setters.map(function (setter) {
    return setter.priority;
  }).sort(function (a, b) {
    return b - a;
  }).filter(function (priority, index, array) {
    return array.indexOf(priority) === index;
  }).map(function (priority) {
    return setters.filter(function (setter) {
      return setter.priority === priority;
    }).sort(function (a, b) {
      return b.subPriority - a.subPriority;
    });
  }).map(function (setterArray) {
    return setterArray[0];
  });
  var date = toDate(dirtyReferenceDate);

  if (isNaN(date)) {
    return new Date(NaN);
  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37


  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var flags = {};

  for (i = 0; i < uniquePrioritySetters.length; i++) {
    var setter = uniquePrioritySetters[i];

    if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
      return new Date(NaN);
    }

    var result = setter.set(utcDate, flags, setter.value, subFnOptions); // Result is tuple (date, flags)

    if (result[0]) {
      utcDate = result[0];
      assign(flags, result[1]); // Result is date
    } else {
      utcDate = result;
    }
  }

  return utcDate;
}

function dateToSystemTimezone(date, flags) {
  if (flags.timestampIsSet) {
    return date;
  }

  var convertedDate = new Date(0);
  convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
  return convertedDate;
}

function cleanEscapedString$1(input) {
  return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'");
}

var MILLISECONDS_IN_HOUR$2 = 3600000;
var MILLISECONDS_IN_MINUTE$2 = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/
};
var dateRegex = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
var timeRegex = /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
var timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;
/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The previous `parse` implementation was renamed to `parseISO`.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   parse('2016-01-01')
 *
 *   // v2.0.0 onward
 *   parseISO('2016-01-01')
 *   ```
 *
 * - `parseISO` now validates separate date and time values in ISO-8601 strings
 *   and returns `Invalid Date` if the date is invalid.
 *
 *   ```javascript
 *   parseISO('2018-13-32')
 *   //=> Invalid Date
 *   ```
 *
 * - `parseISO` now doesn't fall back to `new Date` constructor
 *   if it fails to parse a string argument. Instead, it returns `Invalid Date`.
 *
 * @param {String} argument - the value to convert
 * @param {Object} [options] - an object with options.
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */

function parseISO(argument, dirtyOptions) {
  requiredArgs(1, arguments);
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : toInteger(options.additionalDigits);

  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }

  var dateStrings = splitDateString(argument);
  var date;

  if (dateStrings.date) {
    var parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (isNaN(date) || !date) {
    return new Date(NaN);
  }

  var timestamp = date.getTime();
  var time = 0;
  var offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);

    if (isNaN(time) || time === null) {
      return new Date(NaN);
    }
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);

    if (isNaN(offset)) {
      return new Date(NaN);
    }
  } else {
    var dirtyDate = new Date(timestamp + time); // js parsed string assuming it's in UTC timezone
    // but we need it to be parsed in our timezone
    // so we use utc values to build date in our timezone.
    // Year values from 0 to 99 map to the years 1900 to 1999
    // so set year explicitly with setFullYear.

    var result = new Date(0);
    result.setFullYear(dirtyDate.getUTCFullYear(), dirtyDate.getUTCMonth(), dirtyDate.getUTCDate());
    result.setHours(dirtyDate.getUTCHours(), dirtyDate.getUTCMinutes(), dirtyDate.getUTCSeconds(), dirtyDate.getUTCMilliseconds());
    return result;
  }

  return new Date(timestamp + time + offset);
}

function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimiter);
  var timeString; // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].

  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];

    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);

    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  var regex = new RegExp('^(?:(\\d{4}|[+-]\\d{' + (4 + additionalDigits) + '})|(\\d{2}|[+-]\\d{' + (2 + additionalDigits) + '})$)');
  var captures = dateString.match(regex); // Invalid ISO-formatted year

  if (!captures) return {
    year: null
  };
  var year = captures[1] && parseInt(captures[1]);
  var century = captures[2] && parseInt(captures[2]);
  return {
    year: century == null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length)
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return null;
  var captures = dateString.match(dateRegex); // Invalid ISO-formatted string

  if (!captures) return null;
  var isWeekDate = !!captures[4];
  var dayOfYear = parseDateUnit(captures[1]);
  var month = parseDateUnit(captures[2]) - 1;
  var day = parseDateUnit(captures[3]);
  var week = parseDateUnit(captures[4]);
  var dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }

    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    var date = new Date(0);

    if (!validateDate(year, month, day) || !validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }

    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  var captures = timeString.match(timeRegex);
  if (!captures) return null; // Invalid ISO-formatted time

  var hours = parseTimeUnit(captures[1]);
  var minutes = parseTimeUnit(captures[2]);
  var seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return hours * MILLISECONDS_IN_HOUR$2 + minutes * MILLISECONDS_IN_MINUTE$2 + seconds * 1000;
}

function parseTimeUnit(value) {
  return value && parseFloat(value.replace(',', '.')) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === 'Z') return 0;
  var captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;
  var sign = captures[1] === '+' ? -1 : 1;
  var hours = parseInt(captures[2]);
  var minutes = captures[3] && parseInt(captures[3]) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * MILLISECONDS_IN_HOUR$2 + minutes * MILLISECONDS_IN_MINUTE$2);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
} // Validation functions
// February is null to handle the leap year (using ||)


var daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex$1(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100;
}

function validateDate(year, month, date) {
  return month >= 0 && month <= 11 && date >= 1 && date <= (daysInMonths[month] || (isLeapYearIndex$1(year) ? 29 : 28));
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex$1(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return seconds >= 0 && seconds < 60 && minutes >= 0 && minutes < 60 && hours >= 0 && hours < 25;
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}/**
 * Check whether some DOM node is our Component's node.
 */
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  } // SVG <use/> elements do not technically reside in the rendered DOM, so
  // they do not have classList directly, but they offer a link to their
  // corresponding element, which can have classList. This extra check is for
  // that case.
  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17


  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }

  return current.classList.contains(ignoreClass);
}
/**
 * Try to find our node in a hierarchy of nodes, returning the document
 * node as highest node if our node is not found in the path up.
 */

function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  } // If source=local then this event came from 'somewhere'
  // inside and should be ignored. We could handle this with
  // a layered approach, too, but that requires going back to
  // thinking in terms of Dom node nesting, running counter
  // to React's 'you shouldn't care about the DOM' philosophy.
  // Also cover shadowRoot node by checking current.host


  while (current.parentNode || current.host) {
    // Only check normal node without shadowRoot
    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }

    current = current.parentNode || current.host;
  }

  return current;
}
/**
 * Check if the browser scrollbar was clicked
 */

function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}// ideally will get replaced with external dep
// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in
var testPassiveEventSupport = function testPassiveEventSupport() {
  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {
    return;
  }

  var passive = false;
  var options = Object.defineProperty({}, 'passive', {
    get: function get() {
      passive = true;
    }
  });

  var noop = function noop() {};

  window.addEventListener('testPassiveEventSupport', noop, options);
  window.removeEventListener('testPassiveEventSupport', noop, options);
  return passive;
};function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }

  return function () {
    return ++seed;
  };
}

var uid = autoInc();var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ['touchstart', 'touchmove'];
var IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';
/**
 * Options for addEventHandler and removeEventHandler
 */

function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = null;
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;

  if (isTouchEvent && passiveEventSupport) {
    handlerOptions = {
      passive: !instance.props.preventDefault
    };
  }

  return handlerOptions;
}
/**
 * This function generates the HOC function that you'll use
 * in order to impart onOutsideClick listening to an
 * arbitrary component. It gets called at the end of the
 * bootstrapping code to yield an instance of the
 * onClickOutsideHOC function defined inside setupHOC().
 */


function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;

  var componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return _temp = _class = /*#__PURE__*/function (_Component) {
    _inheritsLoose(onClickOutside, _Component);

    function onClickOutside(props) {
      var _this;

      _this = _Component.call(this, props) || this;

      _this.__outsideClickHandler = function (event) {
        if (typeof _this.__clickOutsideHandlerProp === 'function') {
          _this.__clickOutsideHandlerProp(event);

          return;
        }

        var instance = _this.getInstance();

        if (typeof instance.props.handleClickOutside === 'function') {
          instance.props.handleClickOutside(event);
          return;
        }

        if (typeof instance.handleClickOutside === 'function') {
          instance.handleClickOutside(event);
          return;
        }

        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };

      _this.__getComponentNode = function () {
        var instance = _this.getInstance();

        if (config && typeof config.setClickOutsideRef === 'function') {
          return config.setClickOutsideRef()(instance);
        }

        if (typeof instance.setClickOutsideRef === 'function') {
          return instance.setClickOutsideRef();
        }

        return reactDom.findDOMNode(instance);
      };

      _this.enableOnClickOutside = function () {
        if (typeof document === 'undefined' || enabledInstances[_this._uid]) {
          return;
        }

        if (typeof passiveEventSupport === 'undefined') {
          passiveEventSupport = testPassiveEventSupport();
        }

        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;

        if (!events.forEach) {
          events = [events];
        }

        handlersMap[_this._uid] = function (event) {
          if (_this.componentNode === null) return;

          if (_this.props.preventDefault) {
            event.preventDefault();
          }

          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }

          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;

          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }

          _this.__outsideClickHandler(event);
        };

        events.forEach(function (eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
        });
      };

      _this.disableOnClickOutside = function () {
        delete enabledInstances[_this._uid];
        var fn = handlersMap[_this._uid];

        if (fn && typeof document !== 'undefined') {
          var events = _this.props.eventTypes;

          if (!events.forEach) {
            events = [events];
          }

          events.forEach(function (eventName) {
            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
          });
          delete handlersMap[_this._uid];
        }
      };

      _this.getRef = function (ref) {
        return _this.instanceRef = ref;
      };

      _this._uid = uid();
      return _this;
    }
    /**
     * Access the WrappedComponent's instance.
     */


    var _proto = onClickOutside.prototype;

    _proto.getInstance = function getInstance() {
      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
        return this;
      }

      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };

    /**
     * Add click listeners to the current document,
     * linked to this component's state.
     */
    _proto.componentDidMount = function componentDidMount() {
      // If we are in an environment without a DOM such
      // as shallow rendering or snapshots then we exit
      // early to prevent any unhandled errors being thrown.
      if (typeof document === 'undefined' || !document.createElement) {
        return;
      }

      var instance = this.getInstance();

      if (config && typeof config.handleClickOutside === 'function') {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);

        if (typeof this.__clickOutsideHandlerProp !== 'function') {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }

      this.componentNode = this.__getComponentNode(); // return early so we dont initiate onClickOutside

      if (this.props.disableOnClickOutside) return;
      this.enableOnClickOutside();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = this.__getComponentNode();
    }
    /**
     * Remove all document's event listeners for this component
     */
    ;

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    }
    /**
     * Can be called to explicitly enable event listening
     * for clicks and touches outside of this element.
     */
    ;

    /**
     * Pass-through render
     */
    _proto.render = function render() {
      // eslint-disable-next-line no-unused-vars
      var _this$props = this.props;
          _this$props.excludeScrollbar;
          var props = _objectWithoutPropertiesLoose(_this$props, ["excludeScrollbar"]);

      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }

      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return react.createElement(WrappedComponent, props);
    };

    return onClickOutside;
  }(react.Component), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ['mousedown', 'touchstart'],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function () {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}

var ManagerReferenceNodeContext = react.createContext();
var ManagerReferenceNodeSetterContext = react.createContext();
function Manager(_ref) {
  var children = _ref.children;

  var _React$useState = react.useState(null),
      referenceNode = _React$useState[0],
      setReferenceNode = _React$useState[1];

  var hasUnmounted = react.useRef(false);
  react.useEffect(function () {
    return function () {
      hasUnmounted.current = true;
    };
  }, []);
  var handleSetReferenceNode = react.useCallback(function (node) {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  }, []);
  return /*#__PURE__*/react.createElement(ManagerReferenceNodeContext.Provider, {
    value: referenceNode
  }, /*#__PURE__*/react.createElement(ManagerReferenceNodeSetterContext.Provider, {
    value: handleSetReferenceNode
  }, children));
}

/**
 * Takes an argument and if it's an array, returns the first item in the array,
 * otherwise returns the argument. Used for Preact compatibility.
 */
var unwrapArray = function unwrapArray(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
/**
 * Takes a maybe-undefined function and arbitrary args and invokes the function
 * only if it is defined.
 */

var safeInvoke = function safeInvoke(fn) {
  if (typeof fn === 'function') {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return fn.apply(void 0, args);
  }
};
/**
 * Sets a ref using either a ref callback or a ref object
 */

var setRef = function setRef(ref, node) {
  // if its a function call it
  if (typeof ref === 'function') {
    return safeInvoke(ref, node);
  } // otherwise we should treat it as a ref object
  else if (ref != null) {
      ref.current = node;
    }
};
/**
 * Simple ponyfill for Object.fromEntries
 */

var fromEntries = function fromEntries(entries) {
  return entries.reduce(function (acc, _ref) {
    var key = _ref[0],
        value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
/**
 * Small wrapper around `useLayoutEffect` to get rid of the warning on SSR envs
 */

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && window.document && window.document.createElement ? react.useLayoutEffect : react.useEffect;

var EMPTY_MODIFIERS = [];
var usePopper = function usePopper(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }

  var prevOptions = react.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || 'bottom',
    strategy: options.strategy || 'absolute',
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };

  var _React$useState = react.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  }),
      state = _React$useState[0],
      setState = _React$useState[1];

  var updateStateModifier = react.useMemo(function () {
    return {
      name: 'updateState',
      enabled: true,
      phase: 'write',
      fn: function fn(_ref) {
        var state = _ref.state;
        var elements = Object.keys(state.elements);
        setState({
          styles: fromEntries(elements.map(function (element) {
            return [element, state.styles[element] || {}];
          })),
          attributes: fromEntries(elements.map(function (element) {
            return [element, state.attributes[element]];
          }))
        });
      },
      requires: ['computeStyles']
    };
  }, []);
  var popperOptions = react.useMemo(function () {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: 'applyStyles',
        enabled: false
      }])
    };

    if (reactFastCompare(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = react.useRef();
  useIsomorphicLayoutEffect(function () {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function () {
    if (referenceElement == null || popperElement == null) {
      return;
    }

    var createPopper$1 = options.createPopper || createPopper;
    var popperInstance = createPopper$1(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function () {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

var NOOP = function NOOP() {
  return void 0;
};

var NOOP_PROMISE = function NOOP_PROMISE() {
  return Promise.resolve(null);
};

var EMPTY_MODIFIERS$1 = [];
function Popper(_ref) {
  var _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottom' : _ref$placement,
      _ref$strategy = _ref.strategy,
      strategy = _ref$strategy === void 0 ? 'absolute' : _ref$strategy,
      _ref$modifiers = _ref.modifiers,
      modifiers = _ref$modifiers === void 0 ? EMPTY_MODIFIERS$1 : _ref$modifiers,
      referenceElement = _ref.referenceElement,
      onFirstUpdate = _ref.onFirstUpdate,
      innerRef = _ref.innerRef,
      children = _ref.children;
  var referenceNode = react.useContext(ManagerReferenceNodeContext);

  var _React$useState = react.useState(null),
      popperElement = _React$useState[0],
      setPopperElement = _React$useState[1];

  var _React$useState2 = react.useState(null),
      arrowElement = _React$useState2[0],
      setArrowElement = _React$useState2[1];

  react.useEffect(function () {
    setRef(innerRef, popperElement);
  }, [innerRef, popperElement]);
  var options = react.useMemo(function () {
    return {
      placement: placement,
      strategy: strategy,
      onFirstUpdate: onFirstUpdate,
      modifiers: [].concat(modifiers, [{
        name: 'arrow',
        enabled: arrowElement != null,
        options: {
          element: arrowElement
        }
      }])
    };
  }, [placement, strategy, onFirstUpdate, modifiers, arrowElement]);

  var _usePopper = usePopper(referenceElement || referenceNode, popperElement, options),
      state = _usePopper.state,
      styles = _usePopper.styles,
      forceUpdate = _usePopper.forceUpdate,
      update = _usePopper.update;

  var childrenProps = react.useMemo(function () {
    return {
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: styles.arrow,
        ref: setArrowElement
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE
    };
  }, [setPopperElement, setArrowElement, placement, state, styles, update, forceUpdate]);
  return unwrapArray(children)(childrenProps);
}

function Reference(_ref) {
  var children = _ref.children,
      innerRef = _ref.innerRef;
  var setReferenceNode = react.useContext(ManagerReferenceNodeSetterContext);
  var refHandler = react.useCallback(function (node) {
    setRef(innerRef, node);
    safeInvoke(setReferenceNode, node);
  }, [innerRef, setReferenceNode]); // ran on unmount

  react.useEffect(function () {
    return function () {
      return setRef(innerRef, null);
    };
  });
  react.useEffect(function () {
  }, [setReferenceNode]);
  return unwrapArray(children)({
    ref: refHandler
  });
}

function oe(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n);}return r}function ae(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(r),!0).forEach((function(t){le(e,t,r[t]);})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):oe(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t));}));}return e}function se(e){return (se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function pe(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function ie(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n);}}function ce(e,t,r){return t&&ie(e.prototype,t),r&&ie(e,r),e}function le(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function de(){return (de=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n]);}return e}).apply(this,arguments)}function ue(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&me(e,t);}function he(e){return (he=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function me(e,t){return (me=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function fe(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ye(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return fe(e)}function ve(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return !1;if(Reflect.construct.sham)return !1;if("function"==typeof Proxy)return !0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return !1}}();return function(){var r,n=he(e);if(t){var o=he(this).constructor;r=Reflect.construct(n,arguments,o);}else r=n.apply(this,arguments);return ye(this,r)}}function De(e){return function(e){if(Array.isArray(e))return we(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return we(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return we(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function we(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function ge(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function ke(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}var be={p:ke,P:function(e,t){var r,n=e.match(/(P+)(p+)?/)||[],o=n[1],a=n[2];if(!a)return ge(e,t);switch(o){case"P":r=t.dateTime({width:"short"});break;case"PP":r=t.dateTime({width:"medium"});break;case"PPP":r=t.dateTime({width:"long"});break;case"PPPP":default:r=t.dateTime({width:"full"});}return r.replace("{{date}}",ge(o,t)).replace("{{time}}",ke(a,t))}},Ce=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;function Se(e){var t=e?"string"==typeof e||e instanceof String?parseISO(e):toDate(e):new Date;return Me(t)?t:null}function _e(e,t,r,n,a){var s=null,p=qe(r)||qe(Ve()),i=!0;return Array.isArray(t)?(t.forEach((function(t){var r=parse(e,t,new Date,{locale:p});n&&(i=Me(r,a)&&e===format(r,t,{awareOfUnicodeTokens:!0})),Me(r,a)&&i&&(s=r);})),s):(s=parse(e,t,new Date,{locale:p}),n?i=Me(s)&&e===format(s,t,{awareOfUnicodeTokens:!0}):Me(s)||(t=t.match(Ce).map((function(e){var t=e[0];return "p"===t||"P"===t?p?(0, be[t])(e,p.formatLong):t:e})).join(""),e.length>0&&(s=parse(e,t.slice(0,e.length),new Date)),Me(s)||(s=new Date(e))),Me(s)&&i?s:null)}function Me(e,t){return t=t||new Date("1/1/1000"),isValid(e)&&!isBefore(e,t)}function Pe(e,t,r){if("en"===r)return format(e,t,{awareOfUnicodeTokens:!0});var n=qe(r);return r&&!n&&console.warn('A locale object was not found for the provided string ["'.concat(r,'"].')),!n&&Ve()&&qe(Ve())&&(n=qe(Ve())),format(e,t,{locale:n||null,awareOfUnicodeTokens:!0})}function Ee(e,t){var r=t.dateFormat,n=t.locale;return e&&Pe(e,Array.isArray(r)?r[0]:r,n)||""}function Ne(e,t){var r=t.hour,n=void 0===r?0:r,o=t.minute,a=void 0===o?0:o,s=t.second;return setHours(setMinutes(setSeconds(e,void 0===s?0:s),a),n)}function xe(e,t){var r=t&&qe(t)||Ve()&&qe(Ve());return getISOWeek(e,r?{locale:r}:null)}function Oe(e,t){return Pe(e,"ddd",t)}function Ye(e){return startOfDay(e)}function Ie(e,t,r){var n=qe(t||Ve());return startOfWeek(e,{locale:n,weekStartsOn:r})}function Te(e){return startOfMonth(e)}function Le(e){return startOfYear(e)}function Fe(e){return startOfQuarter(e)}function Re(e,t){return e&&t?isSameYear(e,t):!e&&!t}function Ae(e,t){return e&&t?isSameMonth(e,t):!e&&!t}function Ke(e,t){return e&&t?isSameQuarter(e,t):!e&&!t}function Be(e,t){return e&&t?isSameDay(e,t):!e&&!t}function We(e,t){return e&&t?isEqual(e,t):!e&&!t}function je(e,t,r){var n,o=startOfDay(t),a=endOfDay(r);try{n=isWithinInterval(e,{start:o,end:a});}catch(e){n=!1;}return n}function Ve(){return ("undefined"!=typeof window?window:global).__localeId__}function qe(e){if("string"==typeof e){var t="undefined"!=typeof window?window:global;return t.__localeData__?t.__localeData__[e]:null}return e}function Ue(e,t){return Pe(setMonth(Se(),e),"LLLL",t)}function $e(e,t){return Pe(setMonth(Se(),e),"LLL",t)}function ze(e,t){return Pe(setQuarter(Se(),e),"QQQ",t)}function Ge(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.maxDate,o=t.excludeDates,a=t.excludeDateIntervals,s=t.includeDates,p=t.includeDateIntervals,i=t.filterDate;return nt(e,{minDate:r,maxDate:n})||o&&o.some((function(t){return Be(e,t)}))||a&&a.some((function(t){var r=t.start,n=t.end;return isWithinInterval(e,{start:r,end:n})}))||s&&!s.some((function(t){return Be(e,t)}))||p&&!p.some((function(t){var r=t.start,n=t.end;return isWithinInterval(e,{start:r,end:n})}))||i&&!i(Se(e))||!1}function Je(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.excludeDates,n=t.excludeDateIntervals;return n&&n.length>0?n.some((function(t){var r=t.start,n=t.end;return isWithinInterval(e,{start:r,end:n})})):r&&r.some((function(t){return Be(e,t)}))||!1}function Xe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.maxDate,o=t.excludeDates,a=t.includeDates,s=t.filterDate;return nt(e,{minDate:r,maxDate:n})||o&&o.some((function(t){return Ae(e,t)}))||a&&!a.some((function(t){return Ae(e,t)}))||s&&!s(Se(e))||!1}function Ze(e,t,r,n){var o=getYear(e),a=getMonth(e),s=getYear(t),p=getMonth(t),i=getYear(n);return o===s&&o===i?a<=r&&r<=p:o<s?i===o&&a<=r||i===s&&p>=r||i<s&&i>o:void 0}function et(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.maxDate,o=t.excludeDates,a=t.includeDates,s=t.filterDate;return nt(e,{minDate:r,maxDate:n})||o&&o.some((function(t){return Ke(e,t)}))||a&&!a.some((function(t){return Ke(e,t)}))||s&&!s(Se(e))||!1}function tt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.maxDate,o=new Date(e,0,1);return nt(o,{minDate:r,maxDate:n})||!1}function rt(e,t,r,n){var o=getYear(e),a=getQuarter(e),s=getYear(t),p=getQuarter(t),i=getYear(n);return o===s&&o===i?a<=r&&r<=p:o<s?i===o&&a<=r||i===s&&p>=r||i<s&&i>o:void 0}function nt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.maxDate;return r&&differenceInCalendarDays(e,r)<0||n&&differenceInCalendarDays(e,n)>0}function ot(e,t){return t.some((function(t){return getHours(t)===getHours(e)&&getMinutes(t)===getMinutes(e)}))}function at(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.excludeTimes,n=t.includeTimes,o=t.filterTime;return r&&ot(e,r)||n&&!ot(e,n)||o&&!o(e)||!1}function st(e,t){var r=t.minTime,n=t.maxTime;if(!r||!n)throw new Error("Both minTime and maxTime props required");var o,a=Se(),s=setHours(setMinutes(a,getMinutes(e)),getHours(e)),p=setHours(setMinutes(a,getMinutes(r)),getHours(r)),i=setHours(setMinutes(a,getMinutes(n)),getHours(n));try{o=!isWithinInterval(s,{start:p,end:i});}catch(e){o=!1;}return o}function pt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.includeDates,o=subMonths(e,1);return r&&differenceInCalendarMonths(r,o)>0||n&&n.every((function(e){return differenceInCalendarMonths(e,o)>0}))||!1}function it(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.maxDate,n=t.includeDates,o=addMonths(e,1);return r&&differenceInCalendarMonths(o,r)>0||n&&n.every((function(e){return differenceInCalendarMonths(o,e)>0}))||!1}function ct(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.includeDates,o=subYears(e,1);return r&&differenceInCalendarYears(r,o)>0||n&&n.every((function(e){return differenceInCalendarYears(e,o)>0}))||!1}function lt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.maxDate,n=t.includeDates,o=addYears(e,1);return r&&differenceInCalendarYears(o,r)>0||n&&n.every((function(e){return differenceInCalendarYears(o,e)>0}))||!1}function dt(e){var t=e.minDate,r=e.includeDates;if(r&&t){var n=r.filter((function(e){return differenceInCalendarDays(e,t)>=0}));return min(n)}return r?min(r):t}function ut(e){var t=e.maxDate,r=e.includeDates;if(r&&t){var n=r.filter((function(e){return differenceInCalendarDays(e,t)<=0}));return max(n)}return r?max(r):t}function ht(){for(var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"react-datepicker__day--highlighted",n=new Map,o=0,a=e.length;o<a;o++){var s=e[o];if(isDate(s)){var p=Pe(s,"MM.dd.yyyy"),i=n.get(p)||[];i.includes(t)||(i.push(t),n.set(p,i));}else if("object"===se(s)){var c=Object.keys(s),l=c[0],d=s[c[0]];if("string"==typeof l&&d.constructor===Array)for(var u=0,h=d.length;u<h;u++){var m=Pe(d[u],"MM.dd.yyyy"),f=n.get(m)||[];f.includes(l)||(f.push(l),n.set(m,f));}}}return n}function mt(e,t,r,n,o){for(var p=o.length,i=[],c=0;c<p;c++){var l=addMinutes(addHours(e,getHours(o[c])),getMinutes(o[c])),d=addMinutes(e,(r+1)*n);isAfter(l,t)&&isBefore(l,d)&&i.push(o[c]);}return i}function ft(e){return e<10?"0".concat(e):"".concat(e)}function yt(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:12,r=Math.ceil(getYear(e)/t)*t,n=r-(t-1);return {startPeriod:n,endPeriod:r}}function vt(e,t,r,n){for(var o=[],a=0;a<2*t+1;a++){var s=e+t-a,p=!0;r&&(p=getYear(r)<=s),n&&p&&(p=getYear(n)>=s),p&&o.push(s);}return o}var Dt=onClickOutsideHOC(function(r){ue(o,react.Component);var n=ve(o);function o(t){var r;pe(this,o),le(fe(r=n.call(this,t)),"renderOptions",(function(){var t=r.props.year,n=r.state.yearsList.map((function(n){return react.createElement("div",{className:t===n?"react-datepicker__year-option react-datepicker__year-option--selected_year":"react-datepicker__year-option",key:n,onClick:r.onChange.bind(fe(r),n)},t===n?react.createElement("span",{className:"react-datepicker__year-option--selected"},"✓"):"",n)})),o=r.props.minDate?getYear(r.props.minDate):null,a=r.props.maxDate?getYear(r.props.maxDate):null;return a&&r.state.yearsList.find((function(e){return e===a}))||n.unshift(react.createElement("div",{className:"react-datepicker__year-option",key:"upcoming",onClick:r.incrementYears},react.createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"}))),o&&r.state.yearsList.find((function(e){return e===o}))||n.push(react.createElement("div",{className:"react-datepicker__year-option",key:"previous",onClick:r.decrementYears},react.createElement("a",{className:"react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"}))),n})),le(fe(r),"onChange",(function(e){r.props.onChange(e);})),le(fe(r),"handleClickOutside",(function(){r.props.onCancel();})),le(fe(r),"shiftYears",(function(e){var t=r.state.yearsList.map((function(t){return t+e}));r.setState({yearsList:t});})),le(fe(r),"incrementYears",(function(){return r.shiftYears(1)})),le(fe(r),"decrementYears",(function(){return r.shiftYears(-1)}));var a=t.yearDropdownItemNumber,s=t.scrollableYearDropdown,p=a||(s?10:5);return r.state={yearsList:vt(r.props.year,p,r.props.minDate,r.props.maxDate)},r}return ce(o,[{key:"render",value:function(){var r=classnames({"react-datepicker__year-dropdown":!0,"react-datepicker__year-dropdown--scrollable":this.props.scrollableYearDropdown});return react.createElement("div",{className:r},this.renderOptions())}}]),o}()),wt=function(t){ue(n,react.Component);var r=ve(n);function n(){var t;pe(this,n);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return le(fe(t=r.call.apply(r,[this].concat(a))),"state",{dropdownVisible:!1}),le(fe(t),"renderSelectOptions",(function(){for(var r=t.props.minDate?getYear(t.props.minDate):1900,n=t.props.maxDate?getYear(t.props.maxDate):2100,o=[],a=r;a<=n;a++)o.push(react.createElement("option",{key:a,value:a},a));return o})),le(fe(t),"onSelectChange",(function(e){t.onChange(e.target.value);})),le(fe(t),"renderSelectMode",(function(){return react.createElement("select",{value:t.props.year,className:"react-datepicker__year-select",onChange:t.onSelectChange},t.renderSelectOptions())})),le(fe(t),"renderReadView",(function(r){return react.createElement("div",{key:"read",style:{visibility:r?"visible":"hidden"},className:"react-datepicker__year-read-view",onClick:function(e){return t.toggleDropdown(e)}},react.createElement("span",{className:"react-datepicker__year-read-view--down-arrow"}),react.createElement("span",{className:"react-datepicker__year-read-view--selected-year"},t.props.year))})),le(fe(t),"renderDropdown",(function(){return react.createElement(Dt,{key:"dropdown",year:t.props.year,onChange:t.onChange,onCancel:t.toggleDropdown,minDate:t.props.minDate,maxDate:t.props.maxDate,scrollableYearDropdown:t.props.scrollableYearDropdown,yearDropdownItemNumber:t.props.yearDropdownItemNumber})})),le(fe(t),"renderScrollMode",(function(){var e=t.state.dropdownVisible,r=[t.renderReadView(!e)];return e&&r.unshift(t.renderDropdown()),r})),le(fe(t),"onChange",(function(e){t.toggleDropdown(),e!==t.props.year&&t.props.onChange(e);})),le(fe(t),"toggleDropdown",(function(e){t.setState({dropdownVisible:!t.state.dropdownVisible},(function(){t.props.adjustDateOnChange&&t.handleYearChange(t.props.date,e);}));})),le(fe(t),"handleYearChange",(function(e,r){t.onSelect(e,r),t.setOpen();})),le(fe(t),"onSelect",(function(e,r){t.props.onSelect&&t.props.onSelect(e,r);})),le(fe(t),"setOpen",(function(){t.props.setOpen&&t.props.setOpen(!0);})),t}return ce(n,[{key:"render",value:function(){var t;switch(this.props.dropdownMode){case"scroll":t=this.renderScrollMode();break;case"select":t=this.renderSelectMode();}return react.createElement("div",{className:"react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode)},t)}}]),n}(),gt=onClickOutsideHOC(function(t){ue(n,react.Component);var r=ve(n);function n(){var t;pe(this,n);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return le(fe(t=r.call.apply(r,[this].concat(a))),"renderOptions",(function(){return t.props.monthNames.map((function(r,n){return react.createElement("div",{className:t.props.month===n?"react-datepicker__month-option react-datepicker__month-option--selected_month":"react-datepicker__month-option",key:r,onClick:t.onChange.bind(fe(t),n)},t.props.month===n?react.createElement("span",{className:"react-datepicker__month-option--selected"},"✓"):"",r)}))})),le(fe(t),"onChange",(function(e){return t.props.onChange(e)})),le(fe(t),"handleClickOutside",(function(){return t.props.onCancel()})),t}return ce(n,[{key:"render",value:function(){return react.createElement("div",{className:"react-datepicker__month-dropdown"},this.renderOptions())}}]),n}()),kt=function(t){ue(n,react.Component);var r=ve(n);function n(){var t;pe(this,n);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return le(fe(t=r.call.apply(r,[this].concat(a))),"state",{dropdownVisible:!1}),le(fe(t),"renderSelectOptions",(function(t){return t.map((function(t,r){return react.createElement("option",{key:r,value:r},t)}))})),le(fe(t),"renderSelectMode",(function(r){return react.createElement("select",{value:t.props.month,className:"react-datepicker__month-select",onChange:function(e){return t.onChange(e.target.value)}},t.renderSelectOptions(r))})),le(fe(t),"renderReadView",(function(r,n){return react.createElement("div",{key:"read",style:{visibility:r?"visible":"hidden"},className:"react-datepicker__month-read-view",onClick:t.toggleDropdown},react.createElement("span",{className:"react-datepicker__month-read-view--down-arrow"}),react.createElement("span",{className:"react-datepicker__month-read-view--selected-month"},n[t.props.month]))})),le(fe(t),"renderDropdown",(function(r){return react.createElement(gt,{key:"dropdown",month:t.props.month,monthNames:r,onChange:t.onChange,onCancel:t.toggleDropdown})})),le(fe(t),"renderScrollMode",(function(e){var r=t.state.dropdownVisible,n=[t.renderReadView(!r,e)];return r&&n.unshift(t.renderDropdown(e)),n})),le(fe(t),"onChange",(function(e){t.toggleDropdown(),e!==t.props.month&&t.props.onChange(e);})),le(fe(t),"toggleDropdown",(function(){return t.setState({dropdownVisible:!t.state.dropdownVisible})})),t}return ce(n,[{key:"render",value:function(){var t,r=this,n=[0,1,2,3,4,5,6,7,8,9,10,11].map(this.props.useShortMonthInDropdown?function(e){return $e(e,r.props.locale)}:function(e){return Ue(e,r.props.locale)});switch(this.props.dropdownMode){case"scroll":t=this.renderScrollMode(n);break;case"select":t=this.renderSelectMode(n);}return react.createElement("div",{className:"react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode)},t)}}]),n}();function bt(e,t){for(var r=[],n=Te(e),o=Te(t);!isAfter(n,o);)r.push(Se(n)),n=addMonths(n,1);return r}var Ct=onClickOutsideHOC(function(r){ue(o,react.Component);var n=ve(o);function o(t){var r;return pe(this,o),le(fe(r=n.call(this,t)),"renderOptions",(function(){return r.state.monthYearsList.map((function(t){var n=getTime(t),o=Re(r.props.date,t)&&Ae(r.props.date,t);return react.createElement("div",{className:o?"react-datepicker__month-year-option --selected_month-year":"react-datepicker__month-year-option",key:n,onClick:r.onChange.bind(fe(r),n)},o?react.createElement("span",{className:"react-datepicker__month-year-option--selected"},"✓"):"",Pe(t,r.props.dateFormat,r.props.locale))}))})),le(fe(r),"onChange",(function(e){return r.props.onChange(e)})),le(fe(r),"handleClickOutside",(function(){r.props.onCancel();})),r.state={monthYearsList:bt(r.props.minDate,r.props.maxDate)},r}return ce(o,[{key:"render",value:function(){var r=classnames({"react-datepicker__month-year-dropdown":!0,"react-datepicker__month-year-dropdown--scrollable":this.props.scrollableMonthYearDropdown});return react.createElement("div",{className:r},this.renderOptions())}}]),o}()),St=function(t){ue(n,react.Component);var r=ve(n);function n(){var t;pe(this,n);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return le(fe(t=r.call.apply(r,[this].concat(a))),"state",{dropdownVisible:!1}),le(fe(t),"renderSelectOptions",(function(){for(var r=Te(t.props.minDate),n=Te(t.props.maxDate),o=[];!isAfter(r,n);){var a=getTime(r);o.push(react.createElement("option",{key:a,value:a},Pe(r,t.props.dateFormat,t.props.locale))),r=addMonths(r,1);}return o})),le(fe(t),"onSelectChange",(function(e){t.onChange(e.target.value);})),le(fe(t),"renderSelectMode",(function(){return react.createElement("select",{value:getTime(Te(t.props.date)),className:"react-datepicker__month-year-select",onChange:t.onSelectChange},t.renderSelectOptions())})),le(fe(t),"renderReadView",(function(r){var n=Pe(t.props.date,t.props.dateFormat,t.props.locale);return react.createElement("div",{key:"read",style:{visibility:r?"visible":"hidden"},className:"react-datepicker__month-year-read-view",onClick:function(e){return t.toggleDropdown(e)}},react.createElement("span",{className:"react-datepicker__month-year-read-view--down-arrow"}),react.createElement("span",{className:"react-datepicker__month-year-read-view--selected-month-year"},n))})),le(fe(t),"renderDropdown",(function(){return react.createElement(Ct,{key:"dropdown",date:t.props.date,dateFormat:t.props.dateFormat,onChange:t.onChange,onCancel:t.toggleDropdown,minDate:t.props.minDate,maxDate:t.props.maxDate,scrollableMonthYearDropdown:t.props.scrollableMonthYearDropdown,locale:t.props.locale})})),le(fe(t),"renderScrollMode",(function(){var e=t.state.dropdownVisible,r=[t.renderReadView(!e)];return e&&r.unshift(t.renderDropdown()),r})),le(fe(t),"onChange",(function(e){t.toggleDropdown();var r=Se(parseInt(e));Re(t.props.date,r)&&Ae(t.props.date,r)||t.props.onChange(r);})),le(fe(t),"toggleDropdown",(function(){return t.setState({dropdownVisible:!t.state.dropdownVisible})})),t}return ce(n,[{key:"render",value:function(){var t;switch(this.props.dropdownMode){case"scroll":t=this.renderScrollMode();break;case"select":t=this.renderSelectMode();}return react.createElement("div",{className:"react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode)},t)}}]),n}(),_t=function(r){ue(o,react.Component);var n=ve(o);function o(){var r;pe(this,o);for(var a=arguments.length,s=new Array(a),p=0;p<a;p++)s[p]=arguments[p];return le(fe(r=n.call.apply(n,[this].concat(s))),"dayEl",react.createRef()),le(fe(r),"handleClick",(function(e){!r.isDisabled()&&r.props.onClick&&r.props.onClick(e);})),le(fe(r),"handleMouseEnter",(function(e){!r.isDisabled()&&r.props.onMouseEnter&&r.props.onMouseEnter(e);})),le(fe(r),"handleOnKeyDown",(function(e){" "===e.key&&(e.preventDefault(),e.key="Enter"),r.props.handleOnKeyDown(e);})),le(fe(r),"isSameDay",(function(e){return Be(r.props.day,e)})),le(fe(r),"isKeyboardSelected",(function(){return !r.props.disabledKeyboardNavigation&&!r.isSameDay(r.props.selected)&&r.isSameDay(r.props.preSelection)})),le(fe(r),"isDisabled",(function(){return Ge(r.props.day,r.props)})),le(fe(r),"isExcluded",(function(){return Je(r.props.day,r.props)})),le(fe(r),"getHighLightedClass",(function(e){var t=r.props,n=t.day,o=t.highlightDates;if(!o)return !1;var a=Pe(n,"MM.dd.yyyy");return o.get(a)})),le(fe(r),"isInRange",(function(){var e=r.props,t=e.day,n=e.startDate,o=e.endDate;return !(!n||!o)&&je(t,n,o)})),le(fe(r),"isInSelectingRange",(function(){var e,t=r.props,n=t.day,o=t.selectsStart,a=t.selectsEnd,s=t.selectsRange,p=t.selectsDisabledDaysInRange,i=t.startDate,c=t.endDate,l=null!==(e=r.props.selectingDate)&&void 0!==e?e:r.props.preSelection;return !(!(o||a||s)||!l||!p&&r.isDisabled())&&(o&&c&&(isBefore(l,c)||We(l,c))?je(n,l,c):(a&&i&&(isAfter(l,i)||We(l,i))||!(!s||!i||c||!isAfter(l,i)&&!We(l,i)))&&je(n,i,l))})),le(fe(r),"isSelectingRangeStart",(function(){var e;if(!r.isInSelectingRange())return !1;var t=r.props,n=t.day,o=t.startDate,a=t.selectsStart,s=null!==(e=r.props.selectingDate)&&void 0!==e?e:r.props.preSelection;return Be(n,a?s:o)})),le(fe(r),"isSelectingRangeEnd",(function(){var e;if(!r.isInSelectingRange())return !1;var t=r.props,n=t.day,o=t.endDate,a=t.selectsEnd,s=null!==(e=r.props.selectingDate)&&void 0!==e?e:r.props.preSelection;return Be(n,a?s:o)})),le(fe(r),"isRangeStart",(function(){var e=r.props,t=e.day,n=e.startDate,o=e.endDate;return !(!n||!o)&&Be(n,t)})),le(fe(r),"isRangeEnd",(function(){var e=r.props,t=e.day,n=e.startDate,o=e.endDate;return !(!n||!o)&&Be(o,t)})),le(fe(r),"isWeekend",(function(){var e=getDay(r.props.day);return 0===e||6===e})),le(fe(r),"isOutsideMonth",(function(){return void 0!==r.props.month&&r.props.month!==getMonth(r.props.day)})),le(fe(r),"getClassNames",(function(e){var n=r.props.dayClassName?r.props.dayClassName(e):void 0;return classnames("react-datepicker__day",n,"react-datepicker__day--"+Oe(r.props.day),{"react-datepicker__day--disabled":r.isDisabled(),"react-datepicker__day--excluded":r.isExcluded(),"react-datepicker__day--selected":r.isSameDay(r.props.selected),"react-datepicker__day--keyboard-selected":r.isKeyboardSelected(),"react-datepicker__day--range-start":r.isRangeStart(),"react-datepicker__day--range-end":r.isRangeEnd(),"react-datepicker__day--in-range":r.isInRange(),"react-datepicker__day--in-selecting-range":r.isInSelectingRange(),"react-datepicker__day--selecting-range-start":r.isSelectingRangeStart(),"react-datepicker__day--selecting-range-end":r.isSelectingRangeEnd(),"react-datepicker__day--today":r.isSameDay(Se()),"react-datepicker__day--weekend":r.isWeekend(),"react-datepicker__day--outside-month":r.isOutsideMonth()},r.getHighLightedClass("react-datepicker__day--highlighted"))})),le(fe(r),"getAriaLabel",(function(){var e=r.props,t=e.day,n=e.ariaLabelPrefixWhenEnabled,o=void 0===n?"Choose":n,a=e.ariaLabelPrefixWhenDisabled,s=void 0===a?"Not available":a,p=r.isDisabled()||r.isExcluded()?s:o;return "".concat(p," ").concat(Pe(t,"PPPP",r.props.locale))})),le(fe(r),"getTabIndex",(function(e,t){var n=e||r.props.selected,o=t||r.props.preSelection;return r.isKeyboardSelected()||r.isSameDay(n)&&Be(o,n)?0:-1})),le(fe(r),"handleFocusDay",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=!1;0===r.getTabIndex()&&!e.isInputFocused&&r.isSameDay(r.props.preSelection)&&(document.activeElement&&document.activeElement!==document.body||(t=!0),r.props.inline&&!r.props.shouldFocusDayInline&&(t=!1),r.props.containerRef&&r.props.containerRef.current&&r.props.containerRef.current.contains(document.activeElement)&&document.activeElement.classList.contains("react-datepicker__day")&&(t=!0)),t&&r.dayEl.current.focus({preventScroll:!0});})),le(fe(r),"renderDayContents",(function(){if(r.isOutsideMonth()){if(r.props.monthShowsDuplicateDaysEnd&&getDate(r.props.day)<10)return null;if(r.props.monthShowsDuplicateDaysStart&&getDate(r.props.day)>20)return null}return r.props.renderDayContents?r.props.renderDayContents(getDate(r.props.day),r.props.day):getDate(r.props.day)})),le(fe(r),"render",(function(){return react.createElement("div",{ref:r.dayEl,className:r.getClassNames(r.props.day),onKeyDown:r.handleOnKeyDown,onClick:r.handleClick,onMouseEnter:r.handleMouseEnter,tabIndex:r.getTabIndex(),"aria-label":r.getAriaLabel(),role:"button","aria-disabled":r.isDisabled()},r.renderDayContents())})),r}return ce(o,[{key:"componentDidMount",value:function(){this.handleFocusDay();}},{key:"componentDidUpdate",value:function(e){this.handleFocusDay(e);}}]),o}(),Mt=function(r){ue(o,react.Component);var n=ve(o);function o(){var e;pe(this,o);for(var t=arguments.length,r=new Array(t),a=0;a<t;a++)r[a]=arguments[a];return le(fe(e=n.call.apply(n,[this].concat(r))),"handleClick",(function(t){e.props.onClick&&e.props.onClick(t);})),e}return ce(o,[{key:"render",value:function(){var r=this.props,n=r.weekNumber,o=r.ariaLabelPrefix,a=void 0===o?"week ":o,s={"react-datepicker__week-number":!0,"react-datepicker__week-number--clickable":!!r.onClick};return react.createElement("div",{className:classnames(s),"aria-label":"".concat(a," ").concat(this.props.weekNumber),onClick:this.handleClick},n)}}]),o}(),Pt=function(t){ue(n,react.Component);var r=ve(n);function n(){var t;pe(this,n);for(var o=arguments.length,a=new Array(o),s=0;s<o;s++)a[s]=arguments[s];return le(fe(t=r.call.apply(r,[this].concat(a))),"handleDayClick",(function(e,r){t.props.onDayClick&&t.props.onDayClick(e,r);})),le(fe(t),"handleDayMouseEnter",(function(e){t.props.onDayMouseEnter&&t.props.onDayMouseEnter(e);})),le(fe(t),"handleWeekClick",(function(e,r,n){"function"==typeof t.props.onWeekSelect&&t.props.onWeekSelect(e,r,n),t.props.shouldCloseOnSelect&&t.props.setOpen(!1);})),le(fe(t),"formatWeekNumber",(function(e){return t.props.formatWeekNumber?t.props.formatWeekNumber(e):xe(e)})),le(fe(t),"renderDays",(function(){var r=Ie(t.props.day,t.props.locale,t.props.calendarStartDay),n=[],o=t.formatWeekNumber(r);if(t.props.showWeekNumber){var a=t.props.onWeekSelect?t.handleWeekClick.bind(fe(t),r,o):void 0;n.push(react.createElement(Mt,{key:"W",weekNumber:o,onClick:a,ariaLabelPrefix:t.props.ariaLabelPrefix}));}return n.concat([0,1,2,3,4,5,6].map((function(n){var o=addDays(r,n);return react.createElement(_t,{ariaLabelPrefixWhenEnabled:t.props.chooseDayAriaLabelPrefix,ariaLabelPrefixWhenDisabled:t.props.disabledDayAriaLabelPrefix,key:o.valueOf(),day:o,month:t.props.month,onClick:t.handleDayClick.bind(fe(t),o),onMouseEnter:t.handleDayMouseEnter.bind(fe(t),o),minDate:t.props.minDate,maxDate:t.props.maxDate,excludeDates:t.props.excludeDates,excludeDateIntervals:t.props.excludeDateIntervals,includeDates:t.props.includeDates,includeDateIntervals:t.props.includeDateIntervals,highlightDates:t.props.highlightDates,selectingDate:t.props.selectingDate,filterDate:t.props.filterDate,preSelection:t.props.preSelection,selected:t.props.selected,selectsStart:t.props.selectsStart,selectsEnd:t.props.selectsEnd,selectsRange:t.props.selectsRange,selectsDisabledDaysInRange:t.props.selectsDisabledDaysInRange,startDate:t.props.startDate,endDate:t.props.endDate,dayClassName:t.props.dayClassName,renderDayContents:t.props.renderDayContents,disabledKeyboardNavigation:t.props.disabledKeyboardNavigation,handleOnKeyDown:t.props.handleOnKeyDown,isInputFocused:t.props.isInputFocused,containerRef:t.props.containerRef,inline:t.props.inline,shouldFocusDayInline:t.props.shouldFocusDayInline,monthShowsDuplicateDaysEnd:t.props.monthShowsDuplicateDaysEnd,monthShowsDuplicateDaysStart:t.props.monthShowsDuplicateDaysStart,locale:t.props.locale})})))})),t}return ce(n,[{key:"render",value:function(){return react.createElement("div",{className:"react-datepicker__week"},this.renderDays())}}],[{key:"defaultProps",get:function(){return {shouldCloseOnSelect:!0}}}]),n}(),Et=function(r){ue(o,react.Component);var n=ve(o);function o(){var r;pe(this,o);for(var a=arguments.length,s=new Array(a),l=0;l<a;l++)s[l]=arguments[l];return le(fe(r=n.call.apply(n,[this].concat(s))),"MONTH_REFS",De(Array(12)).map((function(){return react.createRef()}))),le(fe(r),"isDisabled",(function(e){return Ge(e,r.props)})),le(fe(r),"isExcluded",(function(e){return Je(e,r.props)})),le(fe(r),"handleDayClick",(function(e,t){r.props.onDayClick&&r.props.onDayClick(e,t,r.props.orderInDisplay);})),le(fe(r),"handleDayMouseEnter",(function(e){r.props.onDayMouseEnter&&r.props.onDayMouseEnter(e);})),le(fe(r),"handleMouseLeave",(function(){r.props.onMouseLeave&&r.props.onMouseLeave();})),le(fe(r),"isRangeStartMonth",(function(e){var t=r.props,n=t.day,o=t.startDate,a=t.endDate;return !(!o||!a)&&Ae(setMonth(n,e),o)})),le(fe(r),"isRangeStartQuarter",(function(e){var t=r.props,n=t.day,o=t.startDate,a=t.endDate;return !(!o||!a)&&Ke(setQuarter(n,e),o)})),le(fe(r),"isRangeEndMonth",(function(e){var t=r.props,n=t.day,o=t.startDate,a=t.endDate;return !(!o||!a)&&Ae(setMonth(n,e),a)})),le(fe(r),"isRangeEndQuarter",(function(e){var t=r.props,n=t.day,o=t.startDate,a=t.endDate;return !(!o||!a)&&Ke(setQuarter(n,e),a)})),le(fe(r),"isWeekInMonth",(function(e){var t=r.props.day,n=addDays(e,6);return Ae(e,t)||Ae(n,t)})),le(fe(r),"renderWeeks",(function(){for(var t=[],n=r.props.fixedHeight,o=0,a=!1,s=Ie(Te(r.props.day),r.props.locale,r.props.calendarStartDay);t.push(react.createElement(Pt,{ariaLabelPrefix:r.props.weekAriaLabelPrefix,chooseDayAriaLabelPrefix:r.props.chooseDayAriaLabelPrefix,disabledDayAriaLabelPrefix:r.props.disabledDayAriaLabelPrefix,key:o,day:s,month:getMonth(r.props.day),onDayClick:r.handleDayClick,onDayMouseEnter:r.handleDayMouseEnter,onWeekSelect:r.props.onWeekSelect,formatWeekNumber:r.props.formatWeekNumber,locale:r.props.locale,minDate:r.props.minDate,maxDate:r.props.maxDate,excludeDates:r.props.excludeDates,excludeDateIntervals:r.props.excludeDateIntervals,includeDates:r.props.includeDates,includeDateIntervals:r.props.includeDateIntervals,inline:r.props.inline,shouldFocusDayInline:r.props.shouldFocusDayInline,highlightDates:r.props.highlightDates,selectingDate:r.props.selectingDate,filterDate:r.props.filterDate,preSelection:r.props.preSelection,selected:r.props.selected,selectsStart:r.props.selectsStart,selectsEnd:r.props.selectsEnd,selectsRange:r.props.selectsRange,selectsDisabledDaysInRange:r.props.selectsDisabledDaysInRange,showWeekNumber:r.props.showWeekNumbers,startDate:r.props.startDate,endDate:r.props.endDate,dayClassName:r.props.dayClassName,setOpen:r.props.setOpen,shouldCloseOnSelect:r.props.shouldCloseOnSelect,disabledKeyboardNavigation:r.props.disabledKeyboardNavigation,renderDayContents:r.props.renderDayContents,handleOnKeyDown:r.props.handleOnKeyDown,isInputFocused:r.props.isInputFocused,containerRef:r.props.containerRef,calendarStartDay:r.props.calendarStartDay,monthShowsDuplicateDaysEnd:r.props.monthShowsDuplicateDaysEnd,monthShowsDuplicateDaysStart:r.props.monthShowsDuplicateDaysStart})),!a;){o++,s=addWeeks(s,1);var p=n&&o>=6,c=!n&&!r.isWeekInMonth(s);if(p||c){if(!r.props.peekNextMonth)break;a=!0;}}return t})),le(fe(r),"onMonthClick",(function(e,t){r.handleDayClick(Te(setMonth(r.props.day,t)),e);})),le(fe(r),"handleMonthNavigation",(function(e,t){r.isDisabled(t)||r.isExcluded(t)||(r.props.setPreSelection(t),r.MONTH_REFS[e].current&&r.MONTH_REFS[e].current.focus());})),le(fe(r),"onMonthKeyDown",(function(e,t){var n=e.key;if(!r.props.disabledKeyboardNavigation)switch(n){case"Enter":r.onMonthClick(e,t),r.props.setPreSelection(r.props.selected);break;case"ArrowRight":r.handleMonthNavigation(11===t?0:t+1,addMonths(r.props.preSelection,1));break;case"ArrowLeft":r.handleMonthNavigation(0===t?11:t-1,subMonths(r.props.preSelection,1));}})),le(fe(r),"onQuarterClick",(function(e,t){r.handleDayClick(Fe(setQuarter(r.props.day,t)),e);})),le(fe(r),"getMonthClassNames",(function(e){var n=r.props,o=n.day,a=n.startDate,s=n.endDate,p=n.selected,i=n.minDate,c=n.maxDate,l=n.preSelection,d=n.monthClassName,u=d?d(o):void 0;return classnames("react-datepicker__month-text","react-datepicker__month-".concat(e),u,{"react-datepicker__month--disabled":(i||c)&&Xe(setMonth(o,e),r.props),"react-datepicker__month--selected":getMonth(o)===e&&getYear(o)===getYear(p),"react-datepicker__month-text--keyboard-selected":getMonth(l)===e,"react-datepicker__month--in-range":Ze(a,s,e,o),"react-datepicker__month--range-start":r.isRangeStartMonth(e),"react-datepicker__month--range-end":r.isRangeEndMonth(e),"react-datepicker__month-text--today":getYear(o)===getYear(Se())&&e===getMonth(Se())})})),le(fe(r),"getTabIndex",(function(e){var t=getMonth(r.props.preSelection);return r.props.disabledKeyboardNavigation||e!==t?"-1":"0"})),le(fe(r),"getAriaLabel",(function(e){var t=r.props,n=t.ariaLabelPrefix,o=void 0===n?"Choose":n,a=t.disabledDayAriaLabelPrefix,s=void 0===a?"Not available":a,p=t.day,i=setMonth(p,e),c=r.isDisabled(i)||r.isExcluded(i)?s:o;return "".concat(c," ").concat(Pe(i,"MMMM yyyy"))})),le(fe(r),"getQuarterClassNames",(function(e){var n=r.props,o=n.day,a=n.startDate,s=n.endDate,p=n.selected,i=n.minDate,c=n.maxDate;return classnames("react-datepicker__quarter-text","react-datepicker__quarter-".concat(e),{"react-datepicker__quarter--disabled":(i||c)&&et(setQuarter(o,e),r.props),"react-datepicker__quarter--selected":getQuarter(o)===e&&getYear(o)===getYear(p),"react-datepicker__quarter--in-range":rt(a,s,e,o),"react-datepicker__quarter--range-start":r.isRangeStartQuarter(e),"react-datepicker__quarter--range-end":r.isRangeEndQuarter(e)})})),le(fe(r),"renderMonths",(function(){var t=r.props,n=t.showFullMonthYearPicker,o=t.showTwoColumnMonthYearPicker,a=t.showFourColumnMonthYearPicker,s=t.locale;return (a?[[0,1,2,3],[4,5,6,7],[8,9,10,11]]:o?[[0,1],[2,3],[4,5],[6,7],[8,9],[10,11]]:[[0,1,2],[3,4,5],[6,7,8],[9,10,11]]).map((function(t,o){return react.createElement("div",{className:"react-datepicker__month-wrapper",key:o},t.map((function(t,o){return react.createElement("div",{ref:r.MONTH_REFS[t],key:o,onClick:function(e){r.onMonthClick(e,t);},onKeyDown:function(e){r.onMonthKeyDown(e,t);},tabIndex:r.getTabIndex(t),className:r.getMonthClassNames(t),role:"button","aria-label":r.getAriaLabel(t)},n?Ue(t,s):$e(t,s))})))}))})),le(fe(r),"renderQuarters",(function(){return react.createElement("div",{className:"react-datepicker__quarter-wrapper"},[1,2,3,4].map((function(t,n){return react.createElement("div",{key:n,onClick:function(e){r.onQuarterClick(e,t);},className:r.getQuarterClassNames(t)},ze(t,r.props.locale))})))})),le(fe(r),"getClassNames",(function(){var e=r.props;e.day;var n=e.selectingDate,o=e.selectsStart,a=e.selectsEnd,s=e.showMonthYearPicker,p=e.showQuarterYearPicker;return classnames("react-datepicker__month",{"react-datepicker__month--selecting-range":n&&(o||a)},{"react-datepicker__monthPicker":s},{"react-datepicker__quarterPicker":p})})),r}return ce(o,[{key:"render",value:function(){var t=this.props,r=t.showMonthYearPicker,n=t.showQuarterYearPicker,o=t.day,a=t.ariaLabelPrefix,s=void 0===a?"month ":a;return react.createElement("div",{className:this.getClassNames(),onMouseLeave:this.handleMouseLeave,"aria-label":"".concat(s," ").concat(Pe(o,"yyyy-MM"))},r?this.renderMonths():n?this.renderQuarters():this.renderWeeks())}}]),o}(),Nt=function(t){ue(n,react.Component);var r=ve(n);function n(){var t;pe(this,n);for(var o=arguments.length,s=new Array(o),p=0;p<o;p++)s[p]=arguments[p];return le(fe(t=r.call.apply(r,[this].concat(s))),"state",{height:null}),le(fe(t),"handleClick",(function(e){(t.props.minTime||t.props.maxTime)&&st(e,t.props)||(t.props.excludeTimes||t.props.includeTimes||t.props.filterTime)&&at(e,t.props)||t.props.onChange(e);})),le(fe(t),"liClasses",(function(e,r,n){var o=["react-datepicker__time-list-item",t.props.timeClassName?t.props.timeClassName(e,r,n):void 0];return t.props.selected&&r===getHours(e)&&n===getMinutes(e)&&o.push("react-datepicker__time-list-item--selected"),((t.props.minTime||t.props.maxTime)&&st(e,t.props)||(t.props.excludeTimes||t.props.includeTimes||t.props.filterTime)&&at(e,t.props))&&o.push("react-datepicker__time-list-item--disabled"),t.props.injectTimes&&(60*getHours(e)+getMinutes(e))%t.props.intervals!=0&&o.push("react-datepicker__time-list-item--injected"),o.join(" ")})),le(fe(t),"handleOnKeyDown",(function(e,r){" "===e.key&&(e.preventDefault(),e.key="Enter"),"Enter"===e.key&&t.handleClick(r),t.props.handleOnKeyDown(e);})),le(fe(t),"renderTimes",(function(){for(var r=[],n=t.props.format?t.props.format:"p",o=t.props.intervals,s=Ye(Se(t.props.selected)),p=1440/o,i=t.props.injectTimes&&t.props.injectTimes.sort((function(e,t){return e-t})),c=t.props.selected||t.props.openToDate||Se(),l=getHours(c),d=getMinutes(c),u=setHours(setMinutes(s,d),l),h=0;h<p;h++){var m=addMinutes(s,h*o);if(r.push(m),i){var f=mt(s,m,h,o,i);r=r.concat(f);}}return r.map((function(r,o){return react.createElement("li",{key:o,onClick:t.handleClick.bind(fe(t),r),className:t.liClasses(r,l,d),ref:function(e){(isBefore(r,u)||We(r,u))&&(t.centerLi=e);},onKeyDown:function(e){t.handleOnKeyDown(e,r);},tabIndex:"0"},Pe(r,n,t.props.locale))}))})),t}return ce(n,[{key:"componentDidMount",value:function(){this.list.scrollTop=n.calcCenterPosition(this.props.monthRef?this.props.monthRef.clientHeight-this.header.clientHeight:this.list.clientHeight,this.centerLi),this.props.monthRef&&this.header&&this.setState({height:this.props.monthRef.clientHeight-this.header.clientHeight});}},{key:"render",value:function(){var t=this,r=this.state.height;return react.createElement("div",{className:"react-datepicker__time-container ".concat(this.props.todayButton?"react-datepicker__time-container--with-today-button":"")},react.createElement("div",{className:"react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly?"react-datepicker__header--time--only":""),ref:function(e){t.header=e;}},react.createElement("div",{className:"react-datepicker-time__header"},this.props.timeCaption)),react.createElement("div",{className:"react-datepicker__time"},react.createElement("div",{className:"react-datepicker__time-box"},react.createElement("ul",{className:"react-datepicker__time-list",ref:function(e){t.list=e;},style:r?{height:r}:{},tabIndex:"0"},this.renderTimes()))))}}],[{key:"defaultProps",get:function(){return {intervals:30,onTimeChange:function(){},todayButton:null,timeCaption:"Time"}}}]),n}();le(Nt,"calcCenterPosition",(function(e,t){return t.offsetTop-(e/2-t.clientHeight/2)}));var xt=function(r){ue(o,react.Component);var n=ve(o);function o(r){var a;return pe(this,o),le(fe(a=n.call(this,r)),"YEAR_REFS",De(Array(a.props.yearItemNumber)).map((function(){return react.createRef()}))),le(fe(a),"isDisabled",(function(e){return Ge(e,a.props)})),le(fe(a),"isExcluded",(function(e){return Je(e,a.props)})),le(fe(a),"updateFocusOnPaginate",(function(e){var t=function(){this.YEAR_REFS[e].current.focus();}.bind(fe(a));window.requestAnimationFrame(t);})),le(fe(a),"handleYearClick",(function(e,t){a.props.onDayClick&&a.props.onDayClick(e,t);})),le(fe(a),"handleYearNavigation",(function(e,t){var r=a.props,n=r.date,o=r.yearItemNumber,s=yt(n,o).startPeriod;a.isDisabled(t)||a.isExcluded(t)||(a.props.setPreSelection(t),e-s==-1?a.updateFocusOnPaginate(o-1):e-s===o?a.updateFocusOnPaginate(0):a.YEAR_REFS[e-s].current.focus());})),le(fe(a),"isSameDay",(function(e,t){return Be(e,t)})),le(fe(a),"isKeyboardSelected",(function(e){var t=Le(setYear(a.props.date,e));return !a.props.disabledKeyboardNavigation&&!a.props.inline&&!Be(t,Le(a.props.selected))&&Be(t,Le(a.props.preSelection))})),le(fe(a),"onYearClick",(function(e,t){var r=a.props.date;a.handleYearClick(Le(setYear(r,t)),e);})),le(fe(a),"onYearKeyDown",(function(e,t){var r=e.key;if(!a.props.disabledKeyboardNavigation)switch(r){case"Enter":a.onYearClick(e,t),a.props.setPreSelection(a.props.selected);break;case"ArrowRight":a.handleYearNavigation(t+1,addYears(a.props.preSelection,1));break;case"ArrowLeft":a.handleYearNavigation(t-1,subYears(a.props.preSelection,1));}})),le(fe(a),"getYearClassNames",(function(e){var r=a.props,n=r.minDate,o=r.maxDate,s=r.selected;return classnames("react-datepicker__year-text",{"react-datepicker__year-text--selected":e===getYear(s),"react-datepicker__year-text--disabled":(n||o)&&tt(e,a.props),"react-datepicker__year-text--keyboard-selected":a.isKeyboardSelected(e),"react-datepicker__year-text--today":e===getYear(Se())})})),le(fe(a),"getYearTabIndex",(function(e){return a.props.disabledKeyboardNavigation?"-1":e===getYear(a.props.preSelection)?"0":"-1"})),a}return ce(o,[{key:"render",value:function(){for(var t=this,r=[],n=this.props,o=yt(n.date,n.yearItemNumber),a=o.startPeriod,s=o.endPeriod,p=function(n){r.push(react.createElement("div",{ref:t.YEAR_REFS[n-a],onClick:function(e){t.onYearClick(e,n);},onKeyDown:function(e){t.onYearKeyDown(e,n);},tabIndex:t.getYearTabIndex(n),className:t.getYearClassNames(n),key:n},n));},i=a;i<=s;i++)p(i);return react.createElement("div",{className:"react-datepicker__year"},react.createElement("div",{className:"react-datepicker__year-wrapper"},r))}}]),o}(),Ot=function(t){ue(n,react.Component);var r=ve(n);function n(t){var o;return pe(this,n),le(fe(o=r.call(this,t)),"onTimeChange",(function(e){o.setState({time:e});var t=new Date;t.setHours(e.split(":")[0]),t.setMinutes(e.split(":")[1]),o.props.onChange(t);})),le(fe(o),"renderTimeInput",(function(){var t=o.state.time,r=o.props,n=r.date,a=r.timeString,s=r.customTimeInput;return s?react.cloneElement(s,{date:n,value:t,onChange:o.onTimeChange}):react.createElement("input",{type:"time",className:"react-datepicker-time__input",placeholder:"Time",name:"time-input",required:!0,value:t,onChange:function(e){o.onTimeChange(e.target.value||a);}})})),o.state={time:o.props.timeString},o}return ce(n,[{key:"render",value:function(){return react.createElement("div",{className:"react-datepicker__input-time-container"},react.createElement("div",{className:"react-datepicker-time__caption"},this.props.timeInputLabel),react.createElement("div",{className:"react-datepicker-time__input-container"},react.createElement("div",{className:"react-datepicker-time__input"},this.renderTimeInput())))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.timeString!==t.time?{time:e.timeString}:null}}]),n}();function Yt(t){var r=t.className,n=t.children,o=t.showPopperArrow,a=t.arrowProps,s=void 0===a?{}:a;return react.createElement("div",{className:r},o&&react.createElement("div",de({className:"react-datepicker__triangle"},s)),n)}var It=["react-datepicker__year-select","react-datepicker__month-select","react-datepicker__month-year-select"],Tt=function(r){ue(o,react.Component);var n=ve(o);function o(r){var a;return pe(this,o),le(fe(a=n.call(this,r)),"handleClickOutside",(function(e){a.props.onClickOutside(e);})),le(fe(a),"setClickOutsideRef",(function(){return a.containerRef.current})),le(fe(a),"handleDropdownFocus",(function(e){(function(){var e=((arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).className||"").split(/\s+/);return It.some((function(t){return e.indexOf(t)>=0}))})(e.target)&&a.props.onDropdownFocus();})),le(fe(a),"getDateInView",(function(){var e=a.props,t=e.preSelection,r=e.selected,n=e.openToDate,o=dt(a.props),s=ut(a.props),p=Se(),i=n||r||t;return i||(o&&isBefore(p,o)?o:s&&isAfter(p,s)?s:p)})),le(fe(a),"increaseMonth",(function(){a.setState((function(e){var t=e.date;return {date:addMonths(t,1)}}),(function(){return a.handleMonthChange(a.state.date)}));})),le(fe(a),"decreaseMonth",(function(){a.setState((function(e){var t=e.date;return {date:subMonths(t,1)}}),(function(){return a.handleMonthChange(a.state.date)}));})),le(fe(a),"handleDayClick",(function(e,t,r){a.props.onSelect(e,t,r),a.props.setPreSelection&&a.props.setPreSelection(e);})),le(fe(a),"handleDayMouseEnter",(function(e){a.setState({selectingDate:e}),a.props.onDayMouseEnter&&a.props.onDayMouseEnter(e);})),le(fe(a),"handleMonthMouseLeave",(function(){a.setState({selectingDate:null}),a.props.onMonthMouseLeave&&a.props.onMonthMouseLeave();})),le(fe(a),"handleYearChange",(function(e){a.props.onYearChange&&a.props.onYearChange(e),a.props.adjustDateOnChange&&(a.props.onSelect&&a.props.onSelect(e),a.props.setOpen&&a.props.setOpen(!0)),a.props.setPreSelection&&a.props.setPreSelection(e);})),le(fe(a),"handleMonthChange",(function(e){a.props.onMonthChange&&a.props.onMonthChange(e),a.props.adjustDateOnChange&&(a.props.onSelect&&a.props.onSelect(e),a.props.setOpen&&a.props.setOpen(!0)),a.props.setPreSelection&&a.props.setPreSelection(e);})),le(fe(a),"handleMonthYearChange",(function(e){a.handleYearChange(e),a.handleMonthChange(e);})),le(fe(a),"changeYear",(function(e){a.setState((function(t){var r=t.date;return {date:setYear(r,e)}}),(function(){return a.handleYearChange(a.state.date)}));})),le(fe(a),"changeMonth",(function(e){a.setState((function(t){var r=t.date;return {date:setMonth(r,e)}}),(function(){return a.handleMonthChange(a.state.date)}));})),le(fe(a),"changeMonthYear",(function(e){a.setState((function(t){var r=t.date;return {date:setYear(setMonth(r,getMonth(e)),getYear(e))}}),(function(){return a.handleMonthYearChange(a.state.date)}));})),le(fe(a),"header",(function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.state.date,n=Ie(r,a.props.locale,a.props.calendarStartDay),o=[];return a.props.showWeekNumbers&&o.push(react.createElement("div",{key:"W",className:"react-datepicker__day-name"},a.props.weekLabel||"#")),o.concat([0,1,2,3,4,5,6].map((function(r){var o=addDays(n,r),s=a.formatWeekday(o,a.props.locale),i=a.props.weekDayClassName?a.props.weekDayClassName(o):void 0;return react.createElement("div",{key:r,className:classnames("react-datepicker__day-name",i)},s)})))})),le(fe(a),"formatWeekday",(function(e,t){return a.props.formatWeekDay?function(e,t,r){return t(Pe(e,"EEEE",r))}(e,a.props.formatWeekDay,t):a.props.useWeekdaysShort?function(e,t){return Pe(e,"EEE",t)}(e,t):function(e,t){return Pe(e,"EEEEEE",t)}(e,t)})),le(fe(a),"decreaseYear",(function(){a.setState((function(e){var t=e.date;return {date:subYears(t,a.props.showYearPicker?a.props.yearItemNumber:1)}}),(function(){return a.handleYearChange(a.state.date)}));})),le(fe(a),"renderPreviousButton",(function(){if(!a.props.renderCustomHeader){var t;switch(!0){case a.props.showMonthYearPicker:t=ct(a.state.date,a.props);break;case a.props.showYearPicker:t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.minDate,n=t.yearItemNumber,o=void 0===n?12:n,a=yt(Le(subYears(e,o)),o).endPeriod,s=r&&getYear(r);return s&&s>a||!1}(a.state.date,a.props);break;default:t=pt(a.state.date,a.props);}if((a.props.forceShowMonthNavigation||a.props.showDisabledMonthNavigation||!t)&&!a.props.showTimeSelectOnly){var r=["react-datepicker__navigation","react-datepicker__navigation--previous"],n=a.decreaseMonth;(a.props.showMonthYearPicker||a.props.showQuarterYearPicker||a.props.showYearPicker)&&(n=a.decreaseYear),t&&a.props.showDisabledMonthNavigation&&(r.push("react-datepicker__navigation--previous--disabled"),n=null);var o=a.props.showMonthYearPicker||a.props.showQuarterYearPicker||a.props.showYearPicker,s=a.props,p=s.previousMonthButtonLabel,i=s.previousYearButtonLabel,c=a.props,l=c.previousMonthAriaLabel,d=void 0===l?"string"==typeof p?p:"Previous Month":l,u=c.previousYearAriaLabel,h=void 0===u?"string"==typeof i?i:"Previous Year":u;return react.createElement("button",{type:"button",className:r.join(" "),onClick:n,onKeyDown:a.props.handleOnKeyDown,"aria-label":o?h:d},react.createElement("span",{className:["react-datepicker__navigation-icon","react-datepicker__navigation-icon--previous"].join(" ")},o?a.props.previousYearButtonLabel:a.props.previousMonthButtonLabel))}}})),le(fe(a),"increaseYear",(function(){a.setState((function(e){var t=e.date;return {date:addYears(t,a.props.showYearPicker?a.props.yearItemNumber:1)}}),(function(){return a.handleYearChange(a.state.date)}));})),le(fe(a),"renderNextButton",(function(){if(!a.props.renderCustomHeader){var t;switch(!0){case a.props.showMonthYearPicker:t=lt(a.state.date,a.props);break;case a.props.showYearPicker:t=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.maxDate,n=t.yearItemNumber,o=void 0===n?12:n,a=yt(addYears(e,o),o).startPeriod,s=r&&getYear(r);return s&&s<a||!1}(a.state.date,a.props);break;default:t=it(a.state.date,a.props);}if((a.props.forceShowMonthNavigation||a.props.showDisabledMonthNavigation||!t)&&!a.props.showTimeSelectOnly){var r=["react-datepicker__navigation","react-datepicker__navigation--next"];a.props.showTimeSelect&&r.push("react-datepicker__navigation--next--with-time"),a.props.todayButton&&r.push("react-datepicker__navigation--next--with-today-button");var n=a.increaseMonth;(a.props.showMonthYearPicker||a.props.showQuarterYearPicker||a.props.showYearPicker)&&(n=a.increaseYear),t&&a.props.showDisabledMonthNavigation&&(r.push("react-datepicker__navigation--next--disabled"),n=null);var o=a.props.showMonthYearPicker||a.props.showQuarterYearPicker||a.props.showYearPicker,s=a.props,p=s.nextMonthButtonLabel,i=s.nextYearButtonLabel,c=a.props,d=c.nextMonthAriaLabel,u=void 0===d?"string"==typeof p?p:"Next Month":d,h=c.nextYearAriaLabel,m=void 0===h?"string"==typeof i?i:"Next Year":h;return react.createElement("button",{type:"button",className:r.join(" "),onClick:n,onKeyDown:a.props.handleOnKeyDown,"aria-label":o?m:u},react.createElement("span",{className:["react-datepicker__navigation-icon","react-datepicker__navigation-icon--next"].join(" ")},o?a.props.nextYearButtonLabel:a.props.nextMonthButtonLabel))}}})),le(fe(a),"renderCurrentMonth",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a.state.date,r=["react-datepicker__current-month"];return a.props.showYearDropdown&&r.push("react-datepicker__current-month--hasYearDropdown"),a.props.showMonthDropdown&&r.push("react-datepicker__current-month--hasMonthDropdown"),a.props.showMonthYearDropdown&&r.push("react-datepicker__current-month--hasMonthYearDropdown"),react.createElement("div",{className:r.join(" ")},Pe(t,a.props.dateFormat,a.props.locale))})),le(fe(a),"renderYearDropdown",(function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(a.props.showYearDropdown&&!t)return react.createElement(wt,{adjustDateOnChange:a.props.adjustDateOnChange,date:a.state.date,onSelect:a.props.onSelect,setOpen:a.props.setOpen,dropdownMode:a.props.dropdownMode,onChange:a.changeYear,minDate:a.props.minDate,maxDate:a.props.maxDate,year:getYear(a.state.date),scrollableYearDropdown:a.props.scrollableYearDropdown,yearDropdownItemNumber:a.props.yearDropdownItemNumber})})),le(fe(a),"renderMonthDropdown",(function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(a.props.showMonthDropdown&&!t)return react.createElement(kt,{dropdownMode:a.props.dropdownMode,locale:a.props.locale,onChange:a.changeMonth,month:getMonth(a.state.date),useShortMonthInDropdown:a.props.useShortMonthInDropdown})})),le(fe(a),"renderMonthYearDropdown",(function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(a.props.showMonthYearDropdown&&!t)return react.createElement(St,{dropdownMode:a.props.dropdownMode,locale:a.props.locale,dateFormat:a.props.dateFormat,onChange:a.changeMonthYear,minDate:a.props.minDate,maxDate:a.props.maxDate,date:a.state.date,scrollableMonthYearDropdown:a.props.scrollableMonthYearDropdown})})),le(fe(a),"renderTodayButton",(function(){if(a.props.todayButton&&!a.props.showTimeSelectOnly)return react.createElement("div",{className:"react-datepicker__today-button",onClick:function(e){return a.props.onSelect(startOfDay(Se()),e)}},a.props.todayButton)})),le(fe(a),"renderDefaultHeader",(function(t){var r=t.monthDate,n=t.i;return react.createElement("div",{className:"react-datepicker__header ".concat(a.props.showTimeSelect?"react-datepicker__header--has-time-select":"")},a.renderCurrentMonth(r),react.createElement("div",{className:"react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(a.props.dropdownMode),onFocus:a.handleDropdownFocus},a.renderMonthDropdown(0!==n),a.renderMonthYearDropdown(0!==n),a.renderYearDropdown(0!==n)),react.createElement("div",{className:"react-datepicker__day-names"},a.header(r)))})),le(fe(a),"renderCustomHeader",(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.monthDate,n=t.i;if(a.props.showTimeSelect&&!a.state.monthContainer||a.props.showTimeSelectOnly)return null;var o=pt(a.state.date,a.props),s=it(a.state.date,a.props),p=ct(a.state.date,a.props),i=lt(a.state.date,a.props),c=!a.props.showMonthYearPicker&&!a.props.showQuarterYearPicker&&!a.props.showYearPicker;return react.createElement("div",{className:"react-datepicker__header react-datepicker__header--custom",onFocus:a.props.onDropdownFocus},a.props.renderCustomHeader(ae(ae({},a.state),{},{customHeaderCount:n,monthDate:r,changeMonth:a.changeMonth,changeYear:a.changeYear,decreaseMonth:a.decreaseMonth,increaseMonth:a.increaseMonth,decreaseYear:a.decreaseYear,increaseYear:a.increaseYear,prevMonthButtonDisabled:o,nextMonthButtonDisabled:s,prevYearButtonDisabled:p,nextYearButtonDisabled:i})),c&&react.createElement("div",{className:"react-datepicker__day-names"},a.header(r)))})),le(fe(a),"renderYearHeader",(function(){var t=a.state.date,r=a.props,n=r.showYearPicker,o=yt(t,r.yearItemNumber),s=o.startPeriod,p=o.endPeriod;return react.createElement("div",{className:"react-datepicker__header react-datepicker-year-header"},n?"".concat(s," - ").concat(p):getYear(t))})),le(fe(a),"renderHeader",(function(e){switch(!0){case void 0!==a.props.renderCustomHeader:return a.renderCustomHeader(e);case a.props.showMonthYearPicker||a.props.showQuarterYearPicker||a.props.showYearPicker:return a.renderYearHeader(e);default:return a.renderDefaultHeader(e)}})),le(fe(a),"renderMonths",(function(){if(!a.props.showTimeSelectOnly&&!a.props.showYearPicker){for(var t=[],r=a.props.showPreviousMonths?a.props.monthsShown-1:0,n=subMonths(a.state.date,r),o=0;o<a.props.monthsShown;++o){var s=o-a.props.monthSelectedIn,p=addMonths(n,s),i="month-".concat(o),l=o<a.props.monthsShown-1,d=o>0;t.push(react.createElement("div",{key:i,ref:function(e){a.monthContainer=e;},className:"react-datepicker__month-container"},a.renderHeader({monthDate:p,i:o}),react.createElement(Et,{chooseDayAriaLabelPrefix:a.props.chooseDayAriaLabelPrefix,disabledDayAriaLabelPrefix:a.props.disabledDayAriaLabelPrefix,weekAriaLabelPrefix:a.props.weekAriaLabelPrefix,onChange:a.changeMonthYear,day:p,dayClassName:a.props.dayClassName,calendarStartDay:a.props.calendarStartDay,monthClassName:a.props.monthClassName,onDayClick:a.handleDayClick,handleOnKeyDown:a.props.handleOnDayKeyDown,onDayMouseEnter:a.handleDayMouseEnter,onMouseLeave:a.handleMonthMouseLeave,onWeekSelect:a.props.onWeekSelect,orderInDisplay:o,formatWeekNumber:a.props.formatWeekNumber,locale:a.props.locale,minDate:a.props.minDate,maxDate:a.props.maxDate,excludeDates:a.props.excludeDates,excludeDateIntervals:a.props.excludeDateIntervals,highlightDates:a.props.highlightDates,selectingDate:a.state.selectingDate,includeDates:a.props.includeDates,includeDateIntervals:a.props.includeDateIntervals,inline:a.props.inline,shouldFocusDayInline:a.props.shouldFocusDayInline,fixedHeight:a.props.fixedHeight,filterDate:a.props.filterDate,preSelection:a.props.preSelection,setPreSelection:a.props.setPreSelection,selected:a.props.selected,selectsStart:a.props.selectsStart,selectsEnd:a.props.selectsEnd,selectsRange:a.props.selectsRange,selectsDisabledDaysInRange:a.props.selectsDisabledDaysInRange,showWeekNumbers:a.props.showWeekNumbers,startDate:a.props.startDate,endDate:a.props.endDate,peekNextMonth:a.props.peekNextMonth,setOpen:a.props.setOpen,shouldCloseOnSelect:a.props.shouldCloseOnSelect,renderDayContents:a.props.renderDayContents,disabledKeyboardNavigation:a.props.disabledKeyboardNavigation,showMonthYearPicker:a.props.showMonthYearPicker,showFullMonthYearPicker:a.props.showFullMonthYearPicker,showTwoColumnMonthYearPicker:a.props.showTwoColumnMonthYearPicker,showFourColumnMonthYearPicker:a.props.showFourColumnMonthYearPicker,showYearPicker:a.props.showYearPicker,showQuarterYearPicker:a.props.showQuarterYearPicker,isInputFocused:a.props.isInputFocused,containerRef:a.containerRef,monthShowsDuplicateDaysEnd:l,monthShowsDuplicateDaysStart:d})));}return t}})),le(fe(a),"renderYears",(function(){if(!a.props.showTimeSelectOnly)return a.props.showYearPicker?react.createElement("div",{className:"react-datepicker__year--container"},a.renderHeader(),react.createElement(xt,de({onDayClick:a.handleDayClick,date:a.state.date},a.props))):void 0})),le(fe(a),"renderTimeSection",(function(){if(a.props.showTimeSelect&&(a.state.monthContainer||a.props.showTimeSelectOnly))return react.createElement(Nt,{selected:a.props.selected,openToDate:a.props.openToDate,onChange:a.props.onTimeChange,timeClassName:a.props.timeClassName,format:a.props.timeFormat,includeTimes:a.props.includeTimes,intervals:a.props.timeIntervals,minTime:a.props.minTime,maxTime:a.props.maxTime,excludeTimes:a.props.excludeTimes,filterTime:a.props.filterTime,timeCaption:a.props.timeCaption,todayButton:a.props.todayButton,showMonthDropdown:a.props.showMonthDropdown,showMonthYearDropdown:a.props.showMonthYearDropdown,showYearDropdown:a.props.showYearDropdown,withPortal:a.props.withPortal,monthRef:a.state.monthContainer,injectTimes:a.props.injectTimes,locale:a.props.locale,handleOnKeyDown:a.props.handleOnKeyDown,showTimeSelectOnly:a.props.showTimeSelectOnly})})),le(fe(a),"renderInputTimeSection",(function(){var t=new Date(a.props.selected),r=Me(t)&&Boolean(a.props.selected)?"".concat(ft(t.getHours()),":").concat(ft(t.getMinutes())):"";if(a.props.showTimeInput)return react.createElement(Ot,{date:t,timeString:r,timeInputLabel:a.props.timeInputLabel,onChange:a.props.onTimeChange,customTimeInput:a.props.customTimeInput})})),a.containerRef=react.createRef(),a.state={date:a.getDateInView(),selectingDate:null,monthContainer:null},a}return ce(o,[{key:"componentDidMount",value:function(){var e=this;this.props.showTimeSelect&&(this.assignMonthContainer=void e.setState({monthContainer:e.monthContainer}));}},{key:"componentDidUpdate",value:function(e){this.props.preSelection&&!Be(this.props.preSelection,e.preSelection)?this.setState({date:this.props.preSelection}):this.props.openToDate&&!Be(this.props.openToDate,e.openToDate)&&this.setState({date:this.props.openToDate});}},{key:"render",value:function(){var r=this.props.container||Yt;return react.createElement("div",{ref:this.containerRef},react.createElement(r,{className:classnames("react-datepicker",this.props.className,{"react-datepicker--time-only":this.props.showTimeSelectOnly}),showPopperArrow:this.props.showPopperArrow,arrowProps:this.props.arrowProps},this.renderPreviousButton(),this.renderNextButton(),this.renderMonths(),this.renderYears(),this.renderTodayButton(),this.renderTimeSection(),this.renderInputTimeSection(),this.props.children))}}],[{key:"defaultProps",get:function(){return {onDropdownFocus:function(){},monthsShown:1,monthSelectedIn:0,forceShowMonthNavigation:!1,timeCaption:"Time",previousYearButtonLabel:"Previous Year",nextYearButtonLabel:"Next Year",previousMonthButtonLabel:"Previous Month",nextMonthButtonLabel:"Next Month",customTimeInput:null,yearItemNumber:12}}}]),o}(),Lt=function(t){ue(n,react.Component);var r=ve(n);function n(e){var t;return pe(this,n),(t=r.call(this,e)).el=document.createElement("div"),t}return ce(n,[{key:"componentDidMount",value:function(){this.portalRoot=(this.props.portalHost||document).getElementById(this.props.portalId),this.portalRoot||(this.portalRoot=document.createElement("div"),this.portalRoot.setAttribute("id",this.props.portalId),(this.props.portalHost||document.body).appendChild(this.portalRoot)),this.portalRoot.appendChild(this.el);}},{key:"componentWillUnmount",value:function(){this.portalRoot.removeChild(this.el);}},{key:"render",value:function(){return reactDom.createPortal(this.props.children,this.el)}}]),n}(),Ft=function(e){return !e.disabled&&-1!==e.tabIndex},Rt=function(t){ue(n,react.Component);var r=ve(n);function n(t){var o;return pe(this,n),le(fe(o=r.call(this,t)),"getTabChildren",(function(){return Array.prototype.slice.call(o.tabLoopRef.current.querySelectorAll("[tabindex], a, button, input, select, textarea"),1,-1).filter(Ft)})),le(fe(o),"handleFocusStart",(function(e){var t=o.getTabChildren();t&&t.length>1&&t[t.length-1].focus();})),le(fe(o),"handleFocusEnd",(function(e){var t=o.getTabChildren();t&&t.length>1&&t[0].focus();})),o.tabLoopRef=react.createRef(),o}return ce(n,[{key:"render",value:function(){return this.props.enableTabLoop?react.createElement("div",{className:"react-datepicker__tab-loop",ref:this.tabLoopRef},react.createElement("div",{className:"react-datepicker__tab-loop__start",tabIndex:"0",onFocus:this.handleFocusStart}),this.props.children,react.createElement("div",{className:"react-datepicker__tab-loop__end",tabIndex:"0",onFocus:this.handleFocusEnd})):this.props.children}}],[{key:"defaultProps",get:function(){return {enableTabLoop:!0}}}]),n}(),At=function(r){ue(o,react.Component);var n=ve(o);function o(){return pe(this,o),n.apply(this,arguments)}return ce(o,[{key:"render",value:function(){var r,n=this.props,o=n.className,a=n.wrapperClassName,s=n.hidePopper,p=n.popperComponent,i=n.popperModifiers,c=n.popperPlacement,l=n.popperProps,d=n.targetComponent,u=n.enableTabLoop,h=n.popperOnKeyDown,m=n.portalId,f=n.portalHost;if(!s){var y=classnames("react-datepicker-popper",o);r=react.createElement(Popper,de({modifiers:i,placement:c},l),(function(t){var r=t.ref,n=t.style,o=t.placement,a=t.arrowProps;return react.createElement(Rt,{enableTabLoop:u},react.createElement("div",{ref:r,style:n,className:y,"data-placement":o,onKeyDown:h},react.cloneElement(p,{arrowProps:a})))}));}this.props.popperContainer&&(r=react.createElement(this.props.popperContainer,{},r)),m&&!s&&(r=react.createElement(Lt,{portalId:m,portalHost:f},r));var v=classnames("react-datepicker-wrapper",a);return react.createElement(Manager,{className:"react-datepicker-manager"},react.createElement(Reference,null,(function(t){var r=t.ref;return react.createElement("div",{ref:r,className:v},d)})),r)}}],[{key:"defaultProps",get:function(){return {hidePopper:!0,popperModifiers:[],popperProps:{},popperPlacement:"bottom-start"}}}]),o}(),Kt=onClickOutsideHOC(Tt);var Bt=function(n){ue(a,react.Component);var o=ve(a);function a(n){var s;return pe(this,a),le(fe(s=o.call(this,n)),"getPreSelection",(function(){return s.props.openToDate?s.props.openToDate:s.props.selectsEnd&&s.props.startDate?s.props.startDate:s.props.selectsStart&&s.props.endDate?s.props.endDate:Se()})),le(fe(s),"calcInitialState",(function(){var e,t=s.getPreSelection(),r=dt(s.props),n=ut(s.props),o=r&&isBefore(t,startOfDay(r))?r:n&&isAfter(t,endOfDay(n))?n:t;return {open:s.props.startOpen||!1,preventFocus:!1,preSelection:null!==(e=s.props.selectsRange?s.props.startDate:s.props.selected)&&void 0!==e?e:o,highlightDates:ht(s.props.highlightDates),focused:!1,shouldFocusDayInline:!1}})),le(fe(s),"clearPreventFocusTimeout",(function(){s.preventFocusTimeout&&clearTimeout(s.preventFocusTimeout);})),le(fe(s),"setFocus",(function(){s.input&&s.input.focus&&s.input.focus({preventScroll:!0});})),le(fe(s),"setBlur",(function(){s.input&&s.input.blur&&s.input.blur(),s.cancelFocusInput();})),le(fe(s),"setOpen",(function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];s.setState({open:e,preSelection:e&&s.state.open?s.state.preSelection:s.calcInitialState().preSelection,lastPreSelectChange:jt},(function(){e||s.setState((function(e){return {focused:!!t&&e.focused}}),(function(){!t&&s.setBlur(),s.setState({inputValue:null});}));}));})),le(fe(s),"inputOk",(function(){return isDate(s.state.preSelection)})),le(fe(s),"isCalendarOpen",(function(){return void 0===s.props.open?s.state.open&&!s.props.disabled&&!s.props.readOnly:s.props.open})),le(fe(s),"handleFocus",(function(e){s.state.preventFocus||(s.props.onFocus(e),s.props.preventOpenOnFocus||s.props.readOnly||s.setOpen(!0)),s.setState({focused:!0});})),le(fe(s),"cancelFocusInput",(function(){clearTimeout(s.inputFocusTimeout),s.inputFocusTimeout=null;})),le(fe(s),"deferFocusInput",(function(){s.cancelFocusInput(),s.inputFocusTimeout=setTimeout((function(){return s.setFocus()}),1);})),le(fe(s),"handleDropdownFocus",(function(){s.cancelFocusInput();})),le(fe(s),"handleBlur",(function(e){(!s.state.open||s.props.withPortal||s.props.showTimeInput)&&s.props.onBlur(e),s.setState({focused:!1});})),le(fe(s),"handleCalendarClickOutside",(function(e){s.props.inline||s.setOpen(!1),s.props.onClickOutside(e),s.props.withPortal&&e.preventDefault();})),le(fe(s),"handleChange",(function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var n=t[0];if(!s.props.onChangeRaw||(s.props.onChangeRaw.apply(fe(s),t),"function"==typeof n.isDefaultPrevented&&!n.isDefaultPrevented())){s.setState({inputValue:n.target.value,lastPreSelectChange:Wt});var o=_e(n.target.value,s.props.dateFormat,s.props.locale,s.props.strictParsing,s.props.minDate);!o&&n.target.value||s.setSelected(o,n,!0);}})),le(fe(s),"handleSelect",(function(e,t,r){if(s.setState({preventFocus:!0},(function(){return s.preventFocusTimeout=setTimeout((function(){return s.setState({preventFocus:!1})}),50),s.preventFocusTimeout})),s.props.onChangeRaw&&s.props.onChangeRaw(t),s.setSelected(e,t,!1,r),!s.props.shouldCloseOnSelect||s.props.showTimeSelect)s.setPreSelection(e);else if(!s.props.inline){s.props.selectsRange||s.setOpen(!1);var n=s.props,o=n.startDate,a=n.endDate;!o||a||isBefore(e,o)||s.setOpen(!1);}})),le(fe(s),"setSelected",(function(e,t,r,n){var o=e;if(null===o||!Ge(o,s.props)){var a=s.props,p=a.onChange,i=a.selectsRange,c=a.startDate,l=a.endDate;if(!We(s.props.selected,o)||s.props.allowSameDay||i)if(null!==o&&(!s.props.selected||r&&(s.props.showTimeSelect||s.props.showTimeSelectOnly||s.props.showTimeInput)||(o=Ne(o,{hour:getHours(s.props.selected),minute:getMinutes(s.props.selected),second:getSeconds(s.props.selected)})),s.props.inline||s.setState({preSelection:o}),s.props.focusSelectedMonth||s.setState({monthSelectedIn:n})),i){var d=c&&!l,u=c&&l;!c&&!l?p([o,null],t):d&&(isBefore(o,c)?p([o,null],t):p([c,o],t)),u&&p([o,null],t);}else p(o,t);r||(s.props.onSelect(o,t),s.setState({inputValue:null}));}})),le(fe(s),"setPreSelection",(function(e){var t=void 0!==s.props.minDate,r=void 0!==s.props.maxDate,n=!0;if(e){var o=startOfDay(e);if(t&&r)n=je(e,s.props.minDate,s.props.maxDate);else if(t){var a=startOfDay(s.props.minDate);n=isAfter(e,a)||We(o,a);}else if(r){var p=endOfDay(s.props.maxDate);n=isBefore(e,p)||We(o,p);}}n&&s.setState({preSelection:e});})),le(fe(s),"handleTimeChange",(function(e){var t=Ne(s.props.selected?s.props.selected:s.getPreSelection(),{hour:getHours(e),minute:getMinutes(e)});s.setState({preSelection:t}),s.props.onChange(t),s.props.shouldCloseOnSelect&&s.setOpen(!1),s.props.showTimeInput&&s.setOpen(!0),s.setState({inputValue:null});})),le(fe(s),"onInputClick",(function(){s.props.disabled||s.props.readOnly||s.setOpen(!0),s.props.onInputClick();})),le(fe(s),"onInputKeyDown",(function(e){s.props.onKeyDown(e);var t=e.key;if(s.state.open||s.props.inline||s.props.preventOpenOnFocus){if(s.state.open){if("ArrowDown"===t||"ArrowUp"===t){e.preventDefault();var r=s.calendar.componentNode&&s.calendar.componentNode.querySelector('.react-datepicker__day[tabindex="0"]');return void(r&&r.focus({preventScroll:!0}))}var n=Se(s.state.preSelection);"Enter"===t?(e.preventDefault(),s.inputOk()&&s.state.lastPreSelectChange===jt?(s.handleSelect(n,e),!s.props.shouldCloseOnSelect&&s.setPreSelection(n)):s.setOpen(!1)):"Escape"===t&&(e.preventDefault(),s.setOpen(!1)),s.inputOk()||s.props.onInputError({code:1,msg:"Date input not valid."});}}else "ArrowDown"!==t&&"ArrowUp"!==t&&"Enter"!==t||s.onInputClick();})),le(fe(s),"onDayKeyDown",(function(e){s.props.onKeyDown(e);var t=e.key,r=Se(s.state.preSelection);if("Enter"===t)e.preventDefault(),s.handleSelect(r,e),!s.props.shouldCloseOnSelect&&s.setPreSelection(r);else if("Escape"===t)e.preventDefault(),s.setOpen(!1),s.inputOk()||s.props.onInputError({code:1,msg:"Date input not valid."});else if(!s.props.disabledKeyboardNavigation){var n;switch(t){case"ArrowLeft":n=subDays(r,1);break;case"ArrowRight":n=addDays(r,1);break;case"ArrowUp":n=subWeeks(r,1);break;case"ArrowDown":n=addWeeks(r,1);break;case"PageUp":n=subMonths(r,1);break;case"PageDown":n=addMonths(r,1);break;case"Home":n=subYears(r,1);break;case"End":n=addYears(r,1);}if(!n)return void(s.props.onInputError&&s.props.onInputError({code:1,msg:"Date input not valid."}));if(e.preventDefault(),s.setState({lastPreSelectChange:jt}),s.props.adjustDateOnChange&&s.setSelected(n),s.setPreSelection(n),s.props.inline){var o=getMonth(r),a=getMonth(n),f=getYear(r),y=getYear(n);o!==a||f!==y?s.setState({shouldFocusDayInline:!0}):s.setState({shouldFocusDayInline:!1});}}})),le(fe(s),"onPopperKeyDown",(function(e){"Escape"===e.key&&(e.preventDefault(),s.setState({preventFocus:!0},(function(){s.setOpen(!1),setTimeout((function(){s.setFocus(),s.setState({preventFocus:!1});}));})));})),le(fe(s),"onClearClick",(function(e){e&&e.preventDefault&&e.preventDefault(),s.props.selectsRange?s.props.onChange([null,null],e):s.props.onChange(null,e),s.setState({inputValue:null});})),le(fe(s),"clear",(function(){s.onClearClick();})),le(fe(s),"onScroll",(function(e){"boolean"==typeof s.props.closeOnScroll&&s.props.closeOnScroll?e.target!==document&&e.target!==document.documentElement&&e.target!==document.body||s.setOpen(!1):"function"==typeof s.props.closeOnScroll&&s.props.closeOnScroll(e)&&s.setOpen(!1);})),le(fe(s),"renderCalendar",(function(){return s.props.inline||s.isCalendarOpen()?react.createElement(Kt,{ref:function(e){s.calendar=e;},locale:s.props.locale,calendarStartDay:s.props.calendarStartDay,chooseDayAriaLabelPrefix:s.props.chooseDayAriaLabelPrefix,disabledDayAriaLabelPrefix:s.props.disabledDayAriaLabelPrefix,weekAriaLabelPrefix:s.props.weekAriaLabelPrefix,adjustDateOnChange:s.props.adjustDateOnChange,setOpen:s.setOpen,shouldCloseOnSelect:s.props.shouldCloseOnSelect,dateFormat:s.props.dateFormatCalendar,useWeekdaysShort:s.props.useWeekdaysShort,formatWeekDay:s.props.formatWeekDay,dropdownMode:s.props.dropdownMode,selected:s.props.selected,preSelection:s.state.preSelection,onSelect:s.handleSelect,onWeekSelect:s.props.onWeekSelect,openToDate:s.props.openToDate,minDate:s.props.minDate,maxDate:s.props.maxDate,selectsStart:s.props.selectsStart,selectsEnd:s.props.selectsEnd,selectsRange:s.props.selectsRange,startDate:s.props.startDate,endDate:s.props.endDate,excludeDates:s.props.excludeDates,excludeDateIntervals:s.props.excludeDateIntervals,filterDate:s.props.filterDate,onClickOutside:s.handleCalendarClickOutside,formatWeekNumber:s.props.formatWeekNumber,highlightDates:s.state.highlightDates,includeDates:s.props.includeDates,includeDateIntervals:s.props.includeDateIntervals,includeTimes:s.props.includeTimes,injectTimes:s.props.injectTimes,inline:s.props.inline,shouldFocusDayInline:s.state.shouldFocusDayInline,peekNextMonth:s.props.peekNextMonth,showMonthDropdown:s.props.showMonthDropdown,showPreviousMonths:s.props.showPreviousMonths,useShortMonthInDropdown:s.props.useShortMonthInDropdown,showMonthYearDropdown:s.props.showMonthYearDropdown,showWeekNumbers:s.props.showWeekNumbers,showYearDropdown:s.props.showYearDropdown,withPortal:s.props.withPortal,forceShowMonthNavigation:s.props.forceShowMonthNavigation,showDisabledMonthNavigation:s.props.showDisabledMonthNavigation,scrollableYearDropdown:s.props.scrollableYearDropdown,scrollableMonthYearDropdown:s.props.scrollableMonthYearDropdown,todayButton:s.props.todayButton,weekLabel:s.props.weekLabel,outsideClickIgnoreClass:"react-datepicker-ignore-onclickoutside",fixedHeight:s.props.fixedHeight,monthsShown:s.props.monthsShown,monthSelectedIn:s.state.monthSelectedIn,onDropdownFocus:s.handleDropdownFocus,onMonthChange:s.props.onMonthChange,onYearChange:s.props.onYearChange,dayClassName:s.props.dayClassName,weekDayClassName:s.props.weekDayClassName,monthClassName:s.props.monthClassName,timeClassName:s.props.timeClassName,showTimeSelect:s.props.showTimeSelect,showTimeSelectOnly:s.props.showTimeSelectOnly,onTimeChange:s.handleTimeChange,timeFormat:s.props.timeFormat,timeIntervals:s.props.timeIntervals,minTime:s.props.minTime,maxTime:s.props.maxTime,excludeTimes:s.props.excludeTimes,filterTime:s.props.filterTime,timeCaption:s.props.timeCaption,className:s.props.calendarClassName,container:s.props.calendarContainer,yearItemNumber:s.props.yearItemNumber,yearDropdownItemNumber:s.props.yearDropdownItemNumber,previousMonthAriaLabel:s.props.previousMonthAriaLabel,previousMonthButtonLabel:s.props.previousMonthButtonLabel,nextMonthAriaLabel:s.props.nextMonthAriaLabel,nextMonthButtonLabel:s.props.nextMonthButtonLabel,previousYearAriaLabel:s.props.previousYearAriaLabel,previousYearButtonLabel:s.props.previousYearButtonLabel,nextYearAriaLabel:s.props.nextYearAriaLabel,nextYearButtonLabel:s.props.nextYearButtonLabel,timeInputLabel:s.props.timeInputLabel,disabledKeyboardNavigation:s.props.disabledKeyboardNavigation,renderCustomHeader:s.props.renderCustomHeader,popperProps:s.props.popperProps,renderDayContents:s.props.renderDayContents,onDayMouseEnter:s.props.onDayMouseEnter,onMonthMouseLeave:s.props.onMonthMouseLeave,selectsDisabledDaysInRange:s.props.selectsDisabledDaysInRange,showTimeInput:s.props.showTimeInput,showMonthYearPicker:s.props.showMonthYearPicker,showFullMonthYearPicker:s.props.showFullMonthYearPicker,showTwoColumnMonthYearPicker:s.props.showTwoColumnMonthYearPicker,showFourColumnMonthYearPicker:s.props.showFourColumnMonthYearPicker,showYearPicker:s.props.showYearPicker,showQuarterYearPicker:s.props.showQuarterYearPicker,showPopperArrow:s.props.showPopperArrow,excludeScrollbar:s.props.excludeScrollbar,handleOnKeyDown:s.props.onKeyDown,handleOnDayKeyDown:s.onDayKeyDown,isInputFocused:s.state.focused,customTimeInput:s.props.customTimeInput,setPreSelection:s.setPreSelection},s.props.children):null})),le(fe(s),"renderDateInput",(function(){var r,n=classnames(s.props.className,le({},"react-datepicker-ignore-onclickoutside",s.state.open)),o=s.props.customInput||react.createElement("input",{type:"text"}),a=s.props.customInputRef||"ref",p="string"==typeof s.props.value?s.props.value:"string"==typeof s.state.inputValue?s.state.inputValue:s.props.selectsRange?function(e,t,r){if(!e)return "";var n=Ee(e,r),o=t?Ee(t,r):"";return "".concat(n," - ").concat(o)}(s.props.startDate,s.props.endDate,s.props):Ee(s.props.selected,s.props);return react.cloneElement(o,(le(r={},a,(function(e){s.input=e;})),le(r,"value",p),le(r,"onBlur",s.handleBlur),le(r,"onChange",s.handleChange),le(r,"onClick",s.onInputClick),le(r,"onFocus",s.handleFocus),le(r,"onKeyDown",s.onInputKeyDown),le(r,"id",s.props.id),le(r,"name",s.props.name),le(r,"autoFocus",s.props.autoFocus),le(r,"placeholder",s.props.placeholderText),le(r,"disabled",s.props.disabled),le(r,"autoComplete",s.props.autoComplete),le(r,"className",classnames(o.props.className,n)),le(r,"title",s.props.title),le(r,"readOnly",s.props.readOnly),le(r,"required",s.props.required),le(r,"tabIndex",s.props.tabIndex),le(r,"aria-describedby",s.props.ariaDescribedBy),le(r,"aria-invalid",s.props.ariaInvalid),le(r,"aria-labelledby",s.props.ariaLabelledBy),le(r,"aria-required",s.props.ariaRequired),r))})),le(fe(s),"renderClearButton",(function(){var t=s.props,r=t.isClearable,n=t.selected,o=t.startDate,a=t.endDate,p=t.clearButtonTitle,i=t.clearButtonClassName,c=void 0===i?"":i,l=t.ariaLabelClose,d=void 0===l?"Close":l;return !r||null==n&&null==o&&null==a?null:react.createElement("button",{type:"button",className:"react-datepicker__close-icon ".concat(c).trim(),"aria-label":d,onClick:s.onClearClick,title:p,tabIndex:-1})})),s.state=s.calcInitialState(),s}return ce(a,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.onScroll,!0);}},{key:"componentDidUpdate",value:function(e,t){var r,n;e.inline&&(r=e.selected,n=this.props.selected,r&&n?getMonth(r)!==getMonth(n)||getYear(r)!==getYear(n):r!==n)&&this.setPreSelection(this.props.selected),void 0!==this.state.monthSelectedIn&&e.monthsShown!==this.props.monthsShown&&this.setState({monthSelectedIn:0}),e.highlightDates!==this.props.highlightDates&&this.setState({highlightDates:ht(this.props.highlightDates)}),t.focused||We(e.selected,this.props.selected)||this.setState({inputValue:null}),t.open!==this.state.open&&(!1===t.open&&!0===this.state.open&&this.props.onCalendarOpen(),!0===t.open&&!1===this.state.open&&this.props.onCalendarClose());}},{key:"componentWillUnmount",value:function(){this.clearPreventFocusTimeout(),window.removeEventListener("scroll",this.onScroll,!0);}},{key:"renderInputContainer",value:function(){return react.createElement("div",{className:"react-datepicker__input-container"},this.renderDateInput(),this.renderClearButton())}},{key:"render",value:function(){var t=this.renderCalendar();if(this.props.inline)return t;if(this.props.withPortal){var r=this.state.open?react.createElement("div",{className:"react-datepicker__portal"},t):null;return this.state.open&&this.props.portalId&&(r=react.createElement(Lt,{portalId:this.props.portalId,portalHost:this.props.portalHost},r)),react.createElement("div",null,this.renderInputContainer(),r)}return react.createElement(At,{className:this.props.popperClassName,wrapperClassName:this.props.wrapperClassName,hidePopper:!this.isCalendarOpen(),portalId:this.props.portalId,portalHost:this.props.portalHost,popperModifiers:this.props.popperModifiers,targetComponent:this.renderInputContainer(),popperContainer:this.props.popperContainer,popperComponent:t,popperPlacement:this.props.popperPlacement,popperProps:this.props.popperProps,popperOnKeyDown:this.onPopperKeyDown,enableTabLoop:this.props.enableTabLoop})}}],[{key:"defaultProps",get:function(){return {allowSameDay:!1,dateFormat:"MM/dd/yyyy",dateFormatCalendar:"LLLL yyyy",onChange:function(){},disabled:!1,disabledKeyboardNavigation:!1,dropdownMode:"scroll",onFocus:function(){},onBlur:function(){},onKeyDown:function(){},onInputClick:function(){},onSelect:function(){},onClickOutside:function(){},onMonthChange:function(){},onCalendarOpen:function(){},onCalendarClose:function(){},preventOpenOnFocus:!1,onYearChange:function(){},onInputError:function(){},monthsShown:1,readOnly:!1,withPortal:!1,selectsDisabledDaysInRange:!1,shouldCloseOnSelect:!0,showTimeSelect:!1,showTimeInput:!1,showPreviousMonths:!1,showMonthYearPicker:!1,showFullMonthYearPicker:!1,showTwoColumnMonthYearPicker:!1,showFourColumnMonthYearPicker:!1,showYearPicker:!1,showQuarterYearPicker:!1,strictParsing:!1,timeIntervals:30,timeCaption:"Time",previousMonthAriaLabel:"Previous Month",previousMonthButtonLabel:"Previous Month",nextMonthAriaLabel:"Next Month",nextMonthButtonLabel:"Next Month",previousYearAriaLabel:"Previous Year",previousYearButtonLabel:"Previous Year",nextYearAriaLabel:"Next Year",nextYearButtonLabel:"Next Year",timeInputLabel:"Time",enableTabLoop:!0,yearItemNumber:12,renderDayContents:function(e){return e},focusSelectedMonth:!1,showPopperArrow:!0,excludeScrollbar:!0,customTimeInput:null,calendarStartDay:void 0}}}]),a}(),Wt="input",jt="navigate";

export default Bt;
