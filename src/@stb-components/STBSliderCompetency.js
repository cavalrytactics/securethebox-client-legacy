import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';


const marks = [
    {
        value: 0,
        label: 'Entry',
    },
    {
        value: 33,
        label: 'Junior',
    },
    {
        value: 66,
        label: 'Senior',
    },
    {
        value: 100,
        label: 'Staff',
    },
  ];

class STBSliderCompetency extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodeCounter: 2,
        };
        this.valuetext.bind(this)
        this.valueLabelFormat.bind(this)
    }

    valuetext(value) {
        return `${value}`;
    }
      
    valueLabelFormat(value) {
        return marks.findIndex(mark => mark.value === value) + 1;
    }
      

    render(){
        return(
            <div style={{width: '80%', marginLeft:'auto', marginRight:'auto'}} >
            <Slider
                defaultValue={0}
                valueLabelFormat={(value) => this.valueLabelFormat(value)}
                getAriaValueText={(value) => this.valuetext(value)}
                aria-labelledby="discrete-slider-restrict"
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
          />
          </div>
        )
    }
}


export default STBSliderCompetency;