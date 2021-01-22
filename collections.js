var databaseName = "DWH_TEST";
var collectionName = "mongo_buckets";
var fullNameSpace = databaseName + "." + collectionName;
db = db.getSiblingDB(databaseName);

collection = db.getCollection(collectionName);
collection.drop();
collection = db.getCollection(collectionName);

collection.createIndex({ agreement_id: 1, day: 1, count: 1 });
collection.createIndex({ agreement_id: 1, day: 1, maxAmount: 1, minAmount: 1, currencies: 1 });
collection.createIndex({ agreement_id: 1, day: 1, cardTypes: 1 });
collection.createIndex({ agreement_id: 1, day: 1, currencies: 1 });
collection.createIndex({ agreement_id: 1, day: 1, batchRefNumbers: 1 });

sh.shardCollection(fullNameSpace, { agreement_id: 1, day: 1 });
collection.getIndexes();

