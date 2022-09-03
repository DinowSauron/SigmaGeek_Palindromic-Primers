import fs from "fs";
import settings from "./config";
import {
  Worker, isMainThread, workerData
} from "worker_threads";
import findDigits from "./worker";


const last = settings.useArchive.lastArchive;
const first = settings.useArchive.firstArchive;




if (isMainThread) {
  const maxThreads = settings.coreCount;


  const diff = (last - first) / maxThreads;
  let searchIndex = first;
  var digits = settings.digitsToFind;

  
  fs.writeFileSync(`./saves/MultiThread.json`, JSON.stringify({nextArchive: first}));

  saveArchive("\nNew Verification in: "+ new Date().toLocaleString() + "  " + digits + "D  - " + maxThreads +" Threads");
  // console.log("Task Splited in",Math.ceil(diff));
  console.log("Starting Multithreading Workers -", maxThreads, "Threads");
  for(var x = 0; x <= maxThreads-1;x++){

    //const searchIndexes = [ Math.ceil(searchIndex) + (x==0?0:1), Math.ceil(searchIndex + diff) ]
    searchIndex += diff;
    
    const worker = new Worker(__filename, {
      workerData: {workIndex: x+1}
    });
    worker.on("message", (message) => {
      const txt = message.join(" ").toString()
      const colors = ["\x1b[31m", "\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m", "\x1b[37m"];
      console.log(colors[message[0] - 1],txt, "\x1b[0m");
    })
    
    
    // console.log("Work Ranges:", worker.threadId);
  }
} else {
  const data = workerData;

  setTimeout(() => {
    // console.log(data.workIndex)
    findDigits.Start({
      searchRange: data.search,
      processIndex: data.workIndex
    });

    
    console.log("Finished job:", data.workIndex);
  }, data.workIndex * 2548);
  

  
  // parentPort && parentPort.postMessage({data: "idk"});
}



function saveArchive(txt: string){
  var prevTxt = "";
  if(fs.existsSync(`./saves/ArchivesVerifyed.txt`))
    prevTxt = fs.readFileSync(`./saves/ArchivesVerifyed.txt`, {encoding:'utf8'});
  const saveTxt = prevTxt + "\n" + txt;
  fs.writeFileSync(`./saves/ArchivesVerifyed.txt`, saveTxt);
}