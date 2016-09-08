function solve() {

    const STRINGLENGTH_MIN_VALUE = 3;
    const STRINGLENGTH_MAX_VALUE = 25;
    const MAX_NUMBER = 9007199254740992;

    let uniqueId = 0;

    class Playable {
        constructor(title, author) {
            this._title = title;
            this._author = author;
            this._id = getNextId();
        }

        get title() {
            return this._title;
        }

        set title(str) {
            checkIfStringLengthIsInRange(str);
            this._title = str;
        }

        get author() {
            return this._author;
        }

        set author(str) {
            checkIfStringLengthIsInRange(str);
            this._author = str;
        }

        get id() {
            return this._id;
        }

        play() {
            return this._id + '. ' + this._title + ' - ' + this._author;
        }
    }

    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);
            this._length = length;
        }

        get length() {
            return this._length;
        }

        set length(val) {
            if (val <= 0) {
                throw new Error('invalid length');
            }

            this._length = val;
        }

        play() {
            return super.play() + ' - ' + this._length;
        }
    }

    class Video extends Playable {
        constructor(title, author, imdbRating) {
            super(title, author);
            this._imdbRating = imdbRating;
        }

        get imdbRating() {
            return this._imdbRating;
        }

        set imdbRating(val) {
            if (val < 1 || 5 < val) {
                throw new Error('invalid imdbRating');
            }
            this._imdbRating = val;
        }

        play() {
            return super.play() + ' - ' + this._imdbRating;
        }
    }

    class Player {
        constructor(name) {
            this._name = name;
            this._listOfPlayLists = [];
            this._id = getNextId();
        }

        get name() {
            return this._name;
        }

        set name(str) {
            checkIfStringLengthIsInRange(str);
            this._name = str;
        }

        get id() {
            return this._id;
        }

        addPlaylist(playlistToAdd) {
            if (playlistToAdd instanceof PlayList) {
                this._listOfPlayLists.push(playlistToAdd);
            } else {
                throw new Error('invalid type of playlist');
            }

            return this;
        }

        getPlaylistById(id) {
            let isFound = false;
            for (let i = 0; i < this._listOfPlayLists.length; i += 1) {
                if (this._listOfPlayLists[i].id === id) {
                    isFound = true;
                    return this._listOfPlayLists[i];
                }
            }

            if (!isFound) {
                return null;
            }
        }

        removePlaylist(playlist) {
            let isFound = false;
            for (let i = 0; i < this._listOfPlayLists.length; i += 1) {
                if (Number(this._listOfPlayLists[i].id) === Number(playlist.id) ||
                    Number(this._listOfPlayLists[i].id === playlist)) {
                    isFound = true;
                    this._listOfPlayLists.splice(i, 1);
                }
            }

            if (!isFound) {
                throw new Error('id not found');
            }
            return this;
        }
    }

    class PlayList {
        constructor(name) {
            this._name = name;
            this._id = getNextId();
            this._playables = [];
        }

        get name() {
            return this._name;
        }

        set name(str) {
            checkIfStringLengthIsInRange(str);
            this._name = str;
        }

        get id() {
            return this._id;
        }

        addPlayable(playable) {
            this._playables.push(playable);
            return this;
        }

        getPlayableById(id) {
            let isFound = false;
            for (let i = 0; i < this._playables.length; i += 1) {
                if (this._playables[i].id === id) {
                    isFound = true;
                    return this._playables[i];
                }
            }

            if (!isFound) {
                return null;
            }
        }

        removePlayable(playable) {
            let isFound = false;
            for (let i = 0; i < this._playables.length; i += 1) {
                if (Number(this._playables[i].id) === Number(playable.id) ||
                    Number(this._playables[i].id === playable)) {
                    isFound = true;
                    this._playables.splice(i, 1);
                }
            }

            if (!isFound) {
                throw new Error('id not found');
            }
            return this;
        }

        listPlayables(page, size) {
            page = page || 0;
            size = size || MAX_NUMBER;

            if (page * size > this._playables.length ||
                page < 0 ||
                size <= 0) {
                throw new Error('invalid page or size');
            }

            return this
                ._playables
                .slice()
                .sort(getSortingFunction('title', 'id'))
                .splice(page * size, size);

        }
    }

    function getNextId() {
        return ++uniqueId;
    }

    function checkIfStringLengthIsInRange(str) {
        if (str.length < STRINGLENGTH_MIN_VALUE || STRINGLENGTH_MAX_VALUE < str.length) {
            throw new Error('invalid string length');
        }
    }

    function getSortingFunction(firstParameter, secondParameter) {
        return function (first, second) {
            if (first[firstParameter] < second[firstParameter]) {
                return -1;
            }
            else if (first[firstParameter] > second[firstParameter]) {
                return 1;
            }

            if (first[secondParameter] < second[secondParameter]) {
                return -1;
            }
            else if (first[secondParameter] > second[secondParameter]) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }

    return {
        getPlayer: function (name) {
            return new Player(name);
        },
        getPlaylist: function (name) {
            return new PlayList(name);
        },
        getAudio: function (title, author, length) {
            return new Audio(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return new Video(title, author, imdbRating);
        }
    };
}

module.exports = solve;