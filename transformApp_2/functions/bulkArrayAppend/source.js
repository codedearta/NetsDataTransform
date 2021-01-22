exports = function(docs, bucketCollectionName) {
  //console.log("arrayAppend");
  // helper functions
  const failedToUpsertHandler = (bucketCollectionName, newArrayElement, bucketSearchId, updateResult) => {
    const errorMessage = `failed to upsert '${bucketCollectionName}'-collection with transaction: ${JSON.stringify(newArrayElement)} `;
    console.log('search object:', JSON.stringify(bucketSearchId));
    console.log('update reult:', JSON.stringify(updateResult));
    console.error(errorMessage);
    return errorMessage;
  }; 
  
  const generalErrorHandler = (err, bucketSearchId) => {
    const errorMessage = `Failed to update the item: ${err}`;
    console.log('search object:', JSON.stringify(bucketSearchId));
    console.log(errorMessage);
    return errorMessage;
  };

  // bucket configuration
  const bucketSize = context.values.get("bucketSize");
  const arrayFieldName = "transactions";
  const arrayElementIdName = "transaction_id";
  const $arrayFieldName = "$" + arrayFieldName;
  
  if(docs.length === 0) return {"update Count": 0, message: "no documents to transform"};
  
  commands = docs.map(doc => {
    // transaction_id generation
  const newArrayElement = doc;
  newArrayElement[arrayElementIdName] = newArrayElement.acquirer_id+"-"+newArrayElement.card_acceptor_num+"-"+newArrayElement.transactions_num+"-"+newArrayElement.pmnts_settl_expect_date;
 
  // day integer generation
  const dayInteger =  context.functions.execute("purchaseDateToDayInteger", newArrayElement.purchase_date);
  //newArrayElement.purchase_date = context.functions.execute("purchaseDateToISODate", newArrayElement.purchase_date);
 
  // aggregated fields
  const amountFieldName = "trx_orig_amt";
  newArrayElement[amountFieldName] = parseFloat(newArrayElement[amountFieldName]);
  const currencyFieldName = "settl_curr_code";
  const cardTypeFieldName = "card_schemes";
  const orgNumberFieldName = "settl_card_acc_org_num";
  const batchRefNumFieldName = "batch_ref_num";
  
  // signaling field
  const opFieldName = "op";

  // search id
  const bucketSearchId = { "agreement_id" : newArrayElement.agreement_id, "day": dayInteger, "count": { $lt: bucketSize}  };
  


  const bucketUpdateObejct = { 
      $push: { transactions: newArrayElement }, 
      $inc: { count: 1 },
      $max: { maxAmount: newArrayElement[amountFieldName] },
      $min: { minAmount: newArrayElement[amountFieldName] },
      $addToSet: { 
        currencies: newArrayElement[currencyFieldName], 
        cardTypes: newArrayElement[cardTypeFieldName], 
        batchRefNumbers: newArrayElement[batchRefNumFieldName]
      },
      $set: { org_num: newArrayElement[orgNumberFieldName]  }
    };

  return { updateOne :
            {
               "filter" : bucketSearchId,
               "update" :bucketUpdateObejct,
               "upsert": true
            }
         };
  });

  // database access
  const clusterName = context.values.get("serviceName");
  const dbName = context.values.get("databaseName");
  const service = context.services.get(clusterName);
  const db = service.db(dbName);
  const bucketCollection = db.collection(bucketCollectionName);
  
  return bucketCollection.bulkWrite(commands, {ordered:false});
};
