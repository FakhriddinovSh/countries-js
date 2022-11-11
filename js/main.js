const elChangeThemeBtn = document.querySelector(".header-mode")

elChangeThemeBtn.addEventListener("click", function(){
    document.body.classList.toggle("theme-button")
})

// Importing Form Elements
const elForm = document.querySelector(".form");
const elFormInput = elForm.querySelector(".form-input");
const elSelect = elForm.querySelector(".form-select");
const elList = document.querySelector(".list");
const elTemplate = document.querySelector(".template").content;
const fragment = new DocumentFragment();

// Importing Modal element
const modalTitle = document.querySelector(".countries-modal-title");
const modalImage = document.querySelector(".countries-modal-image");
const modalRegion = document.querySelector(".countries-modal-region");
const modalCurrency = document.querySelector(".countries-modal-currencies");
const modalBorder = document.querySelector(".countries-modal-border");
const modalLanguage = document.querySelector(".countries-modal-language");
const modalSubregion = document.querySelector(".countries-modal-subregion");
const modalLink = document.querySelector(".countries-modal-link");


function fetchCountries(api, list = 0){
    fetch(api)
    .then(res => res.json())
    .then(data => {
        data.forEach(item =>{
            list.innerHTML = "";
            const clonedTemplate = elTemplate.cloneNode(true);
            clonedTemplate.querySelector(".countries-flag").src = item.flags.png;
            clonedTemplate.querySelector(".countries-population").textContent = item.population
            clonedTemplate.querySelector(".countries-title").textContent = item.name.official
            clonedTemplate.querySelector(".countries-region").textContent = item.region;
            clonedTemplate.querySelector(".countries-capital").textContent = item.capital;
            clonedTemplate.querySelector(".countries-btn").dataset.id = item.population;
            
            fragment.appendChild(clonedTemplate)
        })
        elList.appendChild(fragment)
    })
}

fetchCountries("https://restcountries.com/v3.1/all", elList)

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    const formInputValue = elFormInput.value.trim();
    if(formInputValue){
        const API_SEARCH = `https://restcountries.com/v3.1/name/${formInputValue}`
        elList.innerHTML = ""
        fetchCountries(API_SEARCH)
    }

    const selectValue = elSelect.value;
    console.log(selectValue);
    if(selectValue == "africa"){
        fetchCountries("https://restcountries.com/v3.1/region/africa", elList)
    }
    else if(selectValue == "america"){
        fetchCountries("https://restcountries.com/v3.1/region/america", elList)
    }
    else if(selectValue == "asia"){
        fetchCountries("https://restcountries.com/v3.1/region/asia", elList)
    }
    else if(selectValue == "europe"){
        fetchCountries("https://restcountries.com/v3.1/region/europe", elList)
    }
    else if(selectValue == "oceania"){
        fetchCountries("https://restcountries.com/v3.1/region/oceania", elList)
    }
})


function findModal(myfind){
    fetch("https://restcountries.com/v3.1/all")
    .then(res => res.json())
    .then(data => {
        const findedElement = data.find(item => {
            return item.population == myfind
        })
        modalTitle.textContent = findedElement.name.official;
        modalImage.src = findedElement.flags.svg;
        modalRegion.textContent = findedElement.region;
        let currency = Object.keys(findedElement.currencies)
        modalCurrency.textContent = currency;
        let borderArr = findedElement.borders;     
        modalBorder.textContent = borderArr.join(" ");
        const languagess = Object.keys(findedElement.languages)
        modalLanguage.textContent = languagess
        modalSubregion.textContent = findedElement.subregion
        const a = findedElement.maps
        const entri = Object.entries(a).flat()[1]
        modalLink.href = entri;
    }).catch(err => console.log(err))
}

elList.addEventListener("click", (evt)=>{
    if(evt.target.matches(".countries-btn")){
        findModal(evt.target.dataset.id)
    }
})

