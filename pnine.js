const eqTbl = document.getElementById("eq");
const mpBtn = document.getElementById("mulp");
const emsDv = document.getElementById("ems");
const tBsDv = document.getElementById("tpBs");
const othDv = document.getElementById("oth");
const ninFd = document.getElementById("nin");
ninFd.style.visibility = "hidden";
const mreDv = document.getElementById("mre");
mreDv.style.visibility = "hidden";
const rngFd = document.getElementById("rng");
const tmsFd = document.getElementById("tms");
var prd = 0;
var smt = 0;
var tup = 0;
var dgArr = [];
const rwCl = "rwCl";
var btXst = false;
actBtn();
ldOrg();

function runMulp() {
  let gdIn = chIn();
  if (!gdIn) {
    return;
  } 
  const nin = Number(ninFd.value) ? Number(ninFd.value) : 9;
  let tms = Number(tmsFd.value); 
  let mlp = Number(rngFd.value); 
  for (; mlp < tms; mlp++) {
    prd = mlp * nin;
    dgArr = String(prd).split("").map(Number);
    smt = 0;
    smt = dgArr.reduce((t, v) => t + v);
    addTbl(nin, mlp, prd, smt);
  }
  mkBtns();
  if (!btXst) {
    aftOgl();
  }
  rngFd.value = mlp;
}
function actBtn() {
  mpBtn.addEventListener("click", runMulp);
  mpBtn.className = "shw";
  // mpBtn.removeEventListener("click", runMulp);
  // mpBtn.className = "gry";
}
function chIn() {
  let rs = Number(rngFd.value) ? Number(rngFd.value) : 1;
  let te = Number(tmsFd.value) ? Number(tmsFd.value) : 100;
  if ((rs < te) && (te - rs) < 25000) {
    rngFd.value = rs;
    tmsFd.value = te;
    ldOrg();
    return true;
  } else {
    emsDv.innerText = "Error: range start Number 25,000 less than end Number";
    return false;
  }
}
function addTbl(n, m, p, s) {
  const rw = eqTbl.insertRow(-1);
  const mtd = rw.insertCell(0);
  const ptd = rw.insertCell(1);
  const std = rw.insertCell(2);
  mtd.innerText = m;
  ptd.innerText = p;
  std.innerText = s;
  
  if (s % n === 0) {
    let x = s / n;
    std.className = "dc" + x + "Cl";
    std.parentElement.className = rwCl + std.className;
    if (tup < x) {
      tup = x;
    }
  } else {
    std.className = "dc" + "0" + "Cl";
    std.parentElement.className = rwCl + std.className;
  }
}
function mkBtns() {
  for (let i = 0; i <= tup; i++) {
    let miId = "dc" + i + "Cl";
    let hsRw = document.getElementsByClassName(rwCl + miId)[0];
    if (!hsRw) {
      continue;
    }
    var tpNBtn = document.createElement("button");
    tpNBtn.id = miId;
    tpNBtn.className = "shw";
    tpNBtn.textContent = i + " tuple";
    tpNBtn.addEventListener("click", hidShw);
    tBsDv.appendChild(tpNBtn);
  }
}
function hidShw() {
  const trChCl = this.id;
  const trClt = document.getElementsByClassName(rwCl + trChCl);
  let stArr = this.className !== "hid" ? ["none", "hid"] : ["table-row", "shw"];
  for (let i of trClt) {
    i.style.display = stArr[0];
    this.className = stArr[1];
  }
}
function aftOgl() {
  mreDv.style.visibility = "visible";
  var otBtn = document.createElement("button");
  otBtn.textContent = "Try Other Number";
  otBtn.addEventListener("click", othMlp);
  othDv.appendChild(otBtn);
  btXst = true;
}
function othMlp() {
  ninFd.style.visibility = "visible";
  ninFd.value = "";
  rngFd.value = 1;
  tmsFd.value = 100;
  ldOrg();
}
function ldOrg() {
  eqTbl.innerHTML = "";
  tBsDv.innerHTML = "";
  emsDv.innerHTML = "";
  tup = 0;
  const rwh = eqTbl.insertRow(-1);
  const mth = rwh.insertCell(0);
  const pth = rwh.insertCell(1);
  const sth = rwh.insertCell(2);
  mth.innerText = "multiple";
  pth.innerText = "product";
  sth.innerText = "sum";
}