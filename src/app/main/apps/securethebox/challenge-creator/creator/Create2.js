import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import ReactQuill from 'react-quill';
import './Create.css'
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import {
    Paper,
    Grid,
    Button,
    MenuItem,
} from '@material-ui/core';
import { TextField, Select } from 'final-form-material-ui';

class Create2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            course_fields: [
                {
                    "label": "Id",
                    "name": "id",
                    "component": "input",
                    "type": "text",
                    "placeholder": "1"
                },
                {
                    "label": "Slug",
                    "name": "slug",
                    "component": "input",
                    "type": "text",
                    "placeholder": "incident-response-1"
                },
                {
                    "label": "Title",
                    "name": "title",
                    "component": "textfull",
                    "type": "text",
                    "placeholder": "Incident Response 1"
                },
                {
                    "label": "Description",
                    "name": "description",
                    "component": "textarea",
                    "type": "text",
                    "placeholder": "Responding to credential leak"
                },
                {
                    "label": "Category",
                    "name": "category",
                    "component": "select",
                    "placeholder": "Responding to credential leak"
                }
            ],
            course_steps: [
                {
                    "id": 0,
                    "title": "Overview",
                    "content": "<p></p>"
                },
                {
                    "id": 1,
                    "title": "Grading Criteria",
                    "content": "<p></p>"
                },
                {
                    "id": 2,
                    "title": "Scenario",
                    "content": "<p></p>"
                },
                {
                    "id": 3,
                    "title": "Start Challenge",
                    "content": "<p></p>"
                }, {
                    "id": 4,
                    "title": "Resources",
                    "content": "<p></p>"
                }, {
                    "id": 5,
                    "title": "Submission",
                    "content": "<p></p>"
                },
                {
                    "id": 6,
                    "title": "Scoring",
                    "content": "<p></p>"
                }
            ]
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

    renderCourseFields() {
        return (
            this.state.course_fields.map((v) => {
                if (v.component == "input") {
                    return (
                        <Grid key={v.label} item xs={2}>
                            <Field
                                name={v.name}
                                label={v.label}
                                component={TextField}
                                type={v.type}
                                required
                                fullWidth
                                placeholder={v.placeholder}
                            />
                        </Grid>
                    )
                } else if (v.component == "textfull") {
                    return (
                        <Grid key={v.label} item xs={12}>
                            <Field
                                name={v.name}
                                label={v.label}
                                required
                                fullWidth
                                component={TextField}
                                type={v.type}
                                placeholder={v.placeholder}
                            />
                        </Grid>
                    )
                } else if (v.component == "textarea") {
                    return (
                        <Grid key={v.label} item xs={12}>
                            <Field
                                name={v.name}
                                label={v.label}
                                component={TextField}
                                type={v.type}
                                multiline
                                fullWidth
                                placeholder={v.placeholder}
                            />
                        </Grid>
                    )
                }
            })
        )

    }

    render() {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        const onSubmit = async values => {
            await sleep(300)
            window.alert(JSON.stringify(values, 0, 2))
            console.log(values)
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
                            timer: 0,
                            length: 0,
                            totalSteps: 7,
                            activeStep: 0,
                            steps: this.state.course_steps
                        }}
                        render={({ handleSubmit, form: { mutators: { push, pop } }, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit}>
                                <Grid container alignItems="flex-start" spacing={2}>
                                    {this.renderCourseFields()}
                                    <Grid item xs={2}>
                                        <Field name="category" label="Select a Category" component={Select} fullWidth formControlProps={{ fullWidth: true }}>
                                            <MenuItem value="web">Web</MenuItem>
                                            <MenuItem value="incident_response">Incident Response</MenuItem>
                                            <MenuItem value="threat_detection">Threat Detection</MenuItem>
                                            <MenuItem value="vulnerability_management">Vulnerability Management</MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Field name="timer" label="Select a Course Duration" component={Select} fullWidth formControlProps={{ fullWidth: true }}>
                                            <MenuItem value={0}>No Timer</MenuItem>
                                            <MenuItem value={30}>30 Minutes</MenuItem>
                                            <MenuItem value={60}>1 Hour</MenuItem>>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="flex-start" spacing={2}>
                                            <FieldArray name="steps">
                                                {({ fields }) =>
                                                    fields.map((name, index) => (
                                                        <Grid item key={name} xs={12}>
                                                            <label>Step #{index + 1}</label>
                                                            <Field
                                                                name={`${name}.title`}
                                                                component="input"
                                                                placeholder="Title"
                                                            />
                                                            <Field
                                                                name={`${name}.content`}
                                                                component={this.renderQuill}
                                                                placeholder="Content"
                                                            />
                                                        </Grid>
                                                    ))
                                                }
                                            </FieldArray>
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
                                    <Grid item xs={12}>
                                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                                    </Grid>
                                </Grid>

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
