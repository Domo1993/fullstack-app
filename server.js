const express = require('express') // Fetching the express module
const app = express()
const fileHandler = require('fs'); // Fetching the file system module
const webProjects = require('./webProjects.json') // Fetching the json file contents

const PORT = process.env.PORT || 3001; // Setting the port number as 3000

// This get method reads the contents of the 'webProjects.json' file and displays the information on pathname '/api'
app.get('/api', function(req, res) {
    fileHandler.readFile('webProjects.json', (err, data) => {
        if (err) res.send('File not found. First post to create file.');
        else
            res.send(`${data}`);
    })
})

// This post method allows the user to add information to the 'webProjects.json' file
app.post('/api', (req, res) =>{
    let myData ={id: Number(req.query.id),title: req.query.title,description: req.query.description,URL: req.query.URL};
    webProjects.push(myData);

    fileHandler.writeFile('webProjects.json', JSON.stringify(webProjects), (err) => {
        if(err) throw err;
        res.send('File created')
    })
})

// This delete method allows the user to remove a specific project (depending on the inputted id) from the 'webProjects.json' file
app.delete('/api', (req, res) => {
    const filteredWebProjects = webProjects.filter((item) => {
        return item.id != req.query.id
    })

    fileHandler.writeFile('webProjects.json', JSON.stringify(filteredWebProjects), (err) => {
        if(err) {
            res.send("File could not be deleted!");
        }else {
            res.send("File Deleted!");
        }
    })
})

// This put method allows the user to update the title and/or the description by inputting the id, title and/or description as parameters for the query string.
app.put('/api', function(req, res) {
    
    for(project of webProjects){
        if(project.id == req.query.id && "string" == typeof(req.query.title) ){
            if(req.query.title == ""){
                project.title = project.title
            } else {
                project.title = req.query.title                
            }
        }

        if(project.id == req.query.id && "string" == typeof(req.query.description) ){
            if(req.query.description == ""){
                project.description = project.description
            } else {
                project.description = req.query.description
            }
        }

        if(project.id == req.query.id && "string" == typeof(req.query.URL) ){
            if(req.query.URL == ""){
                project.URL = project.URL
            } else {
                project.URL = req.query.URL
            }
        }              
    }

    fileHandler.writeFile('webProjects.json', JSON.stringify(webProjects), (err) => {
        if(err) {
            res.send("File could not be udated!");
        }else {
            res.send("File Updated!");
        }
    })
})

// The server is listening on port 3001
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});