import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
            code_deploy: "",
            code_service: "",
            code_ingress: "",
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

    renderTab(value) {
        if (value === 0) {
            return (
                <TabPanel value={value} index={0}>
                    <div>{value}</div>
                </TabPanel>
            )
        } else if (value === 1) {
            return (
                <TabPanel value={value} index={1}>
                    <div>{value}</div>
                </TabPanel>
            )
        } else if (value === 2) {
            return (
                <TabPanel value={value} index={2}>
                    <div>{value}</div>
                </TabPanel>
            )
        }
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Tabs 
                    value={this.state.value} 
                    onChange={this.handleChange} 
                    aria-label="simple tabs example" 
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    >
                        <Tab label="deploy.yaml" {...this.a11yProps(0)} />
                        <Tab label="ingress.yaml" {...this.a11yProps(1)} />
                        <Tab label="service.yaml" {...this.a11yProps(2)} />
                    </Tabs>
                </AppBar>
                {this.state.loading ?
                    this.renderTab(this.state.value)
                    :
                    <div>loading</div>
                }
            </div>
        );
    }
}

export default StepTabs;