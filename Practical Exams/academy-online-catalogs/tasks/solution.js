function solve() {

    const NAME_MIN_LENGTH = 2;
    const NAME_MAX_LENGTH = 40;
    const GENRE_MIN_LENGTH = 2;
    const GENRE_MAX_LENGTH = 20;

    var uniqueItemId = 0;
    var uniqueCatalogId = 0;

    class Item {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this._id = getNextId();
        }

        get name() {
            return this._name;
        }

        set name(val) {
            checkIfStringIsNullOrEmpty(val);
            checkIfStringLengthIsInRange(val);
            this._name = val;
        }

        get description() {
            return this._description;
        }

        set description(val) {
            checkIfStringIsNullOrEmpty(val);
            this._description = val;
        }

        get id() {
            return this._id;
        }
    }

    class Book extends Item {
        constructor(name, isbn, genre, description) {
            super(name, description);
            this.isbn = isbn;
            this.genre = genre;
        }

        get id() {
            return super.id;
        }

        get isbn() {
            return this._isbn;
        }

        set isbn(val) {
            if (!(+val)) {
                throw new Error('isbn is not convertible to a number');
            }
            chekIfISBNhasExactlyTenOrThirteenSymbols(val);
            this._isbn = val;
        }

        get genre() {
            return this._genre;
        }

        set genre(val) {
            chekIfGenreLengthIsInRange(val);
            this._genre = val;
        }
    }

    class Media extends Item {
        constructor(name, rating, duration, description) {
            super(name, description);
            this.rating = rating;
            this.duration = duration;
        }

        get rating() {
            return this._rating;
        }

        set rating(val) {
            if (val < 1 || 5 < val || !(+val) || val === null || val === [] || val === {}) {
                throw new Error('invalid rating');
            }

            this._rating = val;
        }

        get duration() {
            return this._duration;
        }

        set duration(val) {
            if (val <= 0 || !(+val) || val === null || val === [] || val === {}) {
                throw new Error('invalid duration');
            }

            this._duration = val;
        }
    }

    class Catalog {
        constructor(name) {
            this.name = name;
            this._id = getNextCatalogId();
            this._items = [];
        }

        get name() {
            return this._name;
        }

        set name(val) {
            checkIfStringIsNullOrEmpty(val);
            checkIfStringLengthIsInRange(val);
            this._name = val;
        }

        get id() {
            return this._id;
        }

        get items() {
            return this._items;
        }

        add(...args) {
            let argsArray = [].concat(...args);
            if (args.length === 0 || args === [] || args === null || args === undefined) {
                throw new Error('no items provided');
            }

            for (let item of argsArray) {
                if (item.constructor.name === 'Item') {
                    this._items.push(item);
                } else {
                    throw new Error('invalid element is passed');
                }
            }

            return this;
        }

        find(id) {
            if (typeof id === 'object') {
                let options = id;
                let resultArray = [];
                for (let item in this._items) {
                    if (options.id) {
                        if (options.name) {
                            if (item.name === options.name && item.id === options.id) {
                                resultArray.push(item);
                            }
                        } else {
                            if (item.id === options.id) {
                                resultArray.push(item);
                            }
                        }
                    } else {
                        if (item.name === options.name) {
                            resultArray.push(item);
                        }
                    }
                }
                return resultArray;
            } else {
                if (!(+id) || id === null || id === undefined || typeof id !== 'number') {
                    throw new Error('invalid id');
                }

                let isFound = false;
                for (let item of this._items) {
                    if (item.id === id) {
                        isFound = true;
                        return item;
                    }
                }

                if (!isFound) {
                    return null;
                }
            }
        }

        search(pattern) {
            if (typeof pattern !== 'string' || pattern.length < 1) {
                throw new Error('invalid pattern');
            }
            pattern = pattern.toLowerCase();
            let resultArray = [];
            for (let item of this._items) {
                if (item.description.toLowerCase().indexOf(pattern) >= 0 || item.name.toLowerCase().indexOf(pattern) >= 0) {
                    resultArray.push(item);
                }
            }
            return resultArray;
        }
    }

    class BookCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        get id() {
            return super.id;
        }

        get items() {
            return super.items;
        }

        add(...args) {
            let argsArray = [].concat(...args);
            if (args.length === 0 || args === [] || args === null || args === undefined) {
                throw new Error('no items provided');
            }

            for (let book of argsArray) {
                if (book.constructor.name === 'Book') {
                    this._items.push(book);
                } else {
                    throw new Error('invalid element is passed');
                }
            }

            return this;
        }

        getGenres() {
            if (this.items.length === 0) {
                return [];
            }

            let resultArray = [].concat(this.items[0].genre);

            for (let i of this.items) {
                let genre = i.genre.toLowerCase();
                let j = 0;
                let isFound = false;
                while (resultArray[j]) {
                    if (genre === resultArray[j]) {
                        isFound = true;
                    }
                    j += 1;
                }

                if (!isFound) {
                    resultArray.push(genre);
                }
                j = 0;
            }

            return resultArray;
        }

        find(id) {
            if (typeof id === 'object') {
                let options = id;
                let resultArray = [];
                for (let item of this._items) {
                    if (options.id) {
                        if (options.name) {
                            if (options.genre) {
                                if (item.name === options.name && item.id === options.id && options.genre === item.genre) {
                                    resultArray.push(item);
                                }
                            } else {
                                if (item.name === options.name && item.id === options.id) {
                                    resultArray.push(item);
                                }
                            }
                        } else {
                            if (options.genre) {
                                if (item.id === options.id && options.genre === item.genre) {
                                    resultArray.push(item);
                                }
                            } else {
                                if (item.id === options.id) {
                                    resultArray.push(item);
                                }
                            }
                        }
                    } else {
                        if (options.genre) {
                            if (options.name) {
                                if (item.name === options.name && options.genre === item.genre) {
                                    resultArray.push(item);
                                }
                            } else {
                                if (item.genre === options.genre) {
                                    resultArray.push(item);
                                }
                            }
                        } else {
                            if (item.name === options.name) {
                                resultArray.push(item);
                            }
                        }
                    }
                }
                return resultArray;
            } else {
                if (!(+id) || id === null || id === undefined || typeof id !== 'number') {
                    throw new Error('invalid id');
                }

                let isFound = false;
                for (let item of this._items) {
                    if (item.id === id) {
                        isFound = true;
                        return item;
                    }
                }

                if (!isFound) {
                    return null;
                }
            }
        }
    }

    class MediaCatalog extends Catalog {
        constructor(name) {
            super(name);
        }

        get id() {
            return super.id;
        }

        get items() {
            return super.items;
        }

        add(...args) {
            let argsArray = [].concat(...args);
            if (args.length === 0 || args === [] || args === null || args === undefined) {
                throw new Error('no items provided');
            }

            for (let media of argsArray) {
                if (media.constructor.name === 'Media') {
                    this._items.push(media);
                } else {
                    throw new Error('invalid element is passed');
                }
            }

            return this;
        }

        getTop(count) {
            if (typeof count !== 'number' || count < 1) {
                throw new Error('invalid count');
            }

            let result=[];
            let sortedMediaItems=this.items.sort((a,b)=>(+b.rating)-(+a.rating));
            let firstCountItems=sortedMediaItems.slice(0,count);

            for(let media of firstCountItems){
                result.push({
                    name:media.name,
                    id:media.id
                })
            }

            return result;
        }

        getSortedByDuration() {

        }

        find(id) {
            if (typeof id === 'object') {
                let options = id;
                let resultArray = [];
                for (let item of this._items) {
                    if (options.id) {
                        if (options.name) {
                            if (options.rating) {
                                if (item.name === options.name && item.id === options.id && options.rating === item.rating) {
                                    resultArray.push(item);
                                }
                            } else {
                                if (item.name === options.name && item.id === options.id) {
                                    resultArray.push(item);
                                }
                            }
                        } else {
                            if (options.rating) {
                                if (item.id === options.id && options.rating === item.rating) {
                                    resultArray.push(item);
                                }
                            } else {
                                if (item.id === options.id) {
                                    resultArray.push(item);
                                }
                            }
                        }
                    } else {
                        if (options.rating) {
                            if (options.name) {
                                if (item.name === options.name && options.rating === item.rating) {
                                    resultArray.push(item);
                                }
                            } else {
                                if (item.rating === options.rating) {
                                    resultArray.push(item);
                                }
                            }
                        } else {
                            if (item.name === options.name) {
                                resultArray.push(item);
                            }
                        }
                    }
                }
                return resultArray;
            } else {
                if (!(+id) || id === null || id === undefined || typeof id !== 'number') {
                    throw new Error('invalid id');
                }

                let isFound = false;
                for (let item of this._items) {
                    if (item.id === id) {
                        isFound = true;
                        return item;
                    }
                }

                if (!isFound) {
                    return null;
                }
            }
        }
    }

    function getNextId() {
        uniqueItemId += 1;
        return uniqueItemId;
    }

    function getNextCatalogId() {
        return ++uniqueCatalogId;
    }

    function checkIfStringIsNullOrEmpty(str) {
        if (str === '' || str === undefined || typeof str !== 'string') {
            throw new Error('invalid string');
        }
    }

    function checkIfStringLengthIsInRange(str) {
        if (str.length < NAME_MIN_LENGTH || NAME_MAX_LENGTH < str.length) {
            throw new Error('invalid string length');
        }
    }

    function chekIfISBNhasExactlyTenOrThirteenSymbols(str) {
        if (str.length != 10) {
            if (str.length != 13) {
                throw new Error('invalid isbn');
            }
        }
    }

    function chekIfGenreLengthIsInRange(str) {
        if (str.length < GENRE_MIN_LENGTH || GENRE_MAX_LENGTH < str.length) {
            throw new Error('invalid genre');
        }
    }

    return {
        getBook: function (name, isbn, genre, description) {
            return new Book(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return new Media(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return new BookCatalog(name);

        },
        getMediaCatalog: function (name) {
            return new MediaCatalog(name);
        }
    };
}

module.exports = solve;

/*var book = solve().getBook('ime', '1111111111', 'ekshan', 'roman');
 var book2 = solve().getBook('zaglavie', '1111111111', 'trilar', 'roman');
 var bookCatalog = solve().getBookCatalog('katalog');
 var bookCatalog2 = solve().getBookCatalog('katalogat');
 bookCatalog.add([book, book2]);
 console.log(bookCatalog.find({id: 1,name:'ime'}));
 console.log(bookCatalog.id,bookCatalog2.id);*/

