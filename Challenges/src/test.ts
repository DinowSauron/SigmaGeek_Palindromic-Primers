
var numVerify = 1237n
// why palindromic prime digits not have has pair ex: 2552, 123321... ???
IsPrime(numVerify.toString(), 0)






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
    if(i % 25000003n === 0n) {
      if(i.toString().length >= numLong.toString().length/2+1)
        break;
      if(i >= 100000000*5)
        break;
      
      console.log("X 25.000.000     >", num,"of ",i);
    }
  }


  if(isPrime){
    console.log("its prime")
    /*
    const digitsNum = num.toString().length;
    console.log(`The Number ${num} is PRIME               -                Saved.`)
    console.log("Finished in "+ (new Date().getTime() - startDate.getTime()) + "ms")
    var prevTxt = "";
    if(fs.existsSync(`./saves/primes_x-${digitsNum}.txt`))
    prevTxt = fs.readFileSync(`./saves/primes_x-${digitsNum}.txt`,{encoding:'utf8'});
    const x100b = 10000000;
    const saveTxt = prevTxt + "\n" +
    startDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')  + " > " +
    num.toString().replaceAll(",",", ") + "  at >  "+ (index + 1) +"  | AchiveX100b:" + x100b + " / test";

    fs.writeFileSync(`./saves/primes_x-${digitsNum}.txt`, saveTxt)*/
  }
}