exports = function(begin, end){
  
  const clusterName = context.values.get("serviceName");
  const dbName = context.values.get("databaseName");
  const landingCollectionName = context.values.get("landingCollectionName");
  
  
  const service = context.services.get(clusterName);
  const db = service.db(dbName);
  const collection = db.collection(landingCollectionName);
  
  // begin = new Date("2019-01-26T00:00:00");
  // end = new Date("2021-01-26T23:59:59");
  
  // begin = new Date(begin);
  // end = new Date(end);
  
  const filter = { purchase_date:  {
    $gte: begin,
    $lt: end
  }};

  console.log("transform called with filter", JSON.stringify(filter));

  // const cursor = collection.find(filter).toArray().then(items => {
  //   items.forEach(item => {
  //     //console.log(JSON.stringify(item));
  //     //console.log("loaded")
  //     context.functions.execute("arrayAppend", { fullDocument: item });
  //   });
  // });
};