realm-cli login --api-key="lizvohcl" --private-api-key="d1f6d1d3-36e6-4fe9-9835-09ac9617f53d"
realm-cli export --app-id=transform1-oqphh --output=./transformApp_2 --for-source-control

realm-cli export  --app-id=transform1-oqphh --output=./redpRealApp_1
realm-cli export  --app-id=transform2-lhmlo --output=./redpRealApp_2
realm-cli export  --app-id=transform3-mpihz --output=./redpRealApp_3
realm-cli export  --app-id=transform4-fziyv --output=./redpRealApp_4
realm-cli export  --app-id=transform5-tfhrr --output=./redpRealApp_5
realm-cli export  --app-id=transform6-czjyj --output=./redpRealApp_6
realm-cli export  --app-id=transform7-daelp --output=./redpRealApp_7
realm-cli export  --app-id=transform8-hyqgj --output=./redpRealApp_8
realm-cli export  --app-id=transform9-nmxar --output=./redpRealApp_9
realm-cli export --app-id=transform10-pjwhs --output=./redpRealApp_10
realm-cli export --app-id=transform11-fctgn --output=./redpRealApp_11
realm-cli export --app-id=transform12-rtszz --output=./redpRealApp_12
realm-cli export --app-id=transform13-uqmlp --output=./redpRealApp_13
realm-cli export --app-id=transform14-azbvr --output=./redpRealApp_14
realm-cli export --app-id=transform15-clfxv --output=./redpRealApp_15


cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_2/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_3/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_4/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_5/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_6/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_7/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_8/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_9/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_10/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_11/functions/bulkArrayAppend/source.js

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_12/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_13/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_14/functions/bulkArrayAppend/source.js 

cp redpRealApp_1/functions/bulkArrayAppend/source.js redpRealApp_15/functions/bulkArrayAppend/source.js

realm-cli import  --app-id=transform1-oqphh --path=./redpRealApp_1 -y

realm-cli import  --app-id=transform2-lhmlo --path=./redpRealApp_2 -y

realm-cli import  --app-id=transform3-mpihz --path=./redpRealApp_3 -y

realm-cli import  --app-id=transform4-fziyv --path=./redpRealApp_4 -y

realm-cli import  --app-id=transform5-tfhrr --path=./redpRealApp_5 -y

realm-cli import  --app-id=transform6-czjyj --path=./redpRealApp_6 -y

realm-cli import  --app-id=transform7-daelp --path=./redpRealApp_7 -y

realm-cli import  --app-id=transform8-hyqgj --path=./redpRealApp_8 -y

realm-cli import  --app-id=transform9-nmxar --path=./redpRealApp_9 -y
realm-cli import --app-id=transform10-pjwhs --path=./redpRealApp_10 -y
realm-cli import --app-id=transform11-fctgn --path=./redpRealApp_11 -y
realm-cli import --app-id=transform12-rtszz --path=./redpRealApp_12 -y
realm-cli import --app-id=transform13-uqmlp --path=./redpRealApp_13 -y
realm-cli import --app-id=transform14-azbvr --path=./redpRealApp_14 -y
realm-cli import --app-id=transform15-clfxv --path=./redpRealApp_15 -y


========


sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_2/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_3/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_4/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_5/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_6/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_7/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_8/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_9/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_10/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_11/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_12/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_13/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_14/services/mongodb-atlas/config.json
sed -i '' "s/cl0-t-mypay/TransformTest/g" redpRealApp_15/services/mongodb-atlas/config.json