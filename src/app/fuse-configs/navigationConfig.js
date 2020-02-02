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
<<<<<<< HEAD
        'id'      : 'creator',
        'title'   : 'Challenges',
        'type'    : 'group',
        'url'     : '/apps/challenge-creator/create',
        'children': [
            {
                'id'   : 'challenges-view',
                'title': 'View Challenges',
=======
        'id'       : 'applications',
        'title'    : 'Applications',
        'translate': 'APPLICATIONS',
        'type'     : 'group',
        'icon'     : 'apps',
        'children' : [
            {
                'id'       : 'dashboards',
                'title'    : 'Dashboards',
                'translate': 'DASHBOARDS',
                'type'     : 'collapse',
                'icon'     : 'dashboard',
                'children' : [
                    {
                        'id'   : 'analytics-dashboard',
                        'title': 'Analytics',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'project-dashboard',
                        'title': 'Project',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'       : 'calendar',
                'title'    : 'Calendar',
                'translate': 'CALENDAR',
                'type'     : 'item',
                'icon'     : 'today',
                'url'      : '/apps/calendar'
            },
            {
                'id'       : 'e-commerce',
                'title'    : 'E-Commerce',
                'translate': 'ECOMMERCE',
                'type'     : 'collapse',
                'icon'     : 'shopping_cart',
                'url'      : '/apps/e-commerce',
                'children' : [
                    {
                        'id'   : 'e-commerce-products',
                        'title': 'Products',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-product-detail',
                        'title': 'Product Detail',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products/1/a-walk-amongst-friends-canvas-print',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-new-product',
                        'title': 'New Product',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/products/new',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-orders',
                        'title': 'Orders',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/orders',
                        'exact': true
                    },
                    {
                        'id'   : 'e-commerce-order-detail',
                        'title': 'Order Detail',
                        'type' : 'item',
                        'url'  : '/apps/e-commerce/orders/1',
                        'exact': true
                    }
                ]
            },
            {
                'id'       : 'academy',
                'title'    : 'Academy',
                'translate': 'ACADEMY',
                'type'     : 'item',
                'icon'     : 'school',
                'url'      : '/apps/academy'
            },
            {
                'id'       : 'mail',
                'title'    : 'Mail',
                'translate': 'MAIL',
                'type'     : 'item',
                'icon'     : 'email',
                'url'      : '/apps/mail',
                'badge'    : {
                    'title': 25,
                    'bg'   : '#F44336',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'       : 'todo',
                'title'    : 'To-Do',
                'translate': 'TODO',
                'type'     : 'item',
                'icon'     : 'check_box',
                'url'      : '/apps/todo',
                'badge'    : {
                    'title': 3,
                    'bg'   : 'rgb(255, 111, 0)',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'       : 'file-manager',
                'title'    : 'File Manager',
                'translate': 'FILE_MANAGER',
                'type'     : 'item',
                'icon'     : 'folder',
                'url'      : '/apps/file-manager'
            },
            {
                'id'       : 'contacts',
                'title'    : 'Contacts',
                'translate': 'CONTACTS',
                'type'     : 'item',
                'icon'     : 'account_box',
                'url'      : '/apps/contacts/all'
            },
            {
                'id'       : 'chat',
                'title'    : 'Chat',
                'translate': 'CHAT',
                'type'     : 'item',
                'icon'     : 'chat',
                'url'      : '/apps/chat',
                'badge'    : {
                    'title': 13,
                    'bg'   : 'rgb(9, 210, 97)',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'       : 'scrumboard',
                'title'    : 'Scrumboard',
                'translate': 'SCRUMBOARD',
                'type'     : 'item',
                'icon'     : 'assessment',
                'url'      : '/apps/scrumboard'
            },
            {
                'id'       : 'notes',
                'title'    : 'Notes',
                'translate': 'NOTES',
                'type'     : 'item',
                'icon'     : 'note',
                'url'      : '/apps/notes'
            }
        ]
    },
    {
        'id'      : 'pages',
        'title'   : 'Pages',
        'type'    : 'group',
        'icon'    : 'pages',
        'children': [
            {
                'id'      : 'authentication',
                'title'   : 'Authentication',
                'type'    : 'collapse',
                'icon'    : 'lock',
                'badge'   : {
                    'title': 10,
                    'bg'   : '#525E8A',
                    'fg'   : '#FFFFFF'
                },
                'children': [
                    {
                        'id'   : 'authentication-login',
                        'title': 'Login',
                        'type' : 'item',
                        'url'  : '/pages/auth/login'
                    },
                    {
                        'id'   : 'login-v2',
                        'title': 'Login v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/login-2'
                    },
                    {
                        'id'   : 'authentication-register',
                        'title': 'Register',
                        'type' : 'item',
                        'url'  : '/pages/auth/register'
                    },
                    {
                        'id'   : 'authentication-register-v2',
                        'title': 'Register v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/register-2'
                    },
                    {
                        'id'   : 'authentication-forgot-password',
                        'title': 'Forgot Password',
                        'type' : 'item',
                        'url'  : '/pages/auth/forgot-password'
                    },
                    {
                        'id'   : 'authentication-forgot-password-v2',
                        'title': 'Forgot Password v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/forgot-password-2'
                    },
                    {
                        'id'   : 'authentication-reset-password',
                        'title': 'Reset Password',
                        'type' : 'item',
                        'url'  : '/pages/auth/reset-password'
                    },
                    {
                        'id'   : 'authentication-reset-password-v2',
                        'title': 'Reset Password v2',
                        'type' : 'item',
                        'url'  : '/pages/auth/reset-password-2'
                    },
                    {
                        'id'   : 'authentication-lock-screen',
                        'title': 'Lock Screen',
                        'type' : 'item',
                        'url'  : '/pages/auth/lock'
                    },
                    {
                        'id'   : 'authentication-mail-confirmation',
                        'title': 'Mail Confirmation',
                        'type' : 'item',
                        'url'  : '/pages/auth/mail-confirm'
                    }
                ]
            },
            {
                'id'   : 'coming-soon',
                'title': 'Coming Soon',
                'type' : 'item',
                'icon' : 'alarm',
                'url'  : '/pages/coming-soon'
            },
            {
                'id'      : 'errors',
                'title'   : 'Errors',
                'type'    : 'collapse',
                'icon'    : 'error',
                'children': [
                    {
                        'id'   : '404',
                        'title': '404',
                        'type' : 'item',
                        'url'  : '/pages/errors/error-404'
                    },
                    {
                        'id'   : '500',
                        'title': '500',
                        'type' : 'item',
                        'url'  : '/pages/errors/error-500'
                    }
                ]
            },
            {
                'id'      : 'invoice',
                'title'   : 'Invoice',
                'type'    : 'collapse',
                'icon'    : 'receipt',
                'children': [
                    {
                        'id'   : 'modern',
                        'title': 'Modern',
                        'type' : 'item',
                        'url'  : '/pages/invoices/modern'
                    },
                    {
                        'id'   : 'compact',
                        'title': 'Compact',
                        'type' : 'item',
                        'url'  : '/pages/invoices/compact'
                    }
                ]
            },
            {
                'id'   : 'maintenance',
                'title': 'Maintenance',
                'type' : 'item',
                'icon' : 'build',
                'url'  : '/pages/maintenance'
            },
            {
                'id'      : 'pricing',
                'title'   : 'Pricing',
                'type'    : 'collapse',
                'icon'    : 'attach_money',
                'children': [
                    {
                        'id'   : 'style-1',
                        'title': 'Style 1',
                        'type' : 'item',
                        'url'  : '/pages/pricing/style-1'
                    },
                    {
                        'id'   : 'style-2',
                        'title': 'Style 2',
                        'type' : 'item',
                        'url'  : '/pages/pricing/style-2'
                    },
                    {
                        'id'   : 'style-3',
                        'title': 'Style 3',
                        'type' : 'item',
                        'url'  : '/pages/pricing/style-3'
                    }
                ]
            },
            {
                'id'   : 'profile',
                'title': 'Profile',
                'type' : 'item',
                'icon' : 'person',
                'url'  : '/pages/profile'
            },
            {
                'id'      : 'search',
                'title'   : 'Search',
                'type'    : 'collapse',
                'icon'    : 'search',
                'children': [
                    {
                        'id'   : 'classic-search',
                        'title': 'Classic Search',
                        'type' : 'item',
                        'url'  : '/pages/search/classic'
                    },
                    {
                        'id'   : 'modern-search',
                        'title': 'Modern Search',
                        'type' : 'item',
                        'url'  : '/pages/search/modern'
                    }
                ]
            },
            {
                'id'   : 'faq',
                'title': 'Faq',
                'type' : 'item',
                'icon' : 'help',
                'url'  : '/pages/faq'
            },
            {
                'id'   : 'knowledge-base',
                'title': 'Knowledge Base',
                'type' : 'item',
                'icon' : 'import_contacts',
                'url'  : '/pages/knowledge-base'
            }
        ]
    },
    {
        'id'      : 'user-interface',
        'title'   : 'User Interface',
        'type'    : 'group',
        'icon'    : 'web',
        'children': [
            {
                'id'   : 'icons',
                'title': 'Icons',
                'type' : 'item',
                'icon' : 'photo',
                'url'  : '/ui/icons'
            },
            {
                'id'   : 'typography',
                'title': 'Typography',
>>>>>>> dc8a651a5f53a31f34d74b2bedc7d138b381987c
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
<<<<<<< HEAD
                'url'  : '/apps/app-creator/create'
=======
                'icon' : 'history',
                'url'  : '/documentation/changelog',
                'badge': {
                    'title': '3.4.0',
                    'bg'   : 'rgb(236, 12, 142)',
                    'fg'   : '#FFFFFF'
                }
            },
            {
                'id'      : 'getting-started-doc',
                'title'   : 'Getting Started',
                'type'    : 'collapse',
                'icon'    : 'import_contacts',
                'children': [
                    {
                        'id'   : 'introduction-doc',
                        'title': 'Introduction',
                        'type' : 'item',
                        'url'  : '/documentation/getting-started/introduction'
                    },
                    {
                        'id'   : 'installation-doc',
                        'title': 'Installation',
                        'type' : 'item',
                        'url'  : '/documentation/getting-started/installation'
                    }
                ]
            },
            {
                'id'      : 'working-with-fuse-react-doc',
                'title'   : 'Working with Fuse',
                'type'    : 'collapse',
                'icon'    : 'import_contacts',
                'children': [
                    {
                        'id'   : 'development-doc',
                        'title': 'Development',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/development'
                    },
                    {
                        'id'   : 'production-doc',
                        'title': 'Production',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/production'
                    },
                    {
                        'id'   : 'project-structure-doc',
                        'title': 'Project Structure',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/project-structure'
                    },
                    {
                        'id'   : 'updating-fuse-react-doc',
                        'title': 'Updating Fuse React',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/updating-fuse-react'
                    },
                    {
                        'id'   : 'theming-doc',
                        'title': 'Theming',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/theming'
                    },
                    {
                        'id'   : 'theme-layouts-doc',
                        'title': 'Theme Layouts',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/theme-layouts'
                    },
                    {
                        'id'   : 'page-layouts-doc',
                        'title': 'Page Layouts',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/page-layouts'
                    },
                    {
                        'id'   : 'settings-doc',
                        'title': 'Settings',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/settings'
                    },
                    {
                        'id'   : 'fuse-react-routing-doc',
                        'title': 'Routing',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/routing'
                    },
                    {
                        'id'   : 'fuse-react-code-splitting-doc',
                        'title': 'Code Splitting',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/code-splitting'
                    },
                    {
                        'id'   : 'fuse-react-rtl-doc',
                        'title': 'RTL Support',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/rtl-support'
                    },
                    {
                        'id'   : 'fuse-react-multi-language-doc',
                        'title': 'Multi Language',
                        'type' : 'item',
                        'url'  : '/documentation/working-with-fuse-react/multi-language'
                    }
                ]
            },
            {
                'id'      : 'authentication-doc',
                'title'   : 'Authentication',
                'type'    : 'collapse',
                'icon'    : 'import_contacts',
                'children': [
                    {
                        'id'   : 'jwt-auth-doc',
                        'title': 'JWT',
                        'type' : 'item',
                        'url'  : '/documentation/authentication/jwt'
                    },
                    {
                        'id'   : 'firebase-auth-doc',
                        'title': 'Firebase',
                        'type' : 'item',
                        'url'  : '/documentation/authentication/firebase'
                    },
                    {
                        'id'   : 'auth0-auth-doc',
                        'title': 'Auth0',
                        'type' : 'item',
                        'url'  : '/documentation/authentication/auth0'
                    }
                ]
            },
            {
                'id'      : 'fuse-components',
                'title'   : 'Fuse Components',
                'type'    : 'collapse',
                'icon'    : 'widgets',
                'children': [
                    {
                        'id'   : 'fuse-auth',
                        'title': 'FuseAuthorization',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-authorization'
                    },
                    {
                        'id'   : 'fuse-theme',
                        'title': 'FuseTheme',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-theme'
                    },
                    {
                        'id'   : 'fuse-layout',
                        'title': 'FuseLayout',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-layout'
                    },
                    {
                        'id'      : 'fuse-components-page',
                        'title'   : 'Fuse Page Layouts',
                        'type'    : 'collapse',
                        'children': [
                            {
                                'id'   : 'fuse-page-carded',
                                'title': 'FusePageCarded',
                                'type' : 'item',
                                'url'  : '/documentation/fuse-components/fuse-page-carded'
                            },
                            {
                                'id'   : 'fuse-page-simple',
                                'title': 'FusePageSimple',
                                'type' : 'item',
                                'url'  : '/documentation/fuse-components/fuse-page-simple'
                            }
                        ]
                    },
                    {
                        'id'   : 'fuse-navigation',
                        'title': 'FuseNavigation',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-navigation'
                    },
                    {
                        'id'   : 'fuse-scrollbars',
                        'title': 'FuseScrollbars',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-scrollbars'
                    },
                    {
                        'id'   : 'fuse-highlight',
                        'title': 'FuseHighlight',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-highlight'
                    },
                    {
                        'id'   : 'fuse-countdown',
                        'title': 'FuseCountdown',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-countdown'
                    },
                    {
                        'id'   : 'fuse-message',
                        'title': 'FuseMessage',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-message'
                    },
                    {
                        'id'   : 'fuse-dialog',
                        'title': 'FuseDialog',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-dialog'
                    },
                    {
                        'id'   : 'fuse-animate',
                        'title': 'FuseAnimate',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-animate'
                    },
                    {
                        'id'   : 'fuse-animate-group',
                        'title': 'FuseAnimateGroup',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-animate-group'
                    },
                    {
                        'id'   : 'fuse-chip-select',
                        'title': 'FuseChipSelect',
                        'type' : 'item',
                        'url'  : '/documentation/fuse-components/fuse-chip-select'
                    }
                ]
            },
            {
                'id'      : 'material-ui-components',
                'title'   : 'Material UI Components',
                'type'    : 'collapse',
                'icon'    : 'layers',
                'children': [
                    ...MaterialUIComponentsNavigation
                ]
            },
            {
                'id'      : '3rd-party-components',
                'title'   : '3rd Party Components',
                'type'    : 'collapse',
                'icon'    : 'settings_input_component',
                'children': [
                    {
                        'id'      : 'datatables',
                        'title'   : 'Datatables',
                        'type'    : 'collapse',
                        'children': [
                            {
                                'id'   : 'react-table',
                                'title': 'React Table',
                                'type' : 'item',
                                'url'  : '/documentation/third-party-components/datatables/react-table'
                            }
                        ]
                    },
                    {
                        'id'   : 'formsy',
                        'title': 'Formsy',
                        'type' : 'item',
                        'url'  : '/documentation/third-party-components/formsy'
                    },
                    {
                        'id'   : 'google-map-react',
                        'title': 'Google Map React',
                        'type' : 'item',
                        'url'  : '/documentation/third-party-components/google-map-react'
                    },
                    {
                        'id'   : 'react-chartjs-2',
                        'title': 'React ChartJs 2',
                        'type' : 'item',
                        'url'  : '/documentation/third-party-components/react-chartjs-2'
                    }
                ]
>>>>>>> dc8a651a5f53a31f34d74b2bedc7d138b381987c
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
