class Library {
  myLibrary = [];

  get libraryArray() {
    return this.myLibrary;
  }

  addBookToLibrary(book) {
    this.myLibrary.push(book);
  }

  removeBookFromLibrary(index) {
    this.myLibrary.splice(index, 1);
  }

  toggleReadStatus(index) {
    this.myLibrary[index].toggleRead();
  }

  static createBook(title, author, pages, read) {
    let isRead = read;

    const toggleRead = () => {
      isRead = !isRead;
    };
    const getRead = () => isRead;

    return {
      title,
      author,
      pages,
      getRead,
      toggleRead,
    };
  }
}

const ScreenController = (() => {
  const booksContainer = document.querySelector('.books-container');
  const modal = document.querySelector('.modal');
  const addNewBookButton = document.querySelector('.new-book-btn');

  const lib = new Library();
  const book1 = Library.createBook('The Hobbit', 'J.R.R. Tolkien', 295, false);
  const book2 = Library.createBook('To Kill a Mockingbird', 'Harper Lee', 281, true);
  const book3 = Library.createBook('Pride and Prejudice', 'Jane Austen', 435, false);
  const book4 = Library.createBook('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
  const book5 = Library.createBook('Wuthering Heights', 'Emily Bronte', 357, true);
  const book6 = Library.createBook('1984', 'George Orwell', 328, false);

  lib.addBookToLibrary(book1);
  lib.addBookToLibrary(book2);
  lib.addBookToLibrary(book3);
  lib.addBookToLibrary(book4);
  lib.addBookToLibrary(book5);
  lib.addBookToLibrary(book6);

  const populateScreen = () => {
    booksContainer.innerHTML = '';
    for (let i = 0; i < lib.libraryArray.length; i += 1) {
      const current = lib.libraryArray[i];
      const bookCard = document.createElement('div');
      const title = document.createElement('h2');
      const by = document.createElement('span');
      const author = document.createElement('h3');
      const pages = document.createElement('p');
      const readBtn = document.createElement('button');
      const removeBtn = document.createElement('button');

      title.textContent = current.title;
      by.textContent = 'by ';
      author.textContent = current.author;
      pages.textContent = `${current.pages} pages`;
      readBtn.textContent = current.getRead() ? 'Read' : 'Unread';
      removeBtn.textContent = '??';

      bookCard.classList.add('book-card');
      bookCard.dataset.index = i;
      const rowDiv = document.createElement('div');
      bookCard.appendChild(title);
      bookCard.appendChild(removeBtn).classList.add('remove-book');
      rowDiv.appendChild(by);
      rowDiv.appendChild(author);
      bookCard.appendChild(rowDiv);
      bookCard.appendChild(pages);
      bookCard.appendChild(readBtn).classList.add('read-btn');

      booksContainer.appendChild(bookCard);
    }
  };

  function showFormModal() {
    modal.classList.remove('hidden');
  }

  function hideFormModal() {
    modal.classList.add('hidden');
    modal.querySelector('form').reset();
  }

  function ClickHandlerBooks(e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (e.target.classList.contains('read-btn')) {
      lib.toggleReadStatus(e.target.parentNode.dataset.index);
      populateScreen();
    }

    if (e.target.classList.contains('remove-book')) {
      lib.removeBookFromLibrary(e.target.parentNode.dataset.index);
      e.target.parentNode.classList.add('transparent');
      setTimeout(() => {
        populateScreen();
      }, 350);
    }
  }

  function ClickHandlerModal(e) {
    if (!e.target.closest('.form-container')) {
      hideFormModal();
      return;
    }

    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    if (e.target.getAttribute('type') === 'submit') {
      e.preventDefault();
      const newBook = Library.createBook(
        e.target.form.title.value,
        e.target.form.author.value,
        e.target.form.pages.value,
        e.target.form.read.checked,
      );
      lib.addBookToLibrary(newBook);
      populateScreen();
      hideFormModal();
    }

    if (e.target.getAttribute('type') === 'reset') {
      hideFormModal();
    }
  }

  booksContainer.addEventListener('click', ClickHandlerBooks);
  modal.addEventListener('click', ClickHandlerModal);
  addNewBookButton.addEventListener('click', () => showFormModal());

  populateScreen();
})();
