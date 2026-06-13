const { central, vault, dbs } = require("./database");


// importing databases from single database file 
// combing data across multiple databases using bracket notation

function retrieve(id) {
    return central(id).then((dbName) => {
        // Accessing sub database dynamically
        return Promise.all([ dbs[dbName](id), vault(id)]);
    })
    .then(([dbData, vaultData]) => {
        return {
            id: Number(id), name: vaultData.name, username: dbData.username, email: vaultData.email, address: vaultData.address, 
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

// valid userquery execution
retrieve(1)
.then((data) => {
    console.log("\n[sucess] Retrieved data for user ID 1:");
    console.log(JSON.stringify(data, null, 2));
})
.catch((error) => { 
    console.error("\n[ERROR] Unexpected test failure:", err);
});
// data base failure test
retrieve(99)
.then((data) => {
    console.log("\n[FAILED] Eroor test did not fire", data);
})
.catch((error) => {
    console.log("\n[SUCCESS] Caught expected out of range database error:");
    console.log("Message ->", error);
});

module.exports = retrieve;
