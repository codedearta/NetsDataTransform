const Realm = require("realm");
const moment = require('moment');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');
console.log("commandline args: ");
console.dir(argv);

const appId = "transform1-oqphh"; // Set Realm app ID here.


let lastEnd= moment(argv.s);
function giveNextRange(seconds) {
    let ret = { 
       start: lastEnd,
       end: moment(lastEnd).add(seconds,"s")
    };

    lastEnd = ret.end;
    console.info(`processing range: ${JSON.stringify(ret)}`);
    return ret;
}

async function run(appId, appNumber) {
  let user;
  try {
    errorLogs = [];
    transformStart = moment();
    const app = new Realm.App({ id: appId, timeout: 90000 });
    const credentials = Realm.Credentials.anonymous();
    user = await app.logIn(credentials);
    const parallelFunctionCalls = argv.parallelCalls;
    const sequences = argv.sequences;

    overallUpdates = 0;
    overallDuration = moment.duration();
    for(let sequence=1;sequence<=sequences;sequence++) {
        console.log(`starting seconds ${appNumber*sequence*parallelFunctionCalls} appNumber: ${appNumber}`);
        nextRange = giveNextRange(parallelFunctionCalls*argv.secondsRange);
        let start = nextRange.start;
        let end = moment(start).add(argv.secondsRange,"s");

        const calls = [];

        execBegin = moment();
        for(let i=0; i<parallelFunctionCalls;i++) {
            console.log(`app: ${appNumber} ${appId}, start: ${start}, dunctionCall Nr: ${i}`);
            console.log(`app: ${appNumber} ${appId}, end: ${end}, dunctionCall Nr: ${i}`);
            calls.push(
                user.functions.transformRange(start.toDate(), end.toDate(), argv.landingCollection, argv.bucketCollection)
                .catch(e => { 
                    errorLog = { 
                        exception: e,
                        range: {
                          start: start,
                          end: end
                        }
                    };
                    // Note the start and end are not acurate. We should return the dates in the server code
                    errorLogs.push(errorLog);
                    console.dir(JSON.stringify(errorLog.exception.message));
                    return {"update Count": 0, errorLog: errorLog };
                }));
            start = start.add(argv.secondsRange,"s");
            end = end.add(argv.secondsRange,"s");
        }
        
        results = await Promise.all(calls);

        execEnd = moment();

        var duration = moment.duration(execEnd.diff(execBegin))
        overallDuration = overallDuration.add(duration);
        totalUpdates = results.map(i => i["update Count"]).reduce((acc, curr) => acc+curr);
        
        overallUpdates += totalUpdates;
        console.log(`results app ${appNumber} ${appId} sequence ${sequence} total updates: ${totalUpdates}, duration: ${duration.seconds()}s ${duration.milliseconds()}ms`);
        if(sequence===sequences) { console.log(`app ${appNumber} is done.`); }
    }
    transformEnd = moment();

    fs.writeFile(argv.landingCollection+"-"+appId+'-error.log', JSON.stringify(errorLogs), function (err) {
      if (err) return console.log(err);
      console.log('error log is in > error.log');
    }); 

    console.log("errosLogs (short errors): ");
    formattedErrors = errorLogs.map(err => `message: ${err.exception.message} range from: ${err.range.start} end: ${err.range.end}`);
    console.dir(formattedErrors);
    
    const rt = moment.duration(transformEnd.diff(transformStart));
    const runtime = `${rt.hours()}h ${rt.minutes()}m ${rt.seconds()}s`;
    const summary = {
      "overall_updates": overallUpdates,
      "transformStart": `${transformStart}`,
      "transformEnd": `${transformEnd}`,
      "runtime": `${runtime}`,
      "last_processing_date": `${lastEnd}`,
      "argv": argv,
      "numberOfErrors": errorLogs.length
    };
    console.log("runtime summary: ");
    console.dir(summary);
   
  } catch(e) {
    console.log(e);
    //process.exit(1);
  } finally {
    //user.logOut();
    //process.exit(1);
  }
};

 
appIds = ["transform1-oqphh"
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
,"transform15-clfxv"];

appIds = ["transform1-oqphh", "transform2-lhmlo"];

appIds.forEach((appId, idx) =>  {
   appNumber = idx+1;
   run(appId, appNumber).catch(console.dir);
});

