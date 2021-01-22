exports = function(docs) {
  if(docs.length === 0) return {"update Count": 0, message: "no orgs to update"};
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
  
  const commands = docs.map(
    doc => { 
      return {
        updateOne: {
          filter: { 
            _id: doc[organisationNumberFieldName] 
            
          }, 
          update: { 
            $addToSet: { 
              agreements: doc[agreementIdFieldName] 
            }
          },
          upsert: true
        }
      }
    }
  );
  
  return organisationsCollection.bulkWrite(commands, {ordered:false});
};