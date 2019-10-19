import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import { Field } from 'react-final-form'
import ReactQuill from 'react-quill';
import './Create.css'
import { Checkbox, Radio } from 'final-form-material-ui'
import {
    Paper,
    Grid,
    FormLabel,
    FormGroup,
    FormControl,
    FormControlLabel,
    RadioGroup
} from '@material-ui/core';
import CourseFieldsJson from './CourseFields.json'
import CourseStepsJson from './CourseSteps.json'
import axios from 'axios'
import Wizard from "./Wizard";

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
);

class Create2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            course_fields: CourseFieldsJson,
            course_steps: CourseStepsJson,
            appList: [],
            appCategories: {}
        };
    }

    componentDidMount() {
        axios.get('/api/applications')
            .then((r) => {
                var listApps = []
                var listCategories = {}
                r.data.map((v, i) => {
                    listApps.push({ 'name': v.name, 'label':v.label, 'category': v.category })
                    listCategories[v.category] = 0
                    listCategories[v.category] += 1
                    return null
                })
                this.setState({
                    appCategories: listCategories,
                    appList: listApps
                })
            })
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
                return null
            })
    }

    renderAppCategory(category, step_index) {
        return this.state.appList.map((value, index) => {
            if (category === value.category) {
                return (
                    <FormControlLabel
                        key={value + index}
                        label={value.name}
                        control={
                            <Field
                                name={`steps[${step_index}].apps[${category}]`}
                                component={Radio}
                                type="radio"
                                value={value.name}
                            />
                        }
                    />
                )
            }
            return null
        }

        )
    }

    renderWizardPages() {
        return (
            this.state.course_steps.map((value, index) => {
                if (index === 2) {
                    return (
                        <Wizard.Page key={value.title + index} >
                            <Grid container alignItems="flex-start" justify="center" spacing={2}>
                                <Grid item xs={12}>
                                    <h1>Select services</h1>
                                </Grid>
                                {
                                    Object.keys(this.state.appCategories).map((e, i) => {
                                        return (
                                            <Grid key={e} item xs>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">{this.state.appList[i].label}</FormLabel>
                                                    <RadioGroup>
                                                        {this.renderAppCategory(e, index)}
                                                    </RadioGroup>
                                                </FormControl>
                                            </Grid>
                                        )
                                    }
                                    )
                                }
                                <Grid item xs={12}>
                                    <Field
                                        name={`steps[${index}].content`}
                                        component={this.renderQuill}
                                        placeholder="Content"
                                    />

                                    <Error name={`steps[${this.state.page}].content`} />
                                </Grid>
                            </Grid>
                        </Wizard.Page>
                    )
                }
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
