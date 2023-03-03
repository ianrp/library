let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let info = `${this.title} by ${this.author}, ${this.pages} pages, `;
    if (this.read) info += 'read';
    else info += 'unread';
    return (info);
  };
}

const bookList = document.querySelector('.bookList');

function addBookToTable(book) {
  const row = document.createElement('tr');

  const titleCell = document.createElement('td');
  titleCell.textContent = book.title;
  row.appendChild(titleCell);

  const authorCell = document.createElement('td');
  authorCell.textContent = book.author;
  row.appendChild(authorCell);

  const pagesCell = document.createElement('td');
  pagesCell.textContent = book.pages;
  row.appendChild(pagesCell);

  const readCell = document.createElement('td');
  if (book.read) readCell.textContent = 'Read';
  else readCell.textContent = 'Unread';
  row.appendChild(readCell);

  bookList.appendChild(row);
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  addBookToTable(book);
}

const newBookForm = document.querySelector('form');
const newBookButton = document.querySelector('.new');

newBookButton.addEventListener('click', () => {
  newBookForm.style.display = 'block';
});

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(newBookForm);
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = formData.get('read');

  addBookToLibrary(title, author, pages, read);
});

function displayLibrary() {
  myLibrary.forEach((book) => addBookToTable(book));
}

myLibrary = [
  new Book('The Hobbit', 'J.R.R. Tolkien', 295, true),
  new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 423, false)];
displayLibrary();
