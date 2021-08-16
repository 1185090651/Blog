import React, { Suspense } from 'react';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';
import routerConfig from './router/config';


export default function App () {
    return (
        <HashRouter>
            <Suspense fallback={<div></div>}>
                <RouterView routes={routerConfig} />
            </Suspense>
        </HashRouter>
    );
}
