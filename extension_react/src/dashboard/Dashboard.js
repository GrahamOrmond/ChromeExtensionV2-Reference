import React, { Component } from 'react';
import AppHeader from '../common/AppHeader';

class AppDashboard extends Component {

    constructor(props) {
        super(props);
        
        this.logoutFunction = props.logoutFunction.bind(this);
    }

    render(){

        return (
            <div className="app-page">
                <AppHeader text="Dashboard" />
                <div className="app-content"> 
                    <button onClick={this.logoutFunction}>Logout</button>
                </div>
           </div>
        );
    }
}

export default AppDashboard;