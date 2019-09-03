import React, { Component } from 'react';
// import Graph from 'react-graph-vis';
import options from './STBVisGraph/graphOptions';
import Grid from '@material-ui/core/Grid'
import STBMaterialUiTabs from './STBMaterialUiTabs'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import STBGraph from './STBGraph'


class STBVisGraph extends Component {
    constructor(props) {
        super(props);

        // our state object
        this.state = {
            // graph represents our component
            addNodeLabel: '',
            addNodeTitle: '',
            graph: {},
            events: {},
            loading: false
        };
        this.handleChangeLabel = this.handleChangeLabel.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: true,
            network: {},
            graph: {
                nodes: [
                    { id: 1, label: "Nginx-ModSecurity", title: "Load-Balancer + Web App Firewall" },
                    { id: 2, label: "Vulnerable-App", title: "Juice-Shop Mono Application" },
                    { id: 3, label: "Splunk", title: "SIEM" },
                    { id: 4, label: "Jenkins", title: "CI/CD" },
                    { id: 5, label: "Hashicorp-Vault", title: "Secrets Management/PKI" },
                    { id: 6, label: "Gitlab", title: "Git Repository" },
                    { id: 7, label: "Suricata", title: "IDS/IPS" },
                    { id: 8, label: "Google-GRR", title: "Forensic Acquisition" },
                    { id: 9, label: "Wazuh", title: "Endpoint Security Agent" },
                    { id: 10, label: "Kali-Linux", title: "node 5 tootip text" }
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

    trackEvents = {
        controlNodeDragging: (event) => {
            // console.log("DRAGGING",event)
        },
        controlNodeDragEnd: (event) => {
            if (event.controlEdge) {
                console.log("DRAG END", event.controlEdge)
                if (event.controlEdge["to"] && event.controlEdge["from"]) {
                    var nodesCopy = this.state.graph.nodes.slice()
                    var edgesCopy = this.state.graph.edges.slice()
                    edgesCopy.push(event.controlEdge)
                    
                    this.setState({ graph: { nodes: nodesCopy, edges: edgesCopy } });
                    console.log(this.state.graph)
                }

            }

        },
        select: (event) => {
            var { edges } = event;
            // // console.log("EVENT:", event)
            let prevGraph = this.state.graph
            console.log("select:",event)
            console.log("this graph",this.state.graph)
            prevGraph.edges.map((v, i) => {
               
                if (v.id === edges[0]) {
                    console.log("FOUND",edges[0])
                    var nodesCopy = prevGraph.nodes.slice()
                    var edgesCopy = prevGraph.edges.slice()
                    edgesCopy.pop(i)
                    this.setState({ graph: { nodes: nodesCopy, edges: edgesCopy } });
                    console.log("New Graph:", this.state.graph)
                }
            })
        }
    };

    addNode(nodeLabel, nodeTitle) {

        let prevGraph = this.state.graph
        let graphLength = prevGraph.nodes.length
        console.log(prevGraph.nodes, graphLength)
        var nodesCopy = this.state.graph.nodes.slice()
        var edgesCopy = this.state.graph.edges.slice()
        nodesCopy.push({
            id: graphLength + 1,
            label: nodeLabel,
            title: nodeTitle,
        });
        this.setState({ graph: { nodes: nodesCopy, edges: edgesCopy } });

        // this.setState({
        //     graph: prevGraph
        // })
    }

    handleChangeLabel = name => event => {
        this.setState({
            addNodeLabel: event.target.value
        })
    }

    handleChangeTitle = name => event => {
        this.setState({
            addNodeTitle: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Grid container style={{ flexGrow: 1, margin: "0 auto", width: '100%' }} >
                    <Grid item xs style={{ textTransform: 'none', width: '100%' }}>
                        <TextField
                            label="Label"
                            value={this.state.addNodeLabel}
                            onChange={this.handleChangeLabel()}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            label="Title"
                            value={this.state.addNodeTitle}
                            onChange={this.handleChangeTitle()}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={() => this.addNode(this.state.addNodeLabel, this.state.addNodeTitle)}>Add Node</Button>
                        {this.state.loading ?
                            <STBGraph graph={this.state.graph} events={this.trackEvents} getNetwork={network => {
                                this.setState({ network: network })
                            }} />
                            :
                            <div>loading</div>
                        }
                    </Grid>
                    <Grid item xs style={{ textTransform: 'none', width: '100%' }}>
                        <STBMaterialUiTabs />
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default STBVisGraph;