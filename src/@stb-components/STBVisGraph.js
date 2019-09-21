import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import STBGraph from './STBGraph';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import { selectNode } from './STBVisGraph/store/actions/nodes.actions'
import reducer from './STBVisGraph/store/reducers';
import default_deploy_yaml from './STBHelmChart/templates/deployment.yaml';
import default_ingress_yaml from './STBHelmChart/templates/ingress.yaml';
import default_service_yaml from './STBHelmChart/templates/service.yaml';
import YAML from 'yaml'
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MonacoEditor from 'react-monaco-editor';
import uuid from "uuid";
// import STBAppSelect from './STBAppSelect/STBAppSelect'

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

class STBVisGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {},
            events: {},
            loading: false,
            value: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        this.setState({
            loading: true,
            selected: {},
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
                this.state.graph.nodes.foreach( (v,index) => {
                    if (v.id === event.nodes[0]){
                        console.log("FOUND MATCH:",v.id,event.nodes[0])
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



    render() {
        return (
            <div>
                <Grid container style={{ flexGrow: 1, margin: "0 auto", width: '100%' }} >
                    {/* <Grid item xs={6} style={{ textTransform: 'none'}}>
                        <STBAppSelect/>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
                                <Tab style={{ textTransform: 'none'}} label="deploy.yaml" {...this.a11yProps(0)} />
                                <Tab style={{ textTransform: 'none'}} label="ingress.yaml" {...this.a11yProps(1)} />
                                <Tab style={{ textTransform: 'none'}} label="service.yaml" {...this.a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        {this.state.loading ?
                            this.renderTab(this.state.value)
                            :
                            <div>loading</div>
                        }
                    </Grid> */}
                    <Grid item xs style={{ textTransform: 'none', width: '100%' }}>
                        {this.state.loading ?
                            <STBGraph graph={this.state.graph} events={this.trackEvents} getNetwork={network => {
                                this.setState({ network: network })
                            }} />
                            :
                            <div>loading</div>
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({ nodes }) {
    return {
        nodes
    }
}

export default withReducer("nodes", reducer)(connect(mapStateToProps, {
    selectNode
})(STBVisGraph));
