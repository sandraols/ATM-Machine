const users = [
  {
    name: "Aisha",
    pin: 1234,
    balance: 2000,
    isBlocked: false,
    failedAttempts: 0
  },
  {
    name: "Sandra",
    pin: 5678,
    balance: 5000,
    isBlocked: false,
    failedAttempts: 0
  },
  {
    name: "Max",
    pin: 4321,
    balance: 0,
    isBlocked: true,
    failedAttempts: 0
  }
];

// Login page
const loginBtn = document.querySelector("#login-btn");
const name = document.querySelector("#name");
const pin = document.querySelector("#pin");
const modal = document.querySelector("#modal");
const loginPage = document.querySelector("#login-page");
const loggedInPage = document.querySelector("#logged-in-page");
let loggedInUser;

loginBtn.addEventListener("click", function(event) {
  event.preventDefault();
  loginUser(name.value, pin.value);
});

const loginUser = (name, pin) => {
  const user = users.find(user => {
    return user.name == name;
  });
  if (user) {
    if (user.isBlocked) {
      modal.innerHTML += `<div class="modal-content">
        <p class="modal-paragraph">User blocked.<br> No login attempts available.</p>
        <button onclick="closeModal()" class="modal-btn">Ok</button>
      </div>`;
      loginBtn.disabled = true;
      return;
    }
    if (user.pin != pin) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= 3) {
        modal.innerHTML += `<div class="modal-content">
          <p class="modal-paragraph">Login failed.<br> No more login attempts available.</p>
          <button onclick="closeModal()" class="modal-btn">Ok</button>
        </div>`;
        user.isBlocked = true;
        loginBtn.disabled = true;
      } else {
        modal.innerHTML += `<div class="modal-content">
          <p class="modal-paragraph">Login failed.<br> you have 
          ${3 - user.failedAttempts} login attempts left.</p>
          <button onclick="removeModalAndPin()" class="modal-btn">Ok</button>
        </div>`;
      }
    } else {
      loginPage.classList.add("disabled");
      loggedInPage.classList.remove("disabled");
      loggedInUser = user;
      welcomeTitle.innerHTML += `<h1 class="subtitle text">Welcome!<h1>
        <h2 class="title text">${loggedInUser.name}<h2>`;
    }
  } else {
    modal.innerHTML += `<div class="modal-content">
      <p class="modal-paragraph">User not found</p>
      <button onclick="closeModal()" class="modal-btn">Ok</button>
    </div>`;
  }
};

const clearInputFields = () => {
  name.value = "";
  pin.value = "";
  withdrawInput.value = "";
  depositInput.value = "";
};
const enableLoginBtn = () => {
  loginBtn.disabled = false;
};
const closeModal = () => {
  modal.innerHTML = "";
  clearInputFields();
  enableLoginBtn();
};
const removeModalAndPin = () => {
  modal.innerHTML = "";
  pin.value = "";
};

// Logged in page
const welcomeTitle = document.querySelector(".welcome-title");
const balanceBtn = document.querySelector("#balance-btn");
const loggedInModal = document.querySelector("#logged-in-modal");
const withdrawInput = document.querySelector("#withdraw");
const withdrawBtn = document.querySelector("#withdraw-btn");
const depositInput = document.querySelector("#deposit");
const depositBtn = document.querySelector("#deposit-btn");
const logOutBtn = document.querySelector("#log-out-btn");

//withdraw
withdrawBtn.addEventListener("click", function(event) {
  event.preventDefault();
  withdrawMoney(withdrawInput.value);
});

const withdrawMoney = amount => {
  if (amount == "") {
    loggedInModal.innerHTML += `<div class="modal-content insert-modal">
    <p class="modal-paragraph">No amount declared.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    depositBtn.disabled = true;
    depositInput.disabled = true;
    return;
  } else if (amount > loggedInUser.balance) {
    loggedInModal.innerHTML += `<div class="modal-content">
    <p class="modal-paragraph">Sorry.<br>Insufficient funds.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    depositBtn.disabled = true;
    depositInput.disabled = true;
    clearInputFields();
    return;
  } else if (amount % 100 !== 0) {
    loggedInModal.innerHTML += `<div class="modal-content">
    <p class="modal-paragraph">Invalid amount.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    depositBtn.disabled = true;
    depositInput.disabled = true;
    clearInputFields();
    return;
  } else {
    loggedInModal.innerHTML += `<div class="modal-content withdraw-modal">
    <p class="subtitle text">Successful!<p>
    <p class="modal-paragraph">Please wait for your money.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    loggedInUser.balance -= amount;
    clearInputFields();
    depositBtn.disabled = true;
    depositInput.disabled = true;
  }
};

//deposit
depositBtn.addEventListener("click", function(event) {
  event.preventDefault();
  depositMoney(depositInput.value);
});

const depositMoney = amount => {
  if (amount == "") {
    loggedInModal.innerHTML += `<div class="modal-content deposit-modal">
    <p class="modal-paragraph">No amount declared.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
  } else {
    loggedInModal.innerHTML += `<div class="modal-content deposit-modal">
        <p class="subtitle text">Money in the bank!<p>
        <p class="modal-paragraph">Amount of ${amount}:- deposited successfully.</p>
        <button onclick="removeModal()" class="modal-btn">Ok</button>
        </div>`;
    loggedInUser.balance += parseInt(amount);
    clearInputFields();
    depositBtn.disabled = true;
    depositInput.disabled = true;
  }
};

//balance
balanceBtn.addEventListener("click", function(event) {
  event.preventDefault();
  checkBalance();
});

const checkBalance = () => {
  loggedInModal.innerHTML += `<div class="modal-content">
        <p class="modal-paragraph">You have ${loggedInUser.balance}:- on your account.</p>
        <button onclick="removeModal()" class="modal-btn">Ok</button>
      </div>`;
  withdrawBtn.disabled = true;
  withdrawInput.disabled = true;
  depositBtn.disabled = true;
  depositInput.disabled = true;
};

const removeModal = () => {
  loggedInModal.innerHTML = "";
  withdrawBtn.disabled = false;
  withdrawInput.disabled = false;
  depositBtn.disabled = false;
  depositInput.disabled = false;
};

//log out
logOutBtn.addEventListener("click", function() {
  location.reload(false);
});

/*
to do:
- Update balance in local storage
- Show pin as * in pin input
- Show amount with spaces. For example 10 000 instead of 10000
*/
