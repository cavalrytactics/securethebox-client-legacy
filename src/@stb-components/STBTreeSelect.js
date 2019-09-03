import React, { Component } from 'react';
import DropdownTreeSelect from "react-dropdown-tree-select";
import "./STBTreeSelect/index.css";
import 'react-dropdown-tree-select/dist/styles.css'

class STBTreeSelect extends Component {

    constructor(props) {
        super(props);
        this.state = { data: this.prepareData(props.data) };
    }

    onChange = (currentNode, selectedNodes) => {
        console.log("path::", currentNode.path);
    };

    prepareData = data => {
      // optional: you can skip cloning if you don't mind mutating original data
      var cloned = data.slice(0);
  
      // insert special select all node
      cloned.splice(0, 0, {
        label: "Select All",
        value: "selectAll",
        className: "select-all"
      });
  
      return cloned;
    };

    toggleAll = checked => {
      const { data } = this.state;
      for (var i = 1; i < data.length; i++) {
        data[i].checked = checked;
      }
      this.setState({ data });
    };

    handleChange = ({ value, checked }) => {
      if (value === "selectAll") this.toggleAll(checked);
    };
  
      
    assignObjectPaths = (obj, stack) => {
        Object.keys(obj).forEach(k => {
          const node = obj[k];
          if (typeof node === "object") {
            node.path = stack ? `${stack}.${k}` : k;
            this.assignObjectPaths(node, node.path);
          }
        });
      };

    render(){
        this.assignObjectPaths(this.props.data);
        return(
          <div style={{width:'90%', marginLeft:'auto',marginRight:'auto'}}>
            <DropdownTreeSelect data={this.props.data} onChange={this.onChange} className="mdl-demo" keepTreeOnSearch={true} />
            
          </div>
        )
    }
}


export default STBTreeSelect;