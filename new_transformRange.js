exports = function(begin, end, landingColl){
  const clusterName = context.values.get("serviceName");
  const dbName = context.values.get("databaseName");
  let landingCollectionName = context.values.get("landingCollectionName");
  if(landingColl) landingCollectionName = landingColl;
  const service = context.services.get(clusterName);
  const db = service.db(dbName);
  const collection = db.collection(landingCollectionName);
  
  filter = { purchase_date:  {
    $gte: begin,
    $lt: end
  }};

  return collection.find(filter).toArray().then(items => {
    return Promis.all([
        context.functions.execute("bulkArrayAppend", items).then(res => res).catch(e => e),
        context.functions.execute("bulkUpdateOrgs", items).then(res => res).catch(e => e)
      ]
    ).then(res => { return { "update Count": items.length, res: res }});
    // context.functions.execute("bulkArrayAppend", items).then(res => res);
    // return { "update Count": items.length };
  });
};