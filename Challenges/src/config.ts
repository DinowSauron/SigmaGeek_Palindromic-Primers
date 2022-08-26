// palindromic finder editor



function Config(){

  return {
    digitsToFind: 21,

    useArchive: {
      archivesLocation: "./pi_archives/", // path to locate the archives
      archivesNames: "pi_dec_1t_01.txt", // pi_dec_1t_00.txt.001 > remove .001
      archiveX_100b: 1, // the split occurs in 100bi, so what of these splits you are using?

      firstArchive: 1, // if .001 put 1 || if .014 put 14 
      lastArchive: 477, // 100bi / 209,415,200(200Mb) = 477 archives
    },

    // use this to generate PI from your machine. this is kinda slow, just work to the first 9 digits or below
    useGeneration: {
      use: false,
      numbersOfDecimals: 140000, 
    },

    debug: {
      advancedMode: false,
      logRange: 10000000,
    }
  } 
}
export default Config();