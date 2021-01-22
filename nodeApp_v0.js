const Realm = require("realm");
const moment = require('moment');
const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

const appId = "transform1-oqphh"; // Set Realm app ID here.


let lastEnd= moment(argv.s);
function giveNextRange(parallelFunctionCalls) {
    let ret = { 
       start: lastEnd,
       end: moment(lastEnd).add(parallelFunctionCalls,"s")
    };

    lastEnd = ret.end;

    return ret.start;
}

async function run(appId, appNumber) {
  let user;
  try {
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
        let start = giveNextRange(parallelFunctionCalls);
        let end = moment(start).add(1,"s");

        const calls = [];
        const seconds = parallelFunctionCalls;

        console.log(`app: ${appNumber} ${appId} start: ${start}`);


        // async function* asyncGenerator(start, end) {
        //     for(let i=0; i<seconds-1;i++) {
        //         start = start.add(1,"s");
        //         end = end.add(1,"s");
        //         yield calls.push(user.functions.transformRange(start.toDate(), end.toDate()));
        //     }
        // }

        // for await (let call of asyncGenerator(start, end)) {
        //     console.log(call);
        //     //console.log(num);
        // }

        execBegin = moment();
        for(let i=0; i<seconds;i++) {
            calls.push(user.functions.transformRange(start.toDate(), end.toDate()))
            // .catch(e => `exception ${e} start: ${start} end: ${end}`);
            start = start.add(1,"s");
            end = end.add(1,"s");
        }

        // async function* asyncGenerator(calls) {
        //     for(i=0; i<calls.length;i++) {
        //         yield calls[i];
        //     }
        // }

        // execBegin = moment();
        // result = [];
        // for await (let call of asyncGenerator(calls)) {
        //     console.log(call);
        //     result.push(call);
        //     console.log("call result ", call);
        //      //console.log(num);
        // }
        // execEnd = moment();

        console.log(`app: ${appNumber} ${appId} end: ${end}`);

        
        result = await Promise.all(calls);
        execEnd = moment();

        var duration = moment.duration(execEnd.diff(execBegin))
        overallDuration = overallDuration.add(duration);
        console.log("result:",result);
        totalUpdates = result.map(elem => elem["update Count"]).reduce((acc, curr) => acc+curr);
        console.log("totalUpdates:",totalUpdates);
        overallUpdates += totalUpdates;
        console.log(`result app ${appNumber} ${appId} sequence ${sequence} total updates: ${totalUpdates}, duration: ${duration.seconds()}s ${duration.milliseconds()}ms`);
        if(sequence===sequences) { console.log(`app ${appNumber} is done.`); }
    }
    transformEnd = moment();
    console.log(`overall updates: ${overallUpdates}, overallDuration: ${overallDuration.hours()}h ${overallDuration.minutes()}m ${overallDuration.seconds()}s ${overallDuration.milliseconds()}ms`);
    console.log(`transformStart ${transformStart}, transformEnd ${transformEnd}`);
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

appIds = ["transform1-oqphh"];

appIds.forEach((appId, idx) =>  {
   appNumber = idx+1;
   run(appId, appNumber).catch(console.dir);
});