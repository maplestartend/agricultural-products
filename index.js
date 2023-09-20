const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const roundedEnd = document.querySelector(".rounded-end");
const search = document.querySelector(".search");
const selectList = document.querySelector("#js-select");
const sort = document.querySelector(".js-sort-advanced");
let data = {};
let dataType = "N00";
let keyword = "";
let optionValue = "排序篩選";
let order = "down";
axios
  .get(
    "https://data.moa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?IsTransData=1&UnitId=037"
  )
  .then((response) => {
    data = response;
    renderData();
  })
  .catch((error) => console.log(error));

function renderData() {
  let str = "";
  switch (optionValue) {
    case "依上價排序":
      newData = [...data.data].sort(function (a, b) {
        if (order === "down") {
          return b.上價 - a.上價;
        } else {
          return a.上價 - b.上價;
        }
      });
      break;
    case "依中價排序":
      newData = [...data.data].sort(function (a, b) {
        if (order === "down") {
          return b.中價 - a.中價;
        } else {
          return a.中價 - b.中價;
        }
      });
      break;
    case "依下價排序":
      newData = [...data.data].sort(function (a, b) {
        if (order === "down") {
          return b.下價 - a.下價;
        } else {
          return a.下價 - b.下價;
        }
      });
      break;
    case "依平均價排序":
      newData = [...data.data].sort(function (a, b) {
        if (order === "down") {
          return b.平均價 - a.平均價;
        } else {
          return a.平均價 - b.平均價;
        }
      });
      break;
    case "依交易量排序":
      newData = [...data.data].sort(function (a, b) {
        if (order === "down") {
          return b.交易量 - a.交易量;
        } else {
          return a.交易量 - b.交易量;
        }
      });
      break;
    case "排序篩選":
      newData = data.data;
    default:
      break;
  }
  newData.forEach((e) => {
    let tableStr = `<tr>
    <td>${e.作物名稱}</td>
    <td>${e.市場名稱}</td>
    <td>${e.上價}</td>
    <td>${e.中價}</td>
    <td>${e.下價}</td>
    <td>${e.平均價}</td>
    <td>${e.交易量}</td>
  </tr>`;
    switch (dataType) {
      case "N00":
        str += tableStr;
        break;
      case "N01":
        if (e.作物名稱.includes(keyword)) str += tableStr;
        break;
      case "N04":
        if (e.種類代碼 == "N04") str += tableStr;
        break;
      case "N05":
        if (e.種類代碼 == "N05") str += tableStr;
        break;
      case "N06":
        if (e.種類代碼 == "N06") str += tableStr;
        break;
    }
  });
  showList.innerHTML = str;
}

buttonGroup.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    dataType = e.target.getAttribute("data-type");
  }
  selectList.value = "排序篩選";
  optionValue = "排序篩選";
  renderData();
});

search.addEventListener("click", function (e) {
  if (roundedEnd.value === "") {
    alert("請輸入作物名稱");
  }
  keyword = roundedEnd.value;
  dataType = "N01";
  roundedEnd.value = "";
  selectList.value = "排序篩選";
  optionValue = "排序篩選";
  renderData();
});

selectList.addEventListener("change", function () {
  optionValue = this.value;
  renderData();
});

sort.addEventListener("click", function (e) {
  if (e.target.nodeName === "I") {
    optionValue = e.target.dataset.price;
    selectList.value = e.target.dataset.price;
    order = e.target.dataset.sort;
    console.log(optionValue, order, selectList.value);
    renderData();
  }
});
