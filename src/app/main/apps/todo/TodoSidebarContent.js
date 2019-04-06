import React from 'react';
import {Icon, List, ListItem, ListItemText, ListSubheader, Button} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    listItem: {
        color              : 'inherit!important',
        textDecoration     : 'none!important',
        height             : 40,
        width              : 'calc(100% - 16px)',
        borderRadius       : '0 20px 20px 0',
        paddingLeft        : 24,
        paddingRight       : 12,
        '&.active'         : {
            backgroundColor    : theme.palette.secondary.main,
            color              : theme.palette.secondary.contrastText + '!important',
            pointerEvents      : 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            fontSize: 16,
            width   : 16,
            height  : 16
        }
    }
}));

function TodoSidebarContent(props)
{
    const classes = useStyles(props);

    return (
        <FuseAnimate animation="transition.slideUpIn" delay={400}>

            <div className="flex-auto border-l-1 border-solid">

                <div className="p-24">
                    <Button
                        onClick={() => {
                            props.openNewTodoDialog();
                        }}
                        variant="contained"
                        color="primary"
                        className="w-full"
                    >
                        ADD TASK
                    </Button>
                </div>

                <div className={classes.listWrapper}>

                    <List>
                        {props.folders.length > 0 && props.folders.map((folder) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/' + folder.handle} key={folder.id}
                                activeClassName="active"
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" color="action">{folder.icon}</Icon>
                                <ListItemText primary={folder.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>
                        <ListSubheader className={classes.listSubheader} disableSticky>FILTERS</ListSubheader>

                        {props.filters.length > 0 && props.filters.map((filter) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/filter/' + filter.handle}
                                activeClassName="active"
                                className={classes.listItem}
                                key={filter.id}
                            >
                                <Icon className="list-item-icon" color="action">{filter.icon}</Icon>
                                <ListItemText primary={filter.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>

                    <List>

                        <ListSubheader className="pr-24 pl-24" disableSticky>LABELS</ListSubheader>

                        {props.labels.length > 0 && props.labels.map((label) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={'/apps/todo/label/' + label.handle}
                                key={label.id}
                                className={classes.listItem}
                            >
                                <Icon className="list-item-icon" style={{color: label.color}}
                                      color="action">label</Icon>
                                <ListItemText primary={label.title} disableTypography={true}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </FuseAnimate>
    );
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openNewTodoDialog: Actions.openNewTodoDialog
    }, dispatch);
}

function mapStateToProps({todoApp})
{
    return {
        folders: todoApp.folders,
        labels : todoApp.labels,
        filters: todoApp.filters
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoSidebarContent));
