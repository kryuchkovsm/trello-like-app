interface AuthConfiguration {
    clientID: string,
domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'tmG1ssKXnkoITIHeobps2HQ8nlwRjYaH',
    domain: 'sergey-kryuchkov.eu.auth0.com',
    callbackURL: 'http://localhost:3000'
};
