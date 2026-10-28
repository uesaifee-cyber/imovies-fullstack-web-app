const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Movie Schema
const movieSchema = new mongoose.Schema({
  id: Number,
  title: String,
  year: Number,
  genre: String,
  image: String,
});

const Movie = mongoose.model('Movie', movieSchema);

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the IMovies API!' });
});

// Get all movies from MongoDB
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find().lean();

    console.log(
      'Movies fetched from MongoDB:',
      JSON.stringify(movies, null, 2)
    );

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
});

// Get a movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findOne({
      id: Number(req.params.id),
    }).lean();

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ message: 'Failed to fetch movie' });
  }
});

// Connect to MongoDB before starting the server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully!');
    console.log('Database name:', mongoose.connection.name);
    console.log('Connected host:', mongoose.connection.host);

    const moviesInDatabase = await Movie.find().lean();

    console.log('Number of movies:', moviesInDatabase.length);
    console.log('First movie from database:', moviesInDatabase[0]);

    app.listen(PORT, () => {
      console.log(`IMovies server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });