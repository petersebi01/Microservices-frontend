import React from 'react';
import AssignmentList from './AssignmentList';
//import { Route } from 'react-router-dom';

class Assignments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            selectedOption: "",
            assignments: [],
            registerFormView: false
        }
        this.openRegistrationForm = this.openRegistrationForm.bind(this);
    }
    componentDidMount() {
        this.findAllAssignments();
        this.findAllTasks();
    }
    render() {

        let assignments = this.state.assignments;
        if (assignments.length > 0) {
            assignments = assignments.map((assignment, id) => {
                return (
                    <AssignmentList assignment={assignment} key={id}/>
                );
            });
        }

        let options = this.state.tasks;
        if (options.length > 0) {
            options = options.map((option, id) => {
                return (
                    <option value={option.taskID} key={id}>{option.taskName}</option>
                );
            });
        }

        return(
            <div>
                <h2>Beosztások listája</h2>
                <ul>{assignments}</ul>
                <div>
                    <button type="button" onClick={this.openRegistrationForm}>Új beosztás létrehozása</button>
                    {this.state.registerFormView ? 
                        <div className="form-content">
                            <h2>Új beosztás létrehozása</h2>
                            <form onSubmit={this.handleRegistration}>
                                <div className="container">
                                    <label>Beosztás neve:</label>
                                    <input type="text" name="name" ref="name" required/>
                                    <br/>
                                    <label>Kezdés dátuma:</label>
                                    <input type="date" name="StartDate" ref="StartDate" required/>
                                    <br/>
                                    <label>Befejezés dátuma:</label>
                                    <input type="date" name="FinishDate" ref="FinishDate" required/>
                                    <br/>
                                    <label>Feladat:</label>
                                    <select value={this.state.selectedOption} onChange={this.handleChange}>
                                        {options}
                                    </select>
                                    <input className="signupbtn" type="submit" value="Regisztrálás"/>
                                </div>
                            </form>
                        </div>
                    : ""}
                </div>
            </div>
        );

    }

    handleChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });

        console.log(this.state.selectedOption);
    }

    findAllTasks = () => {
        fetch('/api/tasks', {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                tasks: jsonFile
            })
        });
    }

    findAllAssignments = () => {
        fetch('/api/assignments', {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                assignments: jsonFile
            });
        });
    }

    openRegistrationForm = () => {
        if (this.state.registerFormView === false){
            this.setState({
                registerFormView: true
            });
        } else {
            this.setState({
                registerFormView: false
            });
        }
    }

    handleRegistration = event => {
        event.preventDefault();

        let form = {
            assignmentName: this.refs.name.value,
            StartDate: this.refs.StartDate.value,
            FinishDate: this.refs.FinishDate.value,
            taskID: this.state.selectedOption,
        }

        fetch('http://localhost:5001/api/assignments', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(() => {
                this.findAllAssignments();
            }
        );
    }
}

export default Assignments;