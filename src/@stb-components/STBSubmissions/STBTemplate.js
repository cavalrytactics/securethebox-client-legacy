import React, { Component } from 'react';

class STBTemplate extends Component {
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

    render() {
        return (
            <div style={{ 'margin': 10 }}>
                {this.state.loading ? 
                <p>Loaded</p>
                :
                <p>Still Loading</p>
                }
            </div>
        );
    }
}

export default STBTemplate;