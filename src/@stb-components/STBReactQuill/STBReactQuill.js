import React, { Component } from 'react';
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; 
import './STBReactQuill.css'

class STBReactQuill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            context: '',
        };
        // this.handleChangeContext = this.handleChangeContext.bind(this);
    }

    componentDidMount() {
    
    }

    // handleChangeContext = (value) => {
    //     this.setState({
    //         context: value
    //     }, () => {
    //         console.log(this.state.context)
    //     });
    // };

    modules = {
        toolbar: {
            container: "#toolbar",
        },
    }


    render() {
        return (
            <ReactQuill
                value={this.props.context}
                onChange={this.props.handleChangeContext}
            />
        )
    };
}

export default STBReactQuill;
