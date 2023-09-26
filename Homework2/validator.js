let usernameTimer, emailTimer, passwordTimer, repeatPasswordTimer;

const usernameInput = document.getElementById('InputUsername');
const emailInput = document.getElementById('InputEmail');
const passwordInput = document.getElementById('InputPassword1');
const repeatPasswordInput = document.getElementById('InputPassword2');
const usernameWarning = document.getElementById('usernameWarning');
const emailWarning = document.getElementById('emailWarning');
const passwordWarning = document.getElementById('passwordWarning');
const repeatPasswordWarning = document.getElementById('repeatPasswordWarning');
const registerButton = document.getElementById('registerButton');

function checkFormState() {
    if (
        emailInput.value.trim() !== '' &&
        passwordInput.value.trim() !== '' &&
        repeatPasswordInput.value.trim() !== '' &&
        usernameInput.value.trim() !== '' &&
        emailWarning.textContent === '' &&
        passwordWarning.textContent === '' &&
        repeatPasswordWarning.textContent === '' &&
        usernameWarning.textContent === ''
    ) {
        registerButton.disabled = false;
    } else {
        registerButton.disabled = true;
    }
}

usernameInput.addEventListener('input', () => {
    clearTimeout(usernameTimer);
    usernameTimer = setTimeout(validateUsername, 500);
    checkFormState();
});

emailInput.addEventListener('input', () => {
    clearTimeout(emailTimer);
    emailTimer = setTimeout(validateEmail, 500);
    checkFormState();
});

passwordInput.addEventListener('input', () => {
    clearTimeout(passwordTimer);
    passwordTimer = setTimeout(validatePassword, 500);
    checkFormState();
});

repeatPasswordInput.addEventListener('input', () => {
    clearTimeout(repeatPasswordTimer);
    repeatPasswordTimer = setTimeout(validateRepeatPassword, 500);
    checkFormState();
});

function validateUsername() {
    const usernameValue = usernameInput.value;
    // using an API to validate if the username isn't a dirty word
    const purgoMalumUrl = 'https://www.purgomalum.com/service/containsprofanity?text=' + encodeURIComponent(usernameValue);

    $.ajax({
        method: 'GET',
        url: purgoMalumUrl,
        success: function (result) {
            if (result === 'true') {
                usernameWarning.textContent = 'No nasty usernames';
            } else {
                usernameWarning.textContent = '';
            }
            checkFormState(); 
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}

function validateEmail() {
    const emailValue = emailInput.value;
    if (!emailValue.includes('@')) {
        emailWarning.textContent = 'Invalid email address';
    } else {
        emailWarning.textContent = '';
    }
    checkFormState();
}

function validatePassword() {
    const passwordValue = passwordInput.value;
    if (passwordValue.length < 8) {
        passwordWarning.textContent = 'Must be at least 8 characters';
    } else {
        passwordWarning.textContent = '';
    }
}

function validateRepeatPassword() {
    const passwordValue = passwordInput.value;
    const repeatPasswordValue = repeatPasswordInput.value;
    if (repeatPasswordValue !== passwordValue) {
        repeatPasswordWarning.textContent = 'Passwords doesnt match';
    } else {
        repeatPasswordWarning.textContent = '';
    }
    checkFormState();
}
