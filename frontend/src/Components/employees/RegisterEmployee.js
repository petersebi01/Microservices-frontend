import React from 'react';

function registerEmployee(){

    const saveEmployee = () => {
        this.props.handleRegistrations();
    }

    return(
        <div>
            <div className="form-content">
                <h2>Felhasználó készítése</h2>
                <form onSubmit={saveEmployee}>
                    <div className="container">
                        <label>Teljes név:</label>
                        <input type="text" name="name" ref="name" required/>
                        <br/>
                        <label>E-mail cím:</label>
                        <input type="text" name="email" ref="email" required/>
                        <br/>
                        <label>Jelszó:</label>
                        <input type="password" name="password" ref="password" required/>
                        <br/>
                        <input className="signupbtn" type="submit" value="Regisztrálás"/>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default registerEmployee;