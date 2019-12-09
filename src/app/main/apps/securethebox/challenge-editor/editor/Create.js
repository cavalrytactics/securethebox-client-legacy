import React, { Component } from 'react';
import withReducer from 'app/store/withReducer';
import connect from 'react-redux/es/connect/connect';
import reducer from '../../../../../auth/store/reducers';
import {
    Paper,
    // Grid,
    Button,
    TextField
} from '@material-ui/core';
import STBReactQuill from '../../../../../../@stb-components/STBReactQuill/STBReactQuill';
// import STBRubrikCategories from '../../../../../../@stb-components/STBRubrikCategories';
// import STBScenarioEditor from '../../../../../../@stb-components/STBScenarioEditor';
// import STBSliderIndividualContributorLevel from '../../../../../../@stb-components/STBSliderIndividualContributorLevel'
// import STBVisGraph from '../../../../../../@stb-components/STBVisGraph';
import STBAppSelect from '../../../../../../@stb-components/STBAppSelect/STBAppSelect';
import axios from 'axios'

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            course_payload: {},
            course_id: "2",
            course_title: "title-2",
            course_slug: "slug",
            course_description: "description",
            course_category: "web",
            course_length: 120,
            course_totalSteps: 7,
            course_activeStep: 0,
            course_steps: [],
            step_overview: 'Write a high-level overview about this challenge at the perspective of the company/interview process',
            step_grading_criteria: 'Write details of the job expectations and requirements.<br/></br> Use the Target Individual Contributor Level measurements',
            step_scenario: 'Write details of the simulated scenario',
            step_start: '<ul><li>When you are ready, click the "Start Challenge" button to begin.</li><li>You challenge environment will take 2 minutes to deploy.</li><li>When the environment is ready, a timer will start a 2 hour countdown.</li><li>The next page "Scope & Resources" will contain all the information you need for this challenge.</li><li>After your time is over, or you complete the challenge, the environment will be analyzed and destroyed.</li><li>If you\'re stuck, review the "Scope & Resources" page for tips.</li><li>If you would like to end the challenge and destroy the environment, click on "End Challenge" button.</li></ul>',
            step_resources: 'Expand the row for details containing Credentials and Tips of each resource.<br/><br/>Click on URL button to view Resource.',
            step_submission: 'List of CTF questions the candidate will answer',
            step_scoring: '<h3>Health of your services</h3></br>Using Zipkin and Wavefront',
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
            grading_criteria_choices: [''],
            appList: [],
            challenge_payload: {}
        };
        this.handleChangeCourseId = this.handleChangeCourseId.bind(this)
        this.handleChangeCourseTitle = this.handleChangeCourseTitle.bind(this)
        this.handleChangeCourseDescription = this.handleChangeCourseDescription.bind(this)
        this.handleChangeCourseLength = this.handleChangeCourseLength.bind(this)
        
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
            loading: true,
            course_slug: this.state.course_title+"-slug"
        })
        // Get Application List
        axios.get('/api/applications')
            .then((r) => {
                var listApps = []
                r.data.map((v, i) => (
                    listApps.push({ 'id': i, 'name': v, 'selected': false })
                ))
                this.setState({
                    appList: listApps
                })
            })
    }

    submitChallengePayload() {
        // let payload = {
        //     'challenge': {
        //         'ic_level': this.state.step_ic_level,
        //         'blueTeam_level': this.state.step_blueTeam_level,
        //         'blueTeam_categories': this.state.step_blueTeam_categories,
        //         'redTeam_level': this.state.step_redTeam_level,
        //         'redTeam_categories': this.state.step_redTeam_categories,
        //         'securityEngineering_level': this.state.step_securityEngineering_level,
        //         'securityEngineering_categories': this.state.step_securityEngineering_categories,
        //         'softwareEngineering_level': this.state.step_softwareEngineering_level,
        //         'softwareEngineering_categories': this.state.step_softwareEngineering_level,
        //         'systemsEngineering_level': this.state.step_systemsEngineering_level,
        //         'systemsEngineering_categories': this.state.step_systemsEngineering_categories,sdf
        //     }
        // }
        this.createPayloadChallenge()
        axios.post('/api/challenges', this.state.course_payload)
            .then((r) => {
                console.log(r)
            })
    }

    createPayloadChallenge() {
        let prevCourse = {}
        prevCourse["id"] = this.state.course_id
        prevCourse['title'] = this.state.course_title
        prevCourse['slug'] = this.state.course_slug
        prevCourse['description'] = this.state.course_description
        prevCourse['category'] = this.state.course_category
        prevCourse['length'] = this.state.course_length
        prevCourse['totalSteps'] = this.state.course_totalSteps
        prevCourse['activeStep'] = this.state.course_activeStep
        let steps = []
        let step1_overview = this.payloadStep(0, 'Overview', this.state.step_overview)
        let step2_grading_criteria = this.payloadStep(1, 'Grading Criteria', this.state.step_grading_criteria)
        let step3_scenario = this.payloadStep(2, 'Scenario', this.state.step_scenario)
        let step4_start = this.payloadStep(3, 'Start Challenge', this.state.step_start)
        let step5_resources = this.payloadStep(4, 'Resources', this.state.step_resources)
        let step6_submission = this.payloadStep(5, 'Submission', this.state.step_resources)
        let step7_scoring = this.payloadStep(6, 'Scoring', this.state.step_scoring)
        steps.push(step1_overview)
        steps.push(step2_grading_criteria)
        steps.push(step3_scenario)
        steps.push(step4_start)
        steps.push(step5_resources)
        steps.push(step6_submission)
        steps.push(step7_scoring)
        prevCourse['steps'] = steps
        this.setState({
            course_payload: { 'challenge': prevCourse }
        }, () => {
            console.log(this.state.course_payload)
        })
    }

    createPayloadAllSteps() {
        let steps = []
        let step1_overview = this.payloadStep(0, 'Overview', this.state.step_overview)
        let step2_grading_criteria = this.payloadStep(1, 'Grading Criteria', this.state.step_grading_criteria)
        let step3_scenario = this.payloadStep(2, 'Scenario', this.state.step_scenario)
        let step4_start = this.payloadStep(3, 'Start Challenge', this.state.step_start)
        let step5_resources = this.payloadStep(4, 'Resources', this.state.step_resources)
        let step6_submission = this.payloadStep(5, 'Submission', this.state.step_resources)
        let step7_scoring = this.payloadStep(6, 'Scoring', this.state.step_scoring)
        steps.push(step1_overview)
        steps.push(step2_grading_criteria)
        steps.push(step3_scenario)
        steps.push(step4_start)
        steps.push(step5_resources)
        steps.push(step6_submission)
        steps.push(step7_scoring)
        this.setState({
            course_steps: steps
        })
        return steps

    }

    payloadStep(stepId, stepTitle, stepContent) {
        let payload = {
            id: stepId,
            title: stepTitle,
            content: stepContent
        }
        return payload
    }

    handleChangeCourseId = (event) => {
        this.setState({
            course_id: event.target.value
        });
    };
    handleChangeCourseTitle = (event) => {
        this.setState({
            course_title: event.target.value,
            course_slug: event.target.value+"-slug"
        });
    };
    handleChangeCourseDescription = (event) => {
        this.setState({
            course_description: event.target.value
        });
    };
    handleChangeCourseLength = (event) => {
        this.setState({
            course_length: event.target.value
        });
    };
    

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
                    <h1>Course Creator</h1>
                    <TextField
                        id="standard-name"
                        label="Course Id"
                        value={this.state.course_id}
                        onChange={this.handleChangeCourseId}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Course Title"
                        value={this.state.course_title}
                        onChange={this.handleChangeCourseTitle}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Course Description"
                        value={this.state.course_description}
                        onChange={this.handleChangeCourseDescription}
                        margin="normal"
                    />
                    <TextField
                        id="standard-name"
                        label="Course Slug"
                        value={this.state.course_slug}
                        margin="normal"
                        disabled
                    />
                    <TextField
                        id="standard-name"
                        label="Course Length"
                        value={this.state.course_length}
                        onChange={this.handleChangeCourseLength}
                        margin="normal"
                    />
                    <h2>Overview</h2>
                    <STBReactQuill context={this.state.step_overview} handleChangeContext={(value) => this.handleChangeStepOverview(value)} />
                    <br />
                    <h2>Grading Criteria</h2>
                    <STBReactQuill context={this.state.step_grading_criteria} handleChangeContext={(value) => this.handleChangeStepGradingCriteria(value)} />
                    {/* <br />
                    <STBSliderIndividualContributorLevel />
                    <STBRubrikCategories /> */}
                    <br />
                    <h2>Scenario</h2>
                    <STBReactQuill context={this.state.step_scenario} handleChangeContext={(value) => this.handleChangeStepScenario(value)} />
                    <br />
                    {this.state.loading ?
                        <STBAppSelect appList={this.state.appList} listTitle="Load Balancer" />
                        :
                        <p>loading</p>
                    }
                    <br />
                    <h2>Start</h2>
                    <STBReactQuill context={this.state.step_start} handleChangeContext={(value) => this.handleChangeStepStart(value)}/>
                    <h2>Resources</h2>
                    <div>Show resources when selecting app</div>
                    <h2>Submission</h2>
                    <STBReactQuill context={this.state.step_submission} handleChangeContext={(value) => this.handleChangeStepSubmission(value)}/>
                    <h2>Scoring</h2>
                    <STBReactQuill context={this.state.step_scoring} handleChangeContext={(value) => this.handleChangeStepScoring(value)}/>
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
