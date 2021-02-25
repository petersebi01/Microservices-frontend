import React from 'react';

class UserDetails extends React.Component{
    state = {
        user: null,
        showFrom: false
    }
    componentDidMount(){
        this.findUserById();
    }
    render(){
        return(
            <div>
                <div className="card">
                    {(this.state.user !== null) ?
                    <div>
                        <h1>{this.state.user.lastname} adatai</h1>
                        <p className="details">ID: {this.state.user.id}</p>
                        <p className="details">Felhasználónév: {this.state.user.username}</p>
                        <p className="details">Vezetéknév: {this.state.user.firstname}</p>
                        <p className="details">Keresztnév: {this.state.user.lastname}</p>
                    </div> : <p>A keresett felhasználó nem létezik</p>}
                    <p>
                        <button id="update" onClick={this.handleShow}>Adatok szerkesztése</button>
                        <button id="delete" onClick={this.deleteUser}>Felhasználó törlése</button>
                    </p>
                </div>

                {this.state.showForm ? (
                <div className="form-content">
                    <form onSubmit={this.updateUser}>
                        <h3>Felhasználó szerkesztése</h3>
                        <div className="container">
                            <label>Felhasználó ID</label>
                            <input type="text" name="userid" ref="userid" defaultValue={this.state.user.id} required/>
                            <br/>
                            <label>Felhasználónév</label>
                            <input type="text" name="username" ref="username" defaultValue={this.state.user.username} required/>
                            <br/>
                            <label>Jelszó</label>
                            <input type="text" name="password" ref="password" required/>
                            <br/>
                            <label>Vezetéknév</label>
                            <input type="text" name="firstname" ref="firstname" defaultValue={this.state.user.firstname} />
                            <br/>
                            <label>Keresztnév</label>
                            <input type="text" name="lastname" ref="lastname" defaultValue={this.state.user.lastname} />
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

    findUserById = () => {
        fetch(`/api/users/${this.props.match.params.user}`).then(response => {
            return response.json();
        }).then(jsonFile => {
            this.setState({
                user: jsonFile
            })
        });
    }

    updateUser = event => {
        event.preventDefault();

        let form = {
            id: this.refs.userid.value,
            username: this.refs.username.value,
            password: this.refs.password.value,
            firstName: this.refs.firstname.value,
            lastname: this.refs.lastname.value
        }

        fetch(`/api/users/${this.props.match.params.user}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        }).then(response => {
            response.text();
        }).then(this.findUserById);
    }

    deleteUser = () => {
        fetch(`/api/users/${this.props.match.params.user}`, {
            method: 'DELETE'
        }).then(response => {
            return response.text();
        }).then(() => {
            this.props.history.push('/api/users');
        });  
    }
}

export default UserDetails;