// Find the first 9-digit palindromic prime contained in the decimal expansion of π (3,1415…)



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


function DetectPalindromicsInPI(length=9, piNum=3141n, debug=true){
  const startDate = new Date();
  const digits = length;
  let lastDigits = [0];

  for(var n=0; n<piNum.toString().length;n++) {
    // Create the last digits
    lastDigits.length = length - 1;
    const currentDigits = [Number(piNum.toString()[n]), ...(lastDigits)]
    lastDigits = currentDigits;

    // if have enought digits, search for palindromics
    if(n >= digits-1){
      const index =  n-digits+1;
      IsPalindromic(currentDigits, index)
    }
    if(debug && n % 1000 == 0)
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
    
    if(isPalindromic)
      console.log("Find Palindromic: " + num.toString(), " > at ", index);
  }
}




const pi = GetPI(10000);
// console.log(pi); // see the generated PI number.
DetectPalindromicsInPI(9, pi)


