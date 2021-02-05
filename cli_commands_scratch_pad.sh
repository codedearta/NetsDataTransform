
# transform1-oqphh app
realm-cli login --api-key="lizvohcl" --private-api-key="d1f6d1d3-36e6-4fe9-9835-09ac9617f53d"


# export transform1-oqphh app
realm-cli export \
  --app-id=transform1-oqphh \
  --output=./transformApp_2 \
  --for-source-control

# import transform1-oqphh app
realm-cli import \
  --project-id "5f687047453409269d2133e7"



# import transform1-oqphh app
realm-cli import \
  --app-id=transform1-oqphh \
  --path=./transformApp \
  --strategy=replace-by-name

# create new app
sed -i ''  "/\"id\":/d" */*.json */*.json functions/*/*.json services/*/*.json services/*/*/*.json services/*/*/*/*.json
sed -i '' "/\"app_id\":/d" config.json
sed -i '' "s/null/\"cl0-t-mypay\"/g" ./services/mongodb-atlas/config.json
realm-cli import \
  --project-id "5f687047453409269d2133e7"
  # change the name manually here


grep "Successfully imported" rubish.txt | awk '{print $3}' | sed "s/\'//g"




["transform1-oqphh"
,"transform2-lhmlo"
,"transform3-mpihz"
,"transform4-fziyv"
,"transform5-tfhrr"
,"transform6-czjyj"
,"transform7-daelp"
,"transform8-hyqgj"
,"transform9-nmxar"
,"transform10-pjwhs"
,"transform11-fctgn"
,"transform12-rtszz"
,"transform13-uqmlp"
,"transform14-azbvr"
,"transform15-clfxv"]

new collection name "TRX_LANDING_JAN_2020"

realm-cli secrets add --app-id "transform1-oqphh" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform2-lhmlo" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform3-mpihz" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform4-fziyv" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform5-tfhrr" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform6-czjyj" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform7-daelp" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform8-hyqgj" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform9-nmxar" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform10-pjwhs" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform11-fctgn" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform12-rtszz" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform13-uqmlp" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform14-azbvr" --name landingSecret --value "mongo_landing_2018_Q1"
realm-cli secrets add --app-id "transform15-clfxv" --name landingSecret --value "mongo_landing_2018_Q1"


node nodeApp_v2.js \
-s '2018-01-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q1' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2018-01-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q1' \
--bucketCollection 'mongo_buckets' \
--sequences 1786 \
--parallelCalls 100 \
--secondsRange 3 \



node nodeApp_v2.js \
-s '2018-01-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q1' \
--bucketCollection 'mongo_buckets' \
--sequences 1 \
--parallelCalls 100 \
--secondsRange 3 \



================


node nodeApp_v2.js \
-s '2018-01-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q1' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \


node nodeApp_v2.js \
-s '2018-04-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q2' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2018-07-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q3' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2018-10-01T00:00:00' \
--landingCollection 'mongo_landing_2018_Q4' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2019-01-01T00:00:00' \
--landingCollection 'mongo_landing_2019_Q1' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \


node nodeApp_v2.js \
-s '2019-04-01T00:00:00' \
--landingCollection 'mongo_landing_2019_Q2' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2019-07-01T00:00:00' \
--landingCollection 'mongo_landing_2019_Q3' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2019-10-01T00:00:00' \
--landingCollection 'mongo_landing_2019_Q4' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \


node nodeApp_v2.js \
-s '2020-01-01T00:00:00' \
--landingCollection 'mongo_landing_2020_Q1' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \


node nodeApp_v2.js \
-s '2020-04-01T00:00:00' \
--landingCollection 'mongo_landing_2020_Q2' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2020-07-01T00:00:00' \
--landingCollection 'mongo_landing_2020_Q3' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \

node nodeApp_v2.js \
-s '2020-10-01T00:00:00' \
--landingCollection 'mongo_landing_2020_Q4' \
--bucketCollection 'mongo_buckets' \
--sequences 4464 \
--parallelCalls 4 \
--secondsRange 3 \