import { AxiosResponse } from "axios";
import { DetectPalindromicsInPI } from "./find-any-digits";

const axios = require('axios').default;
const startDate = new Date();


// get 1000, but only add a search=1000-(2/n) (ex: n= 21, search= ~989) when 'n' is a size of palindromic prime number
// for example if have an palindromic starting in 997 this never be find if dont do this
// i can use this for numbers between archives of 100bi
// remove start() from find-any-digits.ts

// and confirms position of the number
let x=0;
async function getNumbers(startAt=0n, digits=6, arch=0n){
  
  const st = startAt.toLocaleString();
  const fn = (startAt+1000n).toLocaleString();
  const yell = (str: string) => "\x1b[33m" + str + "\x1b[0m";
  console.log("\nVerifying from", yell(st), "  ("+digits+") / "+ arch);
  
  return await axios.get(`https://api.pi.delivery/v1/pi?start=${startAt}&numberOfDigits=1000`)
  .then((res: AxiosResponse )=> {
    const piNum = res.data.content;

    DetectPalindromicsInPI(digits, piNum, Number(startAt))

    const plusIndex=Math.ceil(1000-(digits/2));
    //getNumbers(startAt+plusIndex,maxRange,digits) // Recursive function Calling
  })
}
/*
// i'll use this for search between archives!
// like a for loop, but with smart delay
// not exist palindromic with 21 digits or more in this range...
function VerifyNumberInBillionRange(StartIndex = 1n,maxIndex = 10n) {
  if(StartIndex > maxIndex)
    return
  const archDigit = 209715200n;
  const archNum = 14n;

  setTimeout(async () => {    //   RRR
                        //  TTTbbbMMMmmmddd               Archives X 200mb
    const start = (StartIndex * 100000000000n - 500n) + (archDigit * archNum);
    getNumbers(start,21, archNum)


    await VerifyNumberInBillionRange(StartIndex+1n,maxIndex)
  }, 800);
}
VerifyNumberInBillionRange(1n,999n);


*/
var times = 0n;

async function VerifyRandomNumber(digits: number) {
  setTimeout(async () => {
    const start = BigInt(RamdomAnyNumbers(14).toString());

    await getNumbers(start,digits,times);
    times++

    await VerifyRandomNumber(digits);
  }, 390);


  function RamdomAnyNumbers(num: number){
    let formatedNumber = 0n;
    const getArchiveNum = (n: bigint) => Number(n.toString().padStart(14,"0").slice(0,3));

    verifyArchiveCompleted();

    return formatedNumber;

    // if the archive has verified, recall and find another number...
    function verifyArchiveCompleted(){
      formatedNumber = getNumber();
      verified.forEach(archiveNum => {
        if(getArchiveNum(formatedNumber) === archiveNum){
          verifyArchiveCompleted(); 
        }
      });
    }

    function getNumber(){
      let number = "";
      for(let x = 0;x < num;x++){
        const ramdom = (Math.random() * 10).toFixed(0).toString()[0];
        number = number + ramdom;
      }
      return BigInt(number)
    }

  }
}

VerifyRandomNumber(10);


// i already verifyed this archives and i dont want do this again in aleatory mode...
const verified = [
  0,1,2,3,4,5,
  10,11,12,13,14,15,16,17,18,19,20,21,22,23,

  221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,  236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263
  ,999, 653, 767, 545
]


//console.log("Finished Detection In "+ (new Date().getTime() - startDate.getTime()) + "ms");

//getNumbers(22562873321375n,11,0n);