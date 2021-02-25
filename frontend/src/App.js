import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Dashboard from './Components/employees/Dashboard';
import Employees from './Components/employees/Employees';
import EmployeeDetails from './Components/employees/EmployeeDetails';
import EmployeesOnTask from './Components/tasks/EmployeesOnTask';
import AssignmentsOnTask from './Components/tasks/AssignmentsOnTask';
import EmployeeAssignments from './Components/employees/EmployeeAssignments';
import Tasks from './Components/tasks/Tasks';
import TaskDetails from './Components/tasks/TaskDetails';
import Assignments from './Components/assignments/Assignments';
import AssignmentDetails from './Components/assignments/AssignmentDetails';
import AssignmentTask from './Components/assignments/AssignmentTask';
import AssignmentsEmployees from './Components/assignments/AssignmentsEmployees';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Callout from './Components/Callout';
import ChatWall from './Components/chat/ChatWall';
import StompConnect from './StompConnect';
import Users from './Components/Users';
import UserDetails from './Components/UserDetails';
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: props.loggedIn,
            notification: null,
            showCallout: true,
            subscription: null,
            callouts: []
        }

        this.appRef = React.createRef();
        this.showNotification = this.showNotification.bind(this);
    }

    componentDidMount(){
        
    }

    render() {
        let callouts = this.state.callouts;
        callouts = callouts.map((callout, id) => {
            return(
                <Callout callout={callout} ack={this.ackNotification} key={id} show={this.closeCallout}/>
            );
        });
        
        return (
            <div>
                <BrowserRouter>
                    <div id="oldal_menu" className="menu">
                        <button className="close" onClick={this.closeNav}>&times;</button>
                        <Link to={'/api/messages/news'}>Dashboard</Link>
                        <Link to={'/api/employees'}>Alkalmazottak</Link>
                        <Link to={'/api/assignments'}>Beosztások</Link>
                        <Link to={'/api/tasks'}>Feladatok</Link>
                        <Link to={'/api/works'}>Munkák</Link>
                        <Link to={'/api/users'}>Felhasználók</Link>
                        <Link to={'/api/messages/chatroom'}>Chat szoba</Link>
                        <br/>
                        <Link to={'/api/monitoring'}>Eseményfigyelő</Link>
                    </div>
                    <div className="header">
                        <span style={{fontsize: '26px', cursor: 'pointer'}} onClick={this.openNav}>&#9776; Menü</span>
                        <div className="header-center">
                            {(this.props.loggedIn === true) ? (
                                <div>
                                    <p>{localStorage.getItem('username')}</p>
                                    <Logout />
                                </div>
                            ) : (<Link to={'/api/login'}><p>Bejelentkezés</p></Link>)
                            }
                        </div>
                    </div>

                    <div id="main">
                        <div id="container">
                            <div id="tart">
                                <div className="font">
                                    <h1>Erőforrás menedzsment rendszer</h1>
                                    <Switch>
                                        <Route exact path="/">
                                            <Redirect to="/api/news"/>
                                        </Route>
                                        <Route exact path="/api/login" render={this.loginFunction}/>
                                        <Route exact path="/api/messages/news" component={Dashboard}/>
                                        <Route exact path="/api/messages/chatroom" component={ChatWall}/>
                                        <Route exact path="/api/users" component={Users}/>
                                        <Route exact path="/api/users/:user" component={UserDetails}/>
                                        {/* employees */}
                                        <Route exact path="/api/employees" component={Employees}/>
                                        <Route exact path="/api/employees/:employee" component={EmployeeDetails}/>
                                        <Route exact path="/api/employees/:employee/assignments" component={EmployeeAssignments}/>
                                        {/* tasks */}
                                        <Route exact path="/api/tasks" component={Tasks}/>
                                        <Route exact path="/api/tasks/:task" component={TaskDetails}/>
                                        <Route exact path="/api/tasks/:task/employees" component={EmployeesOnTask}/>
                                        <Route exact path="/api/tasks/:task/assignments" component={AssignmentsOnTask}/>
                                         {/* assignments */}
                                        <Route exact path="/api/assignments" component={Assignments}/>
                                        <Route exact path="/api/assignments/:assignment" component={AssignmentDetails}/>
                                        <Route exact path="/api/assignments/:assignment/task" component={AssignmentTask}/>
                                        <Route exact path="/api/assignments/:assignment/employees" component={AssignmentsEmployees}/>
                                    </Switch>
                                </div>
                            </div>
                        </div>      
                    </div>
                    <ul>{callouts}</ul>
                    <StompConnect loggedIn={this.props.loggedIn} showNotification={this.showNotification}/>
                </BrowserRouter>
            </div>
        );
    }

    handleSubscription = (value) => {
        this.setState({
            subscription: value
        })
    }

    loginFunction = () => {
        return(
            <Login />
        );
    }

    showNotification = (notification) => {
        let newMessage = JSON.parse(notification.body);
        let calls = this.state.callouts;
        calls.push(newMessage);
        this.setState({
            notification: notification,
            callouts: calls,
        });
    }

    ackNotification = () => {
        const notification = this.state.notification
        console.log(notification)
        notification.ack();
        let calls = this.state.callouts;
        calls.splice(calls.length - 1, 1);
        this.setState({
            callouts: calls
        });
    }

    openNav = () => {
        document.getElementById("oldal_menu").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }
    
    closeNav = () => {
        document.getElementById("oldal_menu").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps)(App);