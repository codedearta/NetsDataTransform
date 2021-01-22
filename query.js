
filter = {"agreement_id":{"$in":["20209540557_22651743"]},"day":{"$lt":20180105,"$gte":20180101}, "maxAmount":{"$gte":263.4},"minAmount":{"$lte":263.4} };
filter.transactions = { 
    "$elemMatch": {
        "purchase_date": {
            "$gte": new Date("2018-01-01T00:00:00.000Z"),
            "$lt": new Date("2018-01-05T00:00:00.000Z")
        },
        "trx_orig_amt":263.4
    }
};
match = {"$match":filter};

project1 = {
    "$project": {
        "transactions": {
            "$filter": {
                "input": "$transactions",
                "as":"item",
                "cond": {
                    "$and":[
                        {"$eq":["$$item.trx_orig_amt",263.4]},
                        {"$gte":["$$item.purchase_date",new Date("2018-01-01T00:00:00.000Z")]},
                        {"$lt":["$$item.purchase_date",new Date("2018-01-05T00:00:00.000Z")]}
                    ]
                }
            }
        }
    }
};

project2 = {"$project":{"transactions._id":0}};
unwind = {"$unwind":"$transactions"};
replaceRoot = {"$replaceRoot":{"newRoot":"$transactions"}};
pipeline = [match, project1, project2, unwind, replaceRoot];

pipeline = [match];
db.mongo_buckets_solution_5.aggregate(pipeline);


