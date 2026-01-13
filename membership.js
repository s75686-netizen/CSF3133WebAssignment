document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeFormValidation();
    initializeCharacterCounter();
    setupFormSubmission();
});

/* dropdown menu functionality */
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdown && dropdownToggle) {
        // Toggle dropdown on click
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

/* form validation functionality */
function initializeFormValidation() {
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const programSelect = document.getElementById('program');
    const motivationTextarea = document.getElementById('motivation');

    // Validate on input blur
    fullNameInput.addEventListener('blur', () => validateFullName());
    emailInput.addEventListener('blur', () => validateEmail());
    phoneInput.addEventListener('blur', () => validatePhone());
    programSelect.addEventListener('change', () => validateProgram());
    motivationTextarea.addEventListener('blur', () => validateMotivation());

    // Real-time validation while typing
    fullNameInput.addEventListener('input', () => {
        if (fullNameInput.value.length > 0) validateFullName();
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.length > 0) validateEmail();
    });

    phoneInput.addEventListener('input', () => {
        if (phoneInput.value.length > 0) validatePhone();
    });

    motivationTextarea.addEventListener('input', () => {
        if (motivationTextarea.value.length > 0) validateMotivation();
    });
}

/* validate full name field */
function validateFullName() {
    const fullNameInput = document.getElementById('fullName');
    const nameValue = fullNameInput.value.trim();
    const nameError = document.getElementById('nameError');
    const formGroup = fullNameInput.closest('.form-group');

    if (nameValue === '') {
        setError(formGroup, nameError, 'Full name is required');
        return false;
    }

    if (nameValue.length < 3) {
        setError(formGroup, nameError, 'Name must be at least 3 characters');
        return false;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nameValue)) {
        setError(formGroup, nameError, 'Name can only contain letters and spaces');
        return false;
    }

    setSuccess(formGroup, nameError);
    return true;
}

/* validate email field */
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const formGroup = emailInput.closest('.form-group');

    if (emailValue === '') {
        setError(formGroup, emailError, 'Email is required');
        return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
        setError(formGroup, emailError, 'Please enter a valid email address');
        return false;
    }

    setSuccess(formGroup, emailError);
    return true;
}

/* validate phone field */
function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    const phoneError = document.getElementById('phoneError');
    const formGroup = phoneInput.closest('.form-group');

    if (phoneValue === '') {
        setError(formGroup, phoneError, 'Phone number is required');
        return false;
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneValue.replace(/[\s-]/g, ''))) {
        setError(formGroup, phoneError, 'Please enter a valid phone number');
        return false;
    }

    setSuccess(formGroup, phoneError);
    return true;
}

/* validate program selection */
function validateProgram() {
    const programSelect = document.getElementById('program');
    const programValue = programSelect.value;
    const programError = document.getElementById('programError');
    const formGroup = programSelect.closest('.form-group');

    if (programValue === '') {
        setError(formGroup, programError, 'Please select a program');
        return false;
    }

    setSuccess(formGroup, programError);
    return true;
}

/* validate motivation field */
function validateMotivation() {
    const motivationTextarea = document.getElementById('motivation');
    const motivationValue = motivationTextarea.value.trim();
    const motivationError = document.getElementById('motivationError');
    const formGroup = motivationTextarea.closest('.form-group');

    if (motivationValue === '') {
        setError(formGroup, motivationError, 'Motivation is required');
        return false;
    }

    if (motivationValue.length < 20) {
        setError(formGroup, motivationError, 'Please write at least 20 characters');
        return false;
    }

    if (motivationValue.length > 300) {
        setError(formGroup, motivationError, 'Motivation cannot exceed 300 characters');
        return false;
    }

    setSuccess(formGroup, motivationError);
    return true;
}

/* set error state for form field */
function setError(formGroup, errorElement, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/* set success state for form field */
function setSuccess(formGroup, errorElement) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

/* character counter functionality */
function initializeCharacterCounter() {
    const motivationTextarea = document.getElementById('motivation');
    const charCountSpan = document.getElementById('charCount');

    motivationTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 300;
        const remaining = maxLength - currentLength;

        charCountSpan.textContent = remaining;

        if (remaining < 30) {
            charCountSpan.style.color = '#e74c3c';
        } else if (remaining < 100) {
            charCountSpan.style.color = '#f39c12';
        } else {
            charCountSpan.style.color = '#7f8c8d';
        }
    });
}

/* form submission functionality */
function setupFormSubmission() {
    const form = document.getElementById('joinForm');
    const successMessage = document.getElementById('successMessage');
    const termsCheckbox = document.getElementById('terms');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isProgramValid = validateProgram();
        const isMotivationValid = validateMotivation();

        // Check terms agreement
        if (!termsCheckbox.checked) {
            alert('Please agree to the terms and conditions');
            return;
        }

        if (isNameValid && isEmailValid && isPhoneValid && isProgramValid && isMotivationValid) {
            // Hide form
            form.style.display = 'none';

            // Show success message
            successMessage.classList.add('show');

            // Reset form
            setTimeout(() => {
                form.reset();
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('success', 'error');
                });
                document.getElementById('charCount').textContent = '300';
            }, 100);
        }
    });
}
