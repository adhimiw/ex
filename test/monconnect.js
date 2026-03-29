const {MongoClient}=require("mongodb");
async function connectmon(){
    const url="mongodb://127.0.0.1:27017";
    const client=new MongoClient(url);
    
        await client.connect();
        console.log("Connected to MongoDB");
        console.log("Databases:");
        const databases=await client.db().admin().listDatabases();
        databases.databases.forEach((db)=>console.log(`- ${db.name}`));
        client.close();
}
connectmon()