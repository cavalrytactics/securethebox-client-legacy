import React, { Component } from 'react';
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

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
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

        const onSubmit = async values => {
            await sleep(300);
            window.alert(JSON.stringify(values, 0, 2));
        };
        return (
            <Styles>
                <Form
                    onSubmit={onSubmit}
                    mutators={{
                        ...arrayMutators
                    }}
                    render={({
                        handleSubmit,
                        form: {
                            mutators: { push, pop }
                        }, // injected from final-form-arrays above
                        pristine,
                        form,
                        submitting,
                        values
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Helm Name</label>
                                    <Field name="helm_name" component="input" />
                                </div>
                                <div className="buttons">
                                    <button
                                        type="button"
                                        onClick={() => push('questions', undefined)}
                                    >
                                        Add Question
                                    </button>
                                    <button type="button" onClick={() => pop('questions')}>
                                        Remove Last Question
                                    </button>
                                </div>
                                <FieldArray name="questions">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <div key={name}>
                                                <label>Question #{index + 1}</label>
                                                <Field
                                                    name={`${name}.question`}
                                                    component="input"
                                                    placeholder="Question"
                                                /><br/>
                                                <Field
                                                    name={`${name}.answer`}
                                                    component="input"
                                                    placeholder="Answer"
                                                />
                                                <span
                                                    onClick={() => fields.remove(index)}
                                                    style={{ cursor: 'pointer' }}
                                                    role="img"
                                                    aria-label="close"
                                                >
                                                    ❌
                                                </span>
                                            </div>
                                        ))
                                    }
                                </FieldArray>

                                <div className="buttons">
                                    <button type="submit" disabled={submitting || pristine}>
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </button>
                                </div>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )
                    }}
                />
            </Styles>
        );
    }
}

export default STBTemplate;