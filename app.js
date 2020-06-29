function TransactionList() {
  this.income = [];
  this.expence = [];
}

const budgetElement = document.getElementById("main_budget_val"); 
const incomeElement = document.getElementById("main_income_val");
const percentageElement = document.getElementById("income_percentage_val"); 
const expenceElement = document.getElementById("main_expence_val");
const expence_percentageElement = document.getElementById("expence_percentage_val");
const descriptionInput = document.getElementById("main_description_val");
const amountInput = document.getElementById("main_input_val");

const root_income_el = document.getElementById("root_income_list");
const root_expence_el = document.getElementById("root_expence_list");

let availableAmount = 0;
let incomeAmount = 0;
let expenceAmount = 0;
let expencePercentage = 0;

budgetElement.innerHTML = "$0";
incomeElement.innerHTML = "$0";
expenceElement.innerHTML = "$0";
expence_percentageElement.innerHTML = "0" + "%";

class Transaction {
  constructor(amount, description, percentage = 0, isIncome = true) {
    this.amount = amount;
    this.description = description;
    this.date = new Date().toDateString();
    this.id = Math.floor((Math.random() * 100) + 1);
    this.isIncome = isIncome;
    this.percentage = percentage;
  }

  LogTransaction() {
    console.log("Amount " + this.amount);
    console.log("Description " + this.description);
    console.log("Date " + this.date);
    console.log("id " + this.id);
  }
}

// Prototype
TransactionList.prototype.addNewTransaction = function (desc, amount) {
  amount = Number(amount);
  let t = new Transaction(amount, desc);

  if (amount > 0) {
    availableAmount += amount;
    incomeAmount += amount;
    incomeElement.innerHTML = "+ $" + incomeAmount;
    this.income.push(t);
    root_income_el.appendChild(getElementIncome(t));
  } 
  else {
    availableAmount += amount;
    expenceAmount += amount;
    let vts = Math.abs(expenceAmount) % 1 == 0 ? Math.abs(expenceAmount) : parseFloat(Math.abs(expenceAmount));
    expenceElement.innerHTML = "- $" + vts;
    this.expence.push(t);
    root_expence_el.appendChild(getElementExpense(t));
  }

  this.renderData();
};

// Prototype
TransactionList.prototype.renderData = function () {
  let ats = Math.abs(availableAmount) % 1 == 0 ? Math.abs(availableAmount) : parseFloat(Math.abs(availableAmount)).toFixed(2);
  
  if (availableAmount >= 0) budgetElement.innerHTML = "+ $" + ats;
  else if (availableAmount < 0) budgetElement.innerHTML = "- $" + ats;
  let per = (expenceAmount * 100.0) / incomeAmount;

  let its = Math.abs(incomeAmount) % 1 == 0 ? Math.abs(incomeAmount): parseFloat(Math.abs(incomeAmount)).toFixed(2);
  expenceElement.innerHTML = "- $" + its;
  incomeElement.innerHTML = "+ $" + its;

  let vts =  Math.abs(expenceAmount) % 1 == 0 ? Math.abs(expenceAmount) : parseFloat(Math.abs(expenceAmount)).toFixed(2);
  expenceElement.innerHTML = "- $" + vts;
  expence_percentageElement.innerHTML = parseFloat(-per).toFixed(2) + "%";
};

// Prototype
TransactionList.prototype.removeTransaction = function (idp) {
  let fd = false;
  let fdv = 0;
  let temp;

  for (let i = 0; i < this.income.length; i++) {
    if (this.income[i].id == idp) {
      fdv = i;
      fd = true;
      break;
    }
  }

  if (fd) {
    temp = this.income[fdv];
    availableAmount -= temp.amount;
    incomeAmount -= temp.amount;
    this.renderData();

    this.income[fdv].id = 99;
    let eidp = document.getElementById(idp);
    eidp.parentNode.removeChild(eidp);

    return;
  }

  for (let i = 0; i < this.expence.length; i++) {
    if (this.expence[i].id == idp) {
      temp = this.expence[i];
      console.log(temp.amount);

      availableAmount += Math.abs(temp.amount);
      expenceAmount -= temp.amount;
      this.renderData();
      this.expence[i] = 99;
      let eidp = document.getElementById(idp);
      eidp.parentNode.removeChild(eidp);
      break;
    }
  }
  console.log(idp);
};

// Prototype
TransactionList.prototype.LogTransactionList = function () {
  console.log("Total Income" + this.income.length);
  console.log("Total Expence " + this.expence.length);
};

function getElementExpense(trans) {
  let itemdic = document.createElement("div");
  itemdic.className = "item";

  let itemdes = document.createElement("div");
  itemdes.className = "item__description";
  itemdes.innerHTML = trans.description;

  itemdic.appendChild(itemdes);

  let right = document.createElement("div");
  right.className = "right";

  let ival = document.createElement("div");
  ival.className = "item__value";
  ival.innerHTML = "- $" + Math.abs(trans.amount);
  right.appendChild(ival);

  let iper = document.createElement("div");
  iper.className = "item__percentage";
  iper.innerHTML = trans.percentage + "%";
  right.appendChild(iper);

  let idel = document.createElement("div");
  idel.className = "item__delete";

  let idelbtn = document.createElement("button");
  idelbtn.className = "item__delete--btn";

  let idelbtnnested_i = document.createElement("i");
  idelbtnnested_i.className = "ion-ios-close-outline";

  idelbtn.addEventListener("click", function () {
    deleteTransHtml(trans.id);
  });

  idelbtn.appendChild(idelbtnnested_i);

  idel.appendChild(idelbtn);
  right.appendChild(idel);

  itemdic.appendChild(right);

  let itemdate = document.createElement("div");
  itemdate.className = "item__date";
  itemdate.innerHTML = trans.date;

  itemdic.appendChild(itemdate);
  itemdic.id = trans.id;

  return itemdic;
}

function getElementIncome(trans) {
  let itemdic = document.createElement("div");
  itemdic.className = "item";

  let itemdes = document.createElement("div");
  itemdes.className = "item__description";
  itemdes.innerHTML = trans.description;

  itemdic.appendChild(itemdes);

  let right = document.createElement("div");
  right.className = "right";

  let ival = document.createElement("div");
  ival.className = "item__value";
  ival.innerHTML = "+ $" + trans.amount;
  right.appendChild(ival);

  let idel = document.createElement("div");
  idel.className = "item__delete";

  let idelbtn = document.createElement("button");
  idelbtn.className = "item__delete--btn";

  let idelbtnnested_i = document.createElement("i");
  idelbtnnested_i.className = "ion-ios-close-outline";

  idelbtn.addEventListener("click", function () {
    deleteTransHtml(trans.id);
  });

  idelbtn.appendChild(idelbtnnested_i);

  idel.appendChild(idelbtn);
  right.appendChild(idel);

  itemdic.appendChild(right);

  let itemdate = document.createElement("div");
  itemdate.className = "item__date";
  itemdate.innerHTML = trans.date;

  itemdic.appendChild(itemdate);
  itemdic.id = trans.id + "";

  return itemdic;
}

const trasactionList = new TransactionList();

function AdClicked() {
  let de = descriptionInput.value;
  let amount = amountInput.value;

  if (de.trim() == "" || amount == 0) return;
  trasactionList.addNewTransaction(de, amount);
}

function deleteTransHtml(id) {
  trasactionList.removeTransaction(id);
}
