const express = require('express');
const cors = require('cors');
const app = express();
const port = 7373;

const extensionRouter = require('./routes/extension');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/public',express.static('./public'));
app.use('/api/extension', extensionRouter);

app.use('/', (req, res) => { res.sendFile('./public/index.html', { root: __dirname }); });

app.listen(port, '0.0.0.0', () => {
    console.log(`server running at http://localhost:${port}`)
});