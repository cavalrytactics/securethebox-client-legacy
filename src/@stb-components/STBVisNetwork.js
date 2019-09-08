import React, { Component } from "react";
// import defaultsDeep from "lodash/fp/defaultsDeep";
import isEqual from "lodash/isEqual";
import differenceWith from "lodash/differenceWith";
import vis from "vis-network";
// import uuid from "uuid";
import PropTypes from "prop-types";
import "./STBVisGraph/vis-network.min.css";

class STBVisNetwork extends Component {
  constructor(props) {
    super(props);
    // const { identifier } = props;
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      // identifier: identifier !== undefined ? identifier : uuid.v4(),
      identifier: "mynetwork",
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
    let container = document.getElementById("mynetwork");

    let defaultOptions = {
      manipulation: {
        enabled: true
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
        hover: true,
        zoomView: false,
        navigationButtons: true,
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

    // somenet.addEdgeMode();
    somenet.on('click', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>Click event:</h2>' + JSON.stringify(params, null, 4)
      console.log(
        'click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM)
      )
    })
    somenet.on('doubleClick', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>doubleClick event:</h2>' + JSON.stringify(params, null, 4)
    })
    somenet.on('oncontext', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>oncontext (right click) event:</h2>' + JSON.stringify(params, null, 4)
    })
    somenet.on('dragStart', function(params) {
      // There's no point in displaying this event on screen, it gets immediately overwritten
      params.event = '[original event]'
      console.log('dragStart Event:', params)
      console.log(
        'dragStart event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM)
      )
    })
    somenet.on('dragging', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>dragging event:</h2>' + JSON.stringify(params, null, 4)
    })
    somenet.on('dragEnd', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>dragEnd event:</h2>' + JSON.stringify(params, null, 4)
      console.log('dragEnd Event:', params)
      console.log(
        'dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM)
      )
    })
    somenet.on('controlNodeDragging', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>control node dragging event:</h2>' + JSON.stringify(params, null, 4)
    })
    somenet.on('controlNodeDragEnd', function(params) {
      params.event = '[original event]'
      document.getElementById('eventSpan').innerHTML =
        '<h2>control node drag end event:</h2>' + JSON.stringify(params, null, 4)
      console.log('controlNodeDragEnd Event:', params)
    })
    somenet.on('zoom', function(params) {
      document.getElementById('eventSpan').innerHTML =
        '<h2>zoom event:</h2>' + JSON.stringify(params, null, 4)
    })
    somenet.on('showPopup', function(params) {
      document.getElementById('eventSpan').innerHTML =
        '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4)
    })
    somenet.on('hidePopup', function() {
      console.log('hidePopup Event')
    })
    somenet.on('select', function(params) {
      console.log('select Event:', params)
    })
    somenet.on('selectNode', function(params) {
      console.log('selectNode Event:', params)
    })
    somenet.on('selectEdge', function(params) {
      console.log('selectEdge Event:', params)
    })
    somenet.on('deselectNode', function(params) {
      console.log('deselectNode Event:', params)
    })
    somenet.on('deselectEdge', function(params) {
      console.log('deselectEdge Event:', params)
    })
    somenet.on('hoverNode', function(params) {
      console.log('hoverNode Event:', params)
    })
    somenet.on('hoverEdge', function(params) {
      console.log('hoverEdge Event:', params)
    })
    somenet.on('blurNode', function(params) {
      console.log('blurNode Event:', params)
    })
    somenet.on('blurEdge', function(params) {
      console.log('blurEdge Event:', params)
    })
    

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

  renderGraph(){
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
  renderToolbar(){
    return React.createElement(
      "pre",
      {
        id: "eventSpan"
      },
    );
  }

  render() {
    return(
      <div>
        {this.renderGraph()}
        {this.renderToolbar()}
      </div>
    )
  }
}

STBVisNetwork.defaultProps = {
  graph: {},
  style: { width: "100%", height: "100%" }
};
STBVisNetwork.propTypes = {
  graph: PropTypes.object,
  style: PropTypes.object,
  addEdgeMode: PropTypes.func,
  getNetwork: PropTypes.func,
  getNodes: PropTypes.func,
  getEdges: PropTypes.func,
};

export default STBVisNetwork;