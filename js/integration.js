function rcs__createFormElement(elementType, className, textContent, inputType, placeholder, name) {
    const element = document.createElement(elementType);
    element.className = className;
    element.textContent = textContent;
  
    if (elementType === 'input') {
      element.type = inputType;
      element.placeholder = placeholder;
      element.name = name;
    } else if (elementType === 'textarea') {
      element.name = name;
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
  const rcs__commentFormClass = 'rcs-comment-form';
  
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

  const rcs__noticeClass = "rcs-notice";
  const rcs__notice = document.createElement('div');
  rcs__notice.className = rcs__noticeClass;
  rcs__notice.innerText = "Your question has been received and will be answered by agent within 24 hours."

  rcs__targetDiv.prepend(rcs__notice)
  
  rcs__form.addEventListener('submit', (e) => {
    e.preventDefault();
    rcs__notice.className = rcs__noticeClass;
    const rcs__formData = {
      name: rcs__getValue('name'),
      email: rcs__getValue('email'),
      model_id: rcs__getValue('model_id'),
      part_id: rcs__getValue('part_id'),
      question_text: rcs__getValue('question_text'),
      site_product_id: rcs__targetDiv.dataset.productId,
    };
    
    document.getElementsByClassName(rcs__btnClass)[0].disabled = true
    

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
        // Add any additional headers if required
      },
      body: JSON.stringify(rcs__formData),
    };
    
    fetch('https://customer-support-public-api.resourcex.co/api/v1/public_ticket/create', requestOptions)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        rcs__notice.className = rcs__noticeClass + ' success';
        document.getElementsByClassName('rcs-btn')[0].disabled = false
      })
      .catch(error => {
        // Handle any errors
        rcs__notice.className = rcs__noticeClass + ' error';
        rcs__notice.innerText = 'Failed to submit question, please try again...'
        document.getElementsByClassName('rcs-btn')[0].disabled = false
      });
  
  });
  
  function rcs__getValue(elementId) {
    const element = document.querySelector(`[name="${elementId}"]`);
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

                let comment_form = rcs__createFormElement('form', rcs__formClass);
                comment_form.method = 'POST';
                comment_form.action = 'https://customer-support-public-api.resourcex.co/api/v1/public_ticket/comment';
                let comment_form_row = rcs__createFormElement('div', rcs__formRowClass);
                let comment_form_col = rcs__createFormElement('div', rcs__formColClass);
                let comment_form_col1 = rcs__createFormElement('div', rcs__formColClass);

                let comment_form_row1 = rcs__createFormElement('div', rcs__formRowClass);
                let comment_form_col2 = rcs__createFormElement('div', rcs__formColClass);

                let comment_form_row2 = rcs__createFormElement('div', rcs__formRowClass);
                let comment_form_col3 = rcs__createFormElement('div', rcs__formColClass);

                let ticket_id = rcs__createFormElement('input', rcs__inputTextClass, '', 'hidden', '', 'question_id');
                ticket_id.value = ticket.id;

                let redirect = rcs__createFormElement('input', rcs__inputTextClass, '', 'hidden', '', 'redirect');
                redirect.value = window.location.href;

                let name = rcs__createFormElement('input', rcs__inputTextClass, '', 'text', 'John Doe', 'name');
                let email = rcs__createFormElement('input', rcs__inputTextClass, '', 'email', 'john@example.com', 'email');

                let comment_text = rcs__createFormElement('textarea', '', '', '', '', 'comment_text');
                comment_text.placeholder = "Add a comment...";
                comment_text.required = true;

                let comment_button = rcs__createFormElement('button', `${rcs__btnClass} ${rcs__btnGreenClass}`, 'Submit');
                comment_button.type = 'submit';

                comment_form_col.appendChild(name);
                comment_form_col1.appendChild(email);
                comment_form_row.appendChild(comment_form_col);
                comment_form_row.appendChild(comment_form_col1);

                comment_form_col2.appendChild(comment_text);
                comment_form_row1.appendChild(comment_form_col2);

                comment_form_col3.appendChild(comment_button);
                comment_form_col3.appendChild(ticket_id);
                comment_form_col3.appendChild(redirect);
                comment_form_row2.appendChild(comment_form_col3);
                
                comment_form.appendChild(comment_form_row);
                comment_form.appendChild(comment_form_row1);
                comment_form.appendChild(comment_form_row2);


                
                ticketDiv.appendChild(comment_form)
            });
            
        })
        .catch(error => console.log(error));
}


rcs_renderTicketsAndComments();