const myLibrary = [];
const booksContainer = document.querySelector('.books-container');

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read ? 'read' : 'not yet read'}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function populateLibrary() {
  for (let i = 0; i < myLibrary.length; i += 1) {
    const current = myLibrary[i];
    const bookCard = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('h3');
    const pages = document.createElement('p');
    const read = document.createElement('p');

    title.textContent = current.title;
    author.textContent = current.author;
    pages.textContent = current.pages;
    read.textContent = current.read;

    bookCard.classList.add('book-card');
    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(read);

    booksContainer.appendChild(bookCard);
  }
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', 281, true);
const book3 = new Book('Pride and Prejudice', 'Jane Austen', 435, false);
const book4 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
const book5 = new Book('Wuthering Heights', 'Emily Bronte', 357, true);
const book6 = new Book('1984', 'George Orwell', 328, false);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);

populateLibrary();
