import React from 'react';
import {authRoles} from 'app/auth';

export const AppCreatorAppConfig = {
    settings: {
        layout: {
            config: {
                navbar        : {
                    display: true
                },
                toolbar       : {
                    display: true
                },
                footer        : {
                    display: false
                },
                leftSidePanel : {
                    display: true
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    auth   : authRoles.user,
    routes  : [
        {
            path     : '/apps/app-creator/create',
            component: React.lazy(() => import('./creator/Create2'))
        }
    ]
};
