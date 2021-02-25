import React from 'react';
import { Link } from 'react-router-dom';

class UserList extends React.Component{

    render(){
        return(
            <div>
                <Link to={`/api/users/${this.props.user.id}`}>
                    <li className="resourceList">
                        <table>
                            <thead>
                                <tr>
                                    <th>Név</th>
                                    <th>E-mail cím</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.user.username}</td>
                                    <td>{this.props.user.firstname}</td>
                                    <td>{this.props.user.lastname}</td>
                                </tr>
                            </tbody>
                        </table>
                    </li>
                </Link>
            </div>
        );
    }
}

export default  UserList;