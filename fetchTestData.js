match = { $match : {purchase_date: { $gte: new Date("2018-01-01T00:00:00"), $lt: new Date ("2018-01-01T00:01:00") } } };
out = { $out: "mongo_landing_java_test" }

db.mongo_landing_2018_Q1.aggregate(match, out)

mongoexport --uri="mongodb+srv://sepp:sepp@cl0-t-mypay.dnftm.azure.mongodb.net/DWH_TEST" --collection=mongo_landing_java_test --out=mongo_landing_2018_Q1.json
mongoimport --db=DWH_TEST --collection=mongo_landing mongo_landing_2018_Q1.json