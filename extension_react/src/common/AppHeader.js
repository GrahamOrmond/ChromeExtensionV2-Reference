import React, { Component } from 'react';

class AppHeader extends Component {

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
export default AppHeader;