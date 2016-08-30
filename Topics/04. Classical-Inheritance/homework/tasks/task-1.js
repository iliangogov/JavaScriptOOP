/* Task Description */
/* 
 Create a function constructor for Person. Each Person must have:
 *	properties `firstname`, `lastname` and `age`
 *	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
 *	age must always be a number in the range 0 150
 *	the setter of age can receive a convertible-to-number value
 *	if any of the above is not met, throw Error
 *	property `fullname`
 *	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
 *	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
 *	it must parse it and set `firstname` and `lastname`
 *	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
 *	all methods and properties must be attached to the prototype of the Person
 *	all methods and property setters must return this, if they are not supposed to return other value
 *	enables method-chaining
 */

function solve() {
    var Person = (function () {
        var constants = {
            STRING_MIN_LENGTH: 3,
            STRING_MAX_LENGTH: 20,
            AGE_MIN_VALUE: 0,
            AGE_MAX_VALUE: 150
        };

        var validator = {
            validateString: function (str) {
                var len = str.length;
                var validate = /^[a-zA-Z]*$/;

                if (len < constants.STRING_MIN_LENGTH || constants.STRING_MAX_LENGTH < len) {
                    throw new Error('string must be between ' + constants.STRING_MIN_LENGTH + ' and ' + constants.STRING_MAX_LENGTH);
                }

                if (!(validate.test(str))) {
                    throw new Error('string must contains only latin letters');
                }
            },

            validateAge: function (age) {
                if (typeof age === 'NaN') {
                    throw new Error('age must be number or convertible to number');
                }

                if (age < constants.AGE_MIN_VALUE || constants.AGE_MAX_VALUE < age) {
                    throw new Error('age must be in a range between ' + constants.AGE_MIN_VALUE + ' and ' + constants.AGE_MAX_VALUE);
                }
            }
        };

        function Person(firstname, lastname, age) {
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
        }
        
        Object.defineProperty(Person.prototype, 'firstname', {
            get: function () {
                return this._firstname;
            },
            set: function (firstname) {
                validator.validateString(firstname);
                this._firstname = firstname;
            }
        });

        Object.defineProperty(Person.prototype, 'lastname', {
            get: function () {
                return this._lastname
            },
            set: function (lastname) {
                validator.validateString(lastname);
                this._lastname = lastname;
            }
        });

        Object.defineProperty(Person.prototype, 'age', {
            get: function () {
                return this._age;
            },
            set: function (age) {
               validator.validateAge(age);
                this._age=age;
            }
        });

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function () {
                return this.firstname + ' ' + this.lastname;
            },
            set: function (fname) {
                fname = fname.split(' ');
                validator.validateString(fname[0]);
                validator.validateString(fname[1]);
                this.firstname = fname[0];
                this.lastname = fname[1];
            }
        });

        Person.prototype.introduce = function () {
            return 'Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old';
        };

        return Person;
    }());
    return Person;
}
module.exports = solve;