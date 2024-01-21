const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropDown = document.querySelectorAll("form select")
const btn = document.querySelector('form button')
const inpAmount = document.querySelector("form input")

const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')

for (select of dropDown){
    for (currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        select.append(newOption)

        if(select.name === "from" && currCode ==="USD"){
            newOption.selected = "selected"
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected"
        }
        
    }
    
    select.addEventListener("change", (evet) => {
        updateFlag(evet.target)
    }) 
}


const updateFlag = (element) => {
    let flag = element.value
    let imgCode = countryList[flag]
    let newSrc = `https://flagsapi.com/${imgCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector('form input')
    if(amount.value < 1 || amount.value === null){
        amount.value = 1
    }
    let amtValue = amount.value
    let msg = document.querySelector(".msg")
    let URL  = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let responce = await fetch(URL)
    let data = await responce.json()
    let rate = data[toCurr.value.toLowerCase()]
    
    let excValue = amtValue*rate
    msg.innerText = `${amtValue} ${fromCurr.value} = ${excValue.toFixed(2)} ${toCurr.value}`

})


