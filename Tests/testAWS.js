const url = 'https://ne6ok9eagk.execute-api.us-east-2.amazonaws.com/test/TestHello?x=FromJS&y=234&z=345';
function test_call_api() {
    var https = require("https");

    https.get(url, (res) => {
        const {statusCode} = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' +
                `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
            } catch (e) {
                console.error(e.message);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}

function test_XMLHTTP() {
    var x = new XMLHttpRequest();
    x.open('GET', url);
    x.onload = function() {
        console.log(x.responseText);
    };
    x.send();
}

test_XMLHTTP()
// test_call_api();
