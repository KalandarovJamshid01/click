'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const account = [account1, account2, account3, account4];

let login = account.forEach(function (val) {
  val.userName = val.owner
    .toLowerCase()
    .split(' ')
    .map(function (val) {
      return val[0];
    })
    .join('');
});

// let x = account.find(function (val) {
//   if (val.userName == 'jd') {
//     return val;
//   }
// });
// console.log(x);

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
let ekrangachiqar = function (obj) {
  containerMovements.innerHTML = ''; //tozalash
  obj.movements.forEach(function (val, key) {
    let tekshir = val > 0 ? 'deposit' : 'withdrawal';
    let qalay = ` <div class="movements__row">
<div class="movements__type movements__type--${tekshir}"">${
      key + 1
    } ${tekshir}</div>
<div class="movements__date">3 days ago</div>
<div class="movements__value">${val}???</div>
</div>`;
    containerMovements.insertAdjacentHTML('afterbegin', qalay);
  });
};
const pulyigindisi = function (obj) {
  let yig = obj.movements.reduce(function (yig, val) {
    return yig + val;
  }, 0);
  return yig;
};

let sumIn = 0;
let out = 0;
let komissiya = 0;
const stat = function (obj) {
  out = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .reduce(function (sum, val) {
      return sum + val;
    }, 0);
  sumIn = obj.movements
    .filter(function (val) {
      return val > 0;
    })
    .reduce(function (sum, val) {
      return sum + val;
    }, 0);
  komissiya = obj.movements
    .filter(function (val) {
      return val < 0;
    })
    .map(function (val) {
      return (val * obj.interestRate) / 100;
    })
    .reduce(function (sum, val) {
      return sum + val;
    }, 0);
};
let kirganUser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  let login = inputLoginUsername.value;
  let parol = Number(inputLoginPin.value);
  kirganUser = account.find(function (val) {
    return val.userName == login;
  });
  if (kirganUser?.pin === parol) {
    labelWelcome.textContent = `Welcome ${kirganUser.owner}`;
    containerApp.style.opacity = 1;
    labelWelcome.style.color = '#333';
  } else {
    labelWelcome.textContent = `Try again`;
    labelWelcome.style.color = 'red';
  }
  if (!kirganUser) {
    labelWelcome.textContent = `Try again`;
    labelWelcome.style.color = 'red';
  }
  inputLoginUsername.value = inputLoginPin.value = '';
  smalRefresh();
});
let smalRefresh = function () {
  ekrangachiqar(kirganUser);
  pulyigindisi(kirganUser);
  labelBalance.textContent = `${pulyigindisi(kirganUser)}$`;
  stat(kirganUser);
  labelSumIn.textContent = `${sumIn}$`;
  labelSumOut.textContent = `${Math.abs(out)}$`;
  labelSumInterest.textContent = `${Math.abs(komissiya)}$`;
};
btnTransfer.addEventListener('click', function (d) {
  d.preventDefault();
  let transferTo = String(inputTransferTo.value);
  let transferAmount = Number(inputTransferAmount.value);
  let transferUser = account.find(function (val) {
    return transferTo === val.userName;
  });
  if (transferUser !== kirganUser) {
    if (pulyigindisi(kirganUser) > transferAmount) {
      if (transferUser.movements.push(transferAmount)) {
        kirganUser.movements.push(transferAmount * -1);
      }
      smalRefresh();
    }
  }
});
btnLoan.addEventListener('click', function (f) {
  f.preventDefault();
  let loanAmount = Number(inputLoanAmount.value);
  if (sumIn * 0.1 >= loanAmount) {
    kirganUser.movements.push(loanAmount);
    smalRefresh();
  }
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  let closeUser = inputCloseUsername.value;
  let closePin = Number(inputClosePin.value);
  if (closeUser == kirganUser.userName && closePin == kirganUser.pin) {
    account.splice(account.indexOf(kirganUser), 1);
  }
  console.log(account);
  containerApp.style.opacity = 0;
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
