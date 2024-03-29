import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import STBRubrik from './STBRubrikCategories/STBRubrik';
import STBSliderCompetency from './STBSliderCompetency'
import STBTreeSelect from './STBTreeSelect'
import category_blue_team from './STBRubrikCategories/category_blue_team';
import category_red_team from './STBRubrikCategories/category_red_team';
import category_security_engineering from './STBRubrikCategories/category_security_engineering';
import category_software_engineering from './STBRubrikCategories/category_software_engineering';
import category_systems_engineering from './STBRubrikCategories/category_systems_engineering';


class STBMaterialUiGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rubrik: {},
            loading: false,
            topics: []
        };
    }

    componentDidMount() {
        this.setState({
            rubrik: STBRubrik,
            loading: true
        })
    }

    handleChange = topicIndex => event => {
        let prevTopics = this.state.topics
        console.log(prevTopics)
        prevTopics[topicIndex].checked = !prevTopics[topicIndex].checked
        this.setState({ topics: prevTopics });
    }

    renderGrid() {
        return (
            Object.keys(this.state.rubrik).map((e, i) => {
                return (this.renderCategory(this.state.rubrik[e]))
            })
        )
    }

    renderCategory(item) {
        let selectedCategory = []
        if (item.cn === "blue_team") {
            selectedCategory = category_blue_team
        } else if (item.cn === "red_team") {
            selectedCategory = category_red_team
        } else if (item.cn === "security_engineering") {
            selectedCategory = category_security_engineering
        } else if (item.cn === "software_engineering") {
            selectedCategory = category_software_engineering
        } else if (item.cn === "systems_engineering") {
            selectedCategory = category_systems_engineering
        }

        return (
            <FormControl key={item.cn} component="fieldset">
                <FormLabel component="legend">{item.name}</FormLabel>
                <FormGroup>
                    {/* <STBSliderCompetency /> */}
                    <STBTreeSelect data={selectedCategory} />
                </FormGroup>
            </FormControl>
        )
    }

    // renderCheckBoxItems(parentCategory) {
    //     return (
    //         Object.keys(parentCategory.children).map((e, i) => {
    //             return (
    //                 <FormControlLabel
    //                     key={i}
    //                     control={<Checkbox checked={false} value={parentCategory.children[e].cn} />}
    //                     label={parentCategory.children[e].name}
    //                 />
    //             )
    //         })
    //     )
    // }

    render() {
        return (
            this.state.loading ?
                this.renderGrid()
                :
                <div>loading</div>

        )
    };
}

export default STBMaterialUiGrid;
