const fs = require ('fs');

//this is for all of the routing
module.exports = function (app) {

    app.get('/api/notes', (req, res) => {
        console.log(`GET /api/notes`);

        let data = fs.readFileSync('./db/db.json'); //////

        res.json(JSON.parse(data));
    });


    // POST /api/notes
    // { title: "To DO LIST", text: "1. Clean room, 2. Brush hair"}
    app.post('/api/notes', (req, res) => {
        console.log('User is trying to make a new note!')

        //creating a new note on page plus giving random ID
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: Date.now()
        };

        let data = fs.readFileSync('./db/db.json');
        const currentNotes = JSON.parse(data);

        currentNotes.push(newNote);

        const newNotesAsJson = JSON.stringify(currentNotes);
        
        fs.writeFile(
            './db/db.json', 
            newNotesAsJson, 
            (err) => {
                if (err) {
                    console.log('Something went wrong');
                    return;
                }
                console.log('Everthing went great');
            }
        );

        console.log("New note Added!");

        res.json(newNotesAsJson);
    });

    //API Delete request\\\\\
    app.delete('/api/notes/:id', (req, res) => {
        let dbContentAsString = fs.readFileSync('./db/db.json'); // "[{id: 1, title: 'Note 1'}, {id: 2, title: 'Note 2'}]""


        const currentNotesAsArray = JSON.parse(dbContentAsString); // [{id: 1, title: 'Note 1'}, {id: 2, title: 'Note 2'}]
        const idOfNoteToDelete =  req.params.id;

        const newNotesAsArray = currentNotesAsArray.filter((note) => note.id != idOfNoteToDelete);


        const newNotesAsText = JSON.stringify(newNotesAsArray);

        fs.writeFile('./db/db.json', newNotesAsText, (err, text) =>{
            if (err){
                console.error(err);
                return;
            }
        });

        res.json(newNotesAsText);
    });
};;