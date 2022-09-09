
# Challenges:

Made by: Luiz Claudio Celestino Cardoso

Portfolio: https://luizclaudio.dev.br/
Github: https://github.com/DinowSauron
linked-in: https://www.linkedin.com/in/luiz-claudio-cardoso/


## see the repo in: https://github.com/DinowSauron/SigmaGeek_Palindromic-Primers/tree/main/Challenges

---


# How to run this code

!- If you just want see the code running, this repo has all necessary file to see the 21 digit palindromic prime!

1 - You need download the archives of PI here: https://storage.googleapis.com/pi100t/index.html, each archive has 100billions of digits (download in decimals)
2 - And you need the ycruncher to descompact the archive, you can download here: http://www.numberworld.org/y-cruncher/ and descompact in `pi_archives`
3 - The last step is spit the archive in many of archives, because javascript have a limit of 500Mb in strings, you need a program to do that for you, i used `PeaZip` and split in 200Mb files, and this is more easy to find something...
4 - enter in src/config.ts and put archivesLocation the location of your files and put the archivesNames the name of splited file without the extension `ex: pi-500.txt.001  you put only: archivesNames: "pi-500.txt"` 
5 - chose the first archive, in case of 001, you put 1...
6 - in archiveX_100b you put the number of downloaded file, if you downloaded the file number 0, put 0, if file is 37, put 37. this will count in x100bi the position of your number
7 - when the search is finishe, if you dont find anything in /saves just download another file and repeat the process...


### All codes running on:

* CPU: Amd Fx-3600 6x3.8Hz.
* Ram: 16Gb 1666Mhz.
* HDD: 1Tb 7200Rpm.
* SSD: no SSD used.
* GPU: GTX 950 2Gb (basically not used for calculation).

Verify Rate: 9 Bi/h.

<br/>
<br/>
 
## Find large palindromic prime numbers in the decimal expansion of π (3,1415…)

* Q1 > Find the first 9-digit palindromic prime contained in the decimal expansion of π (3,1415…)
  - Is: 318272813, Starting At 129079
  - Put in the config.ts:
  ```ts
  return {
    digitsToFind: 9,

    useArchive: {
      archivesLocation: "",
      archivesNames: "",
      archiveX_100b: 0,
      firstArchive: 1,
      lastArchive: 1,
    },
    useGeneration: {
      use: true,
      numbersOfDecimals: 140000, 
    },
    debug: {
      advancedMode: true,
      logRange: 10000000,
    }
  }
  ```
  - `yarn install` > to install vite / typescript, etc...
  - and Run `yarn start` and wait a 2-3minutes  
  - the result will be saved at `./saves/primes_x-9.txt`

---

* Q2 > Find the first 21-digit palindromic prime contained in the decimal expansion of π (3,1415…)
  - Is: 151978145606541879151, Starting at 140672630233
  - Download this archive: [Pi Dec - Chudnovsky - 1](https://storage.googleapis.com/pi100t/Pi%20-%20Dec%20-%20Chudnovsky/Pi%20-%20Dec%20-%20Chudnovsky%20-%201.ycd)
  - Descompact using [y-cruncher](http://www.numberworld.org/y-cruncher/) and use [PeaZip](https://peazip.github.io/peazip-64bit.html) ans split in volumes of 200Mb _(or use anything that can split without compress)_
  - If you do it correctly, the archive that have the code is the 194º
  - So, Put this in the config.ts:
   ```ts
   return {
    digitsToFind: 21,
    useArchive: {
      archivesLocation: "./pi_archives/",
      archivesNames: "pi_dec_1t_01.txt",
      archiveX_100b: 1, 

      firstArchive: 194,
      lastArchive: 194,
    },
    useGeneration: {
      use: false,
      numbersOfDecimals: 140000, 
    },
    debug: {
      advancedMode: false,
      logRange: 10000000,
    }
  }
  ``` 
  - `yarn install` > to install vite / typescript, etc...
  - and Run `yarn start` and wait a ~180seconds
  - the result will be saved at `./saves/primes_x-21.txt`

---

* Q3 > Find the largest palindromic prime contained in the decimal expansion of π (3,1415…)
  - Is: idk...
  - i will try finding small palindromic and if i found an small palindromic i will increasing the search to find
  - and i will do it in backwards, searching 999 to 0, because my experiments say more digits, more far away they are
  - my code gets the position, so its not a problem.

  - verifyed: 999, 10, 

  
<br/>
<br/>

## Some Info's:

* if find a palindromic and nothing is in the terminal is because probably the number is prime and is taking a minute or three to process, if you have doubts of the number, just put the number in http://www.math.com/students/calculators/source/prime-number.htm to get correct answer.
* the files has 1 digit+ in each number so i recommend to put your number position in get_pi_delivery minus (the number of file * 2) to get the correct positioning of your number.

<br/>

---

<br/>

# Data's:
maybe have an alternative to get exact number without verify every possibility ?...

N  | Pos              | N/Pos NPP     |   P.P.
5  > 488             0| 97,6          |
7  > 13901           0| 1985,8        | 
9  > 129079          0| 14342,1       | 318272813
11 > 5793497         0| 526681,4      | 74670707647
13 > 25803983        0| 25803983,6    | 1020776770201
15 > 298503034       0| 19900202,2    | 
...     
21 > 140672630233    1| 6698696677,7  | 
23 > 2143728293286  21|               | 38898292453535429289883
25 > 3215........? 221|


## Used Fonts:
- http://ajennings.net/blog/a-million-digits-of-pi-in-9-lines-of-javascript.html#:~:text=Increasing%20the%20number%20of%20digits,pi%20%2F%20(10n%20**%2020n))%3B

- Generating 250.000 Digits https://www.angio.net/pi/digits.html (this works for the first 9 palindromic digits, so slow)

- Downloaded archives (1T): https://archive.org/details/pi_dec_1t ( i downloaded 100 in 100 billions and split in 200MB to search)

- Used PeaZip to compact arhchives without compress

- (22.4T) > https://drive.google.com/drive/folders/1L_HnNULhHSuDabD036H94pGdD-XbKhLy

- (100T) > https://storage.googleapis.com/pi100t/index.html

---


## Notes (for me):

* Se o numero que procuro estiver entre um arquivo e outro precisarei de alguma forma juntar uns 10 digitos do arquivo final para o arquivo seguinte...
  * ou apenas faça 2 divisões uma de 500Mb e outra de 300Mb, porém não é nada eficiente...
* Fazer download de 100-Bilhões demora umas 10 horas... + descompactar + dividir em pedaços (Split)
* Percebi só depois de fazer a busca em 216.000.000.000 de numeros que o javascript arredonda numeros com mais de 16 digitos... no caso to procurando um com 21, e ele arredondando nunca vo saber se ele é primo ou não... começar tudo denovo...
* coloque o numero do output + o numero do archiveX_100b
* Trabalhando em multithreading: multithread realizado com sucesso! de 11hrs passou para umas 5hrs, posso verificar x2 por dia!
* Procurando por numeros com tamanhos pares(20) e impares(21) ao mesmo tempo, quando é localizado um número o indice aumenta para ver se o palindromo pode ser maior que o esperado !

- [x] Poderia otimizar a busca se reaproveita-se o valor anterior!
- [x] Refatoração do código para envio.

