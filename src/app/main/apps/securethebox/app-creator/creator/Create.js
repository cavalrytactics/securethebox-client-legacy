import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import {
    // withStyles,
    Paper,
    // Grid,
    // Button,
    // TextField
} from '@material-ui/core';

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validUsername: false,
            username: ''
        };
    }

    componentDidMount() {
    
    }

    render() {
        return (
            <div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64">
                <Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Create App</h1>
                    <h3>Easier way to create apps in platform</h3>
                    <h3>Upload Kubernetes Deployment.yml</h3>
                    <h1>Upload Kubernetes Service.yml</h1>
                    <h3>Upload Kubernetes Ingress.yml</h3>
                </Paper>

            </div>
        )
    };
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user
    }
}

export default withReducer('auth', reducer)((connect(mapStateToProps)(Create)));
