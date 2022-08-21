// Find the first 9-digit palindromic prime contained in the decimal expansion of π (3,1415…)

// const pi = Math.PI



// const pi = (13* (Math.atan(1/5))) - (4* Math.atan(1/239))

function GetPI(qnt=14){
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
  const piNum = pi / (10n ** 20n)
  return piNum;
}



const pi = GetPI(10000);
// console.log(pi);

DetectPalindromicsInPI(9, pi)




function DetectPalindromicsInPI(length=9, piNum=3141n, debug=true){
  const startDate = new Date();
  const digits = length;
  let lastDigits = [0];
  let

  for(var n=0; n<piNum.toString().length;n++) {
    for(var x=digits-1;x > 0; x--){
      lastDigits[x] = lastDigits[x-1];
    }
    lastDigits[0] = Number(piNum.toString()[n]);

    if(n >= digits-1){
      const index =  n-digits+1;
      //console.log(lastDigits.toString(), " > at", index)
      IsPalindromic(lastDigits, index)
    }
    if(n>0 && n % 1000 == 0 && debug){
      console.log("Detect x"+n)
    }
  }
  console.log("Finished Detection In "+ (new Date().getTime() - startDate.getTime()) + "ms");

}




function IsPalindromic(num: number[], index: number) {
  var isPalindromic = true;
  for(var x=0,y = num.length-1; x < y;x++, y--){
    if(num[x] != num[y]){
      isPalindromic = false;
      break;
    }
  }
  if(isPalindromic){
    console.log("Find Palindromic: " + num.toString(), "  > at ", index)