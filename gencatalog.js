let catalog = document.querySelector(".catalog");
for(let i = 0; i < 10000; i++) {
    let a = document.createElement("a");
    a.href=`/index${i+1}.html`;
    a.innerText = `index ${i+1}`;
    catalog.appendChild(a);
    let br = document.createElement("br");
    catalog.appendChild(br);
}