function Book(title, author, isAvailable = true) {
  this.title = title;
  this.author = author;
  this.isAvailable = isAvailable;
}

function Member(name, borrowedBooks = []) {
  this.name = name;
  this.borrowedBooks = borrowedBooks;
}

Member.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.length >= 3) {
    console.log(`${this.name} cannot borrow more than 3 books at a time.`);
    return;
  }
  if (book.isAvailable) {
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} borrowed "${book.title}".`);
  } else {
    console.log(`Sorry, "${book.title}" is already borrowed.`);
  }
};

function PremiumMember(name, borrowedBooks = []) {
  Member.call(this, name, borrowedBooks);
  this.specialCollectionAccess = true;
}

PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

PremiumMember.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} cannot borrow more than 5 books at a time.`);
    return;
  }
  if (book.isAvailable || this.specialCollectionAccess) {
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} borrowed "${book.title}".`);
  } else {
    console.log(`Sorry, "${book.title}" is already borrowed.`);
  }
};

const book1 = new Book("To Kill a Mockingbird", "Harper Lee");
const book2 = new Book("1984", "George Orwell");
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book4 = new Book("Moby Dick", "Herman Melville");
const book5 = new Book("Pride and Prejudice", "Jane Austen");

const regularMember = new Member("John Doe");
const premiumMember = new PremiumMember("Jane Smith");

regularMember.borrowBook(book1);
regularMember.borrowBook(book2);
regularMember.borrowBook(book3);
regularMember.borrowBook(book4); // Should not be allowed, exceeds limit

premiumMember.borrowBook(book4);
premiumMember.borrowBook(book5);
premiumMember.borrowBook(book1); // Premium member can borrow a special collection book
premiumMember.borrowBook(book2); // Should not be allowed, exceeds limit

const borrowBookForJohn = regularMember.borrowBook.bind(regularMember);
borrowBookForJohn(book5); // Demonstrates the use of bind to borrow a book
