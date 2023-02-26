const loadPhones = async (searchValue, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    showPhone(data.data, dataLimit);
}


const showPhone = (phones, dataLimit) => {
    // slice 
   
    // delete previous card from phone container 
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // no result displayer 
    const noFound = document.getElementById('no-phone-found');
    const seeMore = document.getElementById('see-more');
    
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
    }
    else{
        noFound.classList.add('d-none');
    }

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        seeMore.classList.remove('d-none');
    }
    else{
        seeMore.classList.add('d-none')
    }
    // looping every phone with foreach
    phones.forEach(phone => {
        const {brand, image, phone_name, slug}  = phone
        console.log(phone);
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
        <div class="card">
            <img  src="${image}" class=" w-50 mx-auto card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
            </div>
        </div>
        `
        phoneContainer.appendChild(col);
    });
    spinnerOnOff(false);
}
// click event :
document.getElementById('search-btn').addEventListener('click', function () {
    proccessFunc(10)
})
function proccessFunc(dataLimit) {
    spinnerOnOff(true);
    const searchValue = document.getElementById('input-field').value;
    loadPhones(searchValue, dataLimit);
}
document.getElementById('see-more-btn').addEventListener('click', function () {
    proccessFunc()
})
// spinner on of function
const spinner = document.getElementById('spinner');
function spinnerOnOff(isLoading) {
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else{
        spinner.classList.add('d-none')
    }
}
// loadPhones()

// ${}