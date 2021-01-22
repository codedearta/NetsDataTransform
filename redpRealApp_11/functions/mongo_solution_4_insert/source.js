exports = function(changeEvent) {
  const bucketCollectionName = "mongo_buckets_solution_4";
  const fullDocument = changeEvent.fullDocument;
  
  return Promise.all(
    [ 
      context.functions.execute("updateOrgs", changeEvent.fullDocument),
      context.functions.execute("arrayAppend", changeEvent, bucketCollectionName)
    ]
  );
};