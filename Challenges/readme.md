
# Challenges:

* Made by: __Luiz Claudio Celestino Cardoso__
* My english level is intermediate, so let's go!

<br/>
<br/>
<br/>

- Portfolio: https://luizclaudio.dev.br/
- Github: https://github.com/DinowSauron
- linked-in: https://www.linkedin.com/in/luiz-claudio-cardoso/

<br/>
<br/>

### see the repo in: https://github.com/DinowSauron/SigmaGeek_Palindromic-Primers/tree/main/Challenges 
* I will update after 30/09

* Archives verifyed: (i aleatorily pick ones)
    ``` 0,1,2,3,4,5,
    10,11,12,13,14,15,16,17,18,19,20,21,22,23,
    221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,
    999,653,767,545 
---

! i'm using yarn, if you want to use npm, just run `npm run [command]`

# How to run this code:

!- If you just want see the code running, this repo has all necessary file to see the 21 digit palindromic prime!

## 1) Using file search:
1) You need download the archives of PI here: https://storage.googleapis.com/pi100t/index.html, each archive has 100billions of digits (download in decimals)
2) And you need the ycruncher to descompact the archive, you can download here: http://www.numberworld.org/y-cruncher/ and descompact in `pi_archives`
3) The last step is spit the archive in many of archives, because javascript have a limit of 500Mb in strings, you need a program to do that for you, i used `PeaZip` and split in 200Mb files, and this is more easy to save your progress.
4) enter in /config.json and put "archivesLocation" the location of your files and put the "archivesNames" the name of splited file without the extension `ex: pi-500.txt.001 | you put only: archivesNames: "pi-500.txt"` 
5) choose the "firstArchive", in case of 001, you put 1...
6) in "archiveX_100b" you put the number of downloaded file, if you downloaded the file number 0, put 0, if file is 37, put 37. this will count in x100bi the position of your number
7) Run `yarn mt` to do multithreading search in archives. (i prefer run `yarn build` and `yarn start` i think this is more optimized the build version 2-4 seconds...)
8) when the search is finished, if you dont find anything in /saves just download another file and repeat the process...

## 2) Using Aleatory Search: (easy way to run the code)
1) just run `yarn search` and you will search for aleatory positions in pi number! using ethernet and is very slow process...
    * he will search for 10-11 digits palindromic, but if exist a palindromic with more digits he will find too

<br/>
<br/>


### All codes running on:

* CPU: Amd Fx-3600 6x3.8Hz.
* Ram: 16Gb 1666Mhz.
* HDD: 1Tb 7200Rpm.
* SSD: no SSD used.
* GPU: GTX 950 2Gb (basically not used for calculation).


<br/>
<br/>
 
## Find large palindromic prime numbers in the decimal expansion of π (3,1415…)

* Q3 > Find the largest palindromic prime contained in the decimal expansion of π (3,1415…)
  - Is: idk...
  - i will try finding small palindromic and if i found an small palindromic i will increasing the search to find a big one
  - my code gets the position, so its not a problem.
  - alot of verifications, but i only found 23 digits palindromic prime :(  i was hoping for 25-28

  
<br/>
<br/>

## Some Info's:

* if find a palindromic and nothing is in the terminal is because probably the number is prime and is taking a minute or three to process, if you have doubts of the number, just put the number in http://www.math.com/students/calculators/source/prime-number.htm to get correct answer.

<br/>

---

<br/>

# Data's:
maybe have an alternative to get exact number without verify every possibility ?... (lol)
```
N  | Pos               | N/Pos NPP     |   P.P.
5  > 488             0 | 97,6          |
7  > 13901           0 | 1985,8        | 
9  > 129079          0 | 14342,1       | 318272813
11 > 5793497         0 | 526681,4      | 74670707647
13 > 25803983        0 | 25803983,6    | 1020776770201
15 > 298503034       0 | 19900202,2    | 
...      
21 > 140672630233    1 | 6698696677,7  | 
23 > 2143728293286  21 |               | 38898292453535429289883
25 > 3215........? 221 | NOT, its another 21 digit
```

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
- [ ] Utilizar GPU para o processamento dos dados...
