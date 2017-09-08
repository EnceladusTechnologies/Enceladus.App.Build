import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigurationService {

    /* CACHE CONFIGS */
    public BUILD_VERSION = 'v0.0.0';
    public maxAge: number = 5 * 60; // in seconds
    /* CACHE CONFIGS */

    public GetWebUrl(subdomain: string) {
        return 'http://' + environment.webServer;
    }

}
