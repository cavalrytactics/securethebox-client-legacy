import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Field } from 'react-final-form'
import {
    Grid,
    FormLabel,
    FormGroup,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';
import ReactQuill from 'react-quill';
import STBAppSelect from '../../../../../../@stb-components/STBAppSelect/STBAppSelect';
import axios from 'axios'
import { Checkbox } from 'final-form-material-ui'

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
            appList: [],
            appCategories: {},
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/applications')
            .then((r) => {
                var listApps = []
                var listCategories = {}
                r.data.map((v, i) => {
                    listApps.push({ 'name': v.name, 'category': v.category })
                    listCategories[v.category] = 0
                    listCategories[v.category] += 1
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

    renderAppCategory(category) {
        return this.state.appList.map((value, index) => {
            if (category === value.category) {
                return (
                    <FormControlLabel
                        key={value + index}
                        label={value.name}
                        control={
                            <Field
                                name={`steps[${this.state.value}].apps`}
                                component={Checkbox}
                                type="checkbox"
                                value={value.name}
                            />
                        }
                    />
                )
            }
        })
    }

    renderStepModule(){
        if (this.state.value === 2){
            return (
                <Grid container alignItems="flex-start" justify="center" spacing={2}>
                    <Grid item xs={12}>
                        <h1>Select Modules to Enable for this Challenge</h1>
                    </Grid>
                    {
                        Object.keys(this.state.appCategories).map((e, i) => {
                            return (
                                <Grid key={e} item xs>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">{e}</FormLabel>
                                        <FormGroup>
                                            {this.renderAppCategory(e)}
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                            )
                        }
                        )
                    }
                </Grid>
            )
        }
    }


    renderTab() {
        return (
            <TabPanel key={`steps[${this.state.value}].content`} >
                <Field
                    name={`steps[${this.state.value}].content`}
                    component={this.renderQuill}
                    placeholder="Content"
                />
                {this.renderStepModule()}
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
                    this.renderTab()
                    :
                    <div>loading</div>
                }
            </Grid>
        );
    }
}

export default StepTabs;