import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import {
    // withStyles,
    Paper,
    // Grid,
    // Button,
    // TextField
} from '@material-ui/core'; 
import STBReactQuill from '../../../../../../@stb-components/STBReactQuill';
import STBRubrikCategories from '../../../../../../@stb-components/STBRubrikCategories';
// import STBScenarioEditor from '../../../../../../@stb-components/STBScenarioEditor';
import STBSliderIndividualContributerLevel from '../../../../../../@stb-components/STBSliderIndividualContributerLevel'
import STBVisGraph from '../../../../../../@stb-components/STBVisGraph';

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step_overview: '',
            step_grading_criteria: '',
            step_scenario: '',
            step_start: '',
            step_resources: '',
            step_submission: '',
            step_scoring: '',
            grading_criteria_choices: ['']
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
                    <STBReactQuill context={this.state.step_overview} handleChangeContext={(value) => this.handleChangeStepOverview(value)}/>
                    <br/>
                    <h1>Grading Criteria</h1>
                    <STBReactQuill context={this.state.step_grading_criteria} handleChangeContext={(value) => this.handleChangeStepGradingCriteria(value)}/>
                    <br/>
                    <STBSliderIndividualContributerLevel/>
                    <STBRubrikCategories/>
                    <br/>
                    <h1>Scenario</h1>
                    <STBReactQuill context={this.state.step_scenario} handleChangeContext={(value) => this.handleChangeStepScenario(value)}/>
                    <br/>
                    <STBVisGraph/>
                    {/* 
                    <h1>Start</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/>
                    <h1>Resources</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/>
                    <h1>Submission</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/>
                    <h1>Scoring</h1>
                    <STBReactQuill contextValue={this.state.step} onChange={this.handleChangeStep}/> */}

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
