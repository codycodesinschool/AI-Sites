let catalog = document.querySelector(".catalog");

function getRange(i) {
    for(let j = 0; j <= 10000; j+=1000) {
      if(i < j) {
      return `${j-1000}-${j}`;
      }
    }
  }
for(let i = 0; i < 10000; i++) {
    let a = document.createElement("a");
    a.href=`/AI-Sites/${getRange(i)}/index${i+1}.html`;
    a.innerText = `index ${i+1}`;
    catalog.appendChild(a);
    let br = document.createElement("br");
    catalog.appendChild(br);
}