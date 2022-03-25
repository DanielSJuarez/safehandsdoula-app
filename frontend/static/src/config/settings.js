const environment = process.env.NODE_ENV

export let base_URL = ''

 if (environment === 'production'){
    // base_URL = 'https://safehandsdoula-app-dsj.herokuapp.com'
    base_URL = 'https://safehandsdoula.com'
}
