var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre = require('./models/genre')
Book = require('./models/book')

// connect to mongoose
mongoose.connect('mongodb://localhost/bookstore')
// database object
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Please use1 api/books or /api/genre');
});

// Get all the genres
app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

// Add genre
app.post('/api/genres', function(req, res){
    // req.body allows us to access everything coming from the forms into the genre object
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// Update genre
app.put('/api/genres/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the genre object
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err; 
        }
        res.json(genre);
    });
});

// Update book
app.put('/api/books/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the genre object
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// Add book
app.post('/api/books', function(req, res){
    // req.body allows us to access everything coming from the forms into the book object
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// Get all the books
app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

// Get a book by id
app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

// Delete genre
app.delete('/api/genres/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the genre object
    var id = req.params._id;
    var genre = req.body;
    Genre.removeGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });
});

// Delete book
app.delete('/api/books/:_id', function(req, res){
    // req.body allows us to access everything coming from the forms into the genre object
    var id = req.params._id;
    var book = req.body;
    Book.removeBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });
});

app.listen('3000');
console.log('Running on port 3000...');