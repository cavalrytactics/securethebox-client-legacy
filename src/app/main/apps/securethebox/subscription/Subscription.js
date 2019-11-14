import React from 'react';
import {Button, Card, CardContent, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    header: {
        height    : 600,
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText
    },
    badge : {
        backgroundColor: theme.palette.error.main,
        color          : theme.palette.getContrastText(theme.palette.error.main)
    },
    price : {
        backgroundColor: theme.palette.primary[600],
        color          : theme.palette.getContrastText(theme.palette.primary[600])
    }
}));

function Subscription()
{
    const classes = useStyles();

    return (
        <div>

            <div className={clsx(classes.header, "flex")}>

                <div className="p-24 w-full max-w-2xl mx-auto">

                    <div className="text-center my-128 mx-24">

                        <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                            <Typography variant="h2" color="inherit" className="font-light">
                                Simple Pricing!
                            </Typography>
                        </FuseAnimate>

                        <FuseAnimate duration={400} delay={600}>
                            <Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
                                The most advanced security engineering interview platform with affordable pricing. You can always try
                                1 challenge for free!
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>
            </div>

            <div className="-mt-192">

                <div className="w-full max-w-2xl mx-auto">

                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex items-center justify-center flex-wrap"
                    >
                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative">

                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Training
                                    </Typography>
                                    <Typography color="textSecondary" className="text-16 font-medium">
                                        For personal use.
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">

                                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                                        <div className="flex justify-center">
                                            <Typography color="inherit" className="font-medium">$</Typography>
                                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">10</Typography>
                                        </div>
                                        <Typography color="inherit">
                                            per hour
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
                                            Limited Challenges
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            Limited resources
                                        </Typography>
                                        <Typography color="textSecondary">
                                            24 / 7 Support via email
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    <Button variant="contained" color="secondary" className="w-full">Select</Button>
                                    <Typography color="textSecondary" className="mt-16">
                                        1 hour trial
                                    </Typography>
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">

                            <Card className="relative" raised>

                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Business
                                    </Typography>
                                    <Typography color="textSecondary" className="text-16 font-medium">
                                        For startups and small teams.
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">

                                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                                        <div className="flex justify-center">
                                            <Typography color="inherit" className="font-medium">$</Typography>
                                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">40</Typography>
                                        </div>
                                        <Typography color="inherit">
                                            per hour
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
                                            All Challenges
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            Customize resources
                                        </Typography>
                                        <Typography color="textSecondary">
                                            24 / 7 Support
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    <Button variant="contained" color="secondary" className="w-full">Select</Button>
                                    <Typography color="textSecondary" className="mt-16">
                                        2 hour trial
                                    </Typography>
                                </div>
                            </Card>
                        </div>

                        <div className="w-full max-w-320 sm:w-1/3 p-12">
                            <Card className="relative">

                                <div className="p-32 text-center">
                                    <Typography className="text-32">
                                        Enterprise
                                    </Typography>
                                    <Typography color="textSecondary" className="text-16 font-medium">
                                        For scalable technical hiring.
                                    </Typography>
                                </div>

                                <CardContent className="text-center p-0">

                                    <div className={clsx(classes.price, "flex items-end justify-center py-16 px-32")}>
                                        <div className="flex justify-center">
                                            <Typography color="inherit" className="font-medium">$</Typography>
                                            <Typography color="inherit" className="text-32 ml-4 mr-8 font-light leading-none">80</Typography>
                                        </div>
                                        <Typography color="inherit">
                                            per hour
                                        </Typography>
                                    </div>

                                    <div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
                                            All Challenges
                                        </Typography>
                                        <Typography color="textSecondary" className="mb-16">
                                            24 / 7 Support
                                        </Typography>
                                        <Typography color="textSecondary">
                                            Customize challenges
                                        </Typography>
                                    </div>
                                </CardContent>

                                <div className="flex flex-col items-center justify-center pb-32 px-32">
                                    <Button variant="contained" color="secondary" className="w-full">Select</Button>
                                    <Typography color="textSecondary" className="mt-16">
                                        2 hour trial
                                    </Typography>
                                </div>
                            </Card>
                        </div>
                    </FuseAnimateGroup>
                    <div className="flex flex-col items-center py-96 text-center sm:text-left max-w-xl mx-auto">

                        <Typography variant="h4" className="pb-32 font-light">Frequently Asked Questions</Typography>

                        <div className="flex flex-wrap w-full">

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">How does free trial work?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Once your trial has started, you will be provisioned hours of resources you have.
                                    Using all your resources will end your trial.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">Can I cancel any time?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Yes. 
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">What happens after my trial ended?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    All features involving provisioning resources will be disabled.  
                                    To enable them, you must pay for a subscription.
                                </Typography>
                            </div>

                            <div className="w-full sm:w-1/2 p-24">
                                <Typography className="text-20 mb-8">Can I have a discount?</Typography>
                                <Typography className="text-16" color="textSecondary">
                                    Discounts depends on how much resources you pay in advanced.
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
