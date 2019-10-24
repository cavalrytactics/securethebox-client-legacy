import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import { Field, FormSpy } from 'react-final-form'
import ReactQuill from 'react-quill';
import './Create.css'
import { Radio, Checkbox, TextField, Select } from 'final-form-material-ui'
import {
    Paper,
    Grid,
    FormLabel,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Button,
    MenuItem
} from '@material-ui/core';
import CourseFieldsJson from './CourseFields.json'
import CourseStepsJson from './CourseSteps.json'
import axios from 'axios'
import Wizard from "./Wizard";
import category_blue_team from './STBRubrikCategories/category_blue_team';
import category_red_team from './STBRubrikCategories/category_red_team';
import category_security_engineering from './STBRubrikCategories/category_security_engineering';
import category_software_engineering from './STBRubrikCategories/category_software_engineering';
import category_systems_engineering from './STBRubrikCategories/category_systems_engineering';
import STBRubrik from './STBRubrikCategories/STBRubrik';
import { OnChange } from 'react-final-form-listeners'
import { FieldArray } from 'react-final-form-arrays'

const WhenFieldChanges = ({ field, becomes, set, to }) => (
    <Field name={set} subscription={{}}>
        {(
            // No subscription. We only use Field to get to the change function
            { input: { onChange } }
        ) => (
                <FormSpy subscription={{}}>
                    {({ form }) => (
                        <OnChange name={field}>
                            {value => {
                                if (value === becomes) {
                                    onChange(to);
                                }
                            }}
                        </OnChange>
                    )}
                </FormSpy>
            )}
    </Field>
);

const Error = ({ name }) => (
    <Field
        name={name}
        subscribe={{ touched: true, error: true }}
        render={({ meta: { touched, error } }) =>
            touched && error ? <span>{error}</span> : null
        }
    />
);

const Condition = ({ when, is, children }) => (
    <Field name={when} subscription={{ value: true }}>
        {({ input: { value } }) => (value === is ? children : null)}
    </Field>
)


class Create3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            course_fields: CourseFieldsJson,
            course_steps: CourseStepsJson,
            appList: [],
            appCategories: {},
            rubrik: {},
            rebrikList: [],
            rubrikCategories: {},
            roleCategories: [
                { "value": "blue_team", "label": "Blue Team" },
                { "value": "red_team", "label": "Red Team" },
                { "value": "software_engineering", "label": "Software Engineering" },
                { "value": "security_engineering", "label": "Security Engineering" },
                { "value": "systems_engineering", "label": "Systems Engineering" }],
            blue_team: category_blue_team,
            red_team: category_red_team,
            software_engineering: category_software_engineering,
            security_engineering: category_security_engineering,
            systems_engineering: category_systems_engineering,
            resourceTemplate_input: ["name"],
            resourceTemplate_multi: ["references", "tips"],
            resourceTemplate_kv: ["credentials"]
        };
    }

    componentDidMount() {
        // Gett All Applications
        axios.get('/api/applications')
            .then((r) => {
                var listApps = []
                var listCategories = {}
                r.data.map((v, i) => {
                    listApps.push({ 'name': v.name, 'label': v.label, 'category': v.category })
                    listCategories[v.category] = v.category_label
                    return null
                })
                this.setState({
                    appCategories: listCategories,
                    appList: listApps
                })
            })

        this.setState({
            rubrik: STBRubrik,
            loading: true
        }, () => {
            var listRubrik = []
            var dictRubrik = {}
            Object.keys(this.state.rubrik).map((e, i) => {
                Object.keys(this.state.rubrik[e].children).map((v, g) => {
                    listRubrik.push({
                        'name': v,
                        'label': v,
                        'category': this.state.rubrik[e].cn
                    })
                    return null
                })
                dictRubrik[this.state.rubrik[e].cn] = this.state.rubrik[e].name
                return null
            })
            this.setState({
                rubrikList: listRubrik,
                rubrikCategories: dictRubrik
            })
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
                        label={value.label}
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

    renderResourcesSelect() {
        return (
            <FormControl component="fieldset">
                <FormControlLabel
                    label={"Select"}
                    control={
                        <Field
                            name={`steps[4].resources.references`}
                            component={Select}
                        >
                            {this.state.appList.map((v, i) => {
                                return (
                                    <MenuItem key={v + i} value={v.name}>
                                        {v.label}
                                    </MenuItem>
                                )
                            })}
                        </Field>
                    }
                />
            </FormControl>
        )
    }

    renderWizardPages() {
        return (
            this.state.course_steps.map((value, index) => {
                if (index === 1) {
                    return (
                        <Wizard.Page key={value.title + index} >
                            <Grid container alignItems="flex-start" justify="center" spacing={2}>
                                <Grid item xs={12}>
                                    <h2>Select role scope (select 1 only)</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <RadioGroup row>
                                            {
                                                this.state.roleCategories.map((v, i) => {
                                                    return (
                                                        <div key={v.value + i}>
                                                            <WhenFieldChanges
                                                                field="steps[1].role"
                                                                becomes={v.value}
                                                                set="steps[1].topics"
                                                                to={{}}
                                                            />
                                                            <FormControlLabel
                                                                label={v.label}
                                                                control={
                                                                    <Field
                                                                        name={`steps[1].role`}
                                                                        component={Radio}
                                                                        type="radio"
                                                                        value={v.value}
                                                                        required
                                                                    />
                                                                }
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <h2>Select proficiency topics</h2>
                                </Grid>
                                {this.state.roleCategories.map((z, iiii) => {
                                    return (
                                        <Condition key={z.value + iiii} when="steps[1].role" is={z.value}>
                                            {this.state[z.value].map(
                                                (item, index) => {
                                                    return (
                                                        <Grid item key={item.label + index} xs>
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend"><h3>{item.label}</h3></FormLabel>
                                                                {
                                                                    item.children.map((v, i) => {
                                                                        return (
                                                                            <div key={v.label + index}>
                                                                                <Field
                                                                                    name={`steps[1].topics.${z.value}.${item.label.toLowerCase().split(' ').join('_')}`}
                                                                                    component={Checkbox}
                                                                                    type="checkbox"
                                                                                    value={v.label.toLowerCase().split(' ').join('_')}
                                                                                />
                                                                                <label>{v.label}</label>
                                                                            </div>
                                                                        )

                                                                    })
                                                                }
                                                            </FormControl>
                                                        </Grid>
                                                    )
                                                })
                                            }
                                        </Condition>
                                    )
                                })}

                                <Grid item xs={12}>
                                    <Field
                                        name={`steps[${index}].content`}
                                        component={this.renderQuill}
                                        placeholder="Content"
                                    />

                                    <Error name={`steps[${this.state.page}].content`} />
                                </Grid>
                            </Grid >
                        </Wizard.Page >
                    )
                }
                else if (index === 2) {
                    return (
                        <Wizard.Page key={value.title + index} >
                            <Grid container alignItems="flex-start" justify="center" spacing={2}>
                                <Grid item xs={12}>
                                    <h2>Select services</h2>
                                </Grid>
                                {
                                    Object.keys(this.state.appCategories).map((e, i) => {
                                        return (
                                            <Grid key={e} item xs={2}>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend"><h3>{this.state.appCategories[e]}</h3></FormLabel>
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
                } else if (index === 4) {
                    return (
                        <Wizard.Page key={value.title + index} >
                            <Grid container alignItems="flex-start" justify="center" spacing={2}>
                                <Grid item xs={12}>
                                    <h2>Add resources</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name={`steps[4].selected`}
                                        label={"Select service"}
                                        component={Select}
                                        formControlProps={{ fullWidth: true }}>
                                        >
                                        {this.state.appList.map((v, i) => {
                                            return (
                                                <MenuItem key={v + i} value={v.name}>
                                                    {v.label}
                                                </MenuItem>
                                            )
                                        })}
                                    </Field>
                                    {this.state.appList.map((v, i) => {
                                        return (
                                            <Condition key={v.name + i} when={`steps[4].selected`} is={v.name}>
                                                <FieldArray name={`steps[4].references.${v.name}`}>
                                                    {({ fields }) => (
                                                        <div>
                                                            {fields.map((name, index) => (
                                                                <div key={name + index}>
                                                                    <div>
                                                                        <Field
                                                                            name={`${name}.title`}
                                                                            component={TextField}
                                                                            type="text"
                                                                            label={"Reference title"}
                                                                            required
                                                                            fullWidth />
                                                                    </div>
                                                                    <div>
                                                                        <Field
                                                                            name={`${name}.url`}
                                                                            component={TextField}
                                                                            type="text"
                                                                            label={"Reference URL"}
                                                                            required
                                                                            fullWidth />
                                                                    </div>
                                                                    <Button
                                                                        size="small"
                                                                        style={{ margin: 10, backgroundColor: '#f44336', color: 'white' }}
                                                                        onClick={() => fields.remove(index)}>
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                size="small"
                                                                style={{ margin: 10, backgroundColor: '#2196f3', color: 'white' }}
                                                                onClick={() => fields.push({ title: '', url: '' })}
                                                            >
                                                                Add reference
                                                            </Button>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </Condition>
                                        )
                                    })}
                                </Grid>
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
                } else if (index === 5) {
                    return (
                        <Wizard.Page key={value.title + index} >
                            <Grid container alignItems="flex-start" justify="center" spacing={2}>
                                <Grid item xs={12}>
                                    <h2>Add questions</h2>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name={`steps[5].selected`}
                                        label={"Select topic"}
                                        component={Select}
                                        formControlProps={{ fullWidth: true }}>
                                        >
                                        {this.state.appList.map((v, i) => {
                                            return (
                                                <MenuItem key={v + i} value={v.name}>
                                                    {v.label}
                                                </MenuItem>
                                            )
                                        })}
                                    </Field>
                                    {this.state.appList.map((v, i) => {
                                        return (
                                            <Condition key={v.name + i} when={`steps[5].selected`} is={v.name}>
                                                <FieldArray name={`steps[5].questions.${v.name}`}>
                                                    {({ fields }) => (
                                                        <div>
                                                            {fields.map((name, index) => (
                                                                <div key={name + index}>
                                                                    <div>
                                                                        <Field
                                                                            name={`${name}.question`}
                                                                            component={TextField}
                                                                            type="text"
                                                                            label={"Question"}
                                                                            required
                                                                            fullWidth />
                                                                    </div>
                                                                    <div>
                                                                        <Field
                                                                            name={`${name}.answer`}
                                                                            component={TextField}
                                                                            type="text"
                                                                            label={"Answer"}
                                                                            required
                                                                            fullWidth />
                                                                    </div>
                                                                    <Button
                                                                        size="small"
                                                                        style={{ margin: 10, backgroundColor: '#f44336', color: 'white' }}
                                                                        onClick={() => fields.remove(index)}>
                                                                        Remove
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                            <Button
                                                                size="small"
                                                                style={{ margin: 10, backgroundColor: '#2196f3', color: 'white' }}
                                                                onClick={() => fields.push({ question: '', answer: '' })}
                                                            >
                                                                Add question
                                                            </Button>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </Condition>
                                        )
                                    })}
                                </Grid>
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
                } else {
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
                }
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

export default withReducer('auth', reducer)((connect(mapStateToProps)(Create3)));
