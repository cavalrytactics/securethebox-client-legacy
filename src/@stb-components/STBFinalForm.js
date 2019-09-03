import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import {
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import FormStateToRedux from './STBFinalForm/FormStateToRedux'
// import FormStateFromRedux from './STBFinalForm/FormStateFromRedux'
import store from "./STBFinalForm/store";
import { Provider } from "react-redux";

const TextFieldWrapper = ({ input: { name, onChange, value, ...restInput }, meta, ...rest }) => {
    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;
    return (
        <TextField
            fullWidth
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value}
            variant='outlined'
        />
    );
};

const validate = values => {
    const errors = {};
    return errors;
};

class STBFinalForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'test'
        };
    }

    componentDidMount() {
        
    }

    iterateQuestions(object) {
        var savedRender = []
        var counter = 0
        for (var key in object) {
            counter+=1
            if (!key.includes("_Answer")) {
                if (counter < 10){
                    savedRender.push(
                        <div key={key}>
                        <h3 style={{paddingTop:10 }}>{key[0]}. {object[key]}</h3>
                            <Field
                                fullWidth
                                required
                                name={key + '_Answer'}
                                component={TextFieldWrapper}
                                type="text"
                            />
                        </div>
                    )
                } else {
                    savedRender.push(
                        <div key={key}>
                        <h3 style={{paddingTop:10 }}>{key[0]+key[1]}. {object[key]}</h3>
                            <Field
                                fullWidth
                                required
                                name={key + '_Answer'}
                                component={TextFieldWrapper}
                                type="text"
                            />
                        </div>
                    )
                }
                
            }
        }
        return savedRender
    }

    submitAnswers(initialValues) {
        console.log("PROPS:",this.props)
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <Form
                        onSubmit={this.submitAnswers}
                        initialValues={{
                            "1_Question":"Service Name"
                        }}
                        validate={validate}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                <FormStateToRedux form="example" />
                                    <Grid container alignItems="flex-start" >
                                        <Grid item xs>
                                            {this.iterateQuestions(values)}
                                        </Grid>
                                        <Grid item >
                                            <Button
                                                type="button"
                                                variant="contained"
                                                onClick={form.reset}
                                                disabled={submitting || pristine}
                                            >
                                                Reset
                                        </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                                disabled={submitting}
                                            >
                                                Submit
                                        </Button>
                                        </Grid>
                                    </Grid>
{/*                                 
                                    <pre >
                                        <FormStateFromRedux form="example" />
                                    </pre> */}
                                
                            </form>
                        )}
                    />
                </div>
            </Provider>
        )
    };
}

export default STBFinalForm;
