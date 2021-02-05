exports = async function(clusterName, databaseName, landingCollectionName, targetBucketCollectionName) {
  // hello change
  const service = context.services.get(clusterName);
  const db = service.db(databaseName);
  const collection = db.collection(landingCollectionName);
  
  
  const cursor = await collection.find({}).toArray();
  console.log(JSON.stringify(cursor))
  // while (await cursor.hasNext()) {
  //   console.log(cursor.next());
  // }
  
  // const cursor = landingCollection.find({})
  // .then(items => console.log(JSON.stringify(items)))
  // .catch(err => console.log(JSON.stringify(err)));
  // console.log(JSON.stringify(cursor));
  // while (await cursor.hasNext()) {
  //   console.log(await cursor.next());
  // }
  // cursor = await landingCollection.find({});
  
  // cursor.forEach(doc => console.log(JSON.stringify(doc)));
  //JSON.stringify(result.hasNext());
  //.then(r => console.log(JSON.stringify(r)));

  //console.log(databaseName,landingCollectionName,JSON.stringify(mongodb));  
  
  
  // .then(result => {
  //   while(result.hasNext()) {
  //     doc = result.next();
  //     context.functions.execute("updateOrgs", doc);
  //     context.functions.execute("arrayAppend", { fullDocument: doc }, targetBucketCollectionName, landingCollectionName)
  //   }
  // });
};