import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

class STBMonacoEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '// type your code...\n sdfsdf',
        }
    }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }
    
    render() {
        const options = {
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false
        };
        return (
            <MonacoEditor
                width="auto"
                height="500"
                language="yaml"
                theme="vs-light"
                value={this.props.code}
                options={options}
                onChange={this.onChange}
                editorDidMount = {this.editorDidMount }
            />
        );
}
}

export default STBMonacoEditor;