interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'mD1dWLBEa2IthBS4ypQcyQ8qNzq2u4qn',
    CLIENT_DOMAIN: 'enceladus-dev.auth0.com',
    AUDIENCE: 'https://enceladus-dev.com/authorization',
    REDIRECT: 'http://localhost:8800/login-handler',
    SCOPE: 'openid'
};
