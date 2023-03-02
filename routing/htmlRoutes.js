const path = require('path');


module.exports = function (app) {
    //this navigaties via api routing to the notes page
    app.get('/notes', function (req, res){
        res.sendFile(path.join(__dirname, '/../public/notes.html'));
    });
//this navigates the user to the HTML wbpage
    app.get('/', function (req, res){
        res.sendFile(path.join(__dirname, '/../public/index.html'));
    }); 
};