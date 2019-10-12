import React, { Component } from 'react';
import { Field } from 'react-final-form';
import {
    Grid,
    MenuItem
} from '@material-ui/core';
import { TextField, Select } from 'final-form-material-ui';

class CourseFields extends Component {
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
            this.state.loading ?
                this.props.course_fields.map((v) => {
                    if (v.component === "input") {
                        return (
                            <Grid key={v.label} item xs={6}>
                                <Field
                                    name={v.name}
                                    label={v.label}
                                    component={TextField}
                                    type={v.type}
                                    required
                                    fullWidth
                                />
                            </Grid>
                        )
                    } else if (v.component === "textfull") {
                        return (
                            <Grid key={v.label} item xs={12}>
                                <Field
                                    name={v.name}
                                    label={v.label}
                                    required
                                    fullWidth
                                    component={TextField}
                                    type={v.type}
                                />
                            </Grid>
                        )
                    } else if (v.component === "textarea") {
                        return (
                            <Grid key={v.label} item xs={12}>
                                <Field
                                    name={v.name}
                                    label={v.label}
                                    component={TextField}
                                    type={v.type}
                                    multiline
                                    fullWidth
                                />
                            </Grid>
                        )
                    } else if (v.component === "select") {
                        return (
                            <Grid key={v.label} item xs={6}>
                                <Field
                                    name={v.name}
                                    label={v.label}
                                    component={Select}
                                    fullWidth
                                    formControlProps={{ fullWidth: true }}>
                                    {v.items.map((b) => {
                                        return (
                                            <MenuItem key={b.label} value={b.value}>{b.label}</MenuItem>
                                        )
                                    })}
                                </Field>
                            </Grid>
                        )
                    }
                    return null
                }
                )
                :
                <p>Still Loading</p>

        );
    }
}

export default CourseFields;