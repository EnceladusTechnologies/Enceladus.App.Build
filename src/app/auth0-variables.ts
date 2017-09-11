import { environment } from "environments/environment";

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: environment.auth0ClientId,
    CLIENT_DOMAIN: environment.auth0Domain,
    AUDIENCE: environment.auth0Audience,
    REDIRECT: environment.webServer +  '/callback',
    SCOPE: 'openid'
};
