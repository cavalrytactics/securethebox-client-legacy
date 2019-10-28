import React from 'react';
import {authRoles} from 'app/auth';

export const ChallengeCreatorAppConfig = {
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
            path     : '/apps/challenge-creator/create',
            component: React.lazy(() => import('./creator/Create3'))
        }
    ]
};
