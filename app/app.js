const Routes = require('./routes');
const dotenv = require('dotenv');

const express = require('express')
const app = express();
const methodOverride = require('method-override');

const bodyParser = require('body-parser');
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use("/", Routes);


app.listen(PORT, () => {
    console.log(`server started`);
})