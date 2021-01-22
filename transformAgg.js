
dbname = "DWH_TEST";
landingCollectionName = "mongo_landing";
bucketCollectionName = "mongo_solution_agg_pipeline";

db = db.getSiblingDB(dbname);
landingCollection = db.getCollection(landingCollectionName);

match = { 
    $match: { 
        purchase_date: { 
            $gte: new Date("2020-01-03T09:30:00"), 
            $lt: new Date("2020-01-03T09:30:01")
        }
    }
};


merge = { $merge: {
    into: bucketCollectionName,
    on: [ "day", "agreement_id"],
    //let: <variables>,                                         // Optional
    whenMatched: <replace|keepExisting|merge|fail|pipeline>,  // Optional
    whenNotMatched: <insert|discard|fail>                     // Optional
} }

merge = { 
    $merge: {

    }
};

landingCollection.aggregate(match);