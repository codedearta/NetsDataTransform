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
  
  filter = { purchase_date:  {
    $gte: begin,
    $lt: end
  }};

  //filter = {_id:"20209540001_10026831_c232d6705b567f3fa1b497441fc9374c_20203003103000"};
  //const retVal = JSON.stringify(filter);
  //return retVal;
  
  // return collection.count(filter).then(result => {
  //   console.log("count:", result);
  //   return { r: result, q: filter };
  // });
  return collection.find(filter).toArray().then(items => {
    context.functions.execute("bulkArrayAppend", items).then(res => res);
    return { "update Count": items.length };
      //items.map(item => )
    // items.forEach(item => {
      //return { r: items, c: items.length, q: filter };
      //console.log(JSON.stringify(item));
      //console.log("loaded")
      //items.forEach(item => { res = context.functions.execute("bulkArrayAppend", { fullDocument: item }).then(res => res); });
      //return context.functions.execute("arrayAppend", { fullDocument: items[0] }).then(res => res);
    //});
  });
};