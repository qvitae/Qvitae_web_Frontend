export async function customFetch(url, opt = {},  body = {}) {
    let defaultHeader = {
        "Content-Type": "application/json",        
    }
    const {headers = defaultHeader, mode = 'cors', method = 'GET', withToken = true} = opt 

    if (withToken) {
        const token = getToken()
        if (!token) throw new Error('Access denied')
        headers["Authorization"] =`Bearer ${token}`
    }

    const config = {headers, mode, method}
    if (method.toLowerCase() != 'get') config.body = body
     
    return await (await fetch(url, config)).json()
}


function getToken() {
    return localStorage.getItem('qv_token')
}