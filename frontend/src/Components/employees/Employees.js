import React from 'react';
import EmployeeList from './EmployeeList';
//import { Route } from 'react-router-dom';
//import RegisterEmployee from './RegisterEmployee';

class Employees extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            employees: [],
            registerFormView: false
        }
        this.openRegistrationForm = this.openRegistrationForm.bind(this);
    }
    componentDidMount() {
        if(this.props.location.search === ""){
            this.findAllEmployees();
        } else {
            this.findEmployeeByQueryString();
        }
    }
    render() {

        let employees = this.state.employees;
        if (employees.length > 0) {
            employees = employees.map((employee, id) => {
                return(
                    <EmployeeList employee={employee} key={id}/>
                );
            });
        }

        return(
            <div>
                <form onSubmit={this.findEmployeeByQueryString}>
                    <input type="number" name="limit" placeholder="limit" required/>
                    <input type="submit" value="Szűrés"/>
                </form>
                <h2>Alkalmazottak listája</h2>
                <ul>{employees}</ul>
                <div>
                    <button type="button" onClick={this.openRegistrationForm}>Regisztrálás</button>
                    {this.state.registerFormView ? 
                        <div className="form-content">
                            <h2>Alkalmazott regisztrálása</h2>
                            <form onSubmit={this.handleRegistration}>
                                <div className="container">
                                    <label>Felhasználónév:</label>
                                    <input type="text" name="username" ref="username" required/>
                                    <br/>
                                    <label>Jelszó:</label>
                                    <input type="password" name="password" ref="password" required/>
                                    <br/>
                                    <label>Jogosultság:</label>
                                    <input type="number" name="permission" ref="permission" required/>
                                    <br/>
                                    <br/>
                                    <label>Vezetéknév:</label>
                                    <input type="text" name="firstname" ref="firstname"/>
                                    <br/>
                                    <label>Keresztnév:</label>
                                    <input type="text" name="lastname" ref="lastname"/>
                                    <br/>
                                    <label>Fizetés:</label>
                                    <input type="number" name="payment" ref="payment"/>
                                    <br/>
                                    <input className="signupbtn" type="submit" value="Regisztrálás"/>
                                </div>
                            </form>
                        </div>
                    : ""}
                </div>
            </div>
        );

    }

    findAllEmployees = () => {
        fetch('/api/employees/', {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                employees: jsonFile
            });
        });
    }

    findEmployeeByQueryString = () => {
        fetch(`/api/employees${this.props.location.search}`, {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                users: jsonFile
            })
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
            username: this.refs.username.value,
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value,
            password: this.refs.password.value,
            payment: this.refs.payment.value,
            permissionID: this.refs.permission.value,
        }

        fetch('http://localhost:5001/api/employees', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.findAllEmployees());
    }
}

export default Employees;