import {MaterialUIComponentsNavigation} from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import {authRoles} from 'app/auth';
import i18next from 'i18next';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import ar from './navigation-i18n/ar';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
    {
        'id'      : 'creator',
        'title'   : 'Challenges',
        'type'    : 'group',
        'url'     : '/apps/challenge-creator/create',
        'children': [
            {
                'id'   : 'challenges-view',
                'title': 'View Challenges',
                'type' : 'item',
                'url'  : '/apps/academy/courses'
            },
            {
                'id'   : 'challenges-create',
                'title': 'Create Challenge',
                'type' : 'item',
                'url'  : '/apps/challenge-creator/create'
            },
            {
                'id'   : 'app-create',
                'title': 'App Creator',
                'type' : 'item',
                'url'  : '/apps/app-creator/create'
            }
        ]
    },
    {
        'id'      : 'subscription',
        'title'   : 'Subscription',
        'type'    : 'item',
        'url'     : '/subscription'
    },
];


export default navigationConfig;
