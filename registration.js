
const programmeData = {
    'FSKA': [
        'Bachelor of Science (Aquaculture)',
        'Bachelor of Science (Marine Biology)',
        'Bachelor of Science (Fisheries Science)'
    ],
    'FSMP': [
        'Bachelor of Food Science',
        'Bachelor of Food Technology',
        'Bachelor of Agrotechnology'
    ],
    'FSME': [
        'Bachelor of Marine Science',
        'Bachelor of Environmental Science',
        'Bachelor of Marine Biotechnology'
    ],
    'FSKM': [
        'Bachelor of Computer Science (Software Engineering)',
        'Bachelor of Computer Science (Mobile Computing)',
        'Bachelor of Computer Science (Maritime Informatics)',
        'Bachelor of Science (Mathematics)',
        'Bachelor of Science (Statistics)'
    ],
    'FTKKO': [
        'Bachelor of Engineering (Naval Architecture)',
        'Bachelor of Engineering (Ocean Engineering)',
        'Bachelor of Engineering (Offshore Technology)'
    ],
    'FPM': [
        'Bachelor of Maritime Studies',
        'Bachelor of Maritime Management',
        'Bachelor of Maritime Technology'
    ],
    'FPEPS': [
        'Bachelor of Business Administration',
        'Bachelor of Economics',
        'Bachelor of Social Development'
    ]
};

/* Initialize all functionality when page loads */
document.addEventListener('DOMContentLoaded', function() {
    initializeDropdown();
    initializeFacultyProgramme();
    initializePaymentMethod();
    initializeFileUpload();
    initializeFormValidation();
});

/* Dropdown Menu Functionality */
function initializeDropdown() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    if (dropdown && dropdownToggle) {
        /* Toggle dropdown on click */
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        /* Close dropdown when clicking outside */
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
}

/* Faculty and Programme Dropdown */
function initializeFacultyProgramme() {
    const facultySelect = document.getElementById('faculty');
    const programmeSelect = document.getElementById('programme');

    if (facultySelect && programmeSelect) {
        /* Update programme options when faculty changes */
        facultySelect.addEventListener('change', function() {
            const selectedFaculty = this.value;
            programmeSelect.innerHTML = '<option value="">-- Select Programme --</option>';

            if (selectedFaculty && programmeData[selectedFaculty]) {
                programmeData[selectedFaculty].forEach(function(programme) {
                    const option = document.createElement('option');
                    option.value = programme;
                    option.textContent = programme;
                    programmeSelect.appendChild(option);
                });
            }
        });
    }
}

/* Payment Method Toggle */
function initializePaymentMethod() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const qrSection = document.getElementById('qrSection');

    paymentRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            /* Show QR section if QR payment selected */
            if (this.value === 'qr') {
                qrSection.style.display = 'block';
            } else {
                qrSection.style.display = 'none';
            }
        });
    });
}

/* File Upload Functionality */
function initializeFileUpload() {
    const fileInput = document.getElementById('receipt');
    const fileNameSpan = document.getElementById('fileName');

    if (fileInput && fileNameSpan) {
        /* Update file name when file selected */
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const fileName = this.files[0].name;
                const fileSize = (this.files[0].size / 1024 / 1024).toFixed(2);
                
                /* Check file size (max 5MB) */
                if (fileSize > 5) {
                    fileNameSpan.textContent = 'File too large (max 5MB)';
                    fileNameSpan.style.color = '#e74c3c';
                    this.value = '';
                } else {
                    fileNameSpan.textContent = fileName;
                    fileNameSpan.style.color = '#2ecc71';
                }
            } else {
                fileNameSpan.textContent = 'Choose file or drag here';
                fileNameSpan.style.color = '#2c3e50';
            }
        });
    }
}

/* Form Validation */
function initializeFormValidation() {
    const form = document.getElementById('eventForm');
    const namaInput = document.getElementById('nama');
    const matricInput = document.getElementById('matric');
    const eventNameInput = document.getElementById('eventName');

    /* Validate on blur */
    namaInput.addEventListener('blur', validateNama);
    matricInput.addEventListener('blur', validateMatric);
    eventNameInput.addEventListener('blur', validateEventName);

    /* Form submission */
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        /* Validate all fields */
        const isNamaValid = validateNama();
        const isMatricValid = validateMatric();
        const isTahunValid = validateTahun();
        const isFacultyValid = validateFaculty();
        const isProgrammeValid = validateProgramme();
        const isEventNameValid = validateEventName();
        const isPaymentMethodValid = validatePaymentMethod();

        /* Submit if all valid */
        if (isNamaValid && isMatricValid && isTahunValid && isFacultyValid && 
            isProgrammeValid && isEventNameValid && isPaymentMethodValid) {
            
            /* Hide form and show success message */
            form.style.display = 'none';
            document.getElementById('successMessage').classList.add('show');

            /* Reset form */
            setTimeout(function() {
                form.reset();
                document.querySelectorAll('.form-group').forEach(function(group) {
                    group.classList.remove('success', 'error');
                });
                document.getElementById('fileName').textContent = 'Choose file or drag here';
                document.getElementById('qrSection').style.display = 'none';
            }, 100);
        }
    });
}

/* Validate Name */
function validateNama() {
    const namaInput = document.getElementById('nama');
    const namaValue = namaInput.value.trim();
    const namaError = document.getElementById('namaError');
    const formGroup = namaInput.closest('.form-group');

    if (namaValue === '') {
        setError(formGroup, namaError, 'Full name is required');
        return false;
    }

    if (namaValue.length < 3) {
        setError(formGroup, namaError, 'Name must be at least 3 characters');
        return false;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(namaValue)) {
        setError(formGroup, namaError, 'Name can only contain letters and spaces');
        return false;
    }

    setSuccess(formGroup, namaError);
    return true;
}

/* Validate Matric Number */
function validateMatric() {
    const matricInput = document.getElementById('matric');
    const matricValue = matricInput.value.trim();
    const matricError = document.getElementById('matricError');
    const formGroup = matricInput.closest('.form-group');

    if (matricValue === '') {
        setError(formGroup, matricError, 'Matric number is required');
        return false;
    }

    if (matricValue.length < 5) {
        setError(formGroup, matricError, 'Please enter a valid matric number');
        return false;
    }

    setSuccess(formGroup, matricError);
    return true;
}

/* Validate Year of Study */
function validateTahun() {
    const tahunRadios = document.querySelectorAll('input[name="tahun"]');
    const tahunError = document.getElementById('tahunError');
    let isChecked = false;

    tahunRadios.forEach(function(radio) {
        if (radio.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        tahunError.textContent = 'Please select year of study';
        tahunError.style.display = 'block';
        return false;
    }

    tahunError.style.display = 'none';
    return true;
}

/* Validate Faculty */
function validateFaculty() {
    const facultySelect = document.getElementById('faculty');
    const facultyError = document.getElementById('facultyError');
    const formGroup = facultySelect.closest('.form-group');

    if (facultySelect.value === '') {
        setError(formGroup, facultyError, 'Please select a faculty');
        return false;
    }

    setSuccess(formGroup, facultyError);
    return true;
}

/* Validate Programme */
function validateProgramme() {
    const programmeSelect = document.getElementById('programme');
    const programmeError = document.getElementById('programmeError');
    const formGroup = programmeSelect.closest('.form-group');

    if (programmeSelect.value === '') {
        setError(formGroup, programmeError, 'Please select a programme');
        return false;
    }

    setSuccess(formGroup, programmeError);
    return true;
}

/* Validate Event Name */
function validateEventName() {
    const eventNameInput = document.getElementById('eventName');
    const eventNameValue = eventNameInput.value.trim();
    const eventNameError = document.getElementById('eventNameError');
    const formGroup = eventNameInput.closest('.form-group');

    if (eventNameValue === '') {
        setError(formGroup, eventNameError, 'Event name is required');
        return false;
    }

    setSuccess(formGroup, eventNameError);
    return true;
}

/* Validate Payment Method */
function validatePaymentMethod() {
    const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const paymentMethodError = document.getElementById('paymentMethodError');
    let isChecked = false;

    paymentRadios.forEach(function(radio) {
        if (radio.checked) {
            isChecked = true;
        }
    });

    if (!isChecked) {
        paymentMethodError.textContent = 'Please select a payment method';
        paymentMethodError.style.display = 'block';
        return false;
    }

    paymentMethodError.style.display = 'none';
    return true;
}

/* Set error state */
function setError(formGroup, errorElement, message) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

/* Set success state */
function setSuccess(formGroup, errorElement) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}
