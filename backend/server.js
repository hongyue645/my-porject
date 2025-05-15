const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

const shoppingListRoutes = require('./routes/shoppingListRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/lists', shoppingListRoutes);
app.use('/api/users', userRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Error handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
