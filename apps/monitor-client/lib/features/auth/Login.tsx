import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = '260664953450-okrfqounqgbav184fs65e790ojkftubq.apps.googleusercontent.com';

export function Login() {
    const [showLoginButton, setShowLoginButton] = useState<boolean>(true);
    const [showLogoutButton, setShowLogoutButton] = useState<boolean>(false);
    const onLoginSuccess = (res: any): void => {
        setShowLoginButton(false);
        setShowLogoutButton(true);
    };

    const onLoginFailure = (res: any) => {};

    const onSignOutSuccess = () => {
        setShowLoginButton(true);
        setShowLogoutButton(false);
    };

    return (
        <div>
            {showLoginButton ? (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            ) : null}

            {showLogoutButton ? (
                <GoogleLogout clientId={clientId} buttonText="Sign Out" onLogoutSuccess={onSignOutSuccess} />
            ) : null}
        </div>
    );
}
