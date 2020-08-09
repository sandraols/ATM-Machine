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
      console.log("logged in");
      loggedInUser = user;
    }
  } else {
    alert("User not found");
  }
};

const closeModal = () => {
  modal.innerHTML = "";
  clearInputFields();
  enableLoginBtn();
};
const clearInputFields = () => {
  name.value = "";
  pin.value = "";
};
const enableLoginBtn = () => {
  loginBtn.disabled = false;
};
const removeModalAndPin = () => {
    modal.innerHTML = "";
    pin.value = "";
}
// name.addEventListener('click', function() {
//     clearInputFields();
//     enableLoginBtn();
// });

// When user is logged in

let loggedInUser;
balanceBtn = document.getElementById("btn");
balanceBtn.addEventListener("click", function() {
  checkBalance();
});

const checkBalance = () => {
  console.log(loggedInUser.balance);
};
