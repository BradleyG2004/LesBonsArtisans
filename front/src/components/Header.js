// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: 'white', 
                boxShadow: 'none',
            }}
        >
            <Toolbar sx={{ paddingTop: '20px' }}>
                <img 
                    src='https://www.lesbonsartisans.fr/wp-content/themes/lesbonsartisans/images/logo.svg' 
                    alt="Logo" 
                />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
