// Background slider
const sliderImages = document.querySelectorAll('.slider-img');
let currentSlide = 0;

function showSlide(index) {
    sliderImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    showSlide(currentSlide);
}, 5000);


const whoDropdown = document.getElementById('who-dropdown');
const whoSelectBtn = document.getElementById('who-select-btn');
const whoDropdownContent = document.getElementById('who-dropdown-content');

// Default values and limits
const whoState = {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0
};
// People Limits
const whoLimits = {
    adults: { min: 1, max: 15 },
    children: { min: 0, max: 10 },
    infants: { min: 0, max: 2 },
    pets: { min: 0, max: 5 }
};

// update button number of people
function updateWhoDisplay() {
    document.getElementById('adults-count').textContent = whoState.adults;
    document.getElementById('children-count').textContent = whoState.children;
    document.getElementById('infants-count').textContent = whoState.infants;
    document.getElementById('pets-count').textContent = whoState.pets;

    // Update button disabled states
    document.querySelectorAll('.who-minus').forEach(btn => {
        const type = btn.getAttribute('data-type');
        btn.disabled = whoState[type] <= whoLimits[type].min;
    });
    document.querySelectorAll('.who-plus').forEach(btn => {
        const type = btn.getAttribute('data-type');
        btn.disabled = whoState[type] >= whoLimits[type].max;
    });

    // Update button label to show summary
    let summary = [];
    if (whoState.adults) summary.push(`${whoState.adults} Adult${whoState.adults > 1 ? 's' : ''}`);
    if (whoState.children) summary.push(`${whoState.children} Child${whoState.children > 1 ? 'ren' : ''}`);
    if (whoState.infants) summary.push(`${whoState.infants} Infant${whoState.infants > 1 ? 's' : ''}`);
    if (whoState.pets) summary.push(`${whoState.pets} Pet${whoState.pets > 1 ? 's' : ''}`);
    whoSelectBtn.textContent = summary.length ? summary.join(', ') : 'Select';
}

// Close preferences dropdown if open
whoSelectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    preferencesDropdown.classList.remove('open');
    whoDropdown.classList.toggle('open');
});

document.querySelectorAll('.who-plus').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        if (whoState[type] < whoLimits[type].max) {
            whoState[type]++;
            updateWhoDisplay();
        }
    });
});

document.querySelectorAll('.who-minus').forEach(btn => {
    btn.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        if (whoState[type] > whoLimits[type].min) {
            whoState[type]--;
            updateWhoDisplay();
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!whoDropdown.contains(e.target)) {
        whoDropdown.classList.remove('open');
    }
});

// Initialize display on load
updateWhoDisplay();

// Preferences Dropdown Logic
const preferencesDropdown = document.getElementById('preferences-dropdown');
const preferencesSelectBtn = document.getElementById('preferences-select-btn');
const preferencesDropdownContent = document.getElementById('preferences-dropdown-content');
const selectAll = document.getElementById('select-all');
const prefOptions = document.querySelectorAll('.pref-option');

function updatePreferencesBtnLabel() {
    const checked = Array.from(prefOptions).filter(cb => cb.checked).map(cb => cb.parentElement.textContent.trim());
    if (selectAll.checked) {
        preferencesSelectBtn.textContent = 'All Selected';
    } else if (checked.length === 0) {
        preferencesSelectBtn.textContent = 'Select Preferences';
    } else {
        preferencesSelectBtn.textContent = checked.join(', ');
    }
}

// Close who dropdown if open
preferencesSelectBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    whoDropdown.classList.remove('open');
    preferencesDropdown.classList.toggle('open');
});

selectAll.addEventListener('change', function() {
    prefOptions.forEach(cb => cb.checked = selectAll.checked);
    updatePreferencesBtnLabel();
});

prefOptions.forEach(cb => {
    cb.addEventListener('change', function() {
        if (!this.checked) selectAll.checked = false;
        else if ([...prefOptions].every(cb => cb.checked)) selectAll.checked = true;
        updatePreferencesBtnLabel();
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!preferencesDropdown.contains(e.target)) {
        preferencesDropdown.classList.remove('open');
    }
});

// Initialize preferences button label
updatePreferencesBtnLabel();

// Date Validation
const departureDateInput = document.getElementById('departure-date');
const leavingDateInput = document.getElementById('leaving-date');
const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', function(e) {
    const departure = new Date(departureDateInput.value);
    const leaving = new Date(leavingDateInput.value);
    // Check at least one preference is selected
    const atLeastOnePref = Array.from(prefOptions).some(cb => cb.checked);
    if (!atLeastOnePref) {
        e.preventDefault();
        alert('Please select at least one preference.');
        preferencesDropdown.classList.add('open');
        return;
    }
    if (leaving <= departure) {
        e.preventDefault();
        alert('Leaving date must be after the departure date.');
        leavingDateInput.focus();
        return;
    }
    e.preventDefault();
    showLoadingOverlay();
    setTimeout(function() {
        window.location.href = 'resulteg.html';
    }, 5000);
});

function showLoadingOverlay() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-spinner-container">
            <div class="loading-spinner"></div>
            <div class="loading-text">Please wait while we find the best trips for you...</div>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Login button redirection
const loginBtn = document.querySelector('.btn.login');
if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'login.html';
    });
}

// Sign Up button redirection
const signupBtn = document.querySelector('.btn.signup');
if (signupBtn) {
    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'signup.html';
    });
}






function handleSubmit(event) {
    event.preventDefault();
    // Get all values from the form
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const birthdate = document.getElementById("birthdate").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password") ? document.getElementById("confirm-password").value : null;

    // Validation
    if (!email || !username || !birthdate || !password || !confirmPassword || !firstname || !lastname) {
        alert('Please fill in all fields.');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Save account
    const account = { firstname, lastname, email, birthdate, username, password };
    let accounts = JSON.parse(localStorage.getItem("UbuntuAccounts") || "[]");
    accounts.push(account);
    localStorage.setItem("UbuntuAccounts", JSON.stringify(accounts));
    localStorage.setItem("currentUser", JSON.stringify(account));
    window.location.href = 'home.html';
}

function connect() {
    /*
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const accounts = JSON.parse(localStorage.getItem("UbuntuAccounts") || "[]");
    // Match by email and password (not numero/mdp)
    const account = accounts.find(c => c.email === email && c.password === password);

    if (account) {
        localStorage.setItem("currentUser", JSON.stringify(account));
        window.location.href = "home.html";
    } else {
        alert("Incorrect Log In or Password. Please Try Again.");
    }
    */
    window.location.href = "home.html";
}