// **************************selectors**************************
const $ = (x) => document.querySelector(x);
const body = $("body");
const container = $(".container");
const gridTable = $(".grid-table")
const gridRow = $(".grid-row");
//***************************************geting data***********************
async function initDataSet() {
  const combinedData = [];
  const getCapsule = await fetch(
    "https://apple-seeds.herokuapp.com/api/users/"
  );
  const capsuleData = await getCapsule.json();
  for (let i = 0; i < capsuleData.length; i++) {
    let getStudent = await fetch(
      `https://apple-seeds.herokuapp.com/api/users/${i}`
    );
    let student = await getStudent.json();
    let obj = { ...capsuleData[i], ...student };
    combinedData.push(obj);
  }
  return combinedData;
}
//***************************************storing in local storage***********************
async function initLocalStorage() {
  const localData = await initDataSet();
  for (const dataObj of localData) {
    localStorage.setItem(dataObj.id, JSON.stringify(dataObj));
  }
}
// **********if local storage has items load from local, otherwise get data**********
async function checkLocalStorage() {
  if (localStorage.length) {
    createTable()
  } else {
    await initLocalStorage();
    createTable()
  }
}
checkLocalStorage();

// **************************create row elements by object**************************
function createRow(rowObject) {
  const {age,
    capsule,
    city,
    firstName,
    gender,
    hobby,
    id,
    lastName} = rowObject
  let divRow = document.createElement("div");
  divRow.innerHTML = `<div class="grid-row"  data-id="${id}">
  <p>${id}</p>
  <input placeholder=${firstName} disabled />
  <input placeholder=${lastName} disabled />
  <input placeholder=${capsule} disabled />
  <input placeholder=${age} disabled />
  <input placeholder=${city} disabled />
  <input placeholder=${gender} disabled />
  <input placeholder=${hobby} disabled />
  <button class="btn" data-btn="edit">Edit</button>
  <button class="btn" data-btn="delete">Delete</button>
  <div class="robots">
  <img alt="robots" src= https://robohash.org/${4}/?set=set2 />???
  </div>
  </div>
  `;
  return divRow
}
// **************************parse Local storage string to object**************************
function localParser(localIndex){
  return JSON.parse(localStorage.getItem(localIndex))
}
// **************************go over Local storage and create the table**************************
function createTable(){
  for (var i = 0; i < localStorage.length; i++){
    if(localStorage.getItem(i)){
      createObject = localParser(i)
      gridTable.appendChild(createRow(createObject))
    }
  }
}

// **************************delete function**************************
gridTable.addEventListener("click", deleteItemEvent);
function deleteItemEvent(e) {
  if (e.target.dataset.btn === "delete") {
    let deleteTarget = e.target.parentElement;
    let deleteId = deleteTarget.dataset.id;
    localStorage.removeItem(deleteId);
    deleteTarget.remove();
  }
}
// **************************sort function**************************

// object.addEventListener("change", myScript);
