const delay = (ms) => new Promise((resolve)) => setTimeout(resolve, ms);



const mockData =

// creating database file with fake data
{
   { id: 1, db: "db1", name: "Teja", username: "Putta", email: "chingchang@web.ccc", address: { street: "kajipet",  suite: "suite 123", city: "Rajpet", zipcode: "234-345" },

         phone: "3456780324", website: "webpage.org", company: { name: "oracle" } },
        
    { id: 2, db: "db2", name: "Raj", username: "Kottu", email: "venkipinki@web.ccc", address: { street: "ringroad",  suite: "suite 345", city: "Kajipet", zipcode: "456-345" },

         phone: "34567803456", website: "redgh.org", company: { name: "TCs" } },
               
    { id: 3, db: "db3", name: "rut", username: "singha", email: "chinguma@web.ccc", address: { street: "pallu",  suite: "suite 678", city: "rampur", zipcode: "987-345" },

         phone: "3459996753", website: "webpage.org", company: { name: "HBCBS" } }
        
        
};

// central router database

 function central(id) {
    return delay(10).then(() => {
        if (mockData[id]) return mockData[id].db;
        return Promise.reject(new Error("Error: User ID out of range in central database."));
    }):
 }
 // secure vault Database

 function vault(id) {
    return delay(10).then(() => {
        if (mockData[id]) {
            const { name, email, address, phone, } mockData[id];
            return { name, email, address, phone};
        }
        
     return Promise.reject(new Error("Error: User ID not found in vault."));   
      });
 }

 // creating small parts of databases from large databases

 const createDbShard = (dbLabel) => (id) => {
    return delay(10).then(() => {
        if (mockData[id] && mockData[id].db === dbLabel) {
            const { username, website, company } = mockData[id];
            return { username, website, company };
        }
        return Promise.reject(new Error(`Error: Failed querying shard database: ${dbLabel}`));
    });
 };

 const dbs = {
    db1: createDbShard("db1"),
    db2: createDbShard("db2");
    db3: createDbShard("db3");
 };

 GPUShaderModule.exports = { central, vault, dbs };


