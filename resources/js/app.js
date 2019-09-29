require('./bootstrap');

$(document).ready(function() {

    function addMessage(message) {
        let element = `<div class='message-row-wrapper'><div class='info-row'><div class='info'><span class='message-name'>${message.name}</span><span class='create-at'>${message.created_at}</span></div><div class='buttons'><button class='btn btn-warning message-edit' data-id='${message.id}'>Edit</button><button class='btn btn-danger message-delete' data-id='${message.id}'>Delete</button></div></div><div class='message-row'><textarea rows="5" class='form-control message' readonly>${message.message}</textarea></div></div>`
        $('.messages-container').prepend(element);
    }

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

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('input[name="_token"]').val()
            }
        });

        $.ajax({
            type: "POST",
            url: '/api/messages',
            data: {
                message: message,
                name: name,
            },
            success: function(message) {
                $('.new-message').val('');
                $('.name').val('');
                addMessage(message);
            }
        });
    });


    $.ajax({
        type: "GET",
        url: '/api/messages',
        success: function(messages) {
            for (var i = 0; i < messages.length; i++) {
                addMessage(messages[i]);
            }
        }
    });

    $('.messages-table').on('click', function(e) {
        e.preventDefault();
        let $el = $(e.target);
        let id = $el.data('id');
        let $row = $el.parents('.message-row-wrapper');

        if ($el.hasClass('message-delete')) {
            $row.remove();
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('input[name="_token"]').val()
                }
            });

            $.ajax({
                type: "DELETE",
                url: `/api/messages/${id}`,
            });
        } else if ($el.hasClass('message-edit')) {
            $el.toggleClass('message-edit btn-warning btn-success message-update').text('Update');
            $row.find('.message').prop('readonly', false);
        } else if ($el.hasClass('message-update')) {
            let $message = $row.find('.message');
            $el.toggleClass('message-edit btn-warning btn-success message-update').text('Edit');
            $message.prop('readonly', true);

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('input[name="_token"]').val()
                }
            });

            $.ajax({
                type: "PUT",
                url: `/api/messages/${id}`,
                data: { message: $message.val() },
            });
        }
    });
});
