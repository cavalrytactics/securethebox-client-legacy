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
} from '@material-ui/core';
import CourseFieldsJson from './CourseFields.json'
import CourseStepsJson from './CourseSteps.json'
import axios from 'axios'
import StepTabs from './StepTabs'

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
                    <Form
                        onSubmit={onSubmit}
                        mutators={{
                            ...arrayMutators
                        }}
                        initialValues={{
                            category: 'web',
                            length: 0,
                            totalSteps: 7,
                            activeStep: 0,
                            steps: this.state.course_steps
                        }}
                        render={({ handleSubmit, form: { mutators: { push, pop } }, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    <CourseFields course_fields={this.state.course_fields} />
                                    <Grid item xs={12}>
                                        <Grid container alignItems="flex-start" spacing={2}>
                                            <StepTabs course_steps={this.state.course_steps} quill_component={this.renderQuill} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            type="button"
                                            onClick={form.reset}
                                            disabled={submitting || pristine}
                                        >
                                            Reset
                                        </Button>
                                        <Button type="submit" variant="contained" color="primary" disabled={submitting || pristine}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                                <pre>{JSON.stringify(values, 0, 2)}</pre>
                            </form>
                        )}
                    />
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
