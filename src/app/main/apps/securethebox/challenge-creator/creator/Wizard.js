import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import {
  Paper,
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
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container alignItems="flex-start" spacing={2}>
              <CourseFields course_fields={this.state.course_fields} />
            </Grid>
            <Stepper activeStep={this.state.page} orientation="vertical">
              {this.state.pageLabels.map((label, index) => {
                return (
                  <Step key={label} >
                    <StepLabel onClick={() => this.selectPage(index)}>{label}</StepLabel>
                    <StepContent>
                      {activePage}
                      <div className="buttons">
                        {page > 0 && (
                          <Button onClick={this.previous}>
                            Previous
                          </Button>
                        )}
                        {!isLastPage && <Button type="submit">Next</Button>}
                        {isLastPage && (
                          <Button type="submit" disabled={submitting}>
                            Submit
                        </Button>
                        )}
                      </div>
                    </StepContent>
                  </Step>
                )
              })}
            </Stepper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      </Form>
    )
  }
}
