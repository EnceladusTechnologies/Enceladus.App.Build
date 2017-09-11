// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiServer: 'http://localhost:35210/',
  webServer: 'http://localhost:8800',
  auth0Domain: 'enceladus-dev.auth0.com',
  auth0ClientId: 'mD1dWLBEa2IthBS4ypQcyQ8qNzq2u4qn',
  auth0Audience: 'https://enceladus-dev.com/authorization'
};
