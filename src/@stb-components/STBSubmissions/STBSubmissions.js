import React, { Component } from 'react';
import STBFinalForm from '../STBFinalForm';

class STBSubmissions extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        console.log("Mounted")
        this.setState({
            loading: true
        })
    }

    renderSubmissionEditor(){
        return <STBFinalForm/>
    }

    render() {
        return (
            <div style={{ 'margin': 10 }}>
                {this.state.loading ? 
                this.renderSubmissionEditor()
                :
                <p>Still Loading</p>
                }
            </div>
        );
    }
}

export default STBSubmissions;