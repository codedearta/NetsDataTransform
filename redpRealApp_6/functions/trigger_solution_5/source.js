exports = function(changeEvent) {
  const bucketCollectionName = "mongo_buckets_solution_5";
  const landingCollectionName = "mongo_landing";
  const fullDocument = changeEvent.fullDocument;

  return Promise.all(
    [ 
      context.functions.execute("updateOrgs", changeEvent.fullDocument),
      context.functions.execute("arrayAppend", changeEvent, bucketCollectionName, landingCollectionName)
    ]
  );
};