exports = function(begin, end, landingColl, bucketColl){
  const clusterName = context.values.get("serviceName");
  const dbName = context.values.get("databaseName");
  const service = context.services.get(clusterName);
  const db = service.db(dbName);
  
  const collection = db.collection(landingColl);
  
  filter = { purchase_date:  {
    $gte: begin,
    $lt: end
  }};

  return collection.find(filter).toArray().then(items => {
    return Promise.all([
        context.functions.execute("bulkArrayAppend", items, bucketColl),
        context.functions.execute("bulkUpdateOrgs", items)
      ]
    ).then(res => { return { "update Count": items.length, res: res }});
    // context.functions.execute("bulkArrayAppend", items).then(res => res);
    // return { "update Count": items.length };
  });
};