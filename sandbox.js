const fs = require('fs');

module.exports = {
    update :function (Number, Subscribe) {
    fs.readFile('Users.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.map((i) => {
            if (i.Phone === Number) i.Subscribed = Subscribe
        })
        
        json = JSON.stringify(obj);
        fs.writeFile('Users.json', json, 'utf8', () => {});
    }});
    },

    getStatus: function (Number) {
        let status = true

        fs.readFile('Users.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                obj = JSON.parse(data);
                obj.map((i) => {
                    if (i.Phone === Number) status = i.Subscribed
                })
                console.log("status1:", status)
                return
        }});
        console.log("status2:", status)

        return status
    }
}

