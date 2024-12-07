const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the public directory with proper MIME types
app.use('/css', express.static(path.join(__dirname, 'public/css'), {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'text/css');
    }
}));

app.use('/js', express.static(path.join(__dirname, 'public/js'), {
    setHeaders: (res) => {
        res.setHeader('Content-Type', 'application/javascript');
    }
}));

app.use(express.static('public'));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
