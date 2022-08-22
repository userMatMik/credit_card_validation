const cardEl = document.querySelector('#card');
const nameInput = document.querySelector('#name');
const cardNumberInput = document.querySelector('#cardnumber');
const expirationInput = document.querySelector('#expirationdate');
const cvvInput = document.querySelector('#securitycode');

const cardNumberFront = document.querySelector('#card-number-front');
const cardOwnerName = document.querySelector('#card-owner-name-front');
const expirationDateEl = document.querySelector('#expiration-date');
const cvvEl = document.querySelector('#cvv');

console.log(cvv)

//expiration date handle
expirationInput.addEventListener('input', (event) => {
    expirationDateEl.textContent = event.target.value;
})

expirationInput.addEventListener('keypress', (event) => {
    const code = event.keyCode;
    let inputValue = event.currentTarget.value
    console.log(inputValue)
    console.log(event);
    if (!((code >= 48 && code <= 57) || code === 8)) {
        event.preventDefault();
    }
    if (inputValue.length === 2) {
        event.currentTarget.value += '/';
    }
})

//name handle
nameInput.addEventListener('input', (event) => {
    cardOwnerName.textContent = event.target.value;
})

//card number handle
cardNumberInput.addEventListener('input', (event) => {
    cardNumberFront.textContent = event.target.value;
})

cardNumberInput.addEventListener('keypress', (event) => {
    const pressedKeyCode = event.keyCode;
    const inputValue = event.target.value

    if(!((pressedKeyCode >= 48 && pressedKeyCode <= 57) || pressedKeyCode === 8)) {
        event.preventDefault();
    }

    if (inputValue.length === 4 || inputValue.length === 9 || inputValue.length === 14) {
        event.target.value += " ";
    }  
})

// cvv handle

cvvInput.addEventListener('input', (event) => {
    cvvEl.textContent = event.target.value;
})

cvvInput.addEventListener('keypress', (event) => {
    const pressedKeyCode = event.keyCode;
    if(!((pressedKeyCode >= 48 && pressedKeyCode <= 57) || pressedKeyCode === 8)) {
        event.preventDefault();
    }
})


//check provider and change logo on card  console.log(luhnsCheck('5193080150954111'))
// console.log(verifyCardProvider('371449635398431'))
// console.log(luhnsCheck('6011111111111117')) 4222222222222 


function changeProviderLogo(event) {
    const visaLogo = document.querySelector('#visa');
    const masterCardLogo = document.querySelector('#master_card');
    const americanExpLogo = document.querySelector('#american_exp');
    
    const logos = document.querySelectorAll('.logo');
    

    const val = event.target.value.replaceAll(' ', '');
    const cardProvider = verifyCardProvider(val);

    if (cardProvider === 'MasterCard') {
        logos.forEach(logo => {
            logo.classList.remove('active');
            })
        masterCardLogo.classList.add('active');
    } else if (cardProvider === 'AmericanExpress') {
        logos.forEach(logo => {
            logo.classList.remove('active');
            })
        americanExpLogo.classList.add('active');
    } else if (cardProvider === 'Visa') {
        logos.forEach(logo => {
            logo.classList.remove('active');
            })
        visaLogo.classList.add('active');
    }

    // switch (cardProvider) {
    //     case 'MasterCard':
    //         logos.forEach(logo => {
    //             logo.classList.remove('active');
    //         })
    //         masterCardLogo.classList.add('active');
        
    //     case 'Visa': {
    //         logos.forEach(logo => {
    //             logo.classList.remove('active');
    //         })
    //         visaLogo.classList.add('active');
    //     }
    //     case 'AmericanExpress': {
    //         logos.forEach(logo => {
    //             logo.classList.remove('active');
    //         })
    //         americanExpLogo.classList.add('active');
    //     }
    // }

    console.log(val);
    console.log(cardProvider);
    

}

cardNumberInput.addEventListener('input', changeProviderLogo)


// cardNumberInput.addEventListener('input', (event) => {
//     let test = event.target.value
//     console.log(test.length)
//     let test2 =''
//     if (test.length > 4 ) {
//         for (i = 0; i < test.length; i += 4) {
//             test2 += test.slice(i, i + 4) + ' ';
//         }
//     }
//     console.log(test)
//     cardNumberFront.textContent = test.length <= 4 ? test : test2;
    

//     cardNumberInput.addEventListener('focusout', () => {
//         console.log('focus out');
//         cardNumberInput.value = test2;
//     })
// })

cvvInput.addEventListener('focus', () => {
    cardEl.classList.add('flipped')
})

cvvInput.addEventListener('focusout', () => {
    cardEl.classList.remove('flipped');
})

// Luhns validation
// TODO: try to use reduce more

function luhnsCheck(cardNumber) {
    cardNumReversed = [...cardNumber].map(str => Number(str)).reverse();

    const sumOfEven = cardNumReversed.reduce((acc, num, index) => {
        return index % 2 === 0 ? acc += num : acc += 0;
    }, 0)
    
    for(let i = 0; i < cardNumReversed.length; i++) {
        if (i % 2 !== 0) {
            cardNumReversed[i] *= 2;
            if (cardNumReversed[i] > 9) {
                cardNumReversed[i] -= 9;
            }
        } else {
            cardNumReversed[i] = 0;
        }
    }

    const sumOfOdd = cardNumReversed.reduce((acc, num) => {
        return acc += num;
    }, 0)

    if ((sumOfOdd + sumOfEven) % 10 === 0) {
        return 'is Valid'
    } else {
        return 'not valid'
    }
}

function verifyCardProvider(cardNumber) {

    //TODO: Mastercard 16 characters and starts with 51, 52, 53, 54, 55
    //TODO: Visa 13 OR 16 characters and starts with 4
    //TODO: American Express 15 characters and starts with 34, 37

    let firstTwoChars = cardNumber.slice(0, 2)

    if (cardNumber.length === 16 && (firstTwoChars == 51 || firstTwoChars == 52 || firstTwoChars == 53 || firstTwoChars == 54 || firstTwoChars == 55)) {
        return "MasterCard";
    } else if ((cardNumber.length === 13 || cardNumber.length === 16) && cardNumber[0] == 4) {
        return "Visa";
    } else if (cardNumber.length === 15 && (firstTwoChars == 34 || firstTwoChars == 37)) {
        return "AmericanExpress"
    } else {
        return 'Default';
    }
    
}


console.log(luhnsCheck('5193080150954111'))
console.log(luhnsCheck('378282246310005'))
console.log(luhnsCheck('371449635398431'))
console.log(luhnsCheck('6011111111111117'))
console.log(verifyCardProvider('5193080150954111'))
console.log(verifyCardProvider('4222222222222'))
console.log(verifyCardProvider('4012888888881881'))
console.log(verifyCardProvider('371449635398431'))
  