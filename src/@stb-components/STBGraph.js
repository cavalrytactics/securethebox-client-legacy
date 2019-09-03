import React, { Component } from "react";
import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import vis from "visjs-network";
import uuid from "uuid";
import PropTypes from "prop-types";

class STBGraph extends Component {
  constructor(props) {
    super(props);
    const { identifier } = props;
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      identifier: identifier !== undefined ? identifier : uuid.v4(),
      network: {}
    };
  }

  componentDidMount() {
    this.edges = new vis.DataSet();
    this.edges.add(this.props.graph.edges);
    this.nodes = new vis.DataSet();
    this.nodes.add(this.props.graph.nodes);
    this.updateGraph();
  }

  shouldComponentUpdate(nextProps, nextState) {
    let nodesChange = !isEqual(this.props.graph.nodes, nextProps.graph.nodes);
    let edgesChange = !isEqual(this.props.graph.edges, nextProps.graph.edges);
    let optionsChange = !isEqual(this.props.options, nextProps.options);
    let eventsChange = !isEqual(this.props.events, nextProps.events);

    if (nodesChange) {
      const idIsEqual = (n1, n2) => n1.id === n2.id;
      const nodesRemoved = differenceWith(this.props.graph.nodes, nextProps.graph.nodes, idIsEqual);
      const nodesAdded = differenceWith(nextProps.graph.nodes, this.props.graph.nodes, idIsEqual);
      const nodesChanged = differenceWith(
        differenceWith(nextProps.graph.nodes, this.props.graph.nodes, isEqual),
        nodesAdded
      );
      this.patchNodes({ nodesRemoved, nodesAdded, nodesChanged });
    }

    if (edgesChange) {
      const edgesRemoved = differenceWith(this.props.graph.edges, nextProps.graph.edges, isEqual);
      const edgesAdded = differenceWith(nextProps.graph.edges, this.props.graph.edges, isEqual);
      const edgesChanged = differenceWith(
        differenceWith(nextProps.graph.edges, this.props.graph.edges, isEqual),
        edgesAdded
      );
      this.patchEdges({ edgesRemoved, edgesAdded, edgesChanged });
    }

    if (optionsChange) {
      this.Network.setOptions(nextProps.options);
    }

    if (eventsChange) {
      let events = this.props.events || {};
      for (let eventName of Object.keys(events)) this.Network.off(eventName, events[eventName]);

      events = nextProps.events || {};
      for (let eventName of Object.keys(events)) this.Network.on(eventName, events[eventName]);
    }

    return false;
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  patchEdges({ edgesRemoved, edgesAdded, edgesChanged }) {
    this.edges.remove(edgesRemoved);
    this.edges.add(edgesAdded);
    this.edges.update(edgesChanged);
  }

  patchNodes({ nodesRemoved, nodesAdded, nodesChanged }) {
    this.nodes.remove(nodesRemoved);
    this.nodes.add(nodesAdded);
    this.nodes.update(nodesChanged);
  }

  updateGraph() {
    let container = document.getElementById(this.state.identifier);

    let defaultOptions = {
      manipulation: {
        enabled: false,
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          console.log('add', data);
        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          console.log('edit', data);
        },
        addEdge: function (data, callback) {
          console.log('add edge', data);
          if (data.from === data.to) {
            var r = console.log("Do you want to connect the node to itself?");
            if (r === true) {
              callback(data);
            }
          }
          else {
            callback(data);
          }
          // after each adding you will be back to addEdge mode 

          setTimeout(function () { somenet.addEdgeMode(); }, 0);
        }
      },
      autoResize: true,
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 100,
          nodeSpacing: 150,
          treeSpacing: 100,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: 'UD',        // UD, DU, LR, RL
          sortMethod: 'directed'   // hubsize, directed
        }
      },
      interaction: {
        dragNodes: false,
        dragView: false,
        hover: false,
        zoomView: false,
        navigationButtons: false,
        keyboard: {
          enabled: false,
          speed: {
            x: 10,
            y: 10,
            zoom: 0.01,
          },
          bindToWindow: true,
        },
      },
      physics: {
        enabled: true,
        repulsion: {
          nodeDistance: 100,
        },
        hierarchicalRepulsion: {
          centralGravity: 0.0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 100,
          damping: 0.09
        },
      },
      edges: {
        "arrows": {
          "to": {
            "enabled": true
          }
        },
        color: "#000000",
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0.8
        },
      },
      width: '100%',
      height: '500px',
      nodes: {
        
        shape: "dot",
        fixed: {
          y: true,
          x: true
        },
        font: {
          face: 'Roboto',
        },
        chosen: true,
        borderWidth: 1,
        borderWidthSelected:3,
        color: {
          border: 'black',
          background: '#97C2FC',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
          hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
        },
      },
    };

    // merge user provied options with our default ones
    // let options = defaultsDeep(defaultOptions, this.props.options);
    let options = defaultOptions;
    let somenet = new vis.Network(
      container,
      Object.assign({}, this.props.graph, {
        edges: this.edges,
        nodes: this.nodes
      }),
      options
    );

    somenet.addEdgeMode();



    if (this.props.getNetwork) {
      this.props.getNetwork(somenet);
    }

    if (this.props.addEdgeMode) {
      somenet.addEdgeMode();
    }

    if (this.props.getNodes) {
      this.props.getNodes(this.nodes);
    }

    if (this.props.getEdges) {
      this.props.getEdges(this.edges);
    }

    // Add user provied events to network
    let events = this.props.events || {};
    for (let eventName of Object.keys(events)) {
      somenet.on(eventName, events[eventName]);
    }
  }

  render() {
    const { identifier } = this.state;
    const { style } = this.props;
    return React.createElement(
      "div",
      {
        id: identifier,
        style
      },
      identifier
    );
  }
}

STBGraph.defaultProps = {
  graph: {},
  style: { width: "100%", height: "100%" }
};
STBGraph.propTypes = {
  graph: PropTypes.object,
  style: PropTypes.object,
  addEdgeMode: PropTypes.func,
  getNetwork: PropTypes.func,
  getNodes: PropTypes.func,
  getEdges: PropTypes.func,
};

export default STBGraph;