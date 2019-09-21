import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class STBAppSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            appList: [
                { 'id': 0, 'name': 'nginx', 'selected': false },
                { 'id': 1, 'name': 'haproxy', 'selected': false }
            ]
        }
    }

    componentDidMount() {
        console.log("STBAppSelect Mounted")
        this.setState({
            loading: true
        })
    }

    toggleButton(appList) {
        let prevAppList = this.props.appList
        prevAppList[appList].selected = !this.props.appList[appList].selected
        this.setState({
            appList: prevAppList
        })
    }

    renderItem(v, i) {
        console.log("v-i", v, i)
        return (
            <Grid item xs key={v.id} style={{ height: 200 }}>
                {v.selected ?
                    <Button style={{ width: "100%", height: "100%", backgroundColor: "blue" }} onClick={() => this.toggleButton(i)}>
                        <div>{v.name} Enabled</div>
                    </Button>
                    :
                    <Button style={{ width: "100%", height: "100%", backgroundColor: "red" }} onClick={() => this.toggleButton(i)}>
                        <div>{v.name} Disabled</div>
                    </Button>
                }
            </Grid>
        )
    }

    renderApps(appList) {
        return (appList.map((v, i) => {
            return this.renderItem(v, i)
        })
        )
    }

    render() {
        return (
            <div style={{ 'margin': 10 }}>
                {this.props.listTitle}
                <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2} style={{ height: "100%" }}  >
                    {this.renderApps(this.props.appList)}
                </Grid>
            </div>
        );
    }
}

export default STBAppSelect;