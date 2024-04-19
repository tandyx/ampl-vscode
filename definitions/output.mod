/**
 * absolute value `x`
 * @param {float} x - real number
 * @returns {float}
 */ 
function abs;

/**
 * inverse cosine, `cos^-1`
 * @param {float} x - real number
 * @returns {float}
 */ 
function acos;

/**
 * inverse hyperbolic cosine,cosh^-1
 * @param {float} x - real number
 * @returns {float}
 */ 
function acosh;

/**
 * returns alias of model entity `v`
 * @param {object} v - object to alias
 * @returns {object}
 */ 
function alias;

/**
 * arity of `S` if `S` is a set, else 0; for use with `_SETS`
 * @param {Set} S - set
 * @returns {int}
 */ 
function arity;

/**
 * inverse sine 
 *`sin(x)^-1`
 * @param {float} x - real number
 * @returns {float}
 */ 
function asin;

/**
 * inverse hyperbolic sine 
 *`sinh(x)^-1` 
 * @param {float} x - real number
 * @returns {float}
 */ 
function asinh;

/**
 * inverse tangent,tan^-1 
 * @param {float} x - real number
 * @returns {float}
 */ 
function atan;

/**
 * inverse tangent 
 *`tan^-1(y/x)`
 * @param {numeric} x - real number
 * @param {numeric} y - real number
 * @returns {float}
 */ 
function atan2;

/**
 * inverse hyperbolic tangent 
 *`tanh(x)^-1`
 * @param {float} x - real number
 * @returns {float}
 */ 
function atanh;

/**
 * Returns a random value from a Beta distribution. 
 * `density(x) = x a^-1 ( 1^-x) b^-1 /(gamma(a) gamma(b)/gamma(a + b) ); x in [ 0 , 1 ]`
 * @param {float} a - shape parameter 1
 * @param {float} b - shape parameter 2
 * @returns {float}
 */ 
function Beta;

/**
 * Operates on any finite set: `card(sexpr)` returns the number of members in _sexpr_. If _sexpr_ is an indexing expression, the parentheses may be omitted
 * @param {Set} S - set
 * @returns {int}
 */ 
function card;

/**
 * Returns a random value from a Cauchy distribution. 
 * `density(x) = 1/(pi( 1 + x 2 ) )`
 * @returns {float}
 */ 
function Cauchy;

/**
 * ceiling of `x` (next higher integer)
 * @param {float} x - real number
 * @returns {float}
 */ 
function ceil;

/**
 * string representation of character `n`; inverse of `ichar`
 * @param {int} n - integer to convert
 * @returns {string}
 */ 
function char;

/**
 * Returns the cosine of `x`.
 * @param {float} x - 
 * @returns {float}
 */ 
function cos;

/**
 * time `t` as a string
 * @param {float} t - time - leave blank for current time
 * @returns {string}
 */ 
function ctime;

/**
 * Returns `e^x`
 * @param {float} x - power to raise `e` to
 * @returns {float}
 */ 
function exp;

/**
 * Returns a random value from an Exponential distribution. 
 * `density(x) = e^-x; x>=0`
 * @returns {float}
 */ 
function Exponential;

/**
 * first member of parameter set `S`
 * @param {Set} S - set
 * @returns {any}
 */ 
function first;

/**
 * floor of `x` (next lower integer)
 * @param {numeric} x - number to floor
 * @returns {int}
 */ 
function floor;

/**
 * Returns a random value from a Gamma distribution. 
 * `density(x) = x a^-1 e^-x / gamma(a), x>=0`
 * @param {numeric} a - None
 * @returns {float}
 */ 
function Gamma;

/**
 * substitute repl for all occurrences of regular expression `re` in `s`
 * @param {string} s - string to test
 * @param {string} re - regular expression
 * @param {string} repl - replacement string
 * @returns {string}
 */ 
function gsub;

/**
 * Unicode value of the first character in string s
 * @param {string} s - string to convert
 * @returns {int}
 */ 
function ichar;

/**
 * arity of entity `E`'s indexing set card, arity, and indexarity also apply to unordered sets
 * @param {any} E - entity
 * @returns {int}
 */ 
function indexarity;

/**
 * Returns a random integer in the range [0, 224).
 * @returns {int}
 */ 
function Irand224;

/**
 * returns the last member of `S`
 * @param {Set} S - set
 * @returns {any}
 */ 
function last;

/**
 * returns the length of string `s`
 * @param {string} s - string to test
 * @returns {int}
 */ 
function length;

/**
 * returns the natural log of `x`
 * @param {float} x - 
 * @returns {float}
 */ 
function log;

/**
 * returns the base 10 logarithm of `x`
 * @param {float} x - 
 * @returns {float}
 */ 
function log10;

/**
 * starting position of regular expression `re` in `s`, or 0 if not found
 * @param {string} s - string to test
 * @param {string} re - regular expression
 * @returns {string}
 */ 
function match;

/**
 * maximum (2 or more arguments)
 * @param {numeric} x - 
 * @param {numeric} y - 
 * @param {numeric} ... - 
 * @returns {numeric}
 */ 
function max;

/**
 * _jth_ member of `S`; `1 <= j <= card(S), j: int`
 * @param {Set} S - set to index
 * @param {int} j - position of member, 1 <= j <= card(S)
 * @returns {any}
 */ 
function member;

/**
 * minimum (2 or more arguments)
 * @param {numeric} x - 
 * @param {numeric} y - 
 * @param {numeric} ... - 
 * @returns {float}
 */ 
function min;

/**
 * next member of `set` for which `e` is a dummy index
 * @param {object} e - dummy index...?
 * @param {Set} S - set
 * @param {int} k - int
 * @returns {any}
 */ 
function next;

/**
 * wrapping version of `next`
 * @param {object} e - object
 * @param {Set} S - None
 * @param {int} k - int
 * @returns {any}
 */ 
function nextw;

/**
 * Returns a random value from a Normal distribution.  
 * `density(x) = e^-(x-avg)^2/(2*std^2) / (std*sqrt(2*pi))`
 * @param {float} avg - None
 * @param {float} std - None
 * @returns {float}
 */ 
function Normal;

/**
 * Returns a random value from a Normal distribution with mean 0 and standard deviation 1.  
 * `density(x) = e^-(x-0)^2/(2*1^2) / (1*sqrt(2*pi))`
 * @returns {float}
 */ 
function Normal01;

/**
 * convert string `s` to number; error if stripping leading and trailing white space does not yield a valid decimal number
 * @param {string} s - string to convert
 * @returns {numeric}
 */ 
function num;

/**
 * strip leading white space, and interpret as much as possible of `s` as a number, but do not raise error
 * @param {string} s - string to convert
 * @returns {numeric | null}
 */ 
function num0;

/**
 * ordinal position of member `e` in set for which it is dummy index
 * @param {object} e - object
 * @param {Set} S - set
 * @returns {int}
 */ 
function ord;

/**
 * same as `ord`, but does not raise an error if `e` is not in `S`
 * @param {object} e - object
 * @param {Set} S - set
 * @returns {int}
 */ 
function ord0;

/**
 * Returns a random value from a Poisson distribution. 
 *`density(x) = e^-lambda lambda^x / x!; x>=0`
 * @param {numeric} lambda - None
 * @returns {float}
 */ 
function Poisson;

/**
 * `x` rounded to `n` significant decimal digits
 * @param {numeric} x - 
 * @param {int} n - precision
 * @returns {numeric}
 */ 
function precision;

/**
 * previous member of set for which `e` is dummy index
 * @param {object} e - dummy index...?
 * @param {Set} S - set
 * @param {int} k - int
 * @returns {any}
 */ 
function prev;

/**
 * wrapping version of `prev`
 * @param {object} e - object
 * @param {Set} S - set
 * @param {int} k - int
 * @returns {any}
 */ 
function prevw;

/**
 * `x` rounded to n digits past decimal point
 * @param {numeric} x - 
 * @param {int} n - precision
 * @returns {numeric}
 */ 
function round;

/**
 * sine
 * @param {numeric} x - 
 * @returns {float}
 */ 
function sin;

/**
 * returns the hyperbolic sine of `x`
 * @param {numeric} x - 
 * @returns {float}
 */ 
function sinh;

/**
 * format arguments into a string c-style
 * @param {string} f - string to format
 * @param {any} ... - expressions to format into f
 * @returns {string}
 */ 
function sprintf;

/**
 * returns the square root of x
 * @param {numeric} x - 
 * @returns {float}
 */ 
function sqrt;

/**
 * substitute `repl` for the first occurrence of regular expression `re` in `s`
 * @param {string} s - string to test
 * @param {string} re - regular expression
 * @param {string} repl - replacement string
 * @returns {string}
 */ 
function sub;

/**
 * n character substring of s starting at position m;
 if n omitted, rest of string
 * @param {string} s - string to test
 * @param {int} m - starting position
 * @param {int} n - length of substring (optional)
 * @returns {string}
 */ 
function substr;

/**
 * tangent
 * @param {numeric} x - 
 * @returns {float}
 */ 
function tan;

/**
 * hyperbolic tangent
 * @param {numeric} x - 
 * @returns {float}
 */ 
function tanh;

/**
 * current unix timestamp in seconds
 * @returns {float}
 */ 
function time;

/**
 * `x` truncated to `n` digits past decimal point
 * @param {numeric} x - 
 * @param {any} n - precision
 * @returns {float}
 */ 
function trunc;

/**
 * Returns a random value from a Uniform distribution. `density(x) = 1/(n-m), x in [m, n]`
 * @param {numeric} m - None
 * @param {numeric} n - None
 * @returns {float}
 */ 
function Uniform;

/**
 * Returns a random value from a Uniform distribution. `density(x) = 1, x in [0, 1]`
 * @returns {float}
 */ 
function Uniform01;

