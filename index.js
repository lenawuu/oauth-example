const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const PORT = 3000;

app.set('view engine', 'ejs');

// Configure app to user authRoutes, '/auth' is path to access router
app.use('/auth',authRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});