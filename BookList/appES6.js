class Book{
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //Insert cols
    row.innerHTML = 
    `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class= "delete">X</a></td>`;
    list.appendChild(row);
  }

  showAlert(message, className) {
    //create a div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //disappear after 3 secs
    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//local storage class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(book => {
      const ui = new UI();
      //add book to UI
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if(book.isbn == isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
  e.preventDefault();
  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;
    // console.log(title, author, isbn);

    //Instantiating Book Constructor
    const book = new Book(title, author, isbn);
    // console.log(book);

    //instantiate ui
    const ui = new UI();

    //validate
    if(title === ''|| author === '' || isbn === '') {
      // alert("Put fields");
      ui.showAlert('Please fill in all fields', 'error');
    }
    else {
      //Add book to list
      ui.addBookToList(book);

      //add to Local Storage
      Store.addBook(book);

      //show success
      ui.showAlert('Book Added!', 'success');

      //clear fields
      ui.clearFeilds();
  
    }

});


//event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();
  const ui = new UI();
  ui.deleteBook(e.target);
  //remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book removed!', 'success');
})
