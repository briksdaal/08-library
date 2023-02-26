const myLibrary = [];
const modal = document.querySelector('.modal');
const booksContainer = document.querySelector('.books-container');
const addNewBookButton = document.querySelector('.new-book-btn');
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not yet read'}`;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(bookNode) {
  const { index } = bookNode.dataset;
  myLibrary.splice(index, 1);
  bookNode.classList.add('transparent');
  setTimeout(() => populateLibrary(), 350);
}

function toggleReadStatus(readBtn) {
  const btn = readBtn;
  const { index } = btn.parentNode.dataset;
  myLibrary[index].toggleRead();
  btn.textContent = myLibrary[index].read ? 'Read' : 'Unread';
}

function populateLibrary() {
  while (booksContainer.firstChild) {
    const currentBook = booksContainer.firstChild;
    booksContainer.removeChild(currentBook);
  }

  for (let i = 0; i < myLibrary.length; i += 1) {
    const current = myLibrary[i];
    const bookCard = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('h3');
    const pages = document.createElement('p');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    title.textContent = current.title;
    author.textContent = current.author;
    pages.textContent = current.pages;
    readBtn.textContent = current.read ? 'Read' : 'Unread';
    removeBtn.textContent = '×';

    bookCard.classList.add('book-card');
    bookCard.dataset.index = i;
    bookCard.appendChild(title);
    bookCard.appendChild(removeBtn).classList.add('remove-book');
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(readBtn).classList.add('read-btn');
    readBtn.addEventListener('click', (e) => toggleReadStatus(e.target));
    removeBtn.addEventListener('click', (e) => removeBookFromLibrary(e.target.parentNode));
    booksContainer.appendChild(bookCard);
  }
}

function showFormModal() {
  modal.classList.remove('hidden');
}

function hideFormModal() {
  modal.classList.add('hidden');
  modal.querySelector('form').reset();
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

addNewBookButton.addEventListener('click', () => showFormModal());

const submitBtn = document.querySelector('.modal button[type="submit"]');
const cancelBtn = document.querySelector('.modal button[type="reset"]');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = new Book(
    e.target.form.title.value,
    e.target.form.author.value,
    e.target.form.pages.value,
    e.target.form.read.checked,
  );
  addBookToLibrary(newBook);
  populateLibrary();
  hideFormModal();
});

cancelBtn.addEventListener('click', () => {
  hideFormModal();
});

modal.addEventListener('click', (e) => {
  if (!e.target.closest('.form-container')) {
    hideFormModal();
  }
});
