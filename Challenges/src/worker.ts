// Find the first 9-digit palindromic prime contained in the decimal expansion of π (3,1415…)
import fs from "fs"
import settings from "./config";
import {
  parentPort
} from "worker_threads";

type FindBiggestProps = {
  searchRange: number[],
  processIndex: number
}

function Start(props: FindBiggestProps) {

  function GetPI_fromArchive(achiveNumber=0){
    const archNum = achiveNumber.toString().padStart(3, "0")
    
    const locale = settings.useArchive.archivesLocation;
    const fileName = settings.useArchive.archivesNames;
    const piNum = fs.readFileSync(`${locale}${fileName}.${archNum}`,{encoding:'utf-8'})

    
    return {
      pi: piNum.replace("3.","3"), //3.1415926...
      piLeng: piNum.length
    } //piNum;
  }

  function DetectPalindromicsInPI(pi='3141', piStart=0){
    
    const startDate = new Date();
    const digitsNum = digits;

    let lastDigits = [0];
    

    for(let n=0;n < pi.length;n++) {
      // Create the last digits
      lastDigits.length = digitsNum - 1;
      const currentDigits = [Number(pi[n]), ...(lastDigits)];


      if(Detect(currentDigits)){ // odd
        recall = true;
        const index =  n-digitsNum+1;
        IsPrime(currentDigits.toString().replaceAll(",", ""), index + piStart);

        const newDigit = digitsNum + 2;
        if(digits < newDigit) 
          digits = newDigit;
          
      }

      currentDigits.pop(); // remove 1 to even
      if(Detect(currentDigits)){ // even
        recall = true;
        const index =  n-digitsNum+1;
        IsPrime(currentDigits.toString().replaceAll(",", ""), index + piStart);


        const newDigit = digitsNum + 1;
        if(digits < newDigit) 
          digits = newDigit;
      }


      lastDigits = currentDigits;
      
      (n % settings.debug.logRange == 0) ? debugLog(`Detect x"${n.toString().padStart(10," ")}  In ${(piStart + n).toLocaleString()}`):""

      function Detect(currentDigits: number[]) {
        const index =  n-currentDigits.length+1;
        if(IsPalindromic(currentDigits, index)){
          return true;
        };
        return false;
      }
    }

    debugLog("End in "+ (new Date().getTime() - startDate.getTime()) + "ms");



    function IsPalindromic(num: number[], index: number) {
      if(num[0] != num[num.length-1])
        return false;
      
      var isPalindromic = true;
      for(var x=1,y = num.length-2; x < y;x++, y--)
        if(num[x] != num[y]){
          isPalindromic = false;
          break;
        }
      
      if(isPalindromic){
        debugLog("Find Palindromic:", num.join(""), " > at ", (index + piStart + 1));// + settings.useArchive.archiveX_100b));  VERIFY THIS POSITION

        return true;
      }
      return false;
    }


    


    
    function IsPrime(num: string, index=0){
      const startDate = new Date();
      let isPrime = true;
      const numLong = BigInt(num);

      if(numLong % 2n === 0n){
        isPrime = false;
        return;
      }
      for(var i=3n;i*i <= numLong;i=i+2n){
        if(numLong % i === 0n && i != numLong){
          isPrime = false;
          break;
        }
        if(i % 100000003n === 0n) {
          if(i.toString().length >= numLong.toString().length/2+1)
            break;
          if(i >= 100000000*5)
            break;
          
          settings.debug.advancedMode && debugLog("X 100.000.000     >", num,"of ",i);
        }
      }


      if(isPrime){
        const digitsNum = num.toString().length;
        debugLog(`The Number ${num} is PRIME               -                Saved.`)
        debugLog("Finished in "+ (new Date().getTime() - startDate.getTime()) + "ms")
        var prevTxt = "";
        if(fs.existsSync(`./saves/primes_x-${digitsNum}.txt`))
        prevTxt = fs.readFileSync(`./saves/primes_x-${digitsNum}.txt`,{encoding:'utf8'});
        const x100b = settings.useArchive.archiveX_100b;
        const saveTxt = prevTxt + "\n" +
        startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')  + " > " +
        num.toString().replaceAll(",",", ") + "  at >  "+ (index + 1) +"  | AchiveX100b:" + x100b + " / " + archNum;

        fs.writeFileSync(`./saves/primes_x-${digitsNum}.txt`, saveTxt)
      }
    }

  }


  let nextArchive = settings.useArchive.firstArchive;
  if(fs.existsSync(`./saves/MultiThread.json`))
    nextArchive = Number(JSON.parse(fs.readFileSync(`./saves/MultiThread.json`, {encoding:'utf8'})).nextArchive);
    fs.writeFileSync(`./saves/MultiThread.json`, JSON.stringify({nextArchive: nextArchive+1}));
  debugLog(nextArchive)

  
  
  var archNum = nextArchive;
  const lastArch = settings.useArchive.lastArchive;
  var digits = settings.digitsToFind;
  var recall = false;
  Search()

  function Search(){

    while (archNum <= lastArch) {
      recall = false;
      const piInfo = GetPI_fromArchive(archNum) 
      const archiveBillion = settings.useArchive.archiveX_100b * 100000000000;
      debugLog("Verifying Archive:",archNum.toString().padStart(3," "), "  - with: ", digits,"D");
      DetectPalindromicsInPI(piInfo.pi, (piInfo.piLeng * (archNum - 1)) + archiveBillion);
      if(recall){
        debugLog("Recalling", archNum);
        //Archive 4 > Recall Actived.  Digits:22
        saveArchive(`(${settings.useArchive.archiveX_100b}) Archive ${archNum} > Recall Actived.  Digits: ${digits}`);
        // return to recall
      } else {
        
        // save...
        saveArchive(`(${settings.useArchive.archiveX_100b}) Archive ${archNum} > Completed Verification.`);
        digits = settings.digitsToFind;

        // le o proximo arquivo que deve acessar
        // assim os threads leem de forma linear
        nextArchive = Number(JSON.parse(fs.readFileSync(`./saves/MultiThread.json`, {encoding:'utf8'})).nextArchive);
        fs.writeFileSync(`./saves/MultiThread.json`, JSON.stringify({nextArchive: nextArchive+1}));
        archNum = nextArchive;
      }
    }
  }



  function debugLog(logMsg: any, ...optionalParams: any[]){
    
    parentPort && parentPort.postMessage([props.processIndex,"-",logMsg,...optionalParams]);
    // console.log(logMsg,optionalParams)
  }
  function saveArchive(txt: string){
    var prevTxt = "";
    if(fs.existsSync(`./saves/ArchivesVerifyed.txt`))
      prevTxt = fs.readFileSync(`./saves/ArchivesVerifyed.txt`, {encoding:'utf8'});
    const saveTxt = prevTxt + "\n" + txt;
    fs.writeFileSync(`./saves/ArchivesVerifyed.txt`, saveTxt);
  }
}

export default {
  Start
}