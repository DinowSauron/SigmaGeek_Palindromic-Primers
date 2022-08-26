              
// this is not work properly...
function isPrime(num: string){

  var isPrime = true;
  const numLong = BigInt(num)
  
  if(numLong % 2n === 0n || numLong % 3n === 0n )
    return false;

  var i = 5n
  while(i*i <= numLong){
    if(numLong % i === 0n || (numLong % (i+2n)) === 0n){
      return false;
    }
    i=i+6n
    // console.log(i)

    if(i >= 100*100*100){
      // blah
    }
  }
  
  return true;
}

function isPrime2(num: string) {
  
  var isPrime = true;
  const numLong = BigInt(num)
  
  // const d = ()
}

console.log(isPrime2('999915579464975519999'))

