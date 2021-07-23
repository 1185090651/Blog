import React from 'react';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';
import routerConfig from './router/config';


export default function App () {
    return (
        <HashRouter>
            <RouterView routes={routerConfig} />
        </HashRouter>
    );
}
