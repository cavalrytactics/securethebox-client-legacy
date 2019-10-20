import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import {
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@material-ui/core';
import CourseFields from './CourseFields'
import CourseFieldsJson from './CourseFields.json'

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      pageLabels: ['Overview', 'Grading Criteria', 'Scenario', 'Start Challenge', 'Resources', 'Submission', 'Scoring'],
      course_fields: CourseFieldsJson,
      values: props.initialValues || {}
    }
  }
  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  selectPage(pageNumber) {
    this.setState({
      page: pageNumber
    })
  }


  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values, form, pristine }) => (
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-start" spacing={2}>
              <CourseFields course_fields={this.state.course_fields} />
            </Grid>
            <Stepper activeStep={this.state.page} orientation="vertical">
              {this.state.pageLabels.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel onClick={() => this.selectPage(index)}><h1 style={{color:"#2196f3"}}>{label}</h1></StepLabel>
                    <StepContent transitionDuration={0} >
                      {activePage}
                      <div className="buttons">
                        {page > 0 && (
                          <Button style={{margin: 10, backgroundColor:'#e0e0e0'}} onClick={this.previous}>
                            Back
                          </Button>
                        )}
                        {!isLastPage && pristine && <Button style={{margin: 10, backgroundColor:'#e0e0e0'}} disabled={pristine} type="submit">Next</Button>}
                        {!isLastPage && !pristine && <Button style={{margin: 10, backgroundColor:'#2196f3', color:'white'}} disabled={submitting} type="submit">Next</Button>}
                        {isLastPage && (
                          <Button style={{margin: 10, backgroundColor:'#2196f3', color:'white'}} type="submit" disabled={submitting}>
                            Submit Form
                          </Button>
                        )}
                      </div>
                    </StepContent>
                  </Step>
                )
              })}
            </Stepper>
            <Button
              type="button"
              onClick={form.reset}
              disabled={submitting}
              style={{margin: 10, backgroundColor:'#f44336', color:'white'}}
            >
              Reset Form
            </Button>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      </Form>
    )
  }
}
