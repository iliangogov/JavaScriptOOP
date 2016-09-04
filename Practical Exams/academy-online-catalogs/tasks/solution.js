function solve() {

    let itemIdGenerator = 0,
        catalogIdGenerator = 0;

    var Item = (function () {

        function Item(name, description) {
            this.id = ++itemIdGenerator;
            this.description = description;
            this.name = name;
        }

        Item.prototype = Object.create({});
        Object.defineProperty(Item.prototype, 'name', {
            get: function () {
                return this._name;
            },
            set: function (name) {
                if (name.length <= 2 || name.length >= 40) {
                    throw new Error('name length invalida range');
                }

                this._name = name;
            }
        });

        Object.defineProperty(Item.prototype, 'description', {
            get: function () {
                return this._description;
            },
            set: function (description) {
                if (description === '') {
                    throw new Error('description string must have value');
                }
                this._description = description;
            }
        });

        return Item;
    }());

    var Book = (function (parent) {
        function Book(name, isbn, genre, description) {
            parent.call(this, name, description);
            this.isbn = '' + isbn;
            this.genre = genre;
        }

        Book.prototype = Object.create(parent.prototype);

        Object.defineProperty(Book.prototype, 'isbn', {
            get: function () {
                return this._isbn;
            },
            set: function (isbn) {
                if (+isbn !== 10) {
                    if (+isbn !== 13) {
                        throw new Error('isbn should be exactly 10 or 13');
                    }
                }

                this._isbn = isbn;
            }
        });

        Object.defineProperty(Book.prototype, 'genre', {
            get: function () {
                return this._genre;
            },
            set: function (genre) {
                if (genre.length < 2 || genre.length > 20) {
                    throw new Error('genre length invalida range');
                }

                this._genre = genre;
            }
        });
        return Book;
    }(Item));

    var Media = (function (parent) {
        function Media(name, rating, duration, description) {
            parent.call(this, description, name);
            this.duration = duration;
            this.rating = rating;
        }

        Media.prototype = Object.create(parent.prototype);

        Object.defineProperty(Media.prototype, 'duration', {
            get: function () {
                return this._duration;
            },
            set: function (duration) {
                if (+duration < 1) {
                    throw new Error('duration must be greater than zero');
                }

                this._duration = duration;
            }
        });

        Object.defineProperty(Media.prototype, 'rating', {
            get: function () {
                return this._rating;
            },
            set: function (rating) {
                if (+rating < 1 || +rating > 5) {
                    throw new Error('invalid rating');
                }

                this._rating = rating;
            }
        });
        return Media;
    }(Item));

    var Catalog = (function () {
        function Catalog(name, items) {
            this.id = ++catalogIdGenerator;
            this.name = name;
            this.items = [];
        }

        Catalog.prototype = Object.create({});

        Object.defineProperty(Catalog.prototype, 'name', {
            get: function () {
                return this._name;
            },
            set: function (name) {
                if (name.length < 2 || name.length > 40) {
                    throw new Error('name length invalid range');
                }

                this._name = name;
            }
        });

        Object.defineProperty(Catalog.prototype, 'items', {
            get: function () {
                return this._items;
            },
            set: function (item) {
                this._items = items.concat(item);
            }
        });

        Catalog.prototype.add = function (...items) {
            for (let i of items) {
                if (!(i instanceof Item) || !i) {
                    throw new Error('invalid items');
                }

                this.items.concat(i);
            }
        };

        Catalog.prototype.find = function (id) {
            if (!(+id) || !id) {
                throw new Error('incorrect id');
            }

            if (this.items.find(item=>item.id === id)) {
                return this.items.filter(item=>item.id === id)[0];
            } else {
                return null;
            }
        };

        Catalog.prototype.find = function (options) {
            let filtered;
            if (options.name) {
                if (!options.id) {
                    filtered = this.items.filter(item=>item.name === options.name);
                } else {
                    filtered = this.items.filter(item=>(item.name === options.name && item.id === options.id));
                }
            } else {
                filtered = this.items.filter(item=>(item.id === options.id));
            }

            return [].concat(filtered);
        }

        return Catalog;
    }());

    var BookCatalog = (function (parent) {
        function BookCatalog(name) {
            parent.call(this, name);
            this.items = [];
        }

        BookCatalog.prototype = Object.create(parent.prototype);

        BookCatalog.prototype.add = function (...items) {
            for (let i of items) {
                if (!(i instanceof Book) || !i) {
                    throw new Error('invalid items');
                }

                this.items.concat(i);
            }
        };

        BookCatalog.prototype.getGenres = function () {
            result = [];
            for (let i of this.items) {
                result.push(i.genre.toLowerCase());
            }
            return result;
        };

        return BookCatalog;
    }(Catalog));

    return {
        getBook: function (name, isbn, genre, description) {
            return Object.create(Book)
                .init(name, isbn, genre, description);
        },
        getMedia: function (name, rating, duration, description) {
            return Object.create(Media)
                .init(name, rating, duration, description);
        },
        getBookCatalog: function (name) {
            return Object.create(BookCatalog)
                .init(name);
        },
        getMediaCatalog: function (name) {
            return Object.create(mediaCatalog)
                .init(name);
        }
    };
}
module.exports = solve;

/*
 var book= solve().getBook('ime','10','ekshan','roman');
 console.log(book.name);*/
