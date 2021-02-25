import React from 'react';
import { Link } from 'react-router-dom';

class AssignmentDetails extends React.Component{
    state = {
        assignment: null,
        showFrom: false
    }
    componentDidMount(){
        this.findAssignmentById();
    }
    render(){

        return(
            <div className="card">
                {(this.state.assignment !== null) ?
                <div>
                    <h1>{this.state.assignment.assignmentName} adatai</h1>
                    <p className="details">Megnevezés: {this.state.assignment.assignmentName}</p>
                    <p className="details">Kezdés dátuma: {this.state.assignment.StartDate}</p>
                    <div className="workPhase">
                        {(Date.parse(this.state.assignment.StartDate) < Date.now()) ? <p>A munka elidult</p> : <p>Készülődés</p>}
                        {(Date.parse(this.state.assignment.FinishDate) > Date.now()) ? <p>Az elvégzésére még van idő</p> : <p>A munka véget ért</p>}
                    </div>
                    <br/>
                    <p className="details">Befejezés dátuma: {this.state.assignment.FinishDate}</p>
                    <br/>
                    <p className="details">A hozzá tartozó feladat azonosítója: {this.state.assignment.taskID}</p>
                    <br/>
                    <Link to={`/api/assignments/${this.props.match.params.assignment}/task`}>
                        <p>Feladat megtekintése</p>
                    </Link>
                    <Link to={`/api/assignments/${this.props.match.params.assignment}/employees`}>
                        <p>Alkalmazottak megtekintése</p>
                    </Link>
                    <Link to={`/api/assignments/${this.props.match.params.assignment}/chatroom`}>
                        <p>Chat</p>
                    </Link>
                    <Link to={`/api/assignments/${this.props.match.params.assignment}/videochat`}>
                        <span>Videochat &#127909;</span>
                    </Link>
                </div> : <p>A keresett feladat nem létezik</p>}
                <p>
                    <button id="update" onClick={this.handleShow}>Adatok szerkesztése</button>
                    <button id="delete" onClick={this.deleteAssignment}>Beosztás törlése</button>
                </p>

                {this.state.showForm ? (
                <div>
                    <form onSubmit={this.updateAssignment}>
                        <h3>Beosztás szerkesztése</h3>
                        <div className="container">
                            <label>Beosztás ID:</label>
                            <input type="text" name="assignment" ref="id" defaultValue={this.state.assignment.assignmentID} required/>
                            <br/>
                            <label>Beosztás neve:</label>
                            <input type="text" name="assignmentName" ref="name" defaultValue={this.state.assignment.assignmentName} required/>
                            <br/>
                            <label>Kezdés dátuma:</label>
                            <input type="date" name="startdate" ref="startdate" defaultValue={this.state.assignment.StartDate} required/>
                            <br/>
                            <label>Befejezés dátuma:</label>
                            <input type="date" name="finishdate" ref="finishdate" defaultValue={this.state.assignment.FinishDate} required/>
                            <br/>
                            <label>Feladat azonosítója</label>
                            <input type="text" name="task" ref="task" defaultValue={this.state.assignment.taskID} required/>
                            <br/>
                            <input className="signupbtn" type="submit" value="Regisztrálás"/>
                        </div>
                    </form>
                </div>
                ) : (<p></p>)}
            </div>
        );
    }

    handleShow = () => {
        if (this.state.showForm) {
            this.setState({showForm: false});
        } else {
            this.setState({showForm: true});
        }
    }

    findAssignmentById = () => {
        fetch(`/api/assignments/${this.props.match.params.assignment}`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                assignment: jsonFile
            });
            console.log(this.state.assignment)
        });
    }

    updateAssignment = (event) => {
        event.preventDefault();

        let form = {
            assignmentID: this.refs.id.value,
            assignmentName: this.refs.name.value, 
            StartDate: this.refs.startdate.value,
            FinishDate: this.refs.finishdate.value,
            taskID: this.refs.task.value
        }

        fetch(`/api/assignments/${this.props.match.params.assignment}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.findAssignmentById());
    }

    deleteAssignment = () => {
        fetch(`/api/assignments/${this.props.match.params.assignment}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.text();
        }).then(() => {
            this.props.history.push('/api/assignments');
        });  
    }
}

export default AssignmentDetails;