import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';


const marks = [
    {
        value: 0,
        label: 'IC1',
    },
    {
        value: 20,
        label: 'IC2',
    },
    {
        value: 40,
        label: 'IC3',
    },
    {
        value: 60,
        label: 'IC4',
    },
    {
        value: 80,
        label: 'IC5',
    },
    {
        value: 100,
        label: 'IC6',
    }
  ];

class STBSliderIndividualContributerLevel extends Component {

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
            <div style={{width: '90%', marginLeft:'auto', marginRight:'auto'}} >
                <h3>Target Individual Contributer Level</h3>
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


export default STBSliderIndividualContributerLevel;