import React, { Component } from 'react';
import axios from 'axios'
import {
    Paper,
    Grid,
    Button,
    // FormLabel,
    // FormControl,
    MenuItem,
} from '@material-ui/core';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import MonacoEditor from 'react-monaco-editor';
import { Form, Field } from 'react-final-form'
import { TextField, Select } from 'final-form-material-ui'
import YAML from 'yaml'

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            values_yaml: "",
            appCategories: [],
        };
    }

    componentDidMount() {
        this.setState({
            loading: true
        })

        axios.get("/api/v1/applications/categories")
            .then((r) => {
                console.log(r.data)
                let prevAppCategories = this.state.appCategories
                Object.keys(r.data).map((e, i) => {
                    prevAppCategories.push({
                        "name": e,
                        "label": r.data[e]
                    })
                    return null
                })
                this.setState({
                    appCategories: prevAppCategories
                })
            })
    }

    saveHelmChartValuesYaml(values) {
        let saveData = {
            "yamlData": [
                {
                    "name": values.helm_chart_name,
                    "chart": values.chart_values,
                    "url": values.github_repo_url,
                    "category": "Infrastructure"
                }
            ]
        }
        axios.post("/api/v1/helm/save", saveData)
            .then((r) => {
                console.log(r.data)
            })
    }

    renderMonacoEditor() {
        const options = {
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false
        };
        return (
            <MonacoEditor
                width="100%"
                height="800"
                language="yaml"
                theme="vs-light"
                value={this.state.values_yaml}
                options={options}
                onChange={(v) => this.handleMonacoEditorChange(v)}
            />
        );
    }

    handleMonacoEditorChange(newValue) {
        let prevvalues_yaml = this.state.values_yaml
        prevvalues_yaml = newValue
        this.setState({
            values_yaml: prevvalues_yaml
        })
    }

    render() {
        const onSubmit = async values => {

            let queryData = {
                "yamlData": [
                    {
                        "name": values.helm_chart_name,
                        "url": values.github_repo_url
                    }
                ]
            }
            console.log(queryData)
            axios.post("/api/v1/helm/query", queryData)
                .then((r) => {
                    console.log(r.data)
                    this.handleMonacoEditorChange(YAML.stringify(r.data))
                })
        }
        return (
            <div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64">
                <Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Create Helm Chart App</h1>
                    {this.state.loading ?
                        <Grid container alignItems="flex-start" justify="center" spacing={2}>
                            <Grid item xs={12}>
                                <Form
                                    onSubmit={onSubmit}
                                    initialValues={{ helm_chart_name: 'defectdojo', github_repo_url: "https://github.com/securethebox/defectdojo.git", chart_values: this.state.values_yaml, category: "" }}
                                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <Grid container alignItems="flex-start" justify="center" spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            name="helm_chart_name"
                                                            component={TextField}
                                                            type="text"
                                                            fullWidth
                                                            label="Helm Chart Name"
                                                            placeholder="Helm Chart Name"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            name="github_repo_url"
                                                            component={TextField}
                                                            type="text"
                                                            fullWidth
                                                            label="Github Repo URL"
                                                            placeholder="https://github.com/securethebox/defectdojo.git"
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Field
                                                            name={`category`}
                                                            label={"Select Category"}
                                                            component={Select}
                                                            formControlProps={{ fullWidth: true }}>
                                                            >
                                                            {this.state.appCategories.map((v, i) => {
                                                                return (
                                                                    <MenuItem key={v + i} value={v.name}>
                                                                        {v.label}
                                                                    </MenuItem>
                                                                )
                                                            })}
                                                        </Field>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {pristine && <Button style={{ margin: 10, backgroundColor: '#e0e0e0' }} disabled={pristine} type="submit">Query</Button>}
                                                        {!pristine &&
                                                            <Button style={{ margin: 10, backgroundColor: '#2196f3', color: 'white' }} type="submit" disabled={submitting || pristine}>
                                                                Query
                                                            </Button>
                                                        }
                                                        {!pristine &&
                                                            <Button onClick={() => this.saveHelmChartValuesYaml(values)} style={{ margin: 10, backgroundColor: '#2196f3', color: 'white' }} disabled={submitting || pristine}>
                                                                Save
                                                            </Button>
                                                        }
                                                        {pristine && <Button style={{ margin: 10, backgroundColor: '#e0e0e0' }} disabled={pristine} type="submit">Reset Form</Button>}
                                                        {!pristine &&
                                                            <Button
                                                                type="button"
                                                                onClick={form.reset}
                                                                disabled={submitting || pristine}
                                                                style={{ margin: 10, backgroundColor: '#f44336', color: 'white' }}
                                                            >
                                                                Reset Form
                                                        </Button>
                                                        }

                                                    </Grid>
                                                </Grid>
                                            </div>
                                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                                        </form>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={() => this.queryHelmChartValuesYaml()}>query</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {this.renderMonacoEditor(this.state.values_yaml)}
                            </Grid>
                        </Grid>
                        :
                        <div>loading</div>
                    }
                </Paper>
            </div >
        )
    };
}

function mapStateToProps({ auth }) {
    return {
        user: auth.user
    }
}

export default withReducer('auth', reducer)((connect(mapStateToProps)(Create)));
