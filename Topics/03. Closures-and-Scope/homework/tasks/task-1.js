/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/

function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks() {
			if (!arguments.length) {
				return books;
			}
			var prop = arguments[0].category,
				booksWithProp = [],
				i,
				len = books.length;

			for (i = 0; i < len; i += 1) {
				if (books[i].category === prop) {
					booksWithProp.push(books[i]);
				}
			}

			return booksWithProp;
		}

		function addBook(book) {
			if ((book.title.length < 2 || book.title.length > 100) ||
				!(book.isbn.length == 13 || book.isbn.length == 10) || !book.author) {
				throw new Error('No book with the provided title, author or isbn exists!');
			}
			if (!isUnique(book.title, 'title') || !isUnique(book.isbn, 'isbn')) {
				throw new Error('Book of the same title, author or ISBN exists already!');
			}

			if (!book.category) {
				book.category = 'Uncategorized';
			}

			var categoryDawg = {
				category: book.category,
				ID: categories.length + 2
			};

			book.ID = books.length + 2;

			if(categories.length === 0){
				categories.push(categoryDawg);
			}
			else if(categories && !categories.some(function(elem){
					return elem.category === categoryDawg.category;
				})){
				categories.push(categoryDawg);
			}

			books.push(book);
			return book;
		}


		function listCategories() {
			categories = categories.sort(function(a, b) {
				return a.ID - b.ID;
			});
			categories = categories.map(function(item){
				return item.category;
			});
			return categories;
		}

		function isUnique(bookProp, prop) {
			var i,
				len = books.length;
			if (len == 0) {
				return true;
			}
			for (i = 0; i < len; i += 1) {
				if (books[i][prop] == bookProp) {
					return false;
				}
			}
			return true;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;
