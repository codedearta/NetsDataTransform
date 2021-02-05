echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2020-07-01T00:00:00' --landingCollection 'mongo_landing_2020_Q3' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2020-07-01T00:00:00' --landingCollection 'mongo_landing_2020_Q3' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2020-10-01T00:00:00' --landingCollection 'mongo_landing_2020_Q4' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2020-10-01T00:00:00' --landingCollection 'mongo_landing_2020_Q4' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2018-01-01T00:00:00' --landingCollection 'mongo_landing_2018_Q1' --bucketCollection 'mongo_buckets' --sequences 4320 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2018-01-01T00:00:00' --landingCollection 'mongo_landing_2018_Q1' --bucketCollection 'mongo_buckets' --sequences 4320 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2018-01-01T00:00:00' --landingCollection 'mongo_landing_2018_Q1_Dankort' --bucketCollection 'mongo_buckets' --sequences 4320 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2018-01-01T00:00:00' --landingCollection 'mongo_landing_2018_Q1_Dankort' --bucketCollection 'mongo_buckets' --sequences 4320 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2018-04-01T00:00:00' --landingCollection 'mongo_landing_2018_Q2' --bucketCollection 'mongo_buckets' --sequences 4368 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2018-04-01T00:00:00' --landingCollection 'mongo_landing_2018_Q2' --bucketCollection 'mongo_buckets' --sequences 4368 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2018-04-01T00:00:00' --landingCollection 'mongo_landing_2018_Q2_Dankort' --bucketCollection 'mongo_buckets' --sequences 4368 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2018-04-01T00:00:00' --landingCollection 'mongo_landing_2018_Q2_Dankort' --bucketCollection 'mongo_buckets' --sequences 4368 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2018-07-01T00:00:00' --landingCollection 'mongo_landing_2018_Q3' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2018-07-01T00:00:00' --landingCollection 'mongo_landing_2018_Q3' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log

echo "Start:"`date` >> processing.log
echo "node nodeApp_v3.js -s '2018-10-01T00:00:00' --landingCollection 'mongo_landing_2018_Q4' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3" >> processing.log
node nodeApp_v3.js -s '2018-10-01T00:00:00' --landingCollection 'mongo_landing_2018_Q4' --bucketCollection 'mongo_buckets' --sequences 4416 --parallelCalls 40 --secondsRange 3
echo "Finish:"`date` >> processing.log