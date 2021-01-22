exports = function(fullDocument) {
  // bucket configuration
  const organisationNumberFieldName = "settl_card_acc_org_num";
  const agreementIdFieldName = "agreement_id";

  // database access
  //const clusterName = "BusinessLogic";
  const clusterName = context.values.get("serviceName");
  const dbName = context.values.get("databaseName");
  const organisationsCollectionName = context.values.get("organisationsCollectionName");

  const service = context.services.get(clusterName);
  const db = service.db(dbName);
  const organisationsCollection = db.collection(organisationsCollectionName);
  
  return organisationsCollection.updateOne( { _id: fullDocument[organisationNumberFieldName] }, { $addToSet: { agreements: fullDocument[agreementIdFieldName] }}, { upsert: true }).then(
    updateResult => updateResult 
  );
};