import React from 'react';
import UserList from './UserList';
//import { Route } from 'react-router-dom';

class Users extends React.Component{
    state = {
        users: [],
        roles: []
    }
    componentDidMount() {
        this.findAllUsers();
    }
    render() {

        let users = this.state.users;
        if(users.length > 0){
            users = users.map((user, id) => {
                return(
                    <UserList user={user} key={id}/>
                );
            });
        }

        let options = this.state.roles;
        if (options.length > 0) {
            options = options.map((option, id) => {
                return (
                    <option value={option.taskID} key={id}>{option.taskName}</option>
                );
            });
        }

        return(
            <div>
                <h2>Felhasználók listája</h2>
                <ul>{users}</ul>
                <div className="form-content">
                    <h2>Felhasználó készítése</h2>
                    <form onSubmit={this.saveUser}>
                        <div className="container">
                            <label>Felhsználónév </label>
                            <input type="text" name="username" ref="username" required/>
                            <br/>
                            <label>Jelszó </label>
                            <input type="text" name="password" ref="password" required/>
                            <br/>
                            <label>Vezetéknév </label>
                            <input type="text" name="firstname" ref="firstname" required/>
                            <br/>
                            <label>Keresztnév </label>
                            <input type="text" name="lastname" ref="lastname" required/>
                            <br/>
                            <br/>
                            <input className="signupbtn" type="submit" value="Regisztrálás"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    findAllUsers = () => {
        fetch('/api/users').then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                users: jsonFile
            })
        });
    }

    findAllRoles = () => {
        fetch('/api/roles').then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                roles: jsonFile
            })
        })
    }

    findUsersByQueryString = () => {
        fetch(`/api/users${this.props.location.search}`).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                users: jsonFile
            })
        });
    }

    saveUser = event => {
        event.preventDefault();

        let form = {
            username: this.refs.username.value, 
            password: this.refs.password.value,
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value
        }

        fetch('/api/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.findAllUsers);
    }
}

export default Users;