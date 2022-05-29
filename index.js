const dotenv = require('dotenv');
const express = require('express')
const cors = require('cors');
var app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');
app.use(cors());
app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`started at ${PORT}`)
});


