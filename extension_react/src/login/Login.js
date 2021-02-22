import React, { Component } from 'react';

class LoginHeader extends Component {

    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="app-header">
                <p>{this.props.text}</p>
            </div>
        );
    }
}


class AppLogin extends Component {

    constructor(props) {
        super(props);

        this.loginFunction = props.loginFunction.bind(this);
    }

    render () {
       return (
           <div className="app-page">
                <LoginHeader text="React Extension" />
                <div className="app-content"> 
                    <button onClick={this.loginFunction}>Login</button>
                </div>
           </div>
       );
    }
}

export default AppLogin;