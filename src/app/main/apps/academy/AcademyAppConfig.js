import React from 'react';
import {Redirect} from 'react-router-dom';

export const AcademyAppConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: false
                },
                toolbar       : {
                    display: true
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    routes  : [
        {
            path     : '/apps/academy/courses/:courseId/:courseHandle?',
            component: React.lazy(() => import('./course/Course'))
        },
        {
            path     : '/apps/academy/courses',
            component: React.lazy(() => import('./courses/Courses'))
        },
        {
            path     : '/apps/academy',
            component: () => <Redirect to="/apps/academy/courses"/>
        }
    ]
};
