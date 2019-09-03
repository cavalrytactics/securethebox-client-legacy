import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import STBMonacoEditor from './STBMonacoEditor';
import default_deploy_yaml from './STBMaterialUiTabs/default_deploy.yaml';
import default_ingress_yaml from './STBMaterialUiTabs/default_ingress.yaml';
import default_service_yaml from './STBMaterialUiTabs/default_service.yaml';
import YAML from 'yaml'

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


class STBMaterialUiTabs extends Component {
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
            code_deploy: YAML.stringify(default_deploy_yaml),
            code_ingress: YAML.stringify(default_ingress_yaml),
            code_service: YAML.stringify(default_service_yaml),
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
        // setValue(newValue);
        console.log(newValue)
        this.setState({
            value: newValue
        })
    }

    renderTab(value) {
        if (value === 0) {
            return (
                <TabPanel value={value} index={0}>
                    <STBMonacoEditor code={this.state.code_deploy.toString()} />
                </TabPanel>
            )
        } else if (value === 1) {
            return (
                <TabPanel value={value} index={1}>
                    <STBMonacoEditor code={this.state.code_ingress.toString()} />
                </TabPanel>
            )
        } else if (value === 2) {
            return (
                <TabPanel value={value} index={2}>
                    <STBMonacoEditor code={this.state.code_service.toString()} />
                </TabPanel>
            )
        }
    }


    render() {



        return (
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
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

export default STBMaterialUiTabs;