const axios = require('axios');
const fs = require('fs').promises;

const removeTags = inp => inp.replace(/<script .*>.*<\/script>/g,"").replace(/<\/?[^>]+(>|$)/g, "");

async function getText(link) {
    let html = await axios.get(link);
    //return removeTags(html.data);
    return html.data;
}

var order = 32;
var ngrams = {};
var button;
var txt;
var links = ["https://stackoverflow.com/","https://nodejs.org/en/","https://github.com","https://google.com/search?q=fun+websites","https://w3schools.com","https://www.w3schools.com/html/default.asp","https://www.w3schools.com/css/default.asp","https://www.w3schools.com/js/default.asp"];

function getRange(i) {
  for(let j = 0; j <= 10000; j+=1000) {
    if(i < j) {
    return `${j-1000}-${j}`;
    }
  }
}

async function main() {
    txt = "";
    for(let l of links) {
        txt += await getText(l);
        txt += "\n";
        console.log(`Link ${l} loaded`);
    }
    console.log("Link loading complete");
    for (var i = 0; i <= txt.length - order; i++) {
        var gram = txt.substring(i, i + order);
    
        if (!ngrams[gram]) {
          ngrams[gram] = [];
        }
        ngrams[gram].push(txt.charAt(i + order));
      }
    
    for(let i =0; i < 10000; i++) {
      let code = markov(txt);
      console.log("\n\n\n\n\n\n\n\n",code,i+1);
      try{
        await fs.writeFile(`/home/codycodes/Desktop/giving ai the power of the internet/${getRange(i)}/index${i+1}.html`, code);
      } catch {
        await fs.mkdir(getRange(i)).catch(console.log);
        await fs.writeFile(`/home/codycodes/Desktop/giving ai the power of the internet/${getRange(i)}/index${i+1}.html`, code);

      }
    }
      
      
}

function markov() {
    var currentGram = txt.substring(0, order);
    var result = currentGram;
  
    while (!(currentGram.charAt(currentGram.length - 1) == '>' && Math.random()<0.005)) {
      var possibilities = ngrams[currentGram];
      if (!possibilities) {
        break;
      }
      var next = possibilities[Math.floor(Math.random() * possibilities.length)];
      result += next;
      var len = result.length;
      currentGram = result.substring(len - order, len);
    }
    return (result);
  }

main();
