const express = require ('express')
const path = require('path')

const app = express()
const PORT = 3001;

app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use(express.static(path.join(__dirname, './public/index.html')));

require('./api/routing/apiRoutes.js')(app);

require('./api/routing/htmlRoutes.js')(app);

// Listen for connections
app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);

