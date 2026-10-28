const mongoose = require('mongoose');
require('dotenv').config();

const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  year: Number,
  genre: String,
  image: String,
});

const Movie = mongoose.model('Movie', movieSchema);

const movies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    image: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    genre: 'Adventure',
    image: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
  },
  {
    id: 3,
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 4,
    title: 'Avatar',
    year: 2009,
    genre: 'Fantasy',
    image: 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
  },
];

async function seedMovies() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected!');

    await Movie.deleteMany({});
    await Movie.insertMany(movies);

    console.log('Movies added successfully!');
    console.log('Inserted movie:', await Movie.findOne({ id: 1 }).lean());
  } catch (error) {
    console.error('Error adding movies:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedMovies();