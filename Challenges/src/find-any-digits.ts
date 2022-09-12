// Find the first 9-digit palindromic prime contained in the decimal expansion of π (3,1415…)
import fs from "fs"
import settings from "./config";
const complexDebug = settings.debug.advancedMode;

function GetPI_Decimals(decimals=14){
  if(decimals)
  // generate PI algorithm
  console.log("Generating PI number...")
  const startDate = new Date();
  let i = 1n;
  let x = 3n * (10n ** BigInt(decimals + 20));
  let pi = x;
  while (x > 0) {
    x = x * i / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
    if(complexDebug && (new Date().getMilliseconds()) % 3000 === 0){
      console.log("computed:", (i/2n).toString().padStart(7,"_"))
    }
  }
  console.log("Finished PI_Number In "+ (new Date().getTime() - startDate.getTime()) + "ms")
  const piNum = pi / (10n ** 20n);
  return piNum.toString();
}

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

export function DetectPalindromicsInPI(digits=9, pi='3141', piStart=0, debug=true){
  
  const startDate = new Date();
  let recallDigits = digits;
  let lastDigits = [0];

  for(var n=0; n < pi.length;n++) {
    // Create the last digits
    lastDigits.length = digits - 1;
    const currentDigits = [Number(pi[n]), ...(lastDigits)];


    if(Detect(currentDigits)){ // odd
      // recall = true;
      const index =  n-digits;
      IsPrime(currentDigits.toString().replaceAll(",", ""), index + piStart);

      
      const newDigit = digits + 2;
      if(digits < newDigit) 
        recallDigits = newDigit;
        
    }

    currentDigits.pop(); // remove 1 to even
    if(Detect(currentDigits)){ // even
      // recall = true;
      const index =  n-digits;
      IsPrime(currentDigits.toString().replaceAll(",", ""), index + piStart);

      
      const newDigit = digits + 1;
      if(digits < newDigit) 
        recallDigits = newDigit;
    }
    lastDigits = currentDigits;
    
    //(n % settings.debug.logRange == 0) ? console.log(`Detect x"${n.toString().padStart(10," ")}  In ${(piStart + n).toLocaleString()}`):""

    function Detect(currentDigits: number[]) {
      const index =  n-currentDigits.length+1;
      if(IsPalindromic(currentDigits, index)){
        return true;
      };
      return false;
    }
  }
  if(debug)
  console.log("Finished Detection In "+ (new Date().getTime() - startDate.getTime()) + "ms");

  if(recallDigits > digits) {
    console.log("Recall Actived:", recallDigits, "in", piStart)
    DetectPalindromicsInPI(recallDigits, pi, piStart);
  }


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
      console.log("Find Palindromic:", num.join(""), " > at ", (index + piStart + 1));// + settings.useArchive.archiveX_100b));  VERIFY THIS POSITION

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
      if(i % 30000003n === 0n) {
        if(i.toString().length >= numLong.toString().length/2+1)
          break;
        if(i >= 100000000*5)
          break;
        
        console.log("X 30.000.000     >", num,"of ",i);
      }
    }


    if(isPrime){
      const digitsNum = num.toString().length;
      console.log(`The Number ${num} is PRIME               -                Saved.`)
      console.log("Finished in "+ (new Date().getTime() - startDate.getTime()) + "ms")
      var prevTxt = "";
      if(fs.existsSync(`./saves/primes_x-${digitsNum}.txt`))
      prevTxt = fs.readFileSync(`./saves/primes_x-${digitsNum}.txt`,{encoding:'utf8'});
      const x100b = settings.useArchive.archiveX_100b;
      const saveTxt = prevTxt + "\n" +
      startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')  + " > " +
      num.toString().replaceAll(",",", ") + "  at >  "+ (index + 1) +"  |   FindZone / "+ piStart;

      fs.writeFileSync(`./saves/primes_x-${digitsNum}.txt`, saveTxt)
    }
  }
}


function Start(){
  const digits = settings.digitsToFind;

  if(settings.useGeneration.use) {
    VerifyByGeneratedNumber(digits);
  } else {
    VerifyByArchives(digits)
  }

  // generate PI in your machine
  function VerifyByGeneratedNumber(digits: number) {
    const decimals = settings.useGeneration.numbersOfDecimals;
    const piDecimals = GetPI_Decimals(decimals);

    DetectPalindromicsInPI(digits, piDecimals);
  
  }

  // get PI from existing archive
  function VerifyByArchives(digits: number) {
    let archNum = settings.useArchive.firstArchive;
    const lastArch = settings.useArchive.lastArchive;
    saveArchive("\nNew Verification in: "+ new Date().toLocaleString());
    while (archNum <= lastArch) {
      const piInfo = GetPI_fromArchive(archNum) 
      const archiveBillion = settings.useArchive.archiveX_100b * 100000000000;
      DetectPalindromicsInPI(digits, piInfo.pi, (piInfo.piLeng * (archNum - 1)) + archiveBillion);
  

      // save...
      saveArchive("Archive Verifyed: " + archNum);
      console.log(`-Verified Archive: ${archNum}`);
      archNum++;
    }
  }
}

function saveArchive(txt: string){

  var prevTxt = "";
  if(fs.existsSync(`./saves/ArchivesVerifyed.txt`))
    prevTxt = fs.readFileSync(`./saves/ArchivesVerifyed.txt`, {encoding:'utf8'});
  const saveTxt = prevTxt + "\n" + txt;
  fs.writeFileSync(`./saves/ArchivesVerifyed.txt`, saveTxt);
}


//Start();



