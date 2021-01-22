exports = function(landingCollectionNameOld, docId) {
  // database access
  //const clusterName = "BusinessLogic";
  const clusterName = context.values.get("serviceName");
  const dbName = context.values.get("databaseName");
  const landingCollectionName = context.values.get("landingCollectionName");

  const service = context.services.get(clusterName);
  const db = service.db(dbName);
  const landingCollection = db.collection(landingCollectionName);
  //console.log("removeFromLandingCollection", landingCollectionName,"deleteOne(" +JSON.stringify({ _id: docId }) + ")");
  return landingCollection
  .deleteOne({ _id: docId })
  .then(deleteResult => {
    //console.log("deletResult:", JSON.stringify(deleteResult));
    return deleteResult;
  });
};