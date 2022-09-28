// palindromic finder editor
import fs from "fs"


interface ConfigProps {
  digitsToFind: number,
  coreCount: number,
  useArchive: {
    archivesLocation: string, 
    archivesNames: string,
    archiveX_100b: number, 
    firstArchive: number,
    lastArchive: number
  },

  useGeneration: {
    use: boolean,
    numbersOfDecimals: number
  },

  debug: {
    advancedMode: boolean,
    logRange: number
  }
} 
function Config(){

  if(fs.existsSync(`./config.json`)){
    const props = JSON.parse(fs.readFileSync(`./config.json`, {encoding:'utf8'})) as ConfigProps;
    return props
  }
  else {
    throw new Error("Not find config.json")
  }

}
export default Config();