function searchTransactions(filter) {
  const { fromDate, toDate, agreementIds, filterName = "no_filter", filterValue, bucketFilterName, bucketFilterName2 } = filter;
  const dateToDayInteger = (date) => {
    return (
      date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    );
  };
  const fromDayInt = dateToDayInteger(fromDate);
  const toDayInt = dateToDayInteger(toDate);
  const $match = {
    $match: {
      agreement_id: { $in: agreementIds },
      day: { $lt: toDayInt, $gte: fromDayInt },
      transactions: {
        $elemMatch: {
          purchase_date: { $gte: fromDate, $lt: toDate },
        },
      },
    },
  };
  if(bucketFilterName2) {
    $match.$match[bucketFilterName] = { "$gte": filterValue };
    $match.$match[bucketFilterName2] = { "$lte": filterValue };
  } else if(bucketFilterName) { 
    $match.$match[bucketFilterName] = filterValue; 
  }
  
  const $arrayFilter = {
    $project: {
      transactions: {
        $filter: {
          input: "$transactions",
          as: "item",
          cond: {
            $and: [
              { $gte: ["$$item.purchase_date", fromDate] },
              { $lt: ["$$item.purchase_date", toDate] },
            ],
          },
        },
      },
    },
  };

  if(filterName === "no_filter" || filterName === "all_sales_locations") { 
  } else {
    $match.$match.transactions.$elemMatch[filterName] = filterValue;
    $arrayFilter.$project.transactions.$filter.cond.$and.$eq = ["$$item." + filterName, filterValue];
  }

  const $project = { $project: { "transactions._id": 0 } };
  const pipeline = [
    $match,
    $arrayFilter,
    $project,
    { $unwind: "$transactions" },
    { $replaceRoot: { newRoot: "$transactions" } },
    { $count: "count"}
  ];
  return pipeline
}

function runSingleForOrgs(dbContext, organisations, filter) {
    const { dbName, organisationsCollectionName, bucketsCollectionName } = dbContext;
    const { fromDate, toDate, filterName = "no_filter", filterValue } = filter;

    print("---------------------------------------------------");
    print(`# Query name:  ${filterName}`);
    print(`# Query filter ${filterValue}`);

    print(`# Query from:  ${fromDate}`);
    print(`# Query to:    ${toDate}`);
    print("---------------------------------------------------");

    let sumExecutionTime=0;
    let minExecutionTime=999999999999;
    let maxExecutionTime=0;

    organisations.forEach(orgId => {
        const agreementIds = db.getSiblingDB(dbName).getCollection(organisationsCollectionName).findOne({ _id: orgId }, { _id: 0 }).agreements;
        filter.agreementIds = agreementIds;
        const pipeline = searchTransactions(filter);
        pipeline.pop();
        const countPipeline = searchTransactions(filter);

        //print("pipeline: " + JSON.stringify(pipeline));

        // first quey (not cached)
        const startUncached = new Date();
        data = db.getSiblingDB(dbName).getCollection(bucketsCollectionName).aggregate(pipeline, {cursor: {batchSize: 50}}).pretty();// Query to run
          if (data.hasNext()) {
          data.next();
        }
        const endUncached = new Date();

        // count
        const startCount = new Date();
        data = db.getSiblingDB(dbName).getCollection(bucketsCollectionName).aggregate(countPipeline, {cursor: {batchSize: 1}}).pretty();// Query to run
        var docCount = 0;
        if (data.hasNext()) {
          docCount = data.next().count;
        }
        const endCount = new Date();

        // second query (cached query)
        const date1 = new Date();
        data = db.getSiblingDB(dbName).getCollection(bucketsCollectionName).aggregate(pipeline, {cursor: {batchSize: 50}}).pretty();// Query to run
        if (data.hasNext()) {
          data.next();
        }
        const date2 = new Date();

        const diffTime = Math.abs(date2 - date1);
        const countDiffTime = Math.abs(endCount - startCount);
        const diffTimeUncached = Math.abs(endUncached - startUncached);
        sumExecutionTime+=diffTime;

        let resString = `Organisation Id: ${orgId} | # agreements: ${agreementIds.length} | query-latency (un-cached): ${diffTimeUncached}ms | result set count: ${docCount} in ${countDiffTime}ms | query-latency (cached): ${diffTime}ms `;
        print(resString);

        if(maxExecutionTime < diffTime) maxExecutionTime = diffTime; 
        if(minExecutionTime > diffTime) minExecutionTime = diffTime; 
    });

    print("### Statistics ###");
    print("average: "+sumExecutionTime/organisations.length+"ms");
    print("min: "+minExecutionTime+"ms");
    print("max: "+maxExecutionTime+"ms");
    return { 
        average: sumExecutionTime/organisations.length,  
        min: minExecutionTime, 
        max: maxExecutionTime, 
        queryType: filterName 
    };
}

function runAllSalesLocations(dbContext, query) {
  const allOrgsCursor = db.getSiblingDB(dbContext.dbName).getCollection(dbContext.organisationsCollectionName).find();

  if(allOrgsCursor.hasNext()) {
    const firstOrg = [allOrgsCursor.next()._id];
    return runSingleForOrgs(dbContext, firstOrg, query);
  }
  return { 
    average: -1,  
    min: -1, 
    max: -1, 
    queryType: "all_sales_locations" 
  };
}

function runAll() {
  const dbContext = {
    dbName: "DWH_TEST",
    organisationsCollectionName: "mongo_organisations",
    bucketsCollectionName: "mongo_buckets"
  }

  const testOrganisations = [
    "90980790"
    ,"8869666969"
    ,"78608998"
    ,"96699979"
    ,"60786678"
    ,"990890900"
    ,"70068906"
    ,"67706008"
    ,"99770678"
    ,"98986776"
  ];

  const from = new Date("2020-10-01");
  const to = new Date("2020-10-31");

  const results = [];

  print("############################################ START #########################################");
  startingTest = new Date();
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "trx_orig_amt", filterValue: 263.4, bucketFilterName: "maxAmount", bucketFilterName2: "minAmount" }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "orig_curr_code", filterValue: "DKK", bucketFilterName: "currencies" }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "card_schemes", filterValue: "VI", bucketFilterName: "cardTypes" }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "batch_ref_num", filterValue: "nnnnn6003292", bucketFilterName: "batchRefNumbers" }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "auth_ref_num", filterValue: "nnn460" }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "card_num_last_4digit", filterValue: "7835" }));
  results.push(runSingleForOrgs(dbContext, testOrganisations, { fromDate: from, toDate: to, filterName: "trans_ref_num_1", filterValue: "nnn499" }));
  results.push(runAllSalesLocations(dbContext, { fromDate: from, toDate: to, filterName: "all_sales_locations" }));
  print("##################################### Summary statistic #####################################");
  results.forEach(r => {  
    print(`query type: ${r.queryType} | avg: ${r.average}ms | min: ${r.min}ms | max: ${r.max}ms `); 
  });
  endingTest = new Date();
  print("##  starting date of the test: " + startingTest);
  print("##  ending date of the test: " + endingTest);
  print("############################################ END ############################################");
};

runAll();