// --- Student ID ---
const studentId = '65345';



// --- Date-related Operations & Functions ---

// Get the current date
let currentDate = new Date();

// Format the date as 'YYYY-MM-DD'
let day = padNumber(currentDate.getDate());
let month = padNumber(currentDate.getMonth() + 1);
let year = currentDate.getFullYear();
let today = `${year}` + '-' + `${month}` + '-' + `${day}`;

// Format the time as 'HH:MM'
let currentTime = padNumber(currentDate.getHours()) + ':' + padNumber(currentDate.getMinutes());

// Round the hour up to the next full hour
let nextFullHour = roundToNextFullHour(currentDate.getHours());

/**
 * Helper Function: Pad numbers to format a single-digit number to double-digit
 * @param {number} num - The number to pad
 * @returns {string} - The padded number in two digit format
 */
function padNumber(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Helper Function: Round hour to next full hour
 * @param {number} num - The hour to round up
 * @returns {string} - The rounded number 
 */
function roundToNextFullHour(num) {
    const nextFullHour = Number(num + 1) + ':00';
    return nextFullHour;
}

/**
 * Helper Function: Convert a date to the format 'DAY, MONTH DATE, YEAR'
 * @param {string} valueDate - The date to convert
 * @returns {string} - The formatted date
 */
function convertDateToDayMonthDateYear(valueDate) {
    const option = {weekday: 'short', month: 'long', year: 'numeric', day: 'numeric'};
    let dateAsString = new Date(valueDate).toLocaleDateString('en-us', option);
    return dateAsString;
}



// --- Window-related Operations & Functions

//Initialization of tab switcher on window onload
window.onload = tabSwitcher();
//Render loading dots while desks are loading and rendering on window load
window.onload = renderLoadingDots('desks');  
window.onload = renderLoadingDots('reservations');
//Render loading dots while reservations are loading and rendering on window load

//Load and render all desk and reservation information
window.onload = async function() {
    try {
        /**
         * Fetch all desks and return a promise
         * @returns {Promise<[]>} - All desks
         */
        const data = await getAllDesks();

        /**
         * Sort desks in alphabetical order
         * @param {array} desks - The array of desks to be sorted
         * @returns {array} - Returns the array of desks in alphabetical order
         */
        const sortedData = sortInAlphabeticalOrder(data);

        /**
         * Render desks
         * @param {array} sortedData - The array of desks in alphabetical order
         */
        setTimeout(() => renderDesks(sortedData), 1000);

        /**
         * Load reservations of the desks
         * @param {array} data - The array of all desks
         */
        loadReservations(data);
        } catch (error) {
        // Logging
        console.log(error);
    }
}

// Add event listener to scroll the window to the top when page is refreshed
window.addEventListener('beforeunload', () => {window.scrollTo({top: 0, behavior: 'instant'})});

/// --- Navigation Bar / Menu

// Add event listener for logo to refresh page
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
    window.location.reload();
});

/**
 * Function: Switch tabs
 * Each tab has a tab id, set as data attribute
 * Tab ID: 1 = Home
 * Tab ID: 2 = About
 * Tab ID: 3 = FAQ
 * Tab ID: 4 = Contact
 * Tab ID: 5 = Book
 */
function tabSwitcher() {
    //Grabbing tab id 
    const tabSwitcher = document.querySelectorAll(`[data-switcher]`);
    for (let i = 0; i < tabSwitcher.length; i++) {
        const tab = tabSwitcher[i];
        const pageId = tab.dataset.tab;
        // Add event listener for each tab
        tab.addEventListener('click', () => {
            const currentTab = document.querySelector('header .navbar .tab.active');
            currentTab.classList.remove('active');
            tab.classList.add('active');
            switchPage(pageId);
        });
    }
}

/**
 * Function: Switch page
 * @param {num} pageId - The page id determines what page gets shown
 */
function switchPage(pageId)  {
    const currentPage = document.querySelector('.pages .page.active');
    currentPage.classList.remove('active');
    const nextPage = document.querySelector(`.pages .page[data-page = '${pageId}']`);
    nextPage.classList.add('active');
    // Closing dropdown navigation menu if screen witdh < 840px
    closeDropdown();
    // After each page switch the view will be reseted to the top of the page
    window.scrollTo({top: 0, behavior: 'instant'});
}

/**
 * Function: Toggle hamburger to open or close dropdown navigation menu
 */
const hamburger = document.querySelector('.hamburger');
//Hamburger Status -> ture = active, false = inactive
let hamburgerActive = false; 
const background = document.querySelector('.dropdown_background');
const navbar = document.querySelector('.navbar');
hamburger.addEventListener('click', () => {
    // If hamburger is not active, open drowpdown and change icon to cross
    if (!hamburgerActive) {
        hamburger.classList.add('active');
        // Hamburger Status: active
        hamburgerActive = true;
        background.classList.add('active');
        navbar.classList.add('dropdown');   
    } 
    // Else close dropdown and change icon to hamburger
    else {
        hamburger.classList.remove('active');
        //Hamburger Status: inactive
        hamburgerActive = false; 
        background.classList.remove('active');
        navbar.classList.remove('dropdown');
    } 
});
/**
 * Helper Function: Close dropwdown navigation menu
 */
function closeDropdown() {
    if (hamburgerActive === true) {
        hamburger.classList.remove('active');
        hamburgerActive = false;
        background.classList.remove('active');
        navbar.classList.remove('dropdown'); 
    }
}



// --- Links ---

// Add event listener for link that refers to the FAQs on the Contact page
const faqLink = document.getElementById('link_to_faq');
faqLink.addEventListener('click', () => {
    const id_page = document.getElementById('faq_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link that refers to Contact on the FAQ page
const contactLink = document.getElementById('link_to_contact');
contactLink.addEventListener('click', () => {
    const id_page = document.getElementById('contact_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link that refers to Book on the FAQ page
const bookingLink = document.getElementById('link_to_booking');
bookingLink.addEventListener('click', () => {
    const id_page = document.getElementById('booking_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link from footer, that refers to Home page
const footerHome = document.getElementById('link_home');
footerHome.addEventListener('click', () => {
    const id_page = document.getElementById('home_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link from footer, that refers to the About page
const footerAbout = document.getElementById('link_about');
footerAbout.addEventListener('click', () => {
    const id_page = document.getElementById('about_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link from footer, that refers to the Book page
const footerBook = document.getElementById('link_book');
footerBook.addEventListener('click', () => {
    const id_page = document.getElementById('booking_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link from footer, that refers to the Contact page
const footerContact = document.getElementById('link_contact');
footerContact.addEventListener('click', () => {
    const id_page = document.getElementById('contact_page').id;
    linkSwitcher(id_page);
});

// Add event listener for link from footer, that refers to the FAQ page
const footerFaq = document.getElementById('link_faq');
footerFaq.addEventListener('click', () => {
    const id_page = document.getElementById('faq_page').id;
    linkSwitcher(id_page);
});

/**
 * Helper Function: Handles the page switch coming from the links in the footer
 * @param {num} id_page - The page id determines what page gets shown
 */
function linkSwitcher(id_page) {
    const currentTab = document.querySelector('header .navbar .tab.active');
    currentTab.classList.remove('active');
    const nextTab = document.getElementById(id_page);
    nextTab.classList.add('active');
    const pageId = nextTab.getAttribute('data-tab');
    // Switch page
    switchPage(pageId);
}



/// --- Map on Contact Page ---

// Create map
var mapContact = L.map('map_offices').setView([36.365, 56.157], 2);

// Define custom pin
var pinIcon = L.icon({
    iconUrl: 'pin.jpg',
    iconSize: [30, 30],
    iconAnchor: [15,25]
});

//Create tile layer with OSM
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mapContact);

// Workaround for tiles not loading properly duo to defined map size 
setInterval(function () {
    mapContact.invalidateSize();
}, 100);

// Create pins to show location of the offices on the map
const locationZurich = L.marker([47.378958, 8.532702], {icon: pinIcon}).addTo(mapContact);
const locationSingapore = L.marker([1.277919, 103.852761], {icon: pinIcon}).addTo(mapContact);

// Create popups for each pin
locationZurich.bindPopup(
    '<h3>Main Office</h3> <p>shareadesk LCC</p> <p>Europaallee 36</p> <p>8004 Zurich</p> <p>Switzerland</p> <i class="bi bi-telephone-outbound-fill icon_call"></i> <a href="tel:">+41 44 123 12 34</i></a>');
locationSingapore.bindPopup(
    '<h3>Second Office</h3> <p>shareadesk Pte. Ltd.</p> <p>Marina One East Tower</p> <p>7 Straits View</p> <p>Singapore 018936</p> <i class="bi bi-telephone-outbound-fill icon_call"></i> <a href="tel:">+65 8855 12 34</i></a>');
 
    

/// --- Switch BOOKING & MANAGE RESERVATIONS ---

// Add event listener for toggling switch from BOOKING to MANAGE RESERVATIONS
const switchButton = document.getElementById('switch');
// Position of swtich -> true = BOOKING , false = MANAGE RESERVATIONS
let switchPosition = true;   
switchButton.addEventListener('click', () => {
    // If position of switch is true, switch to MANAGE RESERVATIONS
    if (switchPosition === true) {
        document.getElementById('book').classList.remove('active');
        document.getElementById('toggle').classList.remove('book');
        document.getElementById('reservation').classList.add('active'); 
        document.getElementById('reservations').classList.add('active'); 
        document.getElementById('toggle').classList.add('reservation');
        document.getElementById('toolbar').classList.remove('active');
        document.getElementById('desks').classList.remove('active');
        //Switch Position: MANAGE RESERVATIONS
        switchPosition = false; 
    } 
    // Else switch to BOOKING
    else {
        document.getElementById('reservation').classList.remove('active');
        document.getElementById('reservations').classList.remove('active'); 
        document.getElementById('toggle').classList.remove('reservation');
        document.getElementById('book').classList.add('active');
        document.getElementById('toggle').classList.add('book');
        document.getElementById('toolbar').classList.add('active');
        document.getElementById('desks').classList.add('active');
        //Switch Position: BOOKING
        switchPosition = true;
    }
});



/// --- Search and Filters ---

// Add event listener for search field, to change icon
const search = document.getElementById('search');
//Status of searchbar -> true = active, false = inactive
let searchBar = false; 
search.addEventListener('keyup', () => {
    // If search field is active and not empty, change icon to X
    if (!searchBar && search.value !== '') {
        document.getElementById('icon_search').classList.remove('active');
        document.getElementById('icon_close').classList.add('active');
        // Search Status: active
        searchBar = true;
    }
    // Else if searchbar is active and empty, change icon to search
    else if (searchBar && search.value === '') {
        document.getElementById('icon_close').classList.remove('active');
        document.getElementById('icon_search').classList.add('active');
        searchBar = false; //Searchbar: inactive
    }
    // Saving input value and handing it over to filterSearch function
    let searchValue = search.value;
    filterSearch(searchValue);
});

/**
 * Helper Function: Filter desk depending on search field
 * @param {string} searchValue - The search value
 */
let hiddenDesksSearch = [];
function filterSearch(searchValue) {
    // Reset various things before filtering
    hiddenDesksSearch = [];
    removeErrorMessage();
    deskVisiblityReset(); 
    // Grab the name and the id of each desks
    deskData.forEach(desk => {
        const deskName = desk.name;
        const deskId = desk.id;
        // If desk names doesn't start with the same characters as the search input value, they will be hidden
        if (!deskName.toLowerCase().startsWith(searchValue.toLowerCase())) {
            deskVisibilityHidden(deskId);
            // Save hidden desks in array
            hiddenDesksSearch.push(deskId); 
        }
    });
    // To determine if other filters are active, hence other desks have to be hidden the checkForActiveFilter function is called
    const requestFrom = 'search';
    checkForActiveFilters(requestFrom);
}

// Add event listener to clear search field
const clearIcon = document.getElementById('icon_close');
clearIcon.addEventListener('click', () => {
    // Reset various things before filtering
    hiddenDesksSearch = []; 
    removeErrorMessage();
    deskVisiblityReset();
    // If search value is not empty, clear input field and change icon to search
    if (search.value != '') {
        search.value = ''; //Reseting searchbar if something has been typed in
        document.getElementById('icon_close').classList.remove('active');
        document.getElementById('icon_search').classList.add('active');
        searchBar = false; //Searchbar = inactive
    } 
    // Else change icon to search
    else {
        document.getElementById('icon_close').classList.remove('active');
        document.getElementById('icon_search').classList.add('active');
        searchBar = false; //Searchbar = inactive
    }
    // To determine if other filters are active, hence other desks have to be hidden the checkForActiveFilter function is called
    const requestFrom = 'search';
    checkForActiveFilters(requestFrom);
    
});

// Add event listener for dropdown selection of location
const selectionLocation = document.getElementById('selection_locations');
//Status of location -> true = active, false = inactive
let dropdownLocation = false;
selectionLocation.addEventListener('click', () => {
    // If dropwdown is not active, open dropdown and show list
    if (dropdownLocation === false) {
    document.getElementsByClassName('icon_arrow_loc')[0].classList.add('active');
    document.getElementById('selection_locations').classList.add('active');
    const li = selectionLocation.getElementsByTagName('li');
    for (let i = 1; i < li.length; i++ ) {
        li[i].classList.add('active');
    }
    // Location Status: active
    dropdownLocation = true;
    }
});

/**
 * Helper Function: Close dropdown selection of location
 */
function closeDropdownLocation() {
    document.getElementsByClassName('icon_arrow_loc')[0].classList.remove('active');
    document.getElementById('selection_locations').classList.remove('active');
    const li = selectionLocation.getElementsByTagName('li');
    for (let i = 1; i < li.length; i++ ) {
        li[i].classList.remove('active');
    }
    // Location Status: inactive
    dropdownLocation = false;
}

// Add event listener for option 1 of locations and rearrange order
const activeLocation = selectionLocation.getElementsByTagName('li')[0];
const inactiveFirstLocation = document.getElementById('location1');
const inactiveSecondLocation = document.getElementById('location2');
inactiveFirstLocation.addEventListener('click', () => {
    let locationOption = inactiveFirstLocation.innerHTML;
    switch (locationOption) {
        case 'Rapperswil':
            activeLocation.innerHTML = 'Rapperswil <i class="bi bi-caret-up-fill icon_arrow_loc"></i>';
            inactiveFirstLocation.innerHTML = 'All Locations';
            inactiveSecondLocation.innerHTML = 'St.Gallen';
            filteringLocation(locationOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownLocation(),50); 
            break;
        case 'All Locations':
            activeLocation.innerHTML = 'All Locations <i class="bi bi-caret-up-fill icon_arrow_loc"></i>';
            inactiveFirstLocation.innerHTML = 'Rapperswil';
            inactiveSecondLocation.innerHTML = 'St.Gallen';
            filteringLocation(locationOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownLocation(),50); 
            break;
    }
});

// Add event listener for option 2 of locations and rearrange order
inactiveSecondLocation.addEventListener('click', () => {
    let locationOption = inactiveSecondLocation.innerHTML;
    switch(locationOption) {
        case 'Rapperswil':
            activeLocation.innerHTML = 'Rapperswil <i class="bi bi-caret-up-fill icon_arrow_loc"></i>';
            inactiveFirstLocation.innerHTML = 'All Locations';
            inactiveSecondLocation.innerHTML = 'St.Gallen';
            filteringLocation(locationOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownLocation(),50); 
            break;
        case 'St.Gallen':
            activeLocation.innerHTML = 'St.Gallen <i class="bi bi-caret-up-fill icon_arrow_loc"></i>';
            inactiveFirstLocation.innerHTML = 'All Locations';
            inactiveSecondLocation.innerHTML = 'Rapperswil';
            filteringLocation(locationOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownLocation(),50); 
        break;
    }
});

/**
 *  Helper Function: Filter locations
 *  Filter out all desk that should be hidden and only show the desk which the filter is set to
 *  @param {string} locationOption - The location to be filtered
 */
let hiddenDesksLocation = [];
function filteringLocation(locationOption) {
    switch (locationOption) {
        case 'All Locations':
            // Reset everything
            hiddenDesksLocation = []; 
            removeErrorMessage();
            deskVisiblityReset();
            break;
        case 'Rapperswil':
            //Reseting everything
            hiddenDesksLocation = []; 
            removeErrorMessage();
            deskVisiblityReset();
            // Hide all desk from location St.Gallen
            deskData.forEach(element => {
                const location = element.address.split(',')[1];
                if (location.includes('St.Gallen')) {
                    const deskId = element.id;
                    hiddenDesksLocation.push(deskId);
                    deskVisibilityHidden(deskId);
                }
            });
            break;
        case 'St.Gallen':
            // Reset everything
            hiddenDesksLocation = [];
            removeErrorMessage();
            deskVisiblityReset();
            // Hide all desks from location Rapperswil
            deskData.forEach(element => {
                const location = element.address.split(',')[1];
                if (location.includes('Rapperswil')) {
                    const deskId = element.id;
                    hiddenDesksLocation.push(deskId);
                    deskVisibilityHidden(deskId);
                }
            });
            break;
    }
    // Check wether other filters are active
    const requestFrom = 'location';
    checkForActiveFilters(requestFrom);
}

// Add event listener for dropdown selection currency
const currencySelector = document.getElementById('selection_currency');
const activeCurrency = currencySelector.getElementsByTagName('li')[0];
// Status of dropdown => true = active, false = inactive
let dropdownCurrency = false;
activeCurrency.addEventListener('click', () => {
    // If dropwdown is inactive, open dropdown and show list
    if (dropdownCurrency === false) {
        document.getElementsByClassName('icon_arrow_curr')[0].classList.add('active');
        document.getElementById('selection_currency').classList.add('active');
        const li = currencySelector.getElementsByTagName('li');
        for (let i = 1; i < li.length; i++ ) {
            li[i].classList.add('active');
        }
        // Dropdown Status: active
        dropdownCurrency = true;
    } 
});

/**
 * Helper Function: Close dropdown currency
 */
function closeDropdownCurrency() {
    document.getElementsByClassName('icon_arrow_curr')[0].classList.remove('active');
    document.getElementById('selection_currency').classList.remove('active');
    const li = currencySelector.getElementsByTagName('li');
    for (let i = 1; i < li.length; i++ ) {
        li[i].classList.remove('active');
    }
    // Dropdown Status: inactive
    dropdownCurrency = false;
}

// Add event listener for options of currency
const inactiveCurrency = document.getElementById('currency');
let currency;
inactiveCurrency.addEventListener('click', () => {
    // If inactive currency is EUR switch active to currency to EUR
    if (inactiveCurrency.innerHTML === 'EUR') {
        activeCurrency.innerHTML = 'EUR <i class="bi bi-caret-up-fill icon_arrow_curr active"></i>';
        inactiveCurrency.innerHTML = 'CHF';
        currency = 'EUR';
    } 
    // Else switch active currency to CHF
    else {
        activeCurrency.innerHTML = 'CHF <i class="bi bi-caret-up-fill icon_arrow_curr active"></i>';
        inactiveCurrency.innerHTML = 'EUR';
        currency = 'CHF';
    } 
    //50ms delay for closing animation
    setTimeout(() => closeDropdownCurrency(),50); 
    changeCurrency(currency);
});

/**
 * Helper Function: Switch and display currency
 * @param {string} currency - the currency in which the price should be shown
 */
function changeCurrency(currency) {
    //Grab all desk cards
    const desk = document.getElementsByClassName('desk');
    for(let i = 0; i < desk.length; i++) {
        // Grab <div> element "section left" which is the 1st child of each desk card
        const sectionLeft = desk[i].childNodes[0];
        //Grab <p> element "Fee" which is the 4th child of <div> element "section left"
        const displayPrice = sectionLeft.getElementsByTagName('p')[3];
        //Grab price which is saved as data attribute
        const price = displayPrice.dataset.chf;
        //Switch statement to change displayed price and currency
        switch (currency) {
            case 'EUR':
                getExchangeRate(price)
                .then(convertedPrice => {
                    let paddedEuros = padPrice(convertedPrice);
                    displayPrice.innerHTML = 'Fee: €' + `${paddedEuros}` + ' EUR per hour';
                    displayPrice.dataset.eur = `${paddedEuros}`;
                });
                break;
            case 'CHF':
                let paddedFrancs = padPrice(price)
                displayPrice.innerHTML = 'Fee: ' + `${paddedFrancs}` + ' CHF per hour';
                break;
        }   
    }
}
/**
 * Async Function: Get the exchange rate from the API
 * @param {string} price - The price which should be converted
 * @returns {string} convertedPrice - The converted price
 */
async function getExchangeRate(price) {
    //GET request options
    const requestOptions = {
        method: 'GET'
    }
    const convertCurrencyFrom = inactiveCurrency.innerHTML;
    const convertCurrencyTo = activeCurrency.innerHTML.slice(0,3);
    // Fetch exchange rate 
    try {
        const response = await fetch('https://api.exchangerate.host/convert?from='+`${convertCurrencyFrom}`+'&to='+`${convertCurrencyTo}`+'&amount='+`${price}`+'&places=2', requestOptions)
        const data = await response.json();
        const convertedPrice = data.result;
        return convertedPrice;
    } catch (error) {
        // Logging
        console.log(error); 
        const errorMessage = 'Cannot display price in';
        return errorMessage;
    } 
}

/**
 * Helper Function: Pad the price to 2 decimals
 * @param {string} value - The price
 * @returns {string} paddedPrice - The padded price with 2 decimals
 */
function padPrice(value) {
    let wholeNumber = value.toString().split('.')[0];
    let fraction = value.toString().split('.')[1];
    let paddedPrice;
    // If there's no fraction add '.00' to the price => 20 CHF = 20.00 CHF
    if (fraction === undefined) {
        paddedPrice = `${wholeNumber}` + '.00';
    }
    // Else if the length of the fraction is exactly 1 add 0 to the price => 20.5 CHF = 20.50 CHF
    else if (fraction.length === 1) {
        paddedPrice = `${wholeNumber}` + '.' + `${fraction}` + '0';
    }
    // Else if the length of the fraction is exactly 2 no padding is required => 20.50 CHF => 20.50CHF
    else if (fraction.length === 2) {
        paddedPrice = `${wholeNumber}` + '.' + `${fraction}`;
    }
    return paddedPrice;
}

// Add event listener for drowpdown selection filters
const selectionFilter = document.getElementById('selection_filter');
//Status of dropdown  => ture = active, false = inactive
let dropdownFilter = false;
selectionFilter.addEventListener('click', () => {
    // If dropdown is not active, open drowpdown and show list
    if (dropdownFilter === false) {
        document.getElementById('selection_filter').classList.add('active');
        const li = selectionFilter.getElementsByTagName('li');
        for (let i = 1; i < li.length; i++ ) {
            li[i].classList.add('active');
        }

        //Dropdown Status: active
        dropdownFilter = true; 
    }
});

/**
 * Helper Function: Close dropdown filters
 */
function closeDropdownFilter() {
    document.getElementById('selection_filter').classList.remove('active');
    const li = selectionFilter.getElementsByTagName('li');
    for (let i = 1; i < li.length; i++ ) {
        li[i].classList.remove('active');
    }
    //Dropdown Status: inactive
    dropdownFilter = false; 
}

// Add event listener for option 1 of filters and rearrange order
const activeFilter = selectionFilter.getElementsByTagName('li')[0];
const inactiveFirstFilter = document.getElementById('filter1');
const inactiveSecondFilter = document.getElementById('filter2');
const inactiveThirdFilter = document.getElementById('filter3');
const inactiveForthFilter = document.getElementById('filter4');
inactiveFirstFilter.addEventListener('click', () => {
    removeErrorMessage();
    const filterOption = inactiveFirstFilter.innerHTML;
    switch (filterOption) {
        case 'All':
            activeFilter.innerHTML = 'All <i class="bi bi-filter icon_filter"></i>';
            inactiveFirstFilter.innerHTML = 'Available';
            inactiveSecondFilter.innerHTML = 'Favorites';
            inactiveThirdFilter.innerHTML = 'Highest Price';
            inactiveForthFilter.innerHTML = 'Lowest Price';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
        case 'Available':
            activeFilter.innerHTML = 'Available <i class="bi bi-filter icon_filter"></i>';
            inactiveFirstFilter.innerHTML = 'All';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
    }
    //Check wether any other filters are set active
    const requestFrom = 'filter';
    checkForActiveFilters(requestFrom);
});

// Add event listener for option 2 of filters and rearrange order
inactiveSecondFilter.addEventListener('click', () => {
    removeErrorMessage();
    const filterOption = inactiveSecondFilter.innerHTML;
    switch (filterOption) {
        case 'Available':
            activeFilter.innerHTML = 'Available <i class="bi bi-filter icon_filter"></i>';
            inactiveSecondFilter.innerHTML = 'Favorites';
            inactiveThirdFilter.innerHTML = 'Highest Price';
            inactiveForthFilter.innerHTML = 'Lowest Price';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
        case 'Favorites':
            activeFilter.innerHTML = 'Favorites <i class="bi bi-filter icon_filter"></i>';
            inactiveFirstFilter.innerHTML = 'All';
            inactiveSecondFilter.innerHTML = 'Available';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
    }
    //Check wether any other filters are set active
    const requestFrom = 'filter';
    checkForActiveFilters(requestFrom);
})

// Add event listener for option 3 of filters and rearrange order
inactiveThirdFilter.addEventListener('click', () => {
    removeErrorMessage();
    const filterOption = inactiveThirdFilter.innerHTML;
    switch(filterOption) {
        case 'Favorites':
            activeFilter.innerHTML = 'Favorites <i class="bi bi-filter icon_filter"></i>';
            inactiveThirdFilter.innerHTML = 'Highest Price';
            inactiveForthFilter.innerHTML = 'Lowest Price';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
        case 'Highest Price':
            activeFilter.innerHTML = 'Highest Price <i class="bi bi-filter icon_filter"></i>';
            inactiveFirstFilter.innerHTML = 'All';
            inactiveSecondFilter.innerHTML = 'Available';
            inactiveThirdFilter.innerHTML = 'Favorites';
            filteringValues(filterOption);  
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
    }
    //Check wether any other filters are set active
    const requestFrom = 'filter';
    checkForActiveFilters(requestFrom);
});

// Add event listener for option 4 of filters and rearrange order
inactiveForthFilter.addEventListener('click', () => {
    removeErrorMessage();
    const filterOption = inactiveForthFilter.innerHTML;
    switch (filterOption) {
        case 'Highest Price':
            activeFilter.innerHTML = 'Highest Price <i class="bi bi-filter icon_filter"></i>';
            inactiveForthFilter.innerHTML = 'Lowest Price';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
        case 'Lowest Price':
            activeFilter.innerHTML = 'Lowest Price <i class="bi bi-filter icon_filter"></i>';
            inactiveFirstFilter.innerHTML = 'All';
            inactiveSecondFilter.innerHTML = 'Available';
            inactiveThirdFilter.innerHTML = 'Favorites';
            inactiveForthFilter.innerHTML = 'Highest Price';
            filteringValues(filterOption);
            //50ms delay for closing animation
            setTimeout(() => closeDropdownFilter(),50); 
            break;
    }
    //Check wether any other filters are set active
    const requestFrom = 'filter';
    checkForActiveFilters(requestFrom);
});

/**
 * Helper Function: Filter desks depending on active Filter
 * Filter all desks which should be hidden and only show the desks which the filter is set to
 * @param {string} filterOption - The value of the active filter
 */
let hiddenDesksFilter = [];
function filteringValues(filterOption) {
    //Creating array to save desk id and price
    let priceList = [];

    let requestFrom;
    checkForActiveFilters(requestFrom);
    //Grabbing original desk order
    const deskOrderList = getDeskOrder();
    //Grabbing the prices of the desks which is saved in a data attribute
    const prices = document.querySelectorAll(`[data-chf]`);
    const desk = document.getElementsByClassName('desk');

    switch (filterOption) {
        //CASE 1: Filter is set to All
        case 'All':
            //Reseting 
            hiddenDesksFilter = []; 
            removeErrorMessage(); 
            deskVisiblityReset(); 
            resetDeskOrder(); 
            break;
        //CASE 2: Filter is set to Available
        case 'Available':
            //Reseting 
            hiddenDesksFilter = []; 
            deskVisiblityReset(); 
            resetDeskOrder(); 
            deskData.forEach(element => {
                const availablitiy = element.available;
                if (availablitiy != 1) {
                    const deskId = element.id;
                    deskVisibilityHidden(deskId);
                    hiddenDesksFilter.push(deskId); //Save all hidden desk in array
                }
            });
            //Checking if other filters are set active
            requestFrom = 'filter';
            checkForActiveFilters(requestFrom);
            break;
        //CASE 3: Filter is set to Favorites
        case 'Favorites':
            //Reseting 
            hiddenDesksFilter = [];
            removeErrorMessage();
            deskVisiblityReset();
            resetDeskOrder();

            const array = [];
            //Desk id of desks, which haven't been marked as favorites, are pushed in an array
            deskData.forEach(element => {
                const deskId = element.id;
                const key = 'favoriteDesk' + `${deskId}`;
                const favorite = localStorage.getItem(key);
                if(favorite === null) {
                    const favoriteDeskId = deskId;
                    array.push(favoriteDeskId);
                }
            });
            //If all desks have been pushed into the array, hence all desks weren't marked as favorite, all desks should be hidden
            //Else only those desks should be hidden which aren't marked as favorites and those which were marked as favorites will be displayed
            if (array.length === deskData.length) {
                console.log(array.length);
                array.forEach(element => {
                    const deskId = element;
                    deskVisibilityHidden(deskId);
                    hiddenDesksFilter.push(deskId); //Save all hidden desk in array
                });
            }
            else {
                array.forEach(element => {
                    const deskId = element;
                    hiddenDesksFilter.push(deskId);
                    deskVisibilityHidden(deskId);
                });
            }
            //Checking filter result, in case there are no desks marked as favorite it shall display the error message for the user
            checkSearchAndFilterResult();
            //Checking if other filters are set active
            requestFrom = 'filter';
            checkForActiveFilters(requestFrom);
            break;
        //CASE 4: Filter is set to Highest Price
        case 'Highest Price':
            //Reseting
            deskVisiblityReset();
            //For each price I need the according desk id to identify which desk has which price and push them into an array as value pairs
            for (let i = 0; i < prices.length; i++) {
                const deskPrice = prices[i].dataset.chf;
                const deskId = desk[i].dataset.id;
                priceList.push({deskId, deskPrice});
            }
            //Removing all desks
            removeAllDesks(desk);
            //Sorting array "priceList" from highest to lowest desk price
            priceList.sort((low, high) => high.deskPrice - low.deskPrice);
            //After sorting the array the desk id is pulled, which now comes in the new order, to hand it over to the reshuffleDesk function
            priceList.forEach(item => {
                const deskId = item.deskId;
                reshuffleDesk(deskId, deskOrderList);
            });
            break;
        //CASE 5: Filter is set to Lowest Price
        case 'Lowest Price':
            //Reseting
            deskVisiblityReset(); 
            //For each price I need the according desk id to identify which desk has which price and push them into an array as value pairs
            for (let i = 0; i < prices.length; i++) {
                const deskPrice = prices[i].dataset.chf;
                const deskId = desk[i].dataset.id;
                priceList.push({deskId, deskPrice});
            }
            //Removing all desks
            removeAllDesks(desk);
            //Sorting array "priceList" from lowest to highest desk price
            priceList.sort((low, high) => low.deskPrice - high.deskPrice);
            //After sorting the array the desk id is pulled, which now comes in the new order, to hand it over to the reshuffleDesk function
            priceList.forEach(item => {
                const deskId = item.deskId;
                reshuffleDesk(deskId, deskOrderList);
            });
            break;
    }
}

//-- FUNCTION: Grabbing the current order of the desk and saving them in a map --//
function getDeskOrder() {
    const deskOrderList = new Map();
    const desks = document.querySelectorAll('.desk');
    desks.forEach(desk => {
        //For each desk save the desk id as key and the entire element as value
        deskOrderList.set(desk.dataset.id, desk);
    });
    return deskOrderList;
}
//-- FUNCTION: Reshuffling desk order --//
//Parameters to handover are:
//deskId: desk id's which have to be handed over in the right order to append all desks in the order wanted
//deskOrderList: a map where the key is the desk id and the value is the according desk element
function reshuffleDesk(deskId, deskOrderList) {
    //Grabbing the desk elements which is saved in deskOrderList with the new desk id order
    const desk = deskOrderList.get(deskId);
    //Grabbing the parent element to append each desk in its new order
    const desks = document.getElementById('desks');
    //Appending element to parent
    desks.appendChild(desk);
}

//-- FUNCTION: Reseting desk order to the original order --//
function resetDeskOrder() {
    //Getting the current desk order via the getDeskOrder function
    const deskOrderList = getDeskOrder();
    //Removing all currently displayed desks
    const desks = document.querySelectorAll('.desk');
    removeAllDesks(desks);
    //Grabbing all desk id's which come in the original order to hand it over to the reshuffleDesk function
    deskData.forEach(element => {
        const deskId = element.id;
        reshuffleDesk(deskId, deskOrderList);
    });
}
//-- FUNCTION: Hide desks which shouldn't show up depending on filter set --//
function deskVisibilityHidden(deskId) {
    const desk = document.getElementsByClassName('desk');
    for (let i = 0; i < desk.length; i++) {
        const datasetId = desk[i].dataset.id;
        if (datasetId === deskId) {
            desk[i].style.display = 'none';
        }
    }
}
//-- FUNCTION: Show all desks when no filter is active //
function deskVisiblityReset() {
    const desk = document.getElementsByClassName('desk');
    for (let i = 0; i < desk.length; i++) {
        desk[i].removeAttribute('style');
    }
}
//-- FUNCTION: Removing all desks currently displayed --//
function removeAllDesks(desk) {
    for (let i = 0; i < desk.length; i++) {
        desk[i].remove();
    }
}

//-- FUNCTIONL: Checking if other filters are active --//
//Parameter to handover are:
//requestFrom: tells the switch from where the request came from, so it knows which filters to check for any further hidden desks
function checkForActiveFilters(requestFrom) {
    switch (requestFrom) {
        //Request came from search => checks if location or filter are also active
        case 'search':
            //If the array hiddenDesksLocation has a length of > 0, it grabs all desks id's saved in the hiddenDeskLocation array and pass it over to the deskVisibilityHidden function to hide those desk
            if (hiddenDesksLocation.length !== 0) {
                hiddenDesksLocation.forEach(deskId => {
                    deskVisibilityHidden(deskId);
                });
            }
            //If the array hiddenDesksFilter isn't empty, has a length of not 0, it grabs all desks id's saved in the hiddenDesksFilter array and pass it over to the deskVisibilityHidden function to hide those desk
            if (hiddenDesksFilter.length !== 0) {
                hiddenDesksFilter.forEach(deskId => {
                    deskVisibilityHidden(deskId);
                });
            }
            checkSearchAndFilterResult(); //Checking if the search result is empty 
            break;
        //The request came from location => checks if search or filter are also active
        case 'location':
            //If the array hiddenDesksSearch isn't empty, has a length of not 0, it grabbs all desks id saved in the hiddenDeskSearch array and pass it over to the deskVisibilityHidden function to hide those desk
            if (hiddenDesksSearch.length !== 0) {
                hiddenDesksSearch.forEach(deskId => {
                    deskVisibilityHidden(deskId);
                });
            }
            //If the array hiddenDesksFilter isn't empty, has a length of not 0, it grabbs all desks id saved in the hiddenDeskFilter array and pass it over to the deskVisibilityHidden function to hide those desk
            if (hiddenDesksFilter.length !== 0) {
                hiddenDesksFilter.forEach(deskId => {
                    deskVisibilityHidden(deskId);
                });
            }
            checkSearchAndFilterResult(); //Checking if the search result is empty 
            break;
        //The request came from filter => checks if search or location is active
        case 'filter':
            //If the array hiddenDesksSearch isn't empty, has a length of not 0, it grabbs all desks id saved in the hiddenDeskSearch array and pass it over to the deskVisibilityHidden function to hide those desk
            if (hiddenDesksSearch.length !== 0) {
                hiddenDesksSearch.forEach(deskId => {
                    deskVisibilityHidden(deskId);
                });
            }
            //If the array hiddenDesksLocation isn't empty, has a length of not 0, it grabbs all desks id saved in the hiddenDeskLocation array and pass it over to the deskVisibilityHidden function to hide those desk
            if (hiddenDesksLocation.length !== 0) {
                hiddenDesksLocation.forEach(deskId => {
                    deskVisibilityHidden(deskId);
                });
            }
            checkSearchAndFilterResult(); //Checking if the search result is empty
            break;
    }
}

//-- FUNCTION: Checking result of search and filtering, weather it's empty or not --//
function checkSearchAndFilterResult() {
    const displayedMessage = document.getElementById('container_error');
    const desks = document.querySelectorAll('.desk');
    let hiddenDesks = 0;
    //Checks each element for its style display value. If it's none, hence the desk is hidden the hiddenDesk count gets incremented by 1
    desks.forEach(element => {
        if (window.getComputedStyle(element).display === 'none') {
            hiddenDesks++;
        }
    });
    //If hiddenDesks reaches the same amount as the length of the desks array and displayedMessage doesn't exist yet in the DOM, hence all desk are set with style display = none the error message for the user shall be created
    if (hiddenDesks === desks.length && displayedMessage === null) {
        renderErrorMessage(null);
        document.getElementById('error_message').innerHTML = 'No desks found...';
    } else {
        removeErrorMessage();
    }
}
//-- FUNCTION: Remove displayed error message --// 
function removeErrorMessage() {
    const displayedMessage = document.getElementById('container_error');
    //If displayedMessage exists in the DOM it shall remove it
    if (displayedMessage !== null) {
        displayedMessage.remove();
    }
}

//-- FUNCTION: Event listener if dropdown selections are active and a click has been registered outside of the element it should trigger the close function and close the dropdown selection --//
document.addEventListener('mouseup', function(e) {
    if(!selectionFilter.contains(e.target) || !currencySelector.contains(e.target) || !selectionFilter.contains(e.target)) {
        closeDropdownLocation();
        closeDropdownCurrency();
        closeDropdownFilter();
    }
});

//-- FUNCTION: Sort desks in alphabetical order --//
function sortInAlphabeticalOrder(data) {
    //Sorting array alphabetically
    //Sort function uses the return values to rearrange the elments in the array accordingly
    data.sort(function(a, b) {
        if (a.name < b.name) {
            return -1; //Moves back in the array
        }
        if (a.name > b.name) {
            return 1; //Moves forward in the array
        }
        return 0; //Stays the same in the array
    });
    //Saving alphabetically ordered data in local variable to return it
    const desksSortedAlphabetically = data;
    return desksSortedAlphabetically; 
}

//-- FUNCTION: Sort reservations by date --//
function sortAfterDate(allReservations, reservationsSortedAfterDate) {
    //If a desk has a reservation it shall iterate over all reservations of that desk and push the values in the reservationsSortedAfterDate array
    if(allReservations.length !== 0) {
        allReservations.forEach(reservation => {
            const bookingReferenceId = reservation['id'];
            const user = reservation['user'];
            const email = reservation['email'];
            const deskId = reservation['deskid'];
            const date = reservation['start'].slice(0,10);
            const start = reservation ['start'].slice(11,16);
            const end = reservation['end'].slice(11,16);
            reservationsSortedAfterDate.push({bookingReferenceId, user, email, deskId, date, start, end});
        });
    }
    //Sort array by date 
    reservationsSortedAfterDate.sort(function(a, b) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    });
    //Returning array
    return reservationsSortedAfterDate;
}

//Creating variable to store desk data from API for further use
let deskData;
//-- FUNCTION: Render desks --//
function renderDesks(sortedData) {
    const loadingDots = document.getElementById('desksLoadingDots');
    loadingDots.remove();
    //Storing fetched data from API for further use
    deskData = sortedData;
    //Setting up arrays to save id of each button
    const buttonIdInfo = [];
    const buttonIdMap = [];
    const buttonIdFav = [];
    const buttonIdBook = [];
    //Iterating over each desk in the array and pulling out the data which is saved in a local variable for easier handling
    for (let i = 0; i < deskData.length; i++) {
        const address = deskData[i].address;
        const value = deskData[i].available;
        const comment = deskData[i].comment;
        const identNum = deskData[i].id;
        const name = deskData[i].name;
        const price = deskData[i].price;

        //Creating "desk cards"
        const containerDesks = document.getElementById('desks');
        containerDesks.classList.remove('loading');
        const desk = document.createElement('div'); //creating new element
        desk.classList.add('desk'); //adding class to element
        desk.dataset.id = `${identNum}`; //creating data attribute for element using unique desk id to identify each desk
        //Appending element to parent
        containerDesks.appendChild(desk);
        //Creating "sectionLeft" to place content inside
        const sectionLeft = document.createElement('div'); //creating new element
        sectionLeft.classList.add('section_left'); //adding class to element
        //Creating "sectionRight" to place content inside
        const sectionRight = document.createElement('div'); //creating new element
        sectionRight.classList.add('section_right'); //adding class to element
        //Appending elements to parent
        desk.appendChild(sectionLeft);
        desk.appendChild(sectionRight);

        //Creating "desk name" field
        const header = document.createElement('h3');
        header.innerHTML = `${name}`;
        //Creating "desk status" field
        const sectionStatus = document.createElement('div');
        sectionStatus.classList.add('section_status');
        const status = document.createElement('p');
        status.innerHTML = '<b>Status:</b>';
        //Checking and interpreting availablitiy of desks -> 1 = avail, 0 = not avail
        const statusDisplay = document.createElement('p');
        if (value == 1) {
            statusDisplay.innerHTML = 'Available';
            statusDisplay.classList.add('available');
        } else {
            statusDisplay.innerHTML = 'Not Available';
            statusDisplay.classList.add('not_available');
        }
        //Appending elements to parent
        sectionStatus.appendChild(status);
        sectionStatus.appendChild(statusDisplay);
    
        //Creating "address" field
        const location = document.createElement('p');
        location.innerHTML = '<b>Address:</b> ' + `${address}`;
        //Creating "price" field
        const fee = document.createElement('p');
        fee.dataset.chf = `${price}`;
        const swissFrancs = padPrice(price);
        fee.innerHTML = '<b>Fee:</b> ' + `${swissFrancs}` + ' CHF per hour';
        //Creating "comment" field
        const comments = document.createElement('p');
        comments.innerHTML = '<b>Comments:</b> ' + `${comment}`;
        //Appending elements to parent
        sectionLeft.appendChild(header);
        sectionLeft.appendChild(sectionStatus);
        sectionLeft.appendChild(location);
        sectionLeft.appendChild(fee);
        sectionLeft.appendChild(comments);

        //Creating "top" and "bottom" section for buttons to be placed in "sectionRight" 
        const sectionRightTop = document.createElement('div');
        sectionRightTop.classList.add('section_right_top');
        const sectionRightBottom = document.createElement('div');
        sectionRightBottom.classList.add('section_right_bottom');
        //Appending elements to parent
        sectionRight.appendChild(sectionRightTop);
        sectionRight.appendChild(sectionRightBottom);

        //Creating info button
        const buttonInfo = document.createElement('button');
        buttonInfo.id = 'btn_info_id' + `${identNum}`;
        buttonInfo.dataset.button = 'info';
        buttonInfo.dataset.id =  `${identNum}`;
        buttonInfo.classList.add('small_buttons');
        buttonInfo.innerHTML = '<i class="bi bi-info-circle icon_info"></i>';
        buttonInfo.title = 'More Information';
        //Creating map button
        const buttonMap = document.createElement('button');
        buttonMap.id = 'btn_map_id' + `${identNum}`;
        buttonMap.dataset.button = 'map';
        buttonMap.dataset.id =  `${identNum}`;
        buttonMap.classList.add('small_buttons');
        buttonMap.innerHTML = '<i class="bi bi-map icon_map"></i>';
        buttonMap.title = 'Show on Map';
        //Creating favorite button
        const buttonFav = document.createElement('button');
        buttonFav.id = 'btn_fav_id' + `${identNum}`;
        buttonFav.dataset.button = 'favorite';
        buttonFav.dataset.id =  `${identNum}`;
        buttonFav.classList.add('small_buttons');
        //If desk has been marked as favorite already, icon should be filled out
        //Else icon should be empty
        if (localStorage.getItem('favoriteDesk' + `${identNum}`)) {
            buttonFav.innerHTML = '<i class="bi bi-star-fill icon_fav_fill"></i>';
        }else {
            buttonFav.innerHTML = '<i class="bi bi-star icon_fav"></i>';
        }
        buttonFav.title = 'Add to Favorites';
        //Appending elements to parent
        sectionRightTop.appendChild(buttonInfo);
        sectionRightTop.appendChild(buttonMap);
        sectionRightTop.appendChild(buttonFav);
    
        //Creating book button
        const buttonBook = document.createElement('button');
        buttonBook.id = 'btn_book_id' + `${identNum}`;
        buttonBook.dataset.button = 'book';
        buttonBook.dataset.id =  `${identNum}`;
        //Checking status to set button to active or inactive
        if (value == 1) {
            buttonBook.classList.add('big_buttons');
        } else {
            buttonBook.classList.add('big_buttons');
            buttonBook.classList.add('inactive');
        }
        buttonBook.innerHTML = 'BOOK';
        buttonBook.title = 'Book this Desk';
        //Appending element to parent 
        sectionRightBottom.appendChild(buttonBook);
    
        //console.log('desk ' + '"' + `${identNum}` + '"' + ' has been created.') //LOGGING

        //Saving button id's in array
        buttonIdInfo.push(buttonInfo.id);
        buttonIdMap.push(buttonMap.id);
        buttonIdFav.push(buttonFav.id);
        buttonIdBook.push(buttonBook.id);
    };
    for (let i = 0; i < buttonIdInfo.length; i++) {
        const id = buttonIdInfo[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            const datasetId = button.dataset.id;
            renderInfoPopUp(datasetId);
        });  
    }
    //Creating event listeners for map buttons
    for (let i = 0; i < buttonIdMap.length; i++) {
        const id = buttonIdMap[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            const datasetId = button.dataset.id;
            renderMapPopUp(datasetId);
        });  
   }
   //Creating event listeners for favorite buttons
    for (let i = 0; i < buttonIdFav.length; i++) {
        const id = buttonIdFav[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            const datasetId = button.dataset.id;
            setFavorites(button,datasetId);
        });  
    }
    //Creating event listeners for book buttons
    for (let i = 0; i < buttonIdBook.length; i++) {
        const id = buttonIdBook[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            if (button.classList.contains('inactive')) {
                //Nothing should happen because desk isn't available atm
            } else {
                const datasetId = button.dataset.id;
                renderFormBooking(datasetId);
            }
            
        });  
    }
}

//-- FUNCTION: Error handling if error is catched --//
function renderErrorMessage(error) {
    //Creating containers
    const containerDesks = document.getElementById('desks');
    const containerError = document.createElement('div');
    containerError.id = 'container_error';
    //Appending elements to parent
    containerDesks.appendChild(containerError);
    //Creating content
    const errorTitle = document.createElement('h2');
    errorTitle.classList.add('message_title');
    errorTitle.id = 'error_title';
    errorTitle.innerHTML = 'Oops...';
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message_text');
    errorMessage.id = 'error_message';
    errorMessage.innerHTML = 'Unfortunately there was an issue, please come back later.';
    //Appending elements to parent
    containerError.appendChild(errorTitle);
    containerError.appendChild(errorMessage);
    //LOGGING
    if (error != null) {
        console.log(error);
    }
}

//-- FUNCTION: Info popup window --//
let infoWindowActive = '';
function renderInfoPopUp(datasetId) {
    setPopupsActive()

    //Creating window
    const infoWindow = document.createElement('div');
    infoWindow.id = 'infoWindow';
    //Appending element to parent
    popups.appendChild(infoWindow);
    //Creating content
    const title = document.createElement('h2');
    title.innerHTML = 'Information'
    const deskId = document.createElement('p');
    deskId.innerHTML = '<b>Desk ID:</b>  ' + `${datasetId}`;
    const deskCoordinates = document.createElement('p');
    for(let i = 0; i < deskData.length; i++) {
        if (deskData[i].id == `${datasetId}`) {
            const lat = deskData[i].lat;
            const lon = deskData[i].lon;
            deskCoordinates.innerHTML = '<b>Coordinates:</b>  ' + `${lat}` + ', ' + `${lon}`;
        }
    }
    const closeIcon = document.createElement('div');
    closeIcon.title = 'Close';
    closeIcon.id = 'close_icon_info';
    closeIcon.innerHTML = '<i class="bi bi-x" id="close"></i>';
    //Appending elements to parent
    infoWindow.appendChild(title);
    infoWindow.appendChild(deskId);
    infoWindow.appendChild(deskCoordinates);
    infoWindow.appendChild(closeIcon);
    //Status: active = true  
    infoWindowActive = true;

    //console.log('Info window has been opened.'); //LOGGING
}

//-- FUNCTION: Map popup window --//
//Window Status of Map => true = active, false = inactive
let mapWindowActive = false;
function renderMapPopUp(datasetId) {
    setPopupsActive()
    //Creating window
    const mapWindow = document.createElement('div');
    mapWindow.id = 'mapWindow';
    //Appending element to parent
    popups.appendChild(mapWindow);
    //Creating content
    const title = document.createElement('h2');
    title.innerHTML = 'Map';
    const map = document.createElement('div');
    map.id = 'map_desks';
    const closeIcon = document.createElement('div');
    closeIcon.title = 'Close';
    closeIcon.id = 'close_icon_map';
    closeIcon.innerHTML = '<i class="bi bi-x" id="close"></i>';
    //Appending elements to parent
    mapWindow.appendChild(title);
    mapWindow.appendChild(map);
    mapWindow.appendChild(closeIcon);
    //Creating map
    let lat = '';
    let lon = '';
    //Getting lat and lon coordinates from saved API data
    for(let i = 0; i < deskData.length; i++) {
        if (deskData[i].id == `${datasetId}`) {
            lat = deskData[i].lat;
            lon = deskData[i].lon;
        }
    }
    var mapDesks = L.map('map_desks').setView([`${lat}`, `${lon}`], 16);
    //Creating pin
    var pinIcon = L.icon({
        iconUrl: 'pin.jpg',
        iconSize: [30, 30],
        iconAnchor: [15,25]
    });
    //Creating tile layer with OSM
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapDesks);
    //Adding pin
    const locationDesk = L.marker([`${lat}`, `${lon}`], {icon: pinIcon}).addTo(mapDesks);
    //Status: active = true
    mapWindowActive = true;

    //console.log('Map window has been opened.'); //LOGGING
}

//-- FUNCTION: Setting popup window to active --//
function setPopupsActive() {
    const popups = document.getElementById('popups');
    popups.classList.add('active');
}
//-- FUNCTION: Setting popup window to inactive --//
function setPopupsInactive() {
    const popups = document.getElementById('popups');
    popups.classList.remove('active');
}

//-- FUNCTION: Bookmark desks to favorites/ Remove desks from favorites --//
function setFavorites(button, datasetId) {
    if (localStorage.getItem('favoriteDesk'+`${datasetId}`)) {
        button.innerHTML = '<i class="bi bi-star icon_fav"></i>';
        localStorage.removeItem('favoriteDesk'+`${datasetId}`);
        //In case desk gets removed from favorite list when filter favorites is active it shall update the list and hide the removed desk
        if (activeFilter.innerHTML.includes('Favorite')) {
            const filterOption = 'Favorites';
            filteringValues(filterOption);
            checkForActiveFilters();
        }
    }else {
        localStorage.setItem('favoriteDesk'+`${datasetId}`, `${datasetId}`);
        button.innerHTML = '<i class="bi bi-star-fill icon_fav_fill"></i>';
    }  
}

//-- FUNCTION: Booking popup window --//
let bookingWindowActive = '';
function renderFormBooking(datasetId) {
    
    setPopupsActive();

    //Creating booking window
    const bookingWindow = document.createElement('div');
    bookingWindow.id = 'booking_window';
    //Appending element to parent
    popups.appendChild(bookingWindow);

    //Creating title
    const title = document.createElement('h2');
    title.innerHTML = 'Booking';
    //Creating paragraph
    const text = document.createElement('p');
    text.id = 'description';
    text.innerHTML = 'Please enter the following information to complete your booking.';

    //Creating form
    const form = document.createElement('form');
    form.id = 'form';
    form.classList.add('form');
    //Appending elements to parent
    bookingWindow.appendChild(title);
    bookingWindow.appendChild(text);
    bookingWindow.appendChild(form);
    //Creating label for input field "name"
    const labelName = document.createElement('label');
    labelName.id = 'label_name';
    labelName.setAttribute('for', 'user');
    labelName.innerHTML = 'Name*'
    //Creating input field to retreive users name
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'user';
    inputName.name = 'user';
    //If name can be found in local storage, it prefills the input field "name" for the user
    if(localStorage.getItem('name') != null) {
        inputName.value = localStorage.getItem('name');
    }
    //Creating label for input field "email"
    const labelEmail = document.createElement('label');
    labelEmail.id = 'label_email';
    labelEmail.setAttribute('for', 'email');
    labelEmail.innerHTML = 'E-Mail*';
    //Creating input field to retreive users email address
    const email = document.createElement('input');
    email.type = 'text';
    email.id = 'email';
    email.name = 'email';
    //If email can be found in local storage, it prefills the input field "email" for the user
    if(localStorage.getItem('email') != null) {
        email.value = localStorage.getItem('email');
    }
    //Creating label for input field "date"
    const labelDate = document.createElement('label');
    labelDate.id = 'label_date'
    labelDate.setAttribute('for', 'date');
    labelDate.innerHTML = 'Date*';
    //Creating input field to retreive users picked date
    const date = document.createElement('input');
    date.type = 'date';
    date.id = 'date';
    date.name = 'date';
    date.value = today;
    //Creating label for field "start time"
    const labelStartTime = document.createElement('label');
    labelStartTime.id = 'label_start_time'
    labelStartTime.setAttribute('for', 'startTime');
    labelStartTime.innerHTML = 'Start time*';
    //Creating input field to retreive users start time of booking
    const startTime = document.createElement('input');
    startTime.type = 'time';
    startTime.id = 'startTime';
    startTime.name = 'startTime';
    startTime.value = `${nextFullHour}`;
    //Creating label for field "end time"
    const labelEndTime = document.createElement('label');
    labelEndTime.id = 'label_end_time'
    labelEndTime.setAttribute('for', 'endTime');
    labelEndTime.innerHTML = 'End time*';
    //Creating input field to retreive users end time of booking
    const endTime = document.createElement('input');
    endTime.type = 'time';
    endTime.id = 'endTime';
    endTime.name = 'endTime';
    //Appending elements to parent
    form.appendChild(labelName);
    form.appendChild(inputName);
    form.appendChild(labelEmail);
    form.appendChild(email);
    form.appendChild(labelDate);
    form.appendChild(date);
    form.appendChild(labelStartTime);
    form.appendChild(startTime);
    form.appendChild(labelEndTime);
    form.appendChild(endTime);
    //Creating small written text "*required fields"
    const textSmall = document.createElement('p');
    textSmall.id = 'smallwritten';
    textSmall.innerHTML = '*required fields';
    //Appending elements to parent
    bookingWindow.appendChild(textSmall);
    //Creating button "Next"
    const nextButton = document.createElement('btn');
    nextButton.type = 'button';
    nextButton.id = 'next_button';
    nextButton.dataset.id = `${datasetId}`;
    nextButton.classList.add('big_buttons');
    nextButton.innerHTML = 'NEXT';
    //Creating icon "Close"
    const closeIcon = document.createElement('div');
    closeIcon.title = 'Close';
    closeIcon.id = 'close_icon_book';
    closeIcon.innerHTML = '<i class="bi bi-x" id="close"></i>';
    //Appending elements to parent
    bookingWindow.appendChild(nextButton);
    bookingWindow.appendChild(closeIcon);
    //Setting window status to active = true 
    bookingWindowActive = true;
    
    //console.log('Booking window has been opened.'); //LOGGING
}

//-- FUNCTION: Event handling for different buttons on "Booking" page --//
document.addEventListener('click', function(e) {
    let targetId = e.target.id;
    //Closing of info window
    if (targetId === 'close' && infoWindowActive) {
        closeWindow('infoWindow');
        //Status: inactive = false
        infoWindowActive = false;
        
        //console.log('Info window has been closed.'); //LOGGING
    } 
    //Closing of map window
    else if (targetId === 'close' && mapWindowActive) {
        closeWindow('mapWindow');
        //Status: inactive = false
        mapWindowActive = false;

        //console.log('Info window has been closed.'); //LOGGING
    }
    //Closing of booking window 
    else if (targetId === 'close' && bookingWindowActive) {
        closeWindow('booking_window');
        bookingWindowActive = false;
        
        //console.log('Booking window has been closed.'); //LOGGING
    } 
    //Closing of summary window
    else if (targetId === 'close' && summaryWindowActive) {
        //If user agrees to cancel process, window shall be closed otherwise not
        if (confirm('All your process will be lost. Are you sure you want to leave?')) {
            closeWindow('summary_window');
            //Status: inactive = false
            summaryWindowActive = false;
            
            //console.log('Summary window has been closed.'); //LOGGING
        };  
    } 
    //Closing of summary window if user clicks "BACK" button to return back to booking window
    else if (targetId === 'back_button' && summaryWindowActive) {
        const datasetId = document.getElementById(targetId).dataset.id;
        closeWindow('summary_window');
        //Status: inactive = false
        summaryWindowActive = false;
        //Creating promise to set up booking window
        let bookingWindow;
        const setupBookingWindow = new Promise((resolve) => {
            bookingWindow = renderFormBooking(datasetId)
            resolve();
        });
        //Waiting for promise to be resolved, after that the input fields shall be filled out automatically
        Promise.all([
            setupBookingWindow
        ]).then(() => {
            prefillForm();
        });
    } 
    //Input validation before summary window gets created when user clicks "NEXT" button
    else if (targetId === 'next_button') {
        formValidation();
    }
    else if (targetId === 'confirm_button') { 
        const deskId = e.target.dataset.id;
        const user = sessionStorage.getItem('name');
        const email = sessionStorage.getItem('email');
        const date = sessionStorage.getItem('date');
        const startTime = sessionStorage.getItem('startTime');
        const endTime = sessionStorage.getItem('endTime');
        formData(deskId, user, email, date, startTime, endTime,);
    }
    else if (targetId === 'okay_button' && confirmationWindowActive) {
        closeWindow('confirmation_window');
    }
});

//-- FUNCTION: Closing window, will remove the element and set popups to inactive --//
function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    window.remove();
    setPopupsInactive();
}

//-- FUNCTION: Form validation --//
function formValidation() {
    //Setting up local variables for promises to be resolved
    let validName;
    let validEmail;
    let validDate;
    let validStartTime;
    let validEndTime;
    let validAvailability;
    //Grabbing values from each input field
    const valueName = document.getElementById('user').value;
    const valueEmail = document.getElementById('email').value;
    const valueDate = document.getElementById('date').value;
    const valueStartTime = document.getElementById('startTime').value;
    const valueEndTime = document.getElementById('endTime').value;
    //Getting data variable id to identify desk
    const datasetId = document.getElementById('next_button').dataset.id;
    //Creating promises to validate name, e-mail, date, start time and end time
    const validateNamePromise = new Promise((resolve) => {
        validName = validateName(valueName);
        resolve();
    });
    const validateEmailPromise = new Promise((resolve) => {
        validEmail = validateEmail(valueEmail);
        resolve();
    });
    const validateDatePromise = new Promise((resolve) => {
        validDate = validateDate(valueDate);
        resolve();
    });
    const validateStartTimePromise = new Promise((resolve) => {
        validStartTime = validateStartTime(valueStartTime, valueDate);
        resolve();
    });
    const validateEndTimePromise = new Promise((resolve) => {
        validEndTime = validateEndTime(valueStartTime, valueEndTime);
        resolve();
    });
    //Waiting for all promises to be resolved, once resolved it shall execute the confirmationWindow function
    Promise.all([
        validateNamePromise,
        validateEmailPromise,
        validateDatePromise,
        validateStartTimePromise,
        validateEndTimePromise
    ]).then(async() => {
        if (validName && validEmail && validDate && validStartTime && validEndTime) {
            renderLoader();
            validAvailability = await validateAvailability(datasetId, valueDate, valueStartTime, valueEndTime);
        }
    }).then(() => {
        if (validAvailability) {
            summaryWindow( valueName, valueEmail , valueDate, valueStartTime, valueEndTime, datasetId);
        }   
    });
}

function renderLoader() {
    const nextButton = document.getElementById('next_button');
    nextButton.innerHTML ='<div id="loader_small"></<div>';
}

/**
 * Function: Validation of the name
 * @param {string} valueName - The input value to be checked
 * @returns {boolean} - Returns true if input is valid otherwise false
 */
function validateName(valueName) {
    // nameFormat - Name can only contain upper case and lower case characters
    const nameFormat = /^[A-Za-z ]{1,25}$/;
    const labelName = document.getElementById('label_name');
    const inputName = document.getElementById('user');
    // Validation Requirement 1: If string is empty, display error message and return false
    if (valueName == '') {
        labelName.innerHTML = 'Please provide your name.'
        labelName.style.color = 'var(--red)';
        inputName.classList.remove('invalid');
        // Delay for animation
        setTimeout(() => inputName.classList.add('invalid'),100);  
        // Clear input field    
        inputName.value = '';
        return false;
    } 
    // Validation Requirement 2: If string length is greater then 25 characters, display error message and return false
    else if (valueName.length > 25) {
        labelName.innerHTML = 'Name cannot exceed 25 letters.'
        labelName.style.color = 'var(--red)';
        inputName.classList.remove('invalid');
        // Delay for animation
        setTimeout(() => inputName.classList.add('invalid'),100);
        // Clear input field     
        inputName.value = '';
        return false;
    } 
    // Validation Requirement 3: If string does not match format, display error message and return false
    else if (!valueName.match(nameFormat)) {
        labelName.innerHTML = 'Provided name is not a name.'
        labelName.style.color = 'var(--red)';
        inputName.classList.remove('invalid');
        // Delay for animation
        setTimeout(() => inputName.classList.add('invalid'),100);
        // Clear input field    
        inputName.value = '';
        return false;
    } 
    // When all validation requirements are fulfilled, remove error message and return true
    else {
        labelName.innerHTML = 'Name*';
        labelName.style.color = 'var(--blue)';
        inputName.classList.remove('invalid');
        //Saving name of user in local storage to autofill future bookings
        localStorage.setItem('name', valueName);
        return true;
    }
}
//-- FUNCTION: E-Mail validation --//
function validateEmail(valueEmail) {
    //Setting mail format with regular email expression
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const labelEmail = document.getElementById('label_email');
    const inputEmail = document.getElementById('email');
    //If input value does not match mailForamt display error message and return false
    //Else remove error message and return true
    if (!valueEmail.match(mailFormat)) {
        labelEmail.innerHTML = 'Please provide a valid e-mail address.';
        labelEmail.style.color = 'var(--red)';
        inputEmail.classList.remove('invalid');
        setTimeout(() => inputEmail.classList.add('invalid'),100); //Delay for animation
        inputEmail.value = '';
        return false;
    } else {
        labelEmail.innerHTML = 'E-Mail*';
        labelEmail.style.color = 'var(--blue)';
        inputEmail.classList.remove('invalid');
        //Saving email of user in local storage to autofill future bookings
        localStorage.setItem('email', valueEmail);
        return true;
    }
}
//-- FUNCTION: Date validation --//
function validateDate(valueDate) {   
    const labelDate = document.getElementById('label_date');
    const inputDate = document.getElementById('date');
    //If input value is prior to today's date display error message and return false
    //Else remove error message and return true
    if (valueDate < today) {
        labelDate.innerHTML = 'Please provide a valid date.';
        labelDate.style.color = 'var(--red)';
        inputDate.classList.remove('invalid');
        setTimeout(() => inputDate.classList.add('invalid'),100); //Delay for animation
        return false;
    } 
    else {
        labelDate.innerHTML = 'Date*';
        labelDate.style.color = 'var(--blue)';
        inputDate.classList.remove('invalid');
        return true;
    }
}
//-- FUNCTION: Start time validation --//
function validateStartTime(valueStartTime, valueDate) {
    const labelStartTime = document.getElementById('label_start_time');
    const inputStartTime = document.getElementById('startTime');
    const openingHours = '05:00';
    //If input value is empty display error message and return false
    //Else if selected date is today and time is prior to current time display error message and return false
    //Else remove error message and return true
    if (valueStartTime == '') {
        labelStartTime.innerHTML = 'Please provide a time.';
        labelStartTime.style.color = 'var(--red)';
        inputStartTime.classList.remove('invalid');
        setTimeout(() => inputStartTime.classList.add('invalid'), 100); //Delay for animation
        return false;
    }
    else if (valueDate == today && valueStartTime < currentTime) {
        labelStartTime.innerHTML = 'Earliest time possible is ' + `${currentTime}`;
        labelStartTime.style.color = 'var(--red)';
        inputStartTime.classList.remove('invalid');
        setTimeout(() => inputStartTime.classList.add('invalid'), 100); //Delay for animation
        return false;
    }
    else if (valueStartTime < openingHours) {
        labelStartTime.innerHTML = 'Opens Hours are: ' + `${openingHours}`;
        labelStartTime.style.color = 'var(--red)';
        inputStartTime.classList.remove('invalid');
        setTimeout(() => inputStartTime.classList.add('invalid'),100); //Delay for animation
        return false;
    }
    else {
        labelStartTime.innerHTML = 'Start time*';
        labelStartTime.style.color = 'var(--blue)';
        inputStartTime.classList.remove('invalid');
        return true;
    }
}
//-- FUNCTION: End time validation --//
function validateEndTime(valueStartTime, valueEndTime) {
    const labelEndTime = document.getElementById('label_end_time');
    const inputEndTime = document.getElementById('endTime');
    const closingHours = '23:00';
    //If value is empty display error message and return false
    //Else if value end time is prior value start time display error message and return false
    //Else remove error and return true
    if (valueEndTime == '') {
        labelEndTime.innerHTML = 'Please provide a time.';
        labelEndTime.style.color = 'var(--red)';
        inputEndTime.classList.remove('invalid');
        setTimeout(() => inputEndTime.classList.add('invalid'),100); //Delay for animation
        return false;
    }
    else if (valueEndTime < valueStartTime) {
        labelEndTime.innerHTML = 'End time should be greater then start time.';
        labelEndTime.style.color = 'var(--red)';
        inputEndTime.classList.remove('invalid');
        setTimeout(() => inputEndTime.classList.add('invalid'),100); //Delay for animation
        return false;
    }
    else if (valueEndTime > closingHours) {
        labelEndTime.innerHTML = 'Closing Hours are: ' + `${closingHours}`;
        labelEndTime.style.color = 'var(--red)';
        inputEndTime.classList.remove('invalid');
        setTimeout(() => inputEndTime.classList.add('invalid'),100); //Delay for animation
        return false;
    }
    else {
        labelEndTime.innerHTML = 'End time*';
        labelEndTime.style.color = 'var(--blue)';
        inputEndTime.classList.remove('invalid');
        return true;
    }
}

async function validateAvailability(datasetId, valueDate, valueStartTime, valueEndTime) {

    const labelStartTime = document.getElementById('label_start_time');
    const inputStartTime = document.getElementById('startTime');
    const labelEndTime = document.getElementById('label_end_time');
    const inputEndTime = document.getElementById('endTime');
    const nextButton = document.getElementById('next_button');
    //GET request option
    const requestOptions = {
        method: 'GET'
    }

    const start = `${valueDate}` + 'T00:00:00';
    const end = `${valueDate}` + 'T23:59:00';

    const response = await fetch('https://matthiasbaldauf.com/wbdg23/bookings?deskid=' + `${datasetId}` + '&start=' + `${start}` + '&end=' + `${end}` + '&studid=' + `${studentId}`,requestOptions);
    const data = await response.json();

    if (data.length > 0) {
        const sortedData = sortAfterTime(data);
        const i = sortedData.length - 1;
        const earliestTime = sortedData[0];
        const latestTime = sortedData[i];

        if (valueStartTime >= earliestTime && valueEndTime <= latestTime || valueStartTime < earliestTime && valueEndTime > earliestTime || valueStartTime < latestTime && valueEndTime > latestTime) {
            labelStartTime.innerHTML = 'Hours ' + `${earliestTime}` + ' - ' + `${latestTime}` + ' unavailable.';
            labelStartTime.style.color = 'var(--red)';
            inputStartTime.classList.remove('invalid');
            // Delay for animation
            setTimeout(() => inputStartTime.classList.add('invalid'),100);
            labelEndTime.innerHTML = 'Hours ' + `${earliestTime}` + ' - ' + `${latestTime}` + ' unavailable.';
            labelEndTime.style.color = 'var(--red)';
            inputEndTime.classList.remove('invalid');
            // Delay for animation
            setTimeout(() => inputEndTime.classList.add('invalid'),100);
            nextButton.innerHTML = 'NEXT';
            return false;
        }

        else {
            return true;
        }
    }

    else {
        return true;
    }        
}

function sortAfterTime(data) {
    const sortedByTime = [];
    data.forEach(reservation => {
        const reservationDateAndStartTime = reservation.start;
        const reservationDateAndEndTime = reservation.end;
        const reservationStartTime = reservationDateAndStartTime.split('T')[1];
        const reservationEndTime = reservationDateAndEndTime.split('T')[1];
        const startTime = reservationStartTime.slice(0,5);
        const endTime = reservationEndTime.slice(0,5);
        sortedByTime.push(startTime);
        sortedByTime.push(endTime);
    });
    sortedByTime.sort();
    return sortedByTime;
}

//-- FUNCTION: Confirmation window --//
let summaryWindowActive;
function summaryWindow(valueName, valueEmail, valueDate, valueStartTime, valueEndTime, datasetId) {  
    //Removing "Booking" popup window       
    const bookingWindow = document.getElementById('booking_window');
    bookingWindow.remove();
    bookingWindowActive = false;
    //Creating "Summary" popup window
    const summaryWindow = document.createElement('div');
    summaryWindow.id = 'summary_window';
    //Appending elements to parent
    popups.appendChild(summaryWindow);
    //Grabbing desk name and desk address to be shown in summary
    let deskName;
    let deskAddress;
    for (let i = 0; i < deskData.length; i++) {
        if (datasetId === deskData[i].id) {
            deskName = deskData[i].name;
            deskAddress = deskData[i].address;
        }
    }
    //Converting day and month from input field to Day, Month Date, Year format (i.e. 2023-05-31 > Wed, May 31, 2023)
    let dateAsString = convertDateToDayMonthDateYear(valueDate);
    //Calculating duration of the booking and getting values in hh:mm
    let duration = calculateDuration(valueDate, valueStartTime, valueEndTime);
    
    //Calculating price
    const calculatedPrice = calculatePrice(duration, datasetId);
    //Creating content 
    const title = document.createElement('h2');
    title.innerHTML = 'Summary';
    const titleDesk = document.createElement('h3');
    titleDesk.innerHTML = 'Desk:';
    const textDesk = document.createElement('p');
    textDesk.innerHTML = `${deskName}`;
    const titleAddress = document.createElement('h3');
    titleAddress.innerHTML = 'Address:'
    const textAddress = document.createElement('p');
    textAddress.innerHTML = `${deskAddress}`;
    const titleDate = document.createElement('h3');
    titleDate.innerHTML = 'Date:';
    const textDate = document.createElement('p');
    textDate.innerHTML = `${dateAsString}`;
    const titleStartTime = document.createElement('h3');
    titleStartTime.innerHTML = 'From:'
    const textStartTime = document.createElement('p');
    textStartTime.innerHTML = `${valueStartTime}`;
    const titleEndTime = document.createElement('h3');
    titleEndTime.innerHTML = 'To:'
    const textEndTime = document.createElement('p');
    textEndTime.innerHTML = `${valueEndTime}`;
    const titlePrice = document.createElement('h3');
    const titleDuration = document.createElement('h3');
    titleDuration.innerHTML = 'Duration:';
    const textDuration = document.createElement('p');
    textDuration.innerHTML = `${duration}`+ 'h';
    titlePrice.innerHTML = 'Total amount:';
    const textPrice = document.createElement('p');
    textPrice.innerHTML = `${calculatedPrice}`;
    //Creating container to place "BACK" and "CONFIRM" buttons
    const containerButtons = document.createElement('div');
    containerButtons.id = 'container_summary_buttons';
    //Creating button "BACK"
    const backButton = document.createElement('btn');
    backButton.type = 'button';
    backButton.id = 'back_button';
    backButton.dataset.id = `${datasetId}`;
    backButton.classList.add('big_buttons');
    backButton.innerHTML = 'BACK';
    //Creating button "CONFIRM"
    const confirmButton = document.createElement('btn');
    confirmButton.type = 'button';
    confirmButton.id = 'confirm_button';
    confirmButton.dataset.id = `${datasetId}`;
    confirmButton.classList.add('big_buttons');
    confirmButton.innerHTML = 'CONFIRM';
    //Creating icon "Close"
    const closeIcon = document.createElement('div');
    closeIcon.title = 'Close';
    closeIcon.id = 'close_icon_summary';
    closeIcon.innerHTML = '<i class="bi bi-x" id="close"></i>';
    //Appending elements to parent
    summaryWindow.appendChild(title);
    summaryWindow.appendChild(titleDesk);
    summaryWindow.appendChild(textDesk);
    summaryWindow.appendChild(titleAddress);
    summaryWindow.appendChild(textAddress);
    summaryWindow.appendChild(titleDate);
    summaryWindow.appendChild(textDate);
    summaryWindow.appendChild(titleStartTime);
    summaryWindow.appendChild(textStartTime);
    summaryWindow.appendChild(titleEndTime);
    summaryWindow.appendChild(textEndTime);
    summaryWindow.appendChild(titleDuration);
    summaryWindow.appendChild(textDuration);
    summaryWindow.appendChild(titlePrice);
    summaryWindow.appendChild(textPrice);
    summaryWindow.appendChild(containerButtons);
    summaryWindow.appendChild(closeIcon);
    //Appending elements to parent
    containerButtons.appendChild(backButton);
    containerButtons.appendChild(confirmButton);
    //Saving booking information in session storage in case user goes back all input field will be filled out automatically
    sessionStorage.clear();
    sessionStorage.setItem('name', valueName);
    sessionStorage.setItem('email', valueEmail);
    sessionStorage.setItem('date', valueDate);
    sessionStorage.setItem('startTime', valueStartTime);
    sessionStorage.setItem('endTime', valueEndTime);
    sessionStorage.setItem('price', calculatedPrice);
    //Setting window to active = true
    summaryWindowActive = true;
}
//-- FUNCTION: Calculate duration of booking to display on summary window --//
function calculateDuration(valueDate, valueStartTime, valueEndTime) {
    //Creating new Date object to be able to calculate with the values from the input field
    let startTime = new Date(`${valueDate}`+'T'+`${valueStartTime}`+':00');
    let endTime = new Date(`${valueDate}`+'T'+`${valueEndTime}`+':00');
    //Subtracting start time from end time to get the duration which is in milliseconds
    let durationMilliseconds = endTime - startTime;
    //Calculations to convert milliseconds into minutes and then into hours
    let durationMinutes = durationMilliseconds / (1000 * 60);
    let durationHours = durationMinutes / 60;
    //Rouding down values to full hours
    let hours = Math.floor(durationHours); 
    //Rounding down to full minutes and multiplying "durationHours" times 60 to get the minutes
    let minute = Math.round((durationHours % 1) * 60);
    //Using conditional (ternary) operator to determine if minutes are one or two digits to add a 0 infront of one digit values
    let minutes;
    minute.toString().length === 1 ? minutes = '0' + minute : minutes = minute;
    let duration = `${hours}` + ':' + `${minutes}`;
    //Returning duration as hh:mm
    return duration;
}

//-- FUNCTION: Calculate total price --//
function calculatePrice(duration, datasetId) {
    //Converting duration in hh:mm into decimals to be albe to multiply the factor with price
    const hours = duration.split(':')[0];
    const minutes = duration.split(':')[1];
    const decimals = (minutes / 60);
    const factor = (Number(hours) + Number(decimals.toFixed(2)));
    //Grabbing prices of selected desk which is saved as an data attribute
    let calculatedPrice;
    let priceInEuros;
    let priceInSwissFrancs;
    const desk = document.getElementsByClassName('desk');
    for(let i = 0; i < desk.length; i++) {
        if (datasetId === desk[i].dataset.id) {
            const sectionLeft = desk[i].childNodes[0];
            //Grabbing <p> element "Fee" which is the 4th child of <div> element "section left"
            const displayedPrice = sectionLeft.getElementsByTagName('p')[3];
            priceInEuros = displayedPrice.dataset.eur;
            priceInSwissFrancs = displayedPrice.dataset.chf;
        }
    }
    //Grabbing active currency
    const currency = activeCurrency.innerHTML.slice(0,3);
    //Calculating prices depending on active currency 
    switch (currency) {
        case 'EUR':
            const calculatedPriceInEuros = padPrice((factor * priceInEuros).toFixed(1));
            calculatedPrice = '€' + calculatedPriceInEuros.toString() + ' EUR';
            break;
        case 'CHF':
            const calculatedPriceInSwissFrancs = padPrice((factor * priceInSwissFrancs).toFixed(1));
            calculatedPrice = calculatedPriceInSwissFrancs.toString() + ' CHF';
            break;
    } 
    //Return calculated price
    return calculatedPrice;
}

//-- FUNCTION: Setting values if user clicks "BACK" on summary window --//
function prefillForm() {
    document.getElementById('user').value = sessionStorage.getItem('name');
    document.getElementById('email').value = sessionStorage.getItem('email');
    document.getElementById('date').value = sessionStorage.getItem('date');
    document.getElementById('startTime').value = sessionStorage.getItem('startTime');
    document.getElementById('endTime').value = sessionStorage.getItem('endTime');
}

//-- FUNCTION: Creating booking --//
function formData(deskId, user, email, date, startTime, endTime) {
    //Creating and appending parameters to formData
    let formData = new FormData();
    formData.append('deskid', `${deskId}`);
    formData.append('user', `${user}`);
    formData.append('email', `${email}`);
    formData.append('start', `${date}` + 'T' + `${startTime}` + ':00');
    formData.append('end', `${date}` + 'T' + `${endTime}` + ':00');
    formData.append('studid', `${studentId}`);
    //Render loading screen animation
    loadingScreen();
    //Post booking which returns the response
    postBooking(formData)
    .then(response => {
        setTimeout(() => {renderConfirmationWindow(deskId, user, date, startTime, endTime)},3000);
        renderLoadingDots('reservations');
        reloadReservations();
    });

}
//-- FUNCTION: Render loading screen --//
function loadingScreen() {
    //Removing summary window
    const summaryWindow = document.getElementById('summary_window');
    summaryWindow.remove();
    summaryWindowActive = false;
    //Creating loading screen
    const loader = document.createElement('div');
    loader.id = 'loader'; 
    popups.append(loader);
}

function renderLoadingDots(parent) {
    const parentElement = document.getElementById(`${parent}`);
    parentElement.classList.add('loading');
    const loadingDotsContainer = document.createElement('div');
    loadingDotsContainer.id = `${parent}` + 'LoadingDots';
    parentElement.appendChild(loadingDotsContainer);
    const firstDot = document.createElement('div');
    firstDot.id = 'firstDot';
    const secondDot = document.createElement('div');
    secondDot.id = 'secondDot';
    const thirdDot = document.createElement('div');
    thirdDot.id = 'thirdDot';
    loadingDotsContainer.appendChild(firstDot);
    loadingDotsContainer.appendChild(secondDot);
    loadingDotsContainer.appendChild(thirdDot);
    
}
//-- FUNCTION: Render confirmation window --//
let confirmationWindowActive;
function renderConfirmationWindow(deskId, user, date, startTime, endTime) {
    //Removing loader
    const loader = document.getElementById('loader');
    loader.remove();
    //Grabbing the price which is saved in session storage
    const price = sessionStorage.getItem('price');
    //Grabbing and converting date to Day, Month Date, Year format (i.e. 2023-05-21 => Wed, May 21, 2023)
    const dateAsString = convertDateToDayMonthDateYear(date);
    //Grabbing name and address of desk by iterating over apiData array
    let deskName;
    let deskAddress;
    deskData.forEach(element => {
        if (element.id === deskId) {
            deskName = element.name;
            deskAddress = element.address
        }
    });
    //Creating download link for .ics file
    const url = createLink(deskName, deskAddress, date, startTime, endTime)
    //Creating confirmation window
    const confirmationWindow = document.createElement('div');
    confirmationWindow.id = 'confirmation_window';
    //Appending element to parent
    popups.append(confirmationWindow);
    //Creating content for booking confirmation window
    const title = document.createElement('h2');
    title.innerHTML = 'Booking Confirmation';
    const message = document.createElement('p');
    message.innerHTML = 'Thank you ' + `${user}` + ' for using shareadesk as your prefered workspace reservation platform.';
    const name = document.createElement('p');
    name.innerHTML = '<b>Desk:</b> ' + `${deskName}`;
    const address = document.createElement('p');
    address.innerHTML = '<b>Address:</b> ' + `${deskAddress}`;
    const bookingDate = document.createElement('p');
    bookingDate.innerHTML = '<b>Date:</b> ' + `${dateAsString}`;
    const bookingTime = document.createElement('p');
    bookingTime.innerHTML = '<b>Time:</b> ' + `${startTime}` + ' - ' + `${endTime}`;
    const bookingPrice = document.createElement('p');
    bookingPrice.innerHTML = '<b>Total:</b> ' + `${price}`;
    const downloadButton = document.createElement('button');
    downloadButton.id = 'download_button';
    downloadButton.classList.add('big_buttons');
    downloadButton.classList.add('download_button');
    downloadButton.title = 'Import to Calendar';
    downloadButton.innerHTML = '<a href='+`${url}`+'> <i id="download" class="bi bi-download icon_download"></i> </a>';
    const closeButton = document.createElement('button');
    closeButton.id = 'okay_button';
    closeButton.classList.add('big_buttons');
    closeButton.title = 'Okay'
    closeButton.innerHTML = 'OKAY';
    //Appending elements to parent
    confirmationWindow.appendChild(title);
    confirmationWindow.appendChild(message);
    confirmationWindow.appendChild(name);
    confirmationWindow.appendChild(address);
    confirmationWindow.appendChild(bookingDate);
    confirmationWindow.appendChild(bookingTime);
    confirmationWindow.appendChild(bookingPrice);
    confirmationWindow.appendChild(downloadButton);
    confirmationWindow.appendChild(closeButton);

    confirmationWindowActive = true;
}

//-- FUNCTION: Create link to download .ics file --//
function createLink(deskName, deskAddress, date, startTime, endTime) {
    const title = 'Desk Reservation: ' + `${deskName}`;
    const start = `${date}` + 'T' + `${startTime}` + ':00';
    const end = `${date}` + 'T' + `${endTime}` + ':00';
    const description = 'Thank you for using shareadesk as your prefered workspace reservation platfrom. We wish you happy working! Your team at shareadesk.';
    //Link for Calndr.Link API
    const url = 'https://calndr.link/d/event/?service=stream&start='+`${start}`+'&end='+`${end}`+'&title='+encodeURIComponent(`${title}`)+'&location='+encodeURIComponent(`${deskAddress}`)+'&description='+encodeURIComponent(`${description}`)+'&timezone=Europe/Zurich';
    //Return URL
    return url;
}

//-- API ASYNC FUNCTION: Get all desks --//
async function getAllDesks() {
    //GET request option
    let requestOptions = {
        method: 'GET'
    };

    try {
        const response = await fetch('https://matthiasbaldauf.com/wbdg25/desks', requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        renderErrorMessage(error);
    }
}

//-- API ASYNC FUNCTION: Post booking --//
async function postBooking(formData) {
    //POST request option
    const requestOptions = {
        method: 'POST',
        body: formData
    }
    //FETCH
    try {
        const response = await fetch('https://matthiasbaldauf.com/wbdg25/booking', requestOptions);
        const data = await response.json();
        return data; //Returning converted price
    } catch (error) {
        console.log(error); //LOGGING
        const errorMessage = 'Error';
        return errorMessage; //Returning error message
    } 
}

//-- API ASYNC FUNCTION: Delete booking --//
async function deleteBooking(bookingReferenceId) {
    //DELETE request option
    const requestOptions = {
        method: 'DELETE'
    }
    //FETCH
    try {
        const response = await fetch('https://matthiasbaldauf.com/wbdg25/booking?id=' + `${bookingReferenceId}` + '&studid=' + `${studentId}`, requestOptions);
        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
}

//-- API ASYNC FUNCTION: Get all bookings --//
async function getAllReservations(deskId) {
    //GET request option
    const requestOptions = {
        method: 'GET'
    }
    //Time frame to get all bookings => current year 01.01 at 00:00 - next year 01.01 at 00:00
    const nextYear = Number(year) + Number(1);
    const start = `${year}` + '-01-01T00:00:00';
    const end = `${nextYear}` + '-01-01T00:00:00';

    //FETCH
    try {
        const response = await fetch('https://matthiasbaldauf.com/wbdg25/bookings?deskid=' + `${deskId}` + '&start=' + `${start}` + '&end=' + `${end}` + '&studid=' + `${studentId}`, requestOptions);
        const data = await response.json();
        //Return data
        return data;
    } catch (error) {
        console.log(error);
    }   
}

//-- ASYNC FUNCTION: Load all reservations --//
async function loadReservations(deskData) {
    const reservationsSortedAfterDate = [];

        for (const desk of deskData) {
            const deskId = desk.id;
            const allReservations = await getAllReservations(deskId);
            sortAfterDate(allReservations, reservationsSortedAfterDate);
        }
        setTimeout(() => renderReservations(reservationsSortedAfterDate),3000);
}

//Creating variable to store reservation data from API for further use
let reservationData;
//-- FUNCTION: Render reservations --//
function renderReservations(reservationsSortedAfterDate) {
    const loadingDots = document.getElementById('reservationsLoadingDots');
    if (loadingDots !== null) {
        loadingDots.remove();
    }
    //Storing fetched data from API for further use
    reservationData = reservationsSortedAfterDate;
    //Setting up arrays to save id of each button
    const buttonIdInvoice = [];
    const buttonIdMap = [];
    const buttonIdDelete = [];

    if (reservationsSortedAfterDate.length === 0) {
        renderMessage();
    }

    for (let i = 0; i < reservationsSortedAfterDate.length; i++) {
        //Grabbing all information needed 
        const bookingReferenceId = reservationsSortedAfterDate[i].bookingReferenceId;
        const deskId = reservationsSortedAfterDate[i].deskId;
        const date = reservationsSortedAfterDate[i].date;
        const dateAsString = convertDateToDayMonthDateYear(date);
        const startTime = reservationsSortedAfterDate[i].start;
        const endTime = reservationsSortedAfterDate[i].end;
        let deskName;
        let deskAddress; 
        let deskComment;
        deskData.forEach(desk => {
            if(deskId === desk.id) {
                deskName = desk.name;
                deskAddress = desk.address;
                deskComment = desk.comment;
            }
        });

        const url = createLink(deskName, deskAddress, date, startTime, endTime);
        
        //Creating desks
        const containerReservations = document.getElementById('reservations');
        containerReservations.classList.remove('loading');
        const reservation = document.createElement('div');
        reservation.classList.add('desk_reservation');
        reservation.dataset.id = `${deskId}`;
        //Appending element to parent
        containerReservations.appendChild(reservation);
        //Creating "sectionLeft" to place content inside
        const sectionLeft = document.createElement('div'); //creating new element
        sectionLeft.classList.add('section_left'); //adding class to element
        //Creating "sectionRight" to place content inside
        const sectionRight = document.createElement('div'); //creating new element
        sectionRight.classList.add('section_right'); //adding class to element
        //Appending elements to parent
        reservation.appendChild(sectionLeft);
        reservation.appendChild(sectionRight);

        //Creating content
        const header = document.createElement('h3');
        header.innerHTML = `${deskName}`;
        const address = document.createElement('p');
        address.innerHTML = '<b>Address:</b> ' + `${deskAddress}`;
        const reservationDate = document.createElement('p');
        reservationDate.innerHTML = '<b>Date:</b> ' + `${dateAsString}`;
        const time = document.createElement('p');
        time.innerHTML = '<b>Time:</b> ' + `${startTime}` + ' - ' + `${endTime}`;
        const comment = document.createElement('p');
        comment.innerHTML = '<b>Comment:</b> ' + `${deskComment}`;
        //Appending elements to parent
        sectionLeft.appendChild(header);
        sectionLeft.appendChild(address);
        sectionLeft.appendChild(reservationDate);
        sectionLeft.appendChild(time);
        sectionLeft.appendChild(comment);
        //Creating "top" and "bottom" section for buttons to be placed in "sectionRight" 
        const sectionRightTop = document.createElement('div');
        sectionRightTop.classList.add('section_right_top');
        const sectionRightBottom = document.createElement('div');
        sectionRightBottom.classList.add('section_right_bottom');
        //Appending elements to parent
        sectionRight.appendChild(sectionRightTop);
        sectionRight.appendChild(sectionRightBottom);
        //Creating info button
        const buttonInvoice = document.createElement('button');
        buttonInvoice.id = 'btn_invoice_id' + `${bookingReferenceId}`;
        buttonInvoice.dataset.button = 'invoice';
        buttonInvoice.dataset.id = `${bookingReferenceId}`;
        buttonInvoice.classList.add('small_buttons');
        buttonInvoice.innerHTML = '<i class="bi bi-receipt icon_invoice"></i>';
        buttonInvoice.title = 'Invoice';
        //Creating map button
        const buttonMap = document.createElement('button');
        buttonMap.id = 'btn_map_id' + `${bookingReferenceId}`;
        //buttonMap.dataset.button = 'map';
        buttonMap.dataset.id = `${deskId}`;
        buttonMap.classList.add('small_buttons');
        buttonMap.innerHTML = '<i class="bi bi-map icon_map"></i>';
        buttonMap.title = 'Show on Map';
        //Creating download button
        const buttonDownload = document.createElement('button');
        buttonDownload.dataset.button = 'download';
        buttonDownload.dataset.id =  `${bookingReferenceId}`;
        buttonDownload.innerHTML = '<a href='+`${url}`+'> <i id="download" class="bi bi-download icon_download"></i> </a>';
        buttonDownload.classList.add('small_buttons');
        buttonDownload.classList.add('download_button');
        buttonDownload.title = 'Import to Calendar';
        //Appending elements to parent
        sectionRightTop.appendChild(buttonInvoice);
        sectionRightTop.appendChild(buttonMap);
        sectionRightTop.appendChild(buttonDownload);
        //Creating book button
        const buttonDelete = document.createElement('button');
        buttonDelete.id = 'btn_delete_id' + `${bookingReferenceId}`;
        buttonDelete.dataset.button = 'delete';
        buttonDelete.dataset.id =  `${bookingReferenceId}`;
        buttonDelete.classList.add('big_buttons');
        buttonDelete.innerHTML = 'DELETE';
        buttonDelete.title = 'Delete';
        //Appending element to parent 
        sectionRightBottom.appendChild(buttonDelete);

        //Saving button id's in array
        buttonIdInvoice.push(buttonInvoice.id);
        buttonIdMap.push(buttonMap.id);
        buttonIdDelete.push(buttonDelete.id);
    }
    //Creating event listeners for info buttons
    for (let i = 0; i < buttonIdInvoice.length; i++) {
        const id = buttonIdInvoice[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            const bookingReferenceId = button.dataset.id;
            renderReservationInfoPopup(bookingReferenceId);
        });  
    }
    //Creating event listeners for map buttons
    for (let i = 0; i < buttonIdMap.length; i++) {
        const id = buttonIdMap[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            const datasetId = button.dataset.id;
            renderMapPopUp(datasetId);
        });  
    }
    //Creating event listeners for delte buttons
    for (let i = 0; i < buttonIdDelete.length; i++) {
        const id = buttonIdDelete[i];
        const button = document.getElementById(`${id}`);
        button.addEventListener('click', () => {
            const bookingReferenceId = button.dataset.id;
            renderDeletePopup(bookingReferenceId);
        });  
    }
}

function renderMessage() {
    const reservations = document.getElementById('reservations');
    const containerMessage = document.createElement('div');
    containerMessage.classList.add('container_message');
    containerMessage.id = 'container_message';
    reservations.appendChild(containerMessage);
    const title = document.createElement('h2');
    title.classList.add('message_title');
    title.innerHTML = 'Oops...';
    const message = document.createElement('p');
    message.classList.add('message_text');
    message.innerHTML = 'No reservations were found...';

    containerMessage.appendChild(title);
    containerMessage.appendChild(message);
}

function removeMessage() {
    const containerMessage = document.getElementById('container_message');
    if (containerMessage !== null) {
        containerMessage.remove();
    }
}

//-- FUNCTION: Render delete popup window --//
function renderDeletePopup(bookingReferenceId) {
    setPopupsActive();
    //Creating delete window
    const deleteWindow = document.createElement('div');
    deleteWindow.id = 'delete_window';
    //Append element to parent
    popups.appendChild(deleteWindow);

    //Creating content
    const message = document.createElement('p');
    message.innerHTML = 'You are about to delete this reservation. Are you sure you want to continue?';
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'button_container';
    //Append elements to parent
    deleteWindow.appendChild(message);
    deleteWindow.appendChild(buttonContainer);
    const noButton = document.createElement('button');
    noButton.classList.add('big_buttons');
    noButton.innerHTML = 'NO';
    const yesButton = document.createElement('button');
    yesButton.classList.add('big_buttons');
    yesButton.dataset.bookingid = `${bookingReferenceId}`;
    yesButton.innerHTML = 'YES';
    //Append elements to parent
    buttonContainer.appendChild(noButton);
    buttonContainer.appendChild(yesButton);
    //Event listener for "NO" => if clicked it will close the window
    noButton.addEventListener('click', () => {
        closeWindow('delete_window');
    });
    //Event listener for "YES" => if clicked it will close the window and proceed to delete the reservation. Once delete it will reload the list of reservations
    yesButton.addEventListener('click', () => {
        closeWindow('delete_window');
        deleteBooking(bookingReferenceId)
        .then(() => {
            renderLoadingDots('reservations');
            reloadReservations();
        })
    });   
}

function renderReservationInfoPopup(bookingReferenceId) {
    setPopupsActive();
    //Grab the desk id
    let deskId;
    let valueDate;
    let valueStartTime;
    let valueEndTime;
    let email;
    reservationData.forEach(reservation => {
        if (bookingReferenceId === reservation.bookingReferenceId) {
            deskId = reservation.deskId;
            valueDate = reservation.date;
            valueStartTime = reservation.start;
            valueEndTime = reservation.end;
            email = reservation.email;
        }
    });
    //Grab the price
    let price;
    let deskName;
    deskData.forEach(desk => {
        if (deskId === desk.id) {
            price = padPrice(desk.price);
            deskName = desk.name;
        }
    });

    //Calculating duration of the booking and getting values in hh:mm
    let duration = calculateDuration(valueDate, valueStartTime, valueEndTime);
    
    //Calculating price
    const calculatedPrice = calculatePrice(duration, deskId);

    //Creating reservation info window
    const informationWindow = document.createElement('div');
    informationWindow.id = 'information_window';
    //Append element to parent
    popups.appendChild(informationWindow);

    //Creating content
    const title = document.createElement('h2');
    title.innerHTML = 'Invoice';

    const bookingReference = document.createElement('p');
    bookingReference.innerHTML = '<b>Booking Reference:</b> ' + `${bookingReferenceId}`;
    const bookedDesk = document.createElement('p');
    bookedDesk.innerHTML = '<b>Desk:</b> ' + `${deskName}`;
    const fee = document.createElement('div');
    fee.innerHTML = '<b>Price per hour:</b> ' + '<p>' + `${price}` + ' CHF' + '</p>';
    const bookingDuration = document.createElement('div');
    bookingDuration.innerHTML = '<b>Duration:</b> ' + '<p>' + `${duration}` + ' h' + '</p>';
    const subTotalPrice = document.createElement('div');
    subTotalPrice.innerHTML = '<b>Subtotal:</b> ' + '<p>' + `${calculatedPrice}` + '</p>';
    const tax = document.createElement('div');
    tax.innerHTML = '<b>Tax:</b>' + '<p>' + '0.00 CHF' + '</p>';
    const totalPrice = document.createElement('div');
    totalPrice.innerHTML = '<b>Total Price:</b> ' + '<p><b>' + `${calculatedPrice}` + '</b></p>';
    const contact = document.createElement('p');
    contact.innerHTML = '<b>Billed to:</b> ' + `${email}`;
    const status = document.createElement('p');
    status.innerHTML = '<b>Payment Status:</b> payed';
    const closeIcon = document.createElement('div');
    closeIcon.title = 'Close';
    closeIcon.id = 'close_icon_invoice';
    closeIcon.innerHTML = '<i class="bi bi-x" id="close"></i>';

    const firstLine = document.createElement('div');
    firstLine.classList.add('line');
    const secondLine = document.createElement('div');
    secondLine.classList.add('line');

    // Appending elements to parent
    informationWindow.appendChild(title);
    informationWindow.appendChild(bookingReference);
    informationWindow.appendChild(bookedDesk);
    informationWindow.appendChild(firstLine);
    informationWindow.appendChild(fee);
    informationWindow.appendChild(bookingDuration);
    informationWindow.appendChild(subTotalPrice);
    informationWindow.appendChild(tax);
    informationWindow.appendChild(totalPrice);
    informationWindow.appendChild(secondLine);
    informationWindow.appendChild(contact);
    informationWindow.appendChild(status);
    informationWindow.appendChild(closeIcon);

    // Add event listener to close window
    closeIcon.addEventListener('click', () => {closeWindow('information_window')});
}

//-- FUNCTION: reload all reservations --//
function reloadReservations() {
    removeMessage();
    removeAllReservations();
    loadReservations(deskData);
}

//-- FUNCTION: Remove all reservations currently displayed --//
function removeAllReservations() {
    const reservations = document.querySelectorAll('.desk_reservation');
    for (let i = 0; i < reservations.length; i++) {
        reservations[i].remove();
    }
}
