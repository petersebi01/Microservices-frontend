function UpdateEmployee() {

    updateEmlpoyee = event => {
        event.preventDefault();

        let form = {
            userID: this.refs.id.value,
            name: this.refs.name.value, 
            email: this.refs.email.value,
            telephone: this.refs.telephone.value,
            work_email: this.refs.work_email.value,
            location: this.refs.location.value,
            password: this.refs.password.value
        }

        fetch(`/api/employees/${this.props.match.params.employee}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(form)
        }).then(response => {
            console.log(response.text());
        }).then(this.props.find);
    }

    return (
        <div className="form-content">
            <form onSubmit={this.updateEmployee}>
                <h3>Felhasználó szerkesztése</h3>
                <div className="container">
                    <label>Felhasználó ID:</label>
                    <input type="text" name="user" ref="id" defaultValue={this.state.user.userID} required/>
                    <br/>
                    <label>Teljes név:</label>
                    <input type="text" name="fullname" ref="name" defaultValue={this.state.user.name} required/>
                    <br/>
                    <label>E-mail cím:</label>
                    <input type="text" name="email" ref="email" defaultValue={this.state.user.email} required/>
                    <br/>
                    <label>Telefon</label>
                    <input type="text" name="telephone" ref="telephone" defaultValue={this.state.employee.telephone} required/>
                    <br/>
                    <label>Munkahelyi e-mail cím:</label>
                    <input type="text" name="work_email" ref="work_email" defaultValue={this.state.employee.work_email} required/>
                    <br/>
                    <label>Lakhely</label>
                    <input type="text" name="location" ref="location" defaultValue={this.state.employee.location} required/>
                    <br/>
                    <label>Új jelszó:</label>
                    <input type="password" name="password" ref="password" defaultValue={this.state.user.password} required/>
                    <br/>
                    <input className="signupbtn" type="submit" value="Regisztrálás"/>
                </div>
            </form>
        </div>
    );
}