function rcs__createFormElement(elementType, className, textContent, inputType, placeholder, id) {
    const element = document.createElement(elementType);
    element.className = className;
    element.textContent = textContent;
  
    if (elementType === 'input') {
      element.type = inputType;
      element.placeholder = placeholder;
      element.id = id;
    } else if (elementType === 'textarea') {
      element.id = id;
    } else if (elementType === 'button') {
      element.type = 'submit';
    }
    element.required = true;
  
    return element;
  }
  
  // Store classes and IDs in variables
  const rcs__formClass = 'rcs-form';
  const rcs__formRowClass = 'rcs-formRow';
  const rcs__formColClass = 'rcs-formCol';
  const rcs__inputLabelClass = 'rcs-inputLabel';
  const rcs__inputTextClass = 'rcs-inputText';
  const rcs__textRightClass = 'rcs-textRight';
  const rcs__btnClass = 'rcs-btn';
  const rcs__btnGreenClass = 'rcs-btnGreen';
  const rcs__formTargetDivId = 'resourcex-customer-support-form';
  
  // Create the form element
  const rcs__form = rcs__createFormElement('form', rcs__formClass, '');
  
  // Create the first form row
  const rcs__formRow1 = rcs__createFormElement('div', rcs__formRowClass, '');
  
  const rcs__nameCol = rcs__createFormElement('div', rcs__formColClass, '');
  const rcs__nameInputLabel = rcs__createFormElement('div', rcs__inputLabelClass, 'Your Name');
  const rcs__nameInput = rcs__createFormElement('input', rcs__inputTextClass, '', 'text', 'John Doe', 'name');
  
  rcs__nameCol.appendChild(rcs__nameInputLabel);
  rcs__nameCol.appendChild(rcs__nameInput);
  rcs__formRow1.appendChild(rcs__nameCol);
  
  const rcs__emailCol = rcs__createFormElement('div', rcs__formColClass, '');
  const rcs__emailInputLabel = rcs__createFormElement('div', rcs__inputLabelClass, 'Your Email');
  const rcs__emailInput = rcs__createFormElement('input', rcs__inputTextClass, '', 'email', 'johndoe@example.com', 'email');
  
  rcs__emailCol.appendChild(rcs__emailInputLabel);
  rcs__emailCol.appendChild(rcs__emailInput);
  rcs__formRow1.appendChild(rcs__emailCol);
  
  rcs__form.appendChild(rcs__formRow1);
  
  // Create the second form row
  const rcs__formRow2 = rcs__createFormElement('div', rcs__formRowClass, '');
  
  const rcs__modelCol = rcs__createFormElement('div', rcs__formColClass, '');
  const rcs__modelInputLabel = rcs__createFormElement('div', rcs__inputLabelClass, 'Model #');
  const rcs__modelInput = rcs__createFormElement('input', rcs__inputTextClass, '', 'text', 'MRM-3242', 'model_id');
  
  rcs__modelCol.appendChild(rcs__modelInputLabel);
  rcs__modelCol.appendChild(rcs__modelInput);
  rcs__formRow2.appendChild(rcs__modelCol);
  
  const rcs__partCol = rcs__createFormElement('div', rcs__formColClass, '');
  const rcs__partInputLabel = rcs__createFormElement('div', rcs__inputLabelClass, 'Part #');
  const rcs__partInput = rcs__createFormElement('input', rcs__inputTextClass, '', 'text', 'optional', 'part_id');
  
  rcs__partCol.appendChild(rcs__partInputLabel);
  rcs__partCol.appendChild(rcs__partInput);
  rcs__formRow2.appendChild(rcs__partCol);
  
  rcs__form.appendChild(rcs__formRow2);
  
  // Create the third form row
  const rcs__formRow3 = rcs__createFormElement('div', rcs__formRowClass, '');
  
  const rcs__questionCol = rcs__createFormElement('div', rcs__formColClass, '');
  const rcs__questionInputLabel = rcs__createFormElement('div', rcs__inputLabelClass, 'Question');
  const rcs__questionTextarea = rcs__createFormElement('textarea', '', '', '', '', 'question_text');
  
  rcs__questionCol.appendChild(rcs__questionInputLabel);
  rcs__questionCol.appendChild(rcs__questionTextarea);
  rcs__formRow3.appendChild(rcs__questionCol);
  
  rcs__form.appendChild(rcs__formRow3);
  
  // Create the fourth form row
  const rcs__formRow4 = rcs__createFormElement('div', rcs__formRowClass, '');
  
  const rcs__submitCol = rcs__createFormElement('div', `${rcs__formColClass} ${rcs__textRightClass}`, '');
  const rcs__submitButton = rcs__createFormElement('button', `${rcs__btnClass} ${rcs__btnGreenClass}`, 'Submit');
  
  rcs__submitCol.appendChild(rcs__submitButton);
  rcs__formRow4.appendChild(rcs__submitCol);
  
  rcs__form.appendChild(rcs__formRow4);
  
  // Append the form to the target div
  const rcs__targetDiv = document.getElementById(rcs__formTargetDivId);
  rcs__targetDiv.appendChild(rcs__form);
  
  rcs__form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rcs__formData = {
      name: rcs__getValue('name'),
      email: rcs__getValue('email'),
      model_id: rcs__getValue('model_id'),
      part_id: rcs__getValue('part_id'),
      question_text: rcs__getValue('question_text'),
      site_product_id: rcs__targetDiv.dataset.productId,
    };

    fetch('https://customer-support-public-api.resourcex.co/api/v1/public_ticket/create', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(rcs__formData)
    })
   .then(response => response.json())
   .then(response => console.log(JSON.stringify(response)))
  
  });
  
  function rcs__getValue(elementId) {
    const element = document.getElementById(elementId);
    return element.value;
  }
  

  function rcs_renderTicketsAndComments() {
    // Fetch tickets and comments from the API
    fetch(`https://customer-support-public-api.resourcex.co/api/v1/public_ticket?site_product_id=${rcs__targetDiv.dataset.productId}`)
        .then(response => response.json())
        .then(tickets => {

            const ticketsDiv = document.getElementById('resourcex-customer-support-tickets');

            // Render tickets
            tickets.forEach(ticket => {
                const ticketDiv = document.createElement('div');
                ticketDiv.className = 'rcs-ticket';
                ticketDiv.innerText = `Ticket #${ticket.id}: ${ticket.question_text}`;
                ticketsDiv.appendChild(ticketDiv);

                // // Render comments for each ticket
                // const ticketComments = comments.filter(comment => comment.ticketId === ticket.id);
                ticket.comments.forEach(comment => {
                    
                  const commentDiv = document.createElement('div');
                  commentDiv.className = comment.user_type === 'agent' ? 'rcs-comment rcs-comment-agent' : 'rcs-comment';
                  
                  const commentHeaderDiv = document.createElement('div');
                  commentHeaderDiv.className = 'rcs-comment-header';
                  
                  const commentDateSpan = document.createElement('span');
                  commentDateSpan.className = 'rcs-comment-date';
                  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

                  commentDateSpan.innerText = new Date(comment.timestamp.replace(' ', 'T')).toLocaleDateString('en-US', options);
                  commentHeaderDiv.appendChild(commentDateSpan);
                  
                  const commentBodyDiv = document.createElement('div');
                  commentBodyDiv.className = 'rcs-comment-body';
                  commentBodyDiv.innerText = comment.comment_text;
                  
                  commentDiv.appendChild(commentHeaderDiv);
                  commentDiv.appendChild(commentBodyDiv);
                  
                  ticketDiv.appendChild(commentDiv);

                    
                });
            });
        })
        .catch(error => console.log(error));
}

rcs_renderTicketsAndComments();