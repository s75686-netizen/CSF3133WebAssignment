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
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    // Validate on input blur
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectSelect.addEventListener('change', () => validateSubject());
    messageTextarea.addEventListener('blur', () => validateMessage());

    // Real-time validation while typing
    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 0) validateName();
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.length > 0) validateEmail();
    });

    messageTextarea.addEventListener('input', () => {
        if (messageTextarea.value.length > 0) validateMessage();
    });
}

/* validate name field */
function validateName() {
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('nameError');
    const formGroup = nameInput.closest('.form-group');

    if (nameValue === '') {
        setError(formGroup, nameError, 'Name is required');
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

/* validate subject selection */
function validateSubject() {
    const subjectSelect = document.getElementById('subject');
    const subjectValue = subjectSelect.value;
    const subjectError = document.getElementById('subjectError');
    const formGroup = subjectSelect.closest('.form-group');

    if (subjectValue === '') {
        setError(formGroup, subjectError, 'Please select a subject');
        return false;
    }

    setSuccess(formGroup, subjectError);
    return true;
}

/* validate message field */
function validateMessage() {
    const messageTextarea = document.getElementById('message');
    const messageValue = messageTextarea.value.trim();
    const messageError = document.getElementById('messageError');
    const formGroup = messageTextarea.closest('.form-group');

    if (messageValue === '') {
        setError(formGroup, messageError, 'Message is required');
        return false;
    }

    if (messageValue.length < 10) {
        setError(formGroup, messageError, 'Message must be at least 10 characters');
        return false;
    }

    if (messageValue.length > 500) {
        setError(formGroup, messageError, 'Message cannot exceed 500 characters');
        return false;
    }

    setSuccess(formGroup, messageError);
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
    const messageTextarea = document.getElementById('message');
    const charCountSpan = document.getElementById('charCount');

    messageTextarea.addEventListener('input', function() {
        const currentLength = this.value.length;
        const maxLength = 500;
        const remaining = maxLength - currentLength;

        charCountSpan.textContent = remaining;

        if (remaining < 50) {
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
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
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
                document.getElementById('charCount').textContent = '500';
            }, 100);
        }
    });
}
