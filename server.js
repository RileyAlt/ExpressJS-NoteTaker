const express = require ('express')
const path = require('path')

const app = express()
const PORT = 3001;

app.use(express.urlencoded({ extended: true })); 

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

require('./routing/apiRoutes.js')(app);

require('./routing/htmlRoutes.js')(app);

// Listen for connections
app.listen(process.env.PORT || PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
);

