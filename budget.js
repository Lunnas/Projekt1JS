// helper function
const qs = (s) => document.querySelector(s);
const crEl = (elName) => document.createElement(elName);

// DOM Nodes
const incomesDOM = qs("#incomes");
const decomesDOM = qs("#decomes");
const addIncomeFormDOM = qs("#addIncomeForm");
const addDecomeFormDOM = qs("#addDecomeForm");
const sumaDOM = qs("#incomesSum");
const suma2DOM = qs("#decomesSum");
const N1 = qs("#N1");
const editFormDOM = qs("#editForm");
const editIdDOM = qs("#editId");
const editNameDOM = qs("#editName");
const editIncDOM = qs("#editInc");
const editWindowDOM = qs("#window");
const closeDOM = qs("#close");

// MODEL
// dane naszej aplikacji
let incomes = [{ id: uuid.v4(), name: "Przychody", sum: "1000" }];
let decomes = [{ id: uuid.v4(), name2: "Wydatki", sum2: "500" }];
let suma = 0;
let suma2 = 0;

// VIEW

// funkcje render'ujące View (czyli tworzące DOM)
const renderIncomes = () => {
  incomesDOM.innerHTML = ""; // reset coursesDOM

  incomes.forEach(({ id, name, sum }) => {
    const li = crEl("li");
    li.textContent = `${name} - ${sum} zł`;
    const deleteBtn = crEl("button");
    const updateBtn = crEl("button");
    deleteBtn.textContent = "Usuń";
    updateBtn.textContent = "Edytuj";
    li.appendChild(deleteBtn);
    li.appendChild(updateBtn);

    deleteBtn.addEventListener("click", (e) => {
      // alert(id)
      deleteIncome(id);
    });
    updateBtn.addEventListener("click", (e) => {
      //alert(id);
      editWindowDOM.classList.remove("hidden");
      editIdDOM.value = id;
      editNameDOM.value = name;
      editIncDOM.value = sum;
    });
    const exitBtn = crEl("button");
    exitBtn.textContent = "Zamknij edycję";
    li.appendChild(exitBtn);
    exitBtn.addEventListener("click", (e) => {
      editWindowDOM.classList.add("hidden");
    });

    incomesDOM.appendChild(li);
  });
};

const renderApp = () => {
  renderIncomes();
};
//DE
const renderDecomes = () => {
  decomesDOM.innerHTML = ""; // reset coursesDOM

  decomes.forEach(({ id, name2, sum2 }) => {
    const li = crEl("li");
    li.textContent = `${name2} - ${sum2} `;
    const deleteBtn = crEl("button");
    const updateBtn = crEl("button");
    deleteBtn.textContent = "Usuń";
    updateBtn.textContent = "Edytuj";
    li.appendChild(deleteBtn);
    li.appendChild(updateBtn);
    deleteBtn.addEventListener("click", (e) => {
      //alert(id)
      deleteDecome(id);
    });
    updateBtn.addEventListener("click", (e) => {
      editWindowDOM.classList.remove("hidden");
      editIdDOM.value = id;
      editNameDOM.value = name2;
      editIncDOM.value = sum2;
    });

    const exitBtn = crEl("button");
    exitBtn.textContent = "Zamknij edycję";
    li.appendChild(exitBtn);
    exitBtn.addEventListener("click", (e) => {
      editWindowDOM.classList.add("hidden");
    });
    decomesDOM.appendChild(li);
  });
};

const renderApp2 = () => {
  renderDecomes();
};

//RENDER
//obliczenia
const renderSumInandDe = () => {
  const total = sumOfIncomesAndDecomes();
  if (total > 0) {
    N1.innerHTML = `Możesz jeszcze wydać: ${total}   zł`;
  }
  if (total === 0) {
    N1.innerHTML = `Bilans wynosi 0`;
  }
  if (total < 0) {
    N1.innerHTML = `Bilans jest ujemny. Jesteś ${total} na minusie`;
  }
};

// UPDATE
// funkcje zmieniające Model

const addIncome = (newIncome) => {
  const newIncomes = [...incomes, newIncome];
  incomes = newIncomes; // change Model
  renderApp(); // change View
};

const deleteIncome = (incomeId) => {
  const newIncomes = incomes.filter(({ id }) => id !== incomeId);
  incomes = newIncomes; // change Model
  renderApp(); // change View
};

const updateIncome = (newIncome) => {
  const newIncomes = incomes.map((income) =>
    income.id === newIncome.id ? newIncome : income
  );
  incomes = newIncomes; // change Model
  renderApp(); // change View
};

//DE
const addDecome = (newDecome) => {
  const newDecomes = [...decomes, newDecome];
  decomes = newDecomes; // change Model
  renderApp2(); // change View
};

const deleteDecome = (decomeId) => {
  const newDecomes = decomes.filter(({ id }) => id !== decomeId);
  decomes = newDecomes; // change Model
  renderApp2(); // change View
};
const updateDecome = (newDecome) => {
  const newDecomes = decomes.map((decome) =>
    decome.id === newDecome.id ? newDecome : decome
  );
  decomes = newDecomes; // change Model
  renderApp2(); // change View
};

// Eventy
addIncomeFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); // forma nie przeładuje strony

  const { newIncomeName, newSumName } = e.currentTarget.elements; // targetujemy html'owy element <input />, który ma atrybut name="newCourseName"
  const incomeId = uuid.v4();
  const newIncome = {
    id: incomeId,
    name: newIncomeName.value,
    sum: Number(newSumName.value),
  };
  addIncome(newIncome);

  sumaDOM.innerHTML = "Suma przychodów:" + sumOfIncomes() + "zł";

  renderSumInandDe();
});

editFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); // forma nie przeładuje strony

  const { editId, editName, editInc } = e.currentTarget.elements; // targetujemy html'owy element <input />, który ma atrybut name="newCourseName"
  const newIncome = {
    id: editId.value,
    name: editName.value,
    sum: Number(editInc.value),
  };
  updateIncome(newIncome);

  sumaDOM.innerHTML = "Suma przychodów:" + sumOfIncomes() + "zł";

  renderSumInandDe();
});

function sumOfIncomes() {
  return incomes.reduce((acc, { sum }) => acc + sum, 0);
}
function sumOfDecomes() {
  return decomes.reduce((acc, { sum2 }) => acc + sum2, 0);
}
function sumOfIncomesAndDecomes() {
  return Number(sumOfIncomes()) - Number(sumOfDecomes());
}

//De
addDecomeFormDOM.addEventListener("submit", (e) => {
  e.preventDefault(); // forma nie przeładuje strony

  const { newDecomeName, newMinName } = e.currentTarget.elements; // targetujemy html'owy element <input />, który ma atrybut name="newCourseName"
  const decomeId = uuid.v4();
  const newDecome = {
    id: decomeId,
    name2: newDecomeName.value,
    sum2: Number(newMinName.value),
  };
  addDecome(newDecome);
  //suma2 = suma2 + newDecome.sum2;
  suma2DOM.innerHTML = "Suma wydatków:" + sumOfDncomes() + "zł";

  renderSumInandDe();
});
qs("#editForm").addEventListener("submit", (e) => {
  e.preventDefault(); // forma nie przeładuje strony

  const { editId, editName, editInc } = e.currentTarget.elements; // targetujemy html'owy element <input />, który ma atrybut name="newCourseName"
  const newDecome = {
    id: editId.value,
    name2: editName.value,
    sum2: Number(editInc.value),
  };
  updateDecome(newDecome);
  //suma2 = suma2 + updateDecome.sum2;
  suma2DOM.innerHTML = "Suma wydatków:" + sumOfDecomes() + "zł";

  renderSumInandDe();
});

// Start aplikacji
renderApp();
renderApp2();
