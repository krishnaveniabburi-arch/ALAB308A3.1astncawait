const central = require("./central");
const vault = require("./vault");
const dbs = require("./dbs");

// importing databases from single database file 
// combing data across multiple databases using bracket notation

function retrieve(id) {
    return central(id).then((dbName) => {
        // Accessing sub database dynamically
        return Promise.all([ dbs[dbName](id), valut(id)]);
    })
    .then(([dbData, valutData]) => {
        return {
            id: Number(id), name: vaultData.name, username: dbData.username, email: vaultData.email, address: valutData.address, 
            phone: vaultData.phone, website: dbData.website, company: dbData.company 
        };
    })
    .catch((error) => {
        // returns rejected promise if any single db function fails
        return Promise.reject(error.message || error);
    });
    
}

// running  Testing
console.log("Running 2file separate structure");
