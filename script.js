let users = [
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
const createAccountModal = document.querySelector("#warning-modal");
let createNameInput;
let createPinInput;
const loginPage = document.querySelector("#login-page");
const loggedInPage = document.querySelector("#logged-in-page");
let loggedInUser;

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const checkDigitInput = event => {
  if (isOnlyDigits(event.key) || event.keyCode == 13) {
    return true;
  }
  event.preventDefault();
};

const isOnlyDigits = string => {
  const digitStrings = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const splitString = string.split("");
  return splitString.every(char => digitStrings.includes(char));
};

name.addEventListener("input", () => {
  return (name.value = capitalizeFirstLetter(name.value));
});

loginBtn.addEventListener("click", function(event) {
  event.preventDefault();
  loginUser(name.value, pin.value);
  window.localStorage.setItem("users", JSON.stringify(users));
});

const loginUser = (name, pin) => {
  const user = users.find(user => {
    return user.name.toLowerCase() == name.toLowerCase();
  });
  if (!user) {
    modal.innerHTML += `<div class="modal-content">
    <p class="modal-paragraph">User not found</p>
    <button onclick="closeModal()" class="modal-btn">Ok</button>
  </div>`;
    return;
  }

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
      return;
    }
    modal.innerHTML += `<div class="modal-content">
          <p class="modal-paragraph">Login failed.<br> you have 
          ${3 - user.failedAttempts} login attempts left.</p>
          <button onclick="removeModalAndPin()" class="modal-btn">Ok</button>
        </div>`;
    return;
  }
  loginPage.classList.add("disabled");
  loggedInPage.classList.remove("disabled");
  withdrawInput.focus();
  loggedInUser = user;
  welcomeTitle.innerHTML += `<h1 class="subtitle text">Welcome!<h1>
        <h2 class="title text">${loggedInUser.name}<h2>`;
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
const closeCreateAccountModal = type => {
  console.log(type);
  createAccountModal.innerHTML = "";
  if (type == "focusOnName") {
    createNameInput.focus();
    return;
  }
  createPinInput.focus();
};
const removeModalAndPin = () => {
  modal.innerHTML = "";
  pin.value = "";
};

// create account
const createAccountBtn = document.querySelector("#create-btn");

createAccountBtn.addEventListener("click", () => {
  createUser();
});

const createUser = () => {
  modal.innerHTML += `<div class="modal-content create-account-modal">
        <p class="modal-paragraph">Create account by filling in your name and desired pin code</p>
        <form class="create-account-form" onsubmit="createUser">
            <div class="create-account-form-section">
                <label class="label text create-account-label" for="create-name">Name:</label>
                <input 
                class="input" 
                id="create-name" 
                type="text" 
                name="create-name" 
                autocomplete="off"
                autofocus 
                required
                />
            </div>
            <div class="create-account-form-section">
                <label class="label text create-account-label" for="create-pin">Pin code:</label>
                <input 
                class="input" 
                id="create-pin" 
                type="password" 
                name="create-pin" 
                onkeypress="checkDigitInput(event)"
                maxlength="4" 
                autocomplete="off" 
                required 
                />
            </div>
            <div class="requirements">
                Your pin code must contain 4 numbers.
            </div>
            <input class="create-account-btn modal-btn" type="submit" value="Create account" />
        </form>
    </div>`;
  createAccountBtn.disabled = true;

  const verifyAccount = () => {
    modal.innerHTML += `<div class="modal-content createaccount-modal-content">
    <p class="subtitle text">Account created successfully!</p>
    <button onclick="closeModal()" class="modal-btn">Woho!</button>
  </div>`;
  };

  createNameInput = document.querySelector("#create-name");
  createPinInput = document.querySelector("#create-pin");
  const submitCreatedAccount = document.querySelector(".create-account-btn");
  createNameInput.focus();

  const createAccount = () => {
    if (createNameInput.value == "") {
      createAccountModal.innerHTML += `<div class="modal-content createaccount-modal-content">
        <p class="subtitle text">Name<br>please!</p>
        <button onclick="closeCreateAccountModal('focusOnName')" class="modal-btn">Ok</button>
      </div>`;
      return;
    }
    if (createPinInput.value == "") {
      createAccountModal.innerHTML += `<div class="modal-content createaccount-modal-content">
        <p class="subtitle text">Pin code<br>please!</p>
        <button onclick="closeCreateAccountModal()" class="modal-btn">Ok</button>
      </div>`;
      return;
    }
    if (createPinInput.value.length < 4) {
      document.querySelector(".requirements").classList.add("input-validation");
      return;
    }
    //remove when input is 4 numbers
    if (createPinInput.value.length == 4) {
        document.querySelector(".requirements").classList.remove("input-validation");
      }
    if (!isOnlyDigits(createPinInput.value)) {
      return false;
    }

    console.log(users);
    users.push({
      name: capitalizeFirstLetter(createNameInput.value),
      pin: parseInt(createPinInput.value),
      balance: 0,
      isBlocked: false,
      failedAttempts: 0
    });
    window.localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  submitCreatedAccount.addEventListener("click", event => {
    event.preventDefault();
    const accountCreated = createAccount();
    if (accountCreated) {
      closeModal();
      verifyAccount();
      createAccountBtn.disabled = false;
    }
  });
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

const isPositiveInteger = event => {
  console.log(parseInt(event.key));
  console.log(event);
  if (isNaN(parseInt(event.key))) {
    event.preventDefault();
    return false;
  }
  if (event.target.value.length == 0) {
    if (event.key == "0") {
      event.preventDefault();
      return false;
    }
  }
  window.setTimeout(function() {
    event.target.value.replace("`", "");
  }, 20);
};

//withdraw
withdrawBtn.addEventListener("click", function(event) {
  event.preventDefault();
  withdrawMoney(withdrawInput.value);
  window.localStorage.setItem("users", JSON.stringify(users));
});

const withdrawMoney = amount => {
  if (amount == "") {
    loggedInModal.innerHTML += `<div class="modal-content insert-modal">
    <p class="modal-paragraph">No amount declared.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    disableButtonsAndInputs();
    return;
  }

  if (amount > loggedInUser.balance) {
    loggedInModal.innerHTML += `<div class="modal-content">
    <p class="modal-paragraph">Sorry.<br>Insufficient funds.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    disableButtonsAndInputs();
    clearInputFields();
    return;
  }

  if (amount % 100 !== 0) {
    loggedInModal.innerHTML += `<div class="modal-content">
    <p class="modal-paragraph">Invalid amount.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
    disableButtonsAndInputs();
    clearInputFields();
    return;
  }

  loggedInModal.innerHTML += `<div class="modal-content withdraw-modal">
    <p class="subtitle text">Successful!</p>
    <p class="modal-paragraph">Please wait for your money.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
  loggedInUser.balance -= amount;
  clearInputFields();
  disableButtonsAndInputs();
};

//deposit
depositBtn.addEventListener("click", function(event) {
  event.preventDefault();
  depositMoney(depositInput.value);
  window.localStorage.setItem("users", JSON.stringify(users));
});

const depositMoney = amount => {
  if (amount == "") {
    loggedInModal.innerHTML += `<div class="modal-content deposit-modal">
    <p class="modal-paragraph">No amount declared.</p>
    <button onclick="removeModal()" class="modal-btn">Ok</button>
  </div>`;
  } else {
    loggedInModal.innerHTML += `<div class="modal-content deposit-modal">
        <p class="subtitle text">Money in the bank!</p>
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

const disableButtonsAndInputs = () => {
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

//local storage feature
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}
// localStorage.clear();

/*
to do:
- Show amount with spaces. For example 10 000 instead of 10000
*/
