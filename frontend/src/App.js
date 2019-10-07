import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';


class App extends Component {
    // Declaring the initial states
    state = { projects: [], id: "", title: "", description: "", url: "" }

    // This post function allows the user add an item to the table (The 'webProjects.json' file contains the data and is updated when this function is called)
    myPost() {
        let id = this.state.id;
        const title = this.state.title;
        const description = this.state.description;
        const url = this.state.url;
        
        // Fetching data from our api and inputting the qeury params from the user's inputted text
        fetch(`https://calm-tundra-64769.herokuapp.com/api?id=${id}&title=${title}&description=${description}&URL=${url}`, {
                method: "POST"
            })
            .then(() => {
                // Fetching our api and displaying the updated data
                fetch('https://calm-tundra-64769.herokuapp.com/api', { method: "GET", headers: { "Content-Type": "application/json" } })
                    .then(res => res.json())
                    .then(projects => this.setState({ projects }));
            });

        this.setState({
            id: "",
            title: "",
            description: "",
            url: ""
        });
    }
    // This edit function allows the user to edit an item from the table
    myEdit() {
        const id = this.state.id;
        const title = this.state.title;
        const description = this.state.description;
        const url = this.state.url;
        // Fetching data from our api and inputting the qeury params from the user's inputted text
        fetch(`https://calm-tundra-64769.herokuapp.com/api?id=${id}&title=${title}&description=${description}&URL=${url}`, {
                method: "PUT"
            })
            .then(() => {
                // Fetching our api and displaying the updated data
                fetch('https://calm-tundra-64769.herokuapp.com/api', { method: "GET", headers: { "Content-Type": "application/json" } })
                    .then(res => res.json())
                    .then(projects => this.setState({ projects }));
            });

        this.setState({
            id: "",
            title: "",
            description: "",
            url: ""
        });
    }
    // A function that allows the user to delete an item from the table.
    myDelete() {
        const id = this.state.id;
        // Fetching data from our api and inputting the qeury params from the user's inputted text
        fetch(`https://calm-tundra-64769.herokuapp.com/api?id=${id}`, {
                method: "DELETE"
            })
            .then((i) => {
                // Fetching our api and displaying the updated data
                fetch('https://calm-tundra-64769.herokuapp.com/api', { method: "GET", headers: { "Content-Type": "application/json" } })
                    .then(res => res.json())
                    .then(projects => this.setState({ projects }));
            });
    }

    // displays the webProjects data when the app loads
    componentDidMount() {
        fetch('https://calm-tundra-64769.herokuapp.com/api', { method: "GET", headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(projects => this.setState({ projects }));
    }

    render() {
        return (
            <div id="wholePage">
            <header>
                <h1>My Web Projects</h1>
                <p>Add, Edit and Delete projects</p>
            </header>

            <Container className="container" fluid='false'>
                <Row>
                    <Col>
                        <div className="formDiv">
                          
                          <form className="form">
                            
                            <table className="formTable">
                                <tbody>
                                    <tr>
                                        <td className="tableLabel">id:</td>
                                        <td><input onChange={e => this.setState({id: e.target.value})} type="text" name="id" /></td>
                                    </tr>
                                    <tr>
                                        <td className="tableLabel">title:</td>
                                        <td><input onChange={e => this.setState({title: e.target.value})} type="text" name="title" /></td>
                                    </tr>
                                    <tr>
                                        <td className="tableLabel">description:</td>
                                        <td><input onChange={e => this.setState({description: e.target.value})} type="text" name="description" /></td>
                                    </tr>
                                    <tr>
                                        <td className="tableLabel">URL:</td>
                                        <td><input onChange={e => this.setState({url: e.target.value})} type="text" name="url" /></td>
                                    </tr>
                                </tbody>
                            </table>

                            <br/>
                            <div className="buttons">

                        {/*The add, edit and delete buttons*/}
                            <button onClick={(e) => {
                                this.myPost()
                                e.preventDefault()

                            }} type="submit" value="Submit" id="btn1">Add</button>
                            &nbsp; &nbsp; &nbsp;

                            <button onClick={(e) => {
                                this.myEdit()
                                e.preventDefault() 
                            }} type="submit" value="Change" id="btn2">Edit</button>
                            &nbsp; &nbsp; &nbsp;

                            <button onClick={(e) => {
                              this.myDelete()
                              e.preventDefault() 
                            }} type="submit" value="Delete" id="btn3">Delete</button>
                            
                            </div> {/*End of buttons section div*/}
                          </form>

                        </div>
                    </Col>

                    <Col>
                        <div id="instructions">
                        <h6><u>Help:</u></h6>
                        <p><b>Add</b> - Be sure to input a unique id (The rest of the input fields is up to you).</p>
                        <p><b>Edit</b> - Be sure to input the the id of the item you wish to edit (All information is editable except for the id).</p>
                        <p><b>Delete</b> - You need only enter the id of the item you wish to delete to remove the specific item.</p>
                        <p><i>When using one of the above functions, be sure to remove previous information from the input fields for changes to occur.</i></p>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div id="dataTableDiv">
                <table className="dataTable" id="mainTable">
                    <thead id="tableHead">
                        <tr className="tableRow">
                            <th className="tableCol">ID</th>
                            <th className="tableCol">Title</th>
                            <th className="tableCol">Description</th>
                            <th className="tableCol">URL</th>
                        </tr>
                    </thead>
                    {/*Mapping all the data into a table*/}
                    {this.state.projects.map((obj, key) => {
                        return (
                            <tbody key={key++} className="tableRow">
                                <tr>
                                  <td className="tableCol">{obj.id}</td>
                                  <td className="tableCol">{obj.title}</td>
                                  <td className="tableCol">{obj.description}</td>
                                  <td className="tableCol"><a href={obj.URL} target="_blank" rel="noopener noreferrer">{obj.URL}</a></td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div> {/*Table div end*/}
        </div>
        )
    }
}

export default App;