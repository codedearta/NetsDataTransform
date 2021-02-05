
intervall = 60*5;
var startDate = new Date("2018-01-01T06:00:00");
var endDate = new Date("2018-01-01T06:05:00");


secondsPerQuarter = 93*24*60*60;

for(var sec=0;sec<=secondsPerQuarter;sec+=intervall) {
    startDate.setSeconds(startDate.getSeconds() + intervall);
    endDate.setSeconds(endDate.getSeconds() + intervall);

    print("startDate",startDate, "endDate". endDate);
    docs = db.mongo_landing_2018_Q1.find({ purchase_date: { $gte: startDate, $lt: endDate } }, { settl_card_acc_org_num: 1, agreement_id: 1, _id:0}).toArray();
    
    
    var bulk = db.mongo_organisations.initializeUnorderedBulkOp();
    docs.forEach(doc => {
        bulk
            .find( { _id: doc.settl_card_acc_org_num } )
            .upsert()
            .updateOne(
                {    
                    $addToSet: { 
                        agreements: doc.agreement_id 
                    }
                }
            );
        }
    );
    result = bulk.execute();
    print("result", result);
}