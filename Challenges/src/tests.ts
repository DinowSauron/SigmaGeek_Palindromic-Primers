
IsPrimeNumber(100000007)

function IsPrimeNumber(num: number){

  const startDate = new Date();
  let isPrime = true;
  for(var x=2;x<=num;x++){
    if(num % x === 0 && x != num){
      isPrime = false;
      break;
    }
    // console.log(num,"/",x,"=", num / x)
  }
  if(isPrime){
    console.log("This number is PRIME")
  }
  console.log("Finished PrimeCheck In "+ (new Date().getTime() - startDate.getTime()) + "ms")


  /*
  function primeNumbers(num:number) {
    let numbers = new Array();
    for (var i = 0; i <= num; i++) {
      if (isPrime(i)){
        numbers.push(i);
      }
    }
    return numbers;
  }
  function isPrime(num:number) {
    for(let i = 2; i <num; i++)
      if(num % i === 0) {
          return false
      };
    return num > 1;
  }
  console.log(primeNumbers(13));*/
}