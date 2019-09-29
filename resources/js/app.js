require('./bootstrap');

$(document).ready(function() {

    // Add messages old and new to the document
    const addMessage = (message) => {
        let element = `
            <div class='message-row-wrapper'>
                <div class='info-row'>
                    <div class='info'>
                        <span class='message-name'>${message.name}</span>
                        <span class='create-at'>${message.created_at}</span>
                    </div>
                    <div class='buttons'>
                        <button class='btn btn-warning message-edit' data-id='${message.id}'>Edit</button>
                        <button class='btn btn-danger message-delete' data-id='${message.id}'>Delete</button>
                    </div>
                </div>
                <div class='message-row'>
                    <textarea rows="5" class='form-control message' readonly>${message.message}</textarea>
                </div>
            </div>
        `;

        $('.messages-container').prepend(element);
    };

    // Function to load the messages stored in the database
    const loadMessages = () => {
        $.ajax({
            type: "GET",
            url: '/api/messages',
            success: (messages) => {
                for (var i = 0; i < messages.length; i++) {
                    addMessage(messages[i]);
                }
            }
        });
    };

    loadMessages();

    const messageAction = (type, url, data = {}, success = null) => {
        let token = $('input[name="_token"]').val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': token
            }
        });

        $.ajax({
            type: type,
            url: url,
            data: data,
            success: success
        });
    }

    // New message submission
    $('.submit-btn').on('click', function(e) {
        e.preventDefault();
        let $el = $(e.target);
        let $form = $el.parents('.message-form');
        let message = $form.find('.new-message').val();
        let name = $form.find('.name').val();

        if (!message || !name) {
            alert('Please include your name and a message');
            return;
        }

        let data = {
            message: message,
            name: name,
        };

        let success = (message) => {
            $('.new-message').val('');
            $('.name').val('');
            addMessage(message);
        };

        messageAction('POST', '/api/messages', data, success);
    });

    // Handle the update and delete functionality
    $('.message-form').on('click', function(e) {
        e.preventDefault();
        let $el = $(e.target);
        let id = $el.data('id');
        let $row = $el.parents('.message-row-wrapper');

        if ($el.hasClass('message-delete')) {
            $row.remove();
            messageAction('DELETE', `/api/messages/${id}`);
        } else if ($el.hasClass('message-edit')) {
            $el.toggleClass('message-edit btn-warning btn-success message-update').text('Update');
            $row.find('.message').prop('readonly', false);
        } else if ($el.hasClass('message-update')) {
            let $message = $row.find('.message');
            $el.toggleClass('message-edit btn-warning btn-success message-update').text('Edit');
            $message.prop('readonly', true);

            let data = {
                message: $message.val(),
            };

            messageAction('PUT', `/api/messages/${id}`, data);
        }
    });
});
