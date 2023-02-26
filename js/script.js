const loadPhones = async (searchValue, dataLimit) => {
    if(searchValue == ''){
        searchValue = 'apple'
    }
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
    else {
        noFound.classList.add('d-none');
    }

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        seeMore.classList.remove('d-none');
    }
    else {
        seeMore.classList.add('d-none')
    }
    // looping every phone with foreach
    phones.forEach(phone => {
        const { brand, image, phone_name, slug } = phone
        console.log(phone);
        const col = document.createElement('div');
        col.classList.add('col');
        col.innerHTML = `
        <div class="card">
            <img  src="${image}" class=" w-50 mx-auto card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                to additional content. This content is a little bit longer.
                </p>
                <button onclick="details('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Details</button>

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
document.getElementById('input-field').addEventListener('keypress', function (e) {
    console.log(e.key);
    if (e.key == "Enter") {
        proccessFunc(10);
    }
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
    else {
        spinner.classList.add('d-none')
    }
}

async function details(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    showDetails(data.data)
}

const showDetails = (data) => {

    console.log(data)
    const {brand, name, releaseDate} = data;
    const {storage, displaySize, chipSet} = data.mainFeatures;
    const {Bluetooth, GPS, NFC} = data.others;
    const phoneModal = document.getElementById('phoneModal');
    phoneModal.innerHTML = '';
    const modalDialogDiv = document.createElement('div');
    modalDialogDiv.classList.add('modal-dialog')
    modalDialogDiv.innerHTML = `
    <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="phoneModalLabel">${brand}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div>
                    <h5>Main Features</h5>
                    <h3>${name}</h3>
                    <p>Release Date: ${ releaseDate ? releaseDate : 'no release data found'}</p>
                    <p>Storage: ${storage}</p>
                    <p>Display Size : ${displaySize}</p>
                    <p>chipSet : ${chipSet}</p>
                </div>
                <div>
                    <h5>Others Features</h5>
                    <p>Bluetooth: ${ Bluetooth ? Bluetooth : 'no release data found'}</p>
                    <p>GPS: ${ GPS ? GPS : 'no release data found'}</p>
                    <p>NFC: ${ NFC ? NFC : 'no release data found'}</p>
                </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
    `
    phoneModal.appendChild(modalDialogDiv);

}
loadPhones('apple', 10)

// ${}