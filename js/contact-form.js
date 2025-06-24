$(document).ready(function() {

    var subscribeButton = $("#subscribe-submit"),
        contactButton = $("#contact-submit");

    subscribeButton.click(function(e) {
        e.preventDefault();

        // Get input field values of the contact form
        var subscribeFormInputs = $('#subscribe-form :input'),
            subscribeChecking   = $('#subscribe-check-spam').val(),
            subscribeEmail      = $('#subscribe-email').val(),
            subscribeAlertMessage = $('#subscribe-alert-message');

        // Disable Inputs and display a loading message
        subscribeButton.html('<i class="fa fa-spinner fa-spin"></i>');
        subscribeFormInputs.prop("disabled", true);

        // Data to be sent to server
        var post_data = {
            'form': 'subscribeForm',
            'subscribeSpamChecking':subscribeChecking,
            'subscribeEmail':subscribeEmail
        };

        // Ajax post data to server
        $.post('./php/contact.php', post_data, function(response){


            // Load jsn data from server and output message
            if(response.type == 'error') {

                subscribeAlertMessage.html('<p><i class="fa fa-times-circle"></i> ' + response.text + '</p>');
                subscribeButton.html('<i class="fa fa-paper-plane first"></i><i class="fa fa-paper-plane second"></i>');
                subscribeFormInputs.prop("disabled", false);

            } else {

                subscribeAlertMessage.html('<p><i class="fa fa-check-circle-o"></i> ' + response.text + '</p>');
                subscribeButton.html('<i class="fa fa-paper-plane first"></i><i class="fa fa-paper-plane second"></i>');
                subscribeFormInputs.prop("disabled", false);
                $('#subscribe-email').val('');

            }

        }, 'json');

    });

    contactButton.click(function(e) {
        e.preventDefault();

        // Get input field values of the contact form
        var contactFormInputs = $('#contact-form :input'),
        contactChecking   = $('#contact-check-spam').val(),
        contactName       = $('#contact-name').val(),
        contactEmail      = $('#contact-email').val(),
        contactMessage    = $('#contact-message').val(),
        contactAlertMessage = $('#contact-alert-message');

        // Disable Inputs and display a loading message
        contactAlertMessage.html('<p><i class="fa fa-spinner fa-spin"></i> Sending Message..</p>');
        contactFormInputs.prop("disabled", true);

        // Data to be sent to server
        var post_data = {
            'form': 'contactForm',
            'contactSpamChecking':contactChecking,
            'contactName':contactName,
            'contactEmail':contactEmail,
            'contactMessage':contactMessage
        };

        // Ajax post data to server
        $.post('./php/contact.php', post_data, function(response){


            // Load jsn data from server and output message
            if(response.type == 'error') {

                contactAlertMessage.html('<p><i class="fa fa-times-circle"></i> ' + response.text + '</p>');
                contactFormInputs.prop("disabled", false);

            } else {

                contactAlertMessage.html('<p><i class="fa fa-check-circle-o"></i> ' + response.text + '</p>');

                // After, all the fields are reset and enabled
                contactFormInputs.prop("disabled", false);
                $('#contact-name').val('');
                $('#contact-email').val('');
                $('#contact-message').val('');

            }

        }, 'json');

    });

});