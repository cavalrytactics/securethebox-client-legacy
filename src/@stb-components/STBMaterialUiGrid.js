import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import STBRubrik from './STBRubrik';

class STBMaterialUiGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gilad: true,
            jason: false,
            antoine: false,
            rubrik: {},
            categories: [
                {
                    'title'    : 'Networking',
                    'topics'   : [0,1,2]
                },
                {
                    'title'    : 'Email',
                    'topics'   : [0,1,2]
                },
                {
                    'title'    : 'Operating Systems',
                    'topics'   : []
                },
                {
                    'title'    : 'Web Applications',
                    'topics'   : []
                },
                {
                    'title'    : 'Public Key Infrastructure',
                    'topics'   : []
                },
                {
                    'title'    : 'Forensics',
                    'topics'   : []
                },
                {
                    'title'    : 'Incident Response',
                    'topics'   : []
                }
            ],
            difficulty: [
                {
                    'id'    : 0,
                    'handle': 'easy',
                    'title' : 'Easy',
                },
                {
                    'id'    : 1,
                    'handle': 'medium',
                    'title' : 'Medium',
                },
                {
                    'id'    : 2,
                    'handle': 'hard',
                    'title' : 'Hard',
                },
            ],
            labels: [
                {
                    'id'    : 0,
                    'handle': 'application_security',
                    'title' : 'Application Security',
                    'topics': []
                },
                {
                    'id'    : 1,
                    'handle': 'operating_systems',
                    'title' : 'Operating Systems',
                    'topics': []
                },
                {
                    'id'    : 2,
                    'handle': 'networking',
                    'title' : 'Networking',
                    'topics': []
                },
            ],
            topics: [
                {
                    'id'    : 0,
                    'handle': 'network_protocols',
                    'title' : 'Network protocols',
                    'checked' : false,
                },
                {
                    'id'    : 1,
                    'handle': 'network_firewalls',
                    'title' : 'Network firewalls',
                    'checked' : false,
                },
                {
                    'id'    : 2,
                    'handle': 'init_system',
                    'title' : 'Init System',
                    'checked' : false,
                },
            ]
        };
    }

    componentDidMount() {
        this.setState({
            rubrik: STBRubrik
        },() => {
            console.log(this.state.rubrik)
        })
    
    }

    renderItems(){
        return (this.state.items.map((item, index) => {
            return (
                <Grid item xs={12} key={index}>
                </Grid>
             )
            })
        )
    }

    handleChange = topicIndex => event => {
        let prevTopics = this.state.topics
        console.log(prevTopics)
        prevTopics[topicIndex].checked = !prevTopics[topicIndex].checked
        this.setState({ topics: prevTopics });
      }

    renderGrid(){
        return (
            this.state.categories.map((item,index) => {
                return (this.renderCategory(item,index))         
            })
        )
        
    }

    renderCategory(item,index){
        return(
            <Grid key={index} item xs style={{ textTransform: 'none', width: '100%' }}>
              <Grid container style={{ flexGrow: 1, margin: "0 auto", width: '100%' }} >
                <FormControl component="fieldset">
                    <FormLabel component="legend">{item.title}</FormLabel>
                        <FormGroup>
                            {/* Render CheckBox Items */}
                            {this.renderCheckBoxItems(item.topics)}
                        </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
        )
    }

    renderCheckBoxItems(topics){
        console.log("TOPICS:",topics)
        return (topics.map((t, index) => {
            return(
                <FormControlLabel
                    key={index}
                    control={<Checkbox checked={this.state.topics[index].checked} onChange={this.handleChange(index)} value={this.state.topics[index].title} />}
                    label={this.state.topics[index].title}
                />
        )
            })
        )
    }

    render() {
        return (
            <Grid item xs style={{ textTransform: 'none', width: '100%' }}>
              <Grid container style={{ flexGrow: 1, margin: "0 auto", width: '100%' }} >
                {this.renderGrid()}
              </Grid>
            </Grid>
        )
    };
}

export default STBMaterialUiGrid;
