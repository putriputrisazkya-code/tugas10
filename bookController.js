const fs = require('fs');
const path = require('path');

// Mengambil file database
const filePath = path.join(__dirname, '../data/books.json');

// Fungsi untuk mengambil buku
function getBooks() {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

// Fungsi untuk menyimpan buku
function saveBooks(books) {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
}

// Respon untuk menampilkan semua buku (Read)
exports.getAllBooks = (req, res) => {
    const books = getBooks();
    res.json(books);
};

// Respon untuk mencari buku
exports.getBookById = (req, res) => {
    const books = getBooks();
    const book = books.find(buku => buku.id == req.params.id);

    if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });

    res.json(book);
};

// Respon untuk menambahkan buku (Create)
exports.createBook = (req, res) => {
    const books = getBooks();
    const { title, author } = req.body;

    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };

    books.push(newBook);
    saveBooks(books);

    res.status(201).json(newBook);
};

// Respon untuk mengubah buku (Update)
exports.updateBook = (req, res) => {
    const books = getBooks();
    const book = books.find(b => b.id == req.params.id);

    if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    saveBooks(books);

    res.json(book);
};

// Respon untuk menghapus buku (Delete)
exports.deleteBook = (req, res) => {
    let books = getBooks();
    const book = books.find(b => b.id == req.params.id);

    if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });

    books = books.filter(b => b.id != req.params.id);
    saveBooks(books);

    res.json({ message: "Buku telah dihapus" });
};