
export const environment = process.env.NODE_ENV
export let base_URL = ''

if (environment === 'development'){
    base_URL = 'http://localhost:8000'
} else if (environment === 'production'){
    base_URL = 'https://safehandsdoula-app-dsj.herokuapp.com'
}
