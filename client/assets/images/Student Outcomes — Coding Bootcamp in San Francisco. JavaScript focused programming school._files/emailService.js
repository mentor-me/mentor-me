(function ($, window, analytics) {
  /**
   * EmailService constructor allows to subscribe and send data to Segment's API.
   *
   * @constructor
   * @property {Number} _timeOutId - reference for last `setTimeout` success/error message
   */
  var EmailService = function () {
    this.USER_SIGNUP_URL = 'https://hackreactor.us4.list-manage.com/subscribe/post-json?u=a91dacf714070da22c378e79a&id=3eb95f6109&c=?';
    this._timeOutId = null;
  };

  /**
   * The `send` method is responsible for getting raw data, organizing it and
   * delegating the validation and subscription actions.
   *
   * @param {String} formWrapper - css selector for the form container element
   * @param {Object} params - analytics/email data
   */
  EmailService.prototype.send = function (formWarapper, params) {
    var $form = $(formWarapper);
    // store reference to the section for displaying response messages on the screen
    var responseContainer = $form.find('.contact-form__response');
    // store reference to the form itself
    var formBody = $form.find('.contact-form__body');
    // store the raw data (email) that was given by the user
    var email = $form.find('.contact-form__input').val();
    // validate message
    this._validateMessage({
      responseContainer: responseContainer,
      formBody: formBody,
      email: email
    }, params);
  };

  /**
   * The `_validateMessage` method is responsible for checking if it's a valid message
   * and finally delegating the subscription action or delegating the action to display
   * an error message to the user.
   *
   * @param {Object} message - form data
   * @param {Object} params - analytics/email data
   */
  EmailService.prototype._validateMessage = function (message, params) {
    // Check to see if it's a valid email format
    if ($.trim(message.email) && /\S+@\S+\.\S+/.test(message.email)) {
      // Submit data via Segment
      this._subscribeUser(message, params);
    } else {
      // Display invalid message
      this._displayMessage(message, false);
    }
  };

  /**
   * The `_subscribeUser` method is responsible for sending user data to MailChimp API,
   * identifying and tracking the user.
   *
   * @param {Object} message - form data
   * @param {Object} params - analytics/email data
   */
  EmailService.prototype._subscribeUser = function (message, params) {
    var self = this;
    // create new user id
    var userId = window.tracker.uuid();
    // create traits object with user information
    var traits = {
      email: message.email
    };

    if (window.heap && window.heap.userid) {
      // add heap id to user traits
      traits.heapId = window.heap.userid;
    }

    // reference: https://segment.com/docs/spec/identify/
    // analytics.identify(userId, traits);
    // sending the userId screws things up by sending it through to mailchimp. unfortuinately this means I'm also not senidng it to customer.io --for now.
    analytics.identify(traits);

    // Send user data to MailChimp
    var response = $.ajax({
      method: 'get',
      url: self.USER_SIGNUP_URL,
      dataType: 'json',
      cache: false,
      data: message.formBody.serialize(),
      contentType: 'application/json; charset=utf-8'
    });



    response.done(function (data) {
      if (data.result === 'success') {
        // display success mesage
        self._displayMessage(message, true);
        // register a new `email-signup` event
        // window.tracker.send(params);
      } else {
        // display error message
        self._displayMessage(message, false, data.msg);
      }
    });

    response.fail(function (data, error) {
      // display error message
      self._displayMessage(message, false, error.msg);
    });
  };

  /**
   * The `_displayMessage` method is responsible for printing the success/error message
   * after the user submits their email information.
   *
   * @param {Object} message - form data
   * @param {Boolean} success - informs if it's a success message
   * @param {String} errorMessage (optional) - custom error message to be displayed on the screen
   */
  EmailService.prototype._displayMessage = function (message, success, errorMessage) {
    var messageText;
    var timeOut;

    // Check to see if there is already a message on the screen
    if (typeof this._timeOutId === 'number') {
      // clear the current timeout
      this._cancelTimeout();
    }

    if (success) {
      timeOut = 15000;
      messageText = 'Thank you! You\'ll receive a confirmation email shortly.';
      // remove error class if it's present
      if (message.responseContainer.hasClass('error contact-form__response--error')) {
        message.responseContainer.removeClass('error contact-form__response--error');
      }
    } else {
      timeOut = 25000;
      messageText = errorMessage || 'Please enter a valid email address.';
      message.responseContainer.addClass('error contact-form__response--error');
    }

    // Update the text on the screen
    message.responseContainer.html(messageText);

    // Clear the input value
    message.formBody.find('input').val('');
    // display the response container with current message
    message.responseContainer.fadeIn();

    // Hide the success/invalid message after timeOut
    this._timeOutId = setTimeout(function () {
      message.responseContainer.fadeOut(function () {
        message.formBody.fadeIn();
      });
    }, timeOut);
  };

  /**
   * The `_cancelTimout` method is responsible for clearing the timeout with
   * reference stored on the object.
   */
  EmailService.prototype._cancelTimeout = function () {
    window.clearTimeout(this._timeOutId);
    this._timeOutId = null;
  };

  // Expose constructor
  window.EmailService = EmailService;
}(jQuery, window, analytics));
