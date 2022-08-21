// Find the first 9-digit palindromic prime contained in the decimal expansion of π (3,1415…)

const fs = require('fs');


function GetPI(qnt=14){
  // generate PI algorithm
  const startDate = new Date();
  let i = 1n;
  let x = 3n * (10n ** BigInt(qnt + 20));
  let pi = x;
  while (x > 0) {
    x = x * i / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
  }
  console.log("Finished PI_Number In "+ (new Date().getTime() - startDate.getTime()) + "ms")
  const piNum = pi / (10n ** 20n);
  return piNum;
}


function DetectPalindromicsInPI(length=9, pi='3141n', debug=true){
  const startDate = new Date();
  const digits = length;
  let lastDigits = [0];
  let primes = [] as number[];

  for(var n=0; n < pi.length;n++) {
    // Create the last digits
    lastDigits.length = length - 1;
    const currentDigits = [Number(pi[n]), ...(lastDigits)]
    lastDigits = currentDigits;

    // if have enought digits, search for palindromics
    if(n >= digits-1){
      const index =  n-digits+1;
      IsPalindromic(currentDigits, index)
    }
    if(debug && n % 10000 == 0)
      console.log("Detect x"+n)
  }
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
      console.log("Find Palindromic: " + num.toString(), " > at ", index);
      IsPrime(Number(num.toString().replaceAll(",", "")));
    }
  }

  function IsPrime(num: number){
    
    const startDate = new Date();
    let isPrime = true;
    for(var x=2;x<=num;x++){
      if(num % x === 0 && x != num){
        isPrime = false;
        break;
      }
    }
    if(isPrime){
      console.log(`The Number ${num} is PRIME                       DETECT-ME`)
      console.log("Finished in "+ (new Date().getTime() - startDate.getTime()) + "ms")
      primes = [...primes, num];

      const saveTxt = primes.toString().replaceAll(",","\n");
      fs.writeFileSync('./saves/primes_x-'+length+".txt", saveTxt);
    }else{
      // console.log("Not Prime")
    }
  }

  console.log(primes);
}




const pi = GetPI(150000);
// console.log(pi); // see the generated PI number. 318272813

DetectPalindromicsInPI(9, pi.toString())


