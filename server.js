const express = require('express');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(logger);

// Route Buku
app.use('/books', bookRoutes);

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({
        status: "error",
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});