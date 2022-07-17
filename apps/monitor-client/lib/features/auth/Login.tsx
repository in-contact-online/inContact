import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = '260664953450-okrfqounqgbav184fs65e790ojkftubq.apps.googleusercontent.com';

export function Login() {
    const [showloginButton, setShowloginButton] = useState<boolean>(true);
    const [showlogoutButton, setShowlogoutButton] = useState<boolean>(false);
    const onLoginSuccess = (res: any): void => {
        console.log('Login Success:', res.profileObj);

        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res: any) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    return (
        <div>
            {showloginButton ? (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            ) : null}

            {showlogoutButton ? (
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                ></GoogleLogout>
            ) : null}
        </div>
    );
}
