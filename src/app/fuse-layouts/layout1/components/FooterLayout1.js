import React from 'react';
import {AppBar, Toolbar,} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/styles';
// import PurchaseButton from 'app/fuse-layouts/shared-components/PurchaseButton';
// import PoweredByLinks from 'app/fuse-layouts/shared-components/PoweredByLinks';
import {useSelector} from 'react-redux';

function FooterLayout1(props)
{
    const footerTheme = useSelector(({fuse}) => fuse.settings.footerTheme);

    return (
        <ThemeProvider theme={footerTheme}>
            <AppBar id="fuse-footer" className="relative z-10" color="default" style={{backgroundColor: footerTheme.palette.background.default}}>
                <Toolbar className="px-16 py-0 flex items-center">
<<<<<<< HEAD
=======
                    <div className="flex flex-1">
                        <PurchaseButton/>
                    </div>

                    <div>
                        <PoweredByLinks/>
                    </div>
>>>>>>> dc8a651a5f53a31f34d74b2bedc7d138b381987c
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default FooterLayout1;
