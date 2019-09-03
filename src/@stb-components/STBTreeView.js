// import React, { Component } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import TreeView from '@material-ui/lab/TreeView';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import TreeItem from '@material-ui/lab/TreeItem';

// class STBTreeView extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             nodeCounter: 2,
//         };
//     }

//     renderParent(object){
//         return (
//             <TreeItem key={object.cn} nodeId="1" label={object.name}>
//                 {this.renderChildren(object.children,5)}
//             </TreeItem>
//         )      
//     }

//     // 
//     renderChildren(object,sum){
//         if (object != undefined){
//             return (
//                 Object.keys(object).map((e, i) => {
//                     return (
//                         <TreeItem key={object[e].cn} nodeId={object[e].cn} label={object[e].name}>
//                             {this.renderChildren(object[e].children)}
//                         </TreeItem>
//                     )
//                 })
//             )
//         } else {
//             return null
//         }  
//     }

//     render(){
//         return (
//             <TreeView
//               defaultCollapseIcon={<ExpandMoreIcon />}
//               defaultExpandIcon={<ChevronRightIcon />}
//             >
//               {this.renderParent(this.props.someChildren)}
//             </TreeView>
//           );
//     }
// }

// export default STBTreeView;

