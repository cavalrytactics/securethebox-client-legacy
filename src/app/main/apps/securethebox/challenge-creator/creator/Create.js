import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import {
    // withStyles,
    Paper,
    // Grid,
    Button,
    // TextField
} from '@material-ui/core';
import STBReactQuill from '../../../../../../@stb-components/STBReactQuill/STBReactQuill';
import STBRubrikCategories from '../../../../../../@stb-components/STBRubrikCategories';
// import STBScenarioEditor from '../../../../../../@stb-components/STBScenarioEditor';
import STBSliderIndividualContributerLevel from '../../../../../../@stb-components/STBSliderIndividualContributerLevel'
// import STBVisGraph from '../../../../../../@stb-components/STBVisGraph';
import STBAppSelect from '../../../../../../@stb-components/STBAppSelect/STBAppSelect';
import axios from 'axios'

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            step_overview: 'Write a high-level overview about this challenge at the perspective of the company/interview process',
            step_grading_criteria: 'Write details of the job expectations and requirements.<br/></br> Use the Target Individual Contributer Level measurements',
            step_scenario: 'Write details of the simulated scenario',
            step_ic_level: 0,
            step_blueTeam_level: 0,
            step_blueTeam_categories: [],
            step_redTeam_level: 0,
            step_redTeam_categories: [],
            step_securityEngineering_level: 0,
            step_securityEngineering_categories: [],
            step_softwareEngineering_level: 0,
            step_softwareEngineering_categories: [],
            step_systemsEngineering_level: 0,
            step_systemsEngineering_categories: [],
            step_start: '',
            step_resources: '',
            step_submission: '',
            step_scoring: '',
            grading_criteria_choices: [''],
            appList: [
                { 'id': 0, 'name': 'nginx', 'selected': false },
                { 'id': 1, 'name': 'haproxy', 'selected': false }
            ],
            challenge_payload: {}
        };
        this.handleChangeStepOverview = this.handleChangeStepOverview.bind(this);
        this.handleChangeStepGradingCriteria = this.handleChangeStepGradingCriteria.bind(this);
        this.handleChangeStepScenario = this.handleChangeStepScenario.bind(this);
        this.handleChangeStepStart = this.handleChangeStepStart.bind(this);
        this.handleChangeStepResources = this.handleChangeStepResources.bind(this);
        this.handleChangeStepSubmission = this.handleChangeStepSubmission.bind(this);
        this.handleChangeStepScoring = this.handleChangeStepScoring.bind(this);
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        // Get Application List
        axios.get('/api/applications')
            .then((r) => {
                var listApps = new Array()
                r.data.map((v, i) => {
                    listApps.push({ 'id': i, 'name': v, 'selected': false })
                })
                this.setState({
                    appList: listApps
                })
            })
    }

    submitChallengePayload() {
        let payload = {
            'challenge': {
                'overview': this.state.step_overview,
                'grading_criteria': this.state.step_grading_criteria,
                'ic_level': this.state.step_ic_level,
                'blueTeam_level': this.state.step_blueTeam_level,
                'blueTeam_categories': this.state.step_blueTeam_categories,
                'redTeam_level': this.state.step_redTeam_level,
                'redTeam_categories': this.state.step_redTeam_categories,
                'securityEngineering_level': this.state.step_securityEngineering_level,
                'securityEngineering_categories': this.state.step_securityEngineering_categories,
                'softwareEngineering_level': this.state.step_softwareEngineering_level,
                'softwareEngineering_categories': this.state.step_softwareEngineering_level,
                'systemsEngineering_level': this.state.step_systemsEngineering_level,
                'systemsEngineering_categories': this.state.step_systemsEngineering_categories,
                'scenario': this.state.step_scenario
            }
        }
        axios.post('/api/challenges', payload)
            .then((r) => {
                console.log(r)
            })
    }

    handleChangeStepOverview = (value) => {
        this.setState({
            step_overview: value
        });
    };

    handleChangeStepGradingCriteria = (value) => {
        this.setState({
            step_grading_criteria: value
        });
    };

    handleChangeStepScenario = (value) => {
        this.setState({
            step_scenario: value
        });
    };

    handleChangeStepStart = (value) => {
        this.setState({
            step_start: value
        });
    };

    handleChangeStepResources = (value) => {
        this.setState({
            step_resources: value
        });
    };

    handleChangeStepSubmission = (value) => {
        this.setState({
            step_submission: value
        });
    };

    handleChangeStepScoring = (value) => {
        this.setState({
            step_scoring: value
        });
    };

    render() {
        return (
            <div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64">
                <Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
                    <h1>Overview</h1>
                    <STBReactQuill context={this.state.step_overview} handleChangeContext={(value) => this.handleChangeStepOverview(value)} />
                    <br />
                    <h1>Grading Criteria</h1>
                    <STBReactQuill context={this.state.step_grading_criteria} handleChangeContext={(value) => this.handleChangeStepGradingCriteria(value)} />
                    <br />
                    <STBSliderIndividualContributerLevel />
                    <STBRubrikCategories />
                    <br />
                    <h1>Scenario</h1>
                    <STBReactQuill context={this.state.step_scenario} handleChangeContext={(value) => this.handleChangeStepScenario(value)} />
                    <br />
                    {this.state.loading ?
                        <STBAppSelect appList={this.state.appList} listTitle="Load Balancer" />
                        :
                        <p>loading</p>
                    }
                    <br />
                    {/* <STBVisGraph/> */}
                    {/* 
                    <h1>Start</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/>
                    <h1>Resources</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/>
                    <h1>Submission</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/>
                    <h1>Scoring</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/> */}
                    <Button onClick={() => this.submitChallengePayload()}>Submit</Button>
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
