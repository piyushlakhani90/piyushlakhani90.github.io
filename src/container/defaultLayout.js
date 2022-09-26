import { CSpinner } from '@coreui/react';
import React, { Component, Suspense } from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';

function DefaultLayout() {

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader router={window.location} routerName={window.location.name} />
                <div className="body flex-grow-1 px-3">
                    <AppContent />
                </div>
                <AppFooter />
            </div>
        </div>
    )

}

export default DefaultLayout;