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
  let lastDigits = [0];

  for(var n=0; n < pi.length;n++) {
    // Create the last digits
    lastDigits.length = digits - 1;
    const currentDigits = [Number(pi[n]), ...(lastDigits)]
    lastDigits = currentDigits;

    // if have enought digits, search for palindromics
    if(n >= digits-1){
      const index =  n-digits+1;
      IsPalindromic(currentDigits, index)
    }
    if(debug && n % settings.debug.logRange == 0){ // every 1.000k
      console.log(`Detect x"${n.toString().padStart(10," ")}  In ${(piStart + n).toLocaleString()}`)
    }
  }
  if(debug)
  console.log("Finished Detection In "+ (new Date().getTime() - startDate.getTime()) + "ms");




  function IsPalindromic(num: number[], index: number) {
    if(num[0] != num[num.length-1])
      return;
    
    var isPalindromic = true;
    for(var x=1,y = num.length-2; x < y;x++, y--)
      if(num[x] != num[y]){
        isPalindromic = false;
        break;
      }
    
    if(isPalindromic){
      console.log("Find Palindromic:", num.join(""), " > at ", index + piStart);
      IsPrime(num.toString().replaceAll(",", ""), index + piStart);
    }
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
        
        settings.debug.advancedMode && console.log("X 100.000.000     >", num,"of ",i);
      }
    }


    if(isPrime){
      console.log(`The Number ${num} is PRIME               -                Saved.`)
      console.log("Finished in "+ (new Date().getTime() - startDate.getTime()) + "ms")
      var prevTxt = "";
      if(fs.existsSync(`./saves/primes_x-${digits}.txt`))
      prevTxt = fs.readFileSync(`./saves/primes_x-${digits}.txt`,{encoding:'utf8'});

      const saveTxt = prevTxt + "\n" +
      startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')  + " > " +
      num.toString().replaceAll(",",", ") + "  at >  "+ index;
      fs.writeFileSync(`./saves/primes_x-${digits}.txt`, saveTxt)
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


Start();



