const cardEl = document.querySelector('#card');
const nameInput = document.querySelector('#name');
const cardNumberInput = document.querySelector('#cardnumber');
const expirationInpu = document.querySelector('#expirationdate');
const cvvInput = document.querySelector('#securitycode');

const cardNumberFront = document.querySelector('#card-number-front');
const cardOwnerName = document.querySelector('#card-owner-name-front');

// console.log(cardNumberFront)

nameInput.addEventListener('input', (event) => {
    let test = (event.target.value).toUpperCase();
    console.log(test.length)
    let test2 =''
    if (test.length > 4 ) {
        for (i = 0; i < test.length; i += 4) {
            test2 += test.slice(i, i + 4) + ' ';
        }
    }
    console.log(test)
    cardOwnerName.textContent = test.length <= 4 ? test : test2;
})

cardNumberInput.addEventListener('input', (event) => {
    let test = (event.target.value).toUpperCase();
    console.log(test.length)
    let test2 =''
    if (test.length > 4 ) {
        for (i = 0; i < test.length; i += 4) {
            test2 += test.slice(i, i + 4) + ' ';
        }
    }
    console.log(test)
    cardNumberFront.textContent = test.length <= 4 ? test : test2;
})

cvvInput.addEventListener('focus', () => {
    cardEl.classList.add('flipped')
})

console.log(cardEl)

let splitted = ''
const str = "1234567890123456"

for(let i = 0; i < str.length; i += 4) {
    
    splitted += str.slice(i, i + 4) + ' ';
    
    console.log(splitted)
}



function findUniq(arr) {
    const sortedArr =arr.sort((a,b)=>a-b)
    return sortedArr[0] === sortedArr[1] ? sortedArr[sortedArr.length - 1] : sortedArr[0]
  }


console.log(findUniq([ 1, 1, 1, 2, 1, 1 ]))