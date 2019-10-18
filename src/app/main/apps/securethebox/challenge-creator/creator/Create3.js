import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import { Form, Field } from 'react-final-form'
import ReactQuill from 'react-quill';
import CourseFields from './CourseFields'
import './Create.css'
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import {
    Paper,
    Grid,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent
} from '@material-ui/core';
import CourseFieldsJson from './CourseFields.json'
import CourseStepsJson from './CourseSteps.json'
import axios from 'axios'
import StepTabs from './StepTabs'
import Wizard from "./Wizard";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
};

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
);

const required = value => (value ? undefined : "Required");

class Create2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            course_fields: CourseFieldsJson,
            course_steps: CourseStepsJson
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
    }

    renderQuill({ input }) {
        return (
            <ReactQuill
                {...input}
                onChange={(newValue, delta, source) => {
                    if (source === 'user') {
                        input.onChange(newValue);
                    }
                }}
                onBlur={(range, source, quill) => {
                    input.onBlur(quill.getHTML());
                }}
            />
        )
    }

    submitChallengePayload() {
        axios.post('/api/challenges', this.state.course_payload)
            .then((r) => {
                console.log(r)
            })
    }

    renderWizardPages() {
        return (
            this.state.course_steps.map((value, index) => {
                return (
                    <Wizard.Page key={value.title + index} >
                        <div>
                            <Field
                                name={`steps[${index}].content`}
                                component={this.renderQuill}
                                placeholder="Content"
                            />

                            <Error name={`steps[${this.state.page}].content`} />
                        </div>
                    </Wizard.Page>
                )
            })
        )
    }

    render() {
        const onSubmit = async values => {
            let challengeDict = {}
            challengeDict["challenge"] = values
            axios.post('/api/challenges', challengeDict)
                .then((r) => {
                    console.log(r)
                })
        }

        return (
            <div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64">
                <Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
                    <Wizard
                        initialValues={{
                            category: 'web',
                            length: 0,
                            totalSteps: 7,
                            activeStep: 0,
                            steps: this.state.course_steps
                        }}
                        onSubmit={onSubmit}
                    >

                        {this.renderWizardPages()}
                    </Wizard>
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

export default withReducer('auth', reducer)((connect(mapStateToProps)(Create2)));
