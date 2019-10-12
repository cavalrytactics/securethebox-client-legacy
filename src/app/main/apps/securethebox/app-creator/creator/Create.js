import React, { Component } from 'react';
// import Grid from '@material-ui/core/Grid';
// import STBGraph from './STBGraph';
// import connect from 'react-redux/es/connect/connect';
// import withReducer from 'app/store/withReducer';
// import { selectNode } from './STBVisGraph/store/actions/nodes.actions'
// import reducer from './STBVisGraph/store/reducers';

import default_deploy_yaml from '../../../../../../@stb-components/STBHelmChart/templates/deployment.yaml';
import default_ingress_yaml from '../../../../../../@stb-components/STBHelmChart/templates/ingress.yaml';
import default_service_yaml from '../../../../../../@stb-components/STBHelmChart/templates/service.yaml';
// import STBSubmissions from '../../../../../../@stb-components/STBSubmissions/STBSubmissions';
import STBFinalFormArrays from '../../../../../../@stb-components/STBFinalFormArrays/STBFinalFormArrays';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import YAML from 'yaml'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MonacoEditor from 'react-monaco-editor';
import uuid from "uuid";
import {
    // withStyles,
    Paper,
    Grid,
    Button,
    // TextField
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
// import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

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
class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            value: 0,
            selected: { id: uuid.v4(), label: "jenkins-username", title: "jenkins-username", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
            network: {},
            graph: {
                nodes: [
                    { id: uuid.v4(), label: "jenkins-username", title: "jenkins-username", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 2, label: "Vulnerable-App", title: "Juice-Shop Mono Application", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 3, label: "Splunk", title: "SIEM", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 4, label: "Jenkins", title: "CI/CD", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 5, label: "Hashicorp-Vault", title: "Secrets Management/PKI", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 6, label: "Gitlab", title: "Git Repository", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 7, label: "Suricata", title: "IDS/IPS", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 8, label: "Google-GRR", title: "Forensic Acquisition", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 9, label: "Wazuh", title: "Endpoint Security Agent", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                    // { id: 10, label: "Kali-Linux", title: "Attacker Server", code_deploy: YAML.stringify(default_deploy_yaml), code_ingress: YAML.stringify(default_ingress_yaml), code_service: YAML.stringify(default_service_yaml) },
                ],
                edges: [
                    { from: 1, to: 2 },
                    { from: 1, to: 3 },
                    { from: 2, to: 4 },
                    { from: 2, to: 5 }
                ]
            },
        };
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
                    {this.renderMonacoEditor("deploy", this.state.selected.code_deploy)}
                </TabPanel>
            )
        } else if (value === 1) {
            return (
                <TabPanel value={value} index={1}>
                    {this.renderMonacoEditor("ingress", this.state.selected.code_ingress)}
                </TabPanel>
            )
        } else if (value === 2) {
            return (
                <TabPanel value={value} index={2}>
                    {this.renderMonacoEditor("service", this.state.selected.code_service)}
                </TabPanel>
            )
        }
    }

    trackEvents = {
        click: (event) => {
            if (event.nodes[0] !== undefined) {
                console.log("SELECTED NODE:", event.nodes[0])
                this.state.graph.nodes.foreach((v, index) => {
                    if (v.id === event.nodes[0]) {
                        console.log("FOUND MATCH:", v.id, event.nodes[0])
                        this.setState({
                            selected: this.state.graph.nodes[index]
                        })
                    }
                })


            }
        }
    };

    handleMonacoEditorChangeDeploy(newValue) {
        let prevSelected = this.state.selected
        prevSelected.code_deploy = newValue
        console.log(prevSelected)
        this.setState({
            selected: prevSelected
        })
        let prevGraph = this.state.graph
        prevGraph.nodes.foreach((v, index) => {
            if (v.id === prevSelected.id) {
                prevGraph.nodes[index].code_deploy = prevSelected.code_deploy
                this.setState({
                    graph: prevGraph
                })
            }
        })
    }

    handleMonacoEditorChangeIngress(newValue) {
        let prevSelected = this.state.selected
        prevSelected.code_ingress = newValue
        console.log(prevSelected)
        this.setState({
            selected: prevSelected
        })
        let prevGraph = this.state.graph
        prevGraph.nodes.foreach((v, index) => {
            if (v.id === prevSelected.id) {
                prevGraph.nodes[index].code_ingress = prevSelected.code_ingress
                this.setState({
                    graph: prevGraph
                })
            }
        })
    }

    handleMonacoEditorChangeService(newValue) {
        let prevSelected = this.state.selected
        prevSelected.code_service = newValue
        console.log(prevSelected)
        this.setState({
            selected: prevSelected
        })
        let prevGraph = this.state.graph
        prevGraph.nodes.foreach((v, index) => {
            if (v.id === prevSelected.id) {
                prevGraph.nodes[index].code_service = prevSelected.code_service
                this.setState({
                    graph: prevGraph
                })
            }
        })
    }

    renderMonacoEditor(type, code) {
        const options = {
            selectOnLineNumbers: true,
            scrollBeyondLastLine: false
        };
        if (type === "deploy") {
            return (
                <MonacoEditor
                    width="auto"
                    height="700"
                    language="yaml"
                    theme="vs-light"
                    value={code}
                    options={options}
                    onChange={(v) => this.handleMonacoEditorChangeDeploy(v)}
                />
            );
        } else if (type === "ingress") {
            return (
                <MonacoEditor
                    width="auto"
                    height="700"
                    language="yaml"
                    theme="vs-light"
                    value={code}
                    options={options}
                    onChange={(v) => this.handleMonacoEditorChangeIngress(v)}
                />
            );
        } else if (type === "service") {
            return (
                <MonacoEditor
                    width="auto"
                    height="700"
                    language="yaml"
                    theme="vs-light"
                    value={code}
                    options={options}
                    onChange={(v) => this.handleMonacoEditorChangeService(v)}
                />
            );
        }
    }


    createYaml() {
        let yamlData = {
            "yamlData": [
                {"deployment": this.state.selected.code_deploy},
                {"service" : this.state.selected.code_service},
                {"ingress" : this.state.selected.code_ingress}
            ]
        }
        axios.post('http://localhost:5000/api/apps/app/1', yamlData);
        // let yamlDataDeployment = { "yamlDataDeployment": this.state.selected.code_deploy }
        // let yamlDataIngress = { "yamlDataIngress": this.state.selected.code_ingress }
        // let yamlDataService = { "yamlDataService": this.state.selected.code_service }
        // axios.post('http://localhost:5000/api/apps/app/1', yamlDataDeployment);
        // axios.post('http://localhost:5000/api/apps/app/1', yamlDataIngress);
        // axios.post('http://localhost:5000/api/apps/app/1', yamlDataService);
    }

    renderSubmissionQuestions(){
        return <STBFinalFormArrays/>
    }


    render() {
        return (
            <div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64">
                <Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Create Helm Chart App</h1>
                    References:
                    https://helm.sh/docs/developing_charts/
                    Download Chart
                    URL
                    App Name:
                    Type:
                    {this.renderSubmissionQuestions()}

                    <Grid item xs style={{ textTransform: 'none' }}>
                        <Button onClick={() => this.createYaml()} style={{ backgroundColor: '#2196f3', color: "white", textTransform: 'none' }}>Save <SaveIcon fontSize={'small'} style={{ marginLeft: 12 }} /></Button>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
                                <Tab style={{ textTransform: 'none' }} label="deploy.yaml" {...this.a11yProps(0)} />
                                <Tab style={{ textTransform: 'none' }} label="ingress.yaml" {...this.a11yProps(1)} />
                                <Tab style={{ textTransform: 'none' }} label="service.yaml" {...this.a11yProps(2)} />
                            </Tabs>

                        </AppBar>
                        {this.state.loading ?
                            this.renderTab(this.state.value)
                            :
                            <div>loading</div>
                        }
                    </Grid>
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

export default withReducer('auth', reducer)((connect(mapStateToProps)(Create)));
