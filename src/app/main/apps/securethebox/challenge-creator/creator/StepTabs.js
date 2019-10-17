import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Field } from 'react-final-form'
import {
    Grid,
} from '@material-ui/core';
import ReactQuill from 'react-quill';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

class StepTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            availableTabs: [{ "label": "1" }, { "label": "2" }],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
    }

    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleChange(event, newValue) {
        console.log(newValue)
        this.setState({
            value: newValue
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

    getIndex(step_fields, this_value) {
        return step_fields.findIndex(obj => obj.index === this_value);
    }

    renderTab(quillComponent) {
        console.log(`steps[${this.state.value}].content`)
        return (
            <TabPanel key={`steps[${this.state.value}].content`} >
                <Field
                    name={`steps[${this.state.value}].content`}
                    component={quillComponent}
                    placeholder="Content"
                />
            </TabPanel>
        )
    }

    renderAvailableTabs(stepList) {
        return (
            stepList.map((value, index) => {
                return (
                    <Tab key={value.title} label={value.title} {...this.a11yProps(index)} />
                )
            })
        )
    }

    render() {
        return (
            <Grid item xs={12}>
                <AppBar position="static">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="simple tabs example"
                        indicatorColor="primary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {this.renderAvailableTabs(this.props.course_steps)}
                    </Tabs>
                </AppBar>
                {this.state.loading ?
                    this.renderTab(this.props.quill_component)
                    :
                    <div>loading</div>
                }
            </Grid>
        );
    }
}

export default StepTabs;