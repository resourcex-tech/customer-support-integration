
// Create the form element
const form = document.createElement('form');
form.className = 'rcs-form';
form.setAttribute('onSubmit', 'submitTicket()');

// Create the first form row
const formRow1 = createFormRow();
const nameCol = createFormCol();
const nameInputLabel = document.createElement('div');
nameInputLabel.className = 'rcs-inputLabel';
nameInputLabel.textContent = 'Your Name';
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.className = 'rcs-inputText';
nameInput.placeholder = 'John Doe';
nameInput.id = 'name';

nameCol.appendChild(nameInputLabel);
nameCol.appendChild(nameInput);
formRow1.appendChild(nameCol);

const emailCol = createFormCol();
const emailInputLabel = document.createElement('div');
emailInputLabel.className = 'rcs-inputLabel';
emailInputLabel.textContent = 'Your Email';
const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.className = 'rcs-inputText';
emailInput.placeholder = 'johndoe@example.com';
emailInput.id = 'email';

emailCol.appendChild(emailInputLabel);
emailCol.appendChild(emailInput);
formRow1.appendChild(emailCol);

form.appendChild(formRow1);

// Create the second form row
const formRow2 = createFormRow();
const modelCol = createFormCol();
const modelInputLabel = document.createElement('div');
modelInputLabel.className = 'rcs-inputLabel';
modelInputLabel.textContent = 'Model #';
const modelInput = document.createElement('input');
modelInput.type = 'text';
modelInput.className = 'rcs-inputText';
modelInput.placeholder = 'MRM-3242';
modelInput.id = 'model_id';

modelCol.appendChild(modelInputLabel);
modelCol.appendChild(modelInput);
formRow2.appendChild(modelCol);

const partCol = createFormCol();
const partInputLabel = document.createElement('div');
partInputLabel.className = 'rcs-inputLabel';
partInputLabel.textContent = 'Part #';
const partInput = document.createElement('input');
partInput.type = 'text';
partInput.className = 'rcs-InputText';
partInput.placeholder = 'optional';
partInput.id = 'part_id';

partCol.appendChild(partInputLabel);
partCol.appendChild(partInput);
formRow2.appendChild(partCol);

form.appendChild(formRow2);

// Create the third form row
const formRow3 = createFormRow();
const questionCol = createFormCol();
const questionInputLabel = document.createElement('div');
questionInputLabel.className = 'rcs-inputLabel';
questionInputLabel.textContent = 'Question';
const questionTextarea = document.createElement('textarea');
questionTextarea.id = 'question_text';

questionCol.appendChild(questionInputLabel);
questionCol.appendChild(questionTextarea);
formRow3.appendChild(questionCol);

form.appendChild(formRow3);

// Create the fourth form row
const formRow4 = createFormRow();
const submitCol = createFormCol();
submitCol.className += ' rcs-textRight';
const submitButton = document.createElement('button');
submitButton.type = 'submit';
submitButton.className = 'rcs-btn rcs-btnGreen';
submitButton.textContent = 'Submit';

submitCol.appendChild(submitButton);
formRow4.appendChild(submitCol);

form.appendChild(formRow4);

// Append the form to the target div
const targetDiv = document.getElementById('resourcex-customer-support-form');
targetDiv.appendChild(form);

// Function to create a form row
function createFormRow() {
    const formRow = document.createElement('div');
    formRow.className = 'rcs-formRow';
    return formRow;
}

// Function to create a form column
function createFormCol() {
    const formCol = document.createElement('div');
    formCol.className = 'rcs-formCol';
    return formCol;
}
