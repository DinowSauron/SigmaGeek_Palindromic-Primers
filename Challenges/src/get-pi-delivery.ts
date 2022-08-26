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
function getNumbers(startAt=0,maxRange=5000, digits=21){
  if(startAt >= maxRange){
    return
  }
  return axios.get(`https://api.pi.delivery/v1/pi?start=${startAt}&numberOfDigits=1000`)
  .then((res: AxiosResponse )=> {
    const piNum = res.data.content
    x++
    if(x == 50){
      console.log("Get PI >  X=", startAt)
      x=0;
    }

    DetectPalindromicsInPI(digits, piNum, startAt)

    const plusIndex=Math.ceil(1000-(digits/2));
    getNumbers(startAt+plusIndex,maxRange,digits) // Recursive function Calling
  });
}

getNumbers(140672630232-50,140672632232)// 0 to trillion


// some anotations...

//trillion start
// started in 1.000.000.000.000 800.000.000.000
// getNumbers(800002919510,1500000000000)


//101111170
console.log("Finished Detection In "+ (new Date().getTime() - startDate.getTime()) + "ms");
