const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

const testCases = [
    {
        name: "normalizeURLTest", 
        cases: ['home.com/path/','https://home.com/path/', 'http://home.com/path/','https://home.com/path','http://home.com/path'],
    },
    {
        name: "getURLsFromHTMLTest",
        cases: [
            '<html> \
              <body>\
               <a href="/">teast</a>     \
               <a href="https://home.com/loser">loser</a>    \
               <a href="http://home.com/leeel">leeel</a>    \
              </body>\
                           \
            </html>'
        ]
    }
]

const expectCases = [
    'home.com/path',
    ['home.com', 'home.com/loser', 'home.com/leeel']
]

// normalize url
for(let j = 0 ; j < testCases[0].cases.length; j++) {
    test(testCases[0].name,() => {
        expect(normalizeURL(testCases[0].cases[j])).toBe(expectCases[0])
    })
}

// getURLsFromHTML

test(testCases[1].name,() => {
    expect(getURLsFromHTML(testCases[1].cases[0], 'home.com')).toBe(expectCases[1])
})



