var mongoose = require('mongoose');

// Genre schema
var genreSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});
// Export so that it is accessible from anywhere
var Genre = module.exports = mongoose.model('Genre', genreSchema)

// Get genres
module.exports.getGenres = function(callback, limit){
    Genre.find(callback).limit(limit);
}


// Add Gerne
module.exports.addGenre = function(genre, callback){
    Genre.create(genre, callback);
}

// Delete Gerne
module.exports.removeGenre = function(id, callback){
    var query = {_id:id}
    Genre.remove(query, callback);
}

// Update Gerne
module.exports.updateGenre = function(id, genre, options, callback){
    var query = {_id: id};
    var update = {
        name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options, callback);
}