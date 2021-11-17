const express = require('express');
const app = express();

const redirect = (req, res) => {
    res.redirect('https://localhost:3000/login');
};

app.get('*', redirect);
app.post('*', redirect);
app.patch('*', redirect);
app.delete('*', redirect);

export default app;