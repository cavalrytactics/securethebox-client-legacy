import React from 'react';

export const SubscriptionConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/subscription',
            component: React.lazy(() => import('./Subscription'))
        }
    ]
};
