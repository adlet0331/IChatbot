const Client = require('mongodb').MongoClient;
const databaseUrl = 'mongodb://localhost:27017/IChatbot';

Client.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async function(err, client){
    if(err) throw err;
    db = client.db('IChatbot')
    const collection = db.collection('Meal');
    doc = await collection.findOne({date : '0911'});
    console.log(doc.morning);
})

