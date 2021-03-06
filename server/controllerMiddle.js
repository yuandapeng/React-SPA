const fs = require('fs');

const addMapping = (router, mapping) => {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

const addControllers = (router, dir) => {
    let files = fs.readdirSync(dir + '/server/controller');
    let js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (let f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(dir + '/server/controller/' + f);
        addMapping(router, mapping);
    }
}

module.exports = (app) => {
    addControllers(app, process.cwd());
};