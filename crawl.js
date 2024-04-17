const { JSDOM } = require('jsdom')

function normalizeURL(url) {
    const urlObj = new URL(url)
    
    let urlPath = urlObj.pathname
    if (urlPath.length == 1){ return urlObj.hostname }
    if(urlPath[urlPath.length - 1] == '/') {
        urlPath = urlPath.slice(0, urlPath.length - 1)
    }
    console.log(urlObj)
    return urlObj.hostname + urlPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    jsdom = new JSDOM(htmlBody)
    link_list = jsdom.window.document.querySelectorAll('a')
    return_list = []
    for(let i = 0; i < link_list.length; i++) {
       
        href = link_list[i].getAttribute('href')     
        if (href.includes(baseURL)) {            
            return_list.push(normalizeURL(href))
        } else {
            url = baseURL + href
            return_list.push(normalizeURL(url))
        }  
    }
    return return_list
}


module.exports = {
    normalizeURL,
    getURLsFromHTML
}