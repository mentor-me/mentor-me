(function ($, window, analytics) {
  /**
   * AnalyticsHandler constructor allows to manage analytics events and send data to
   * Segment's API.
   */
  var AnalyticsHandler = function () {};

  /**
   * Create analytics data object
   * This function is responsible for receiving a list of analytics values and
   * organizing them to easy access later.
   *
   * @param {String} category - the object that was interacted with e.g 'apply' or 'email-signup'
   * @param {Array} data - contains individual arrays with `identifier`, `action` and `label` for each event
   * @returns {Object} - maps the `identifier` with its respective `action`, `category`, `label` and `email` for each event

   * @example
   *  var tracker = new AnalyticsHandler();
   *  var example = tracker.createAnalyticsObj('apply', [
   *    ['header', 'apply-header-navigation', 'Apply Now (Header - navigation)']
   *  ]);
   *
   *  console.log(example);
   *  > {
   *      header: {
   *        analytics: { action: 'apply-header-navigation', category: 'apply', label: 'Apply Now (Header - navigation)' },
   *        email: undefined
   *      }
   *    }
   */
  AnalyticsHandler.prototype.createAnalyticsObj = function (category, data) {
    // Initial placeholder object
    var finalData = {};
    // Set email to true if it's a email-signup form
    if (category === 'email-signup') {
      var email = true;
    }
    // Loop over all entries on `data` and store information to be returned
    for (var i = 0; i < data.length; i++) {
      finalData[data[i][0]] = {
        analytics: { category: category, action: data[i][1], label: data[i][2] },
        email: email
      };
    }
    return finalData;
  };

  /**
   * Watch for events
   * This function is responsible for receiving a list of events
   * to be tracked and bind event listeners for each one.
   *
   * @param {Array} events - contains individual arrays with `event`, `css-selector` and `params`
   */
  AnalyticsHandler.prototype.watch = function (events) {
    var event, element, params;
    // Iterate over all items (events to be tracked)
    for (var i = 0; i < events.length; i++) {
      // store the event type
      event = events[i][0];
      // store the css selector that identifies the element responsible for triggering the event
      element = events[i][1];
      // store the params object with analytics/email
      params = events[i][2];
      // Delegate event bind
      this._bindEvent(event, element, params);
    }
  };

  /**
   * Bind events
   * This function is responsible for binding events and ultimately delegating the
   * analytics tracking event or initializing the emailService send process.
   *
   * @param {String} event - type of event
   * @param {String} element - css selector for the corresponding element
   * @param {Object} params - analytics/email data
   */
  AnalyticsHandler.prototype._bindEvent = function (event, element, params) {
    var self = this;
    var $element = $(element);

    // check to see if it's an email event
    if (params.email) {
      var emailService = new EmailService();
      // updates the element to match the submit button instead of the form container
      $element = $element.find('.contact-form__submit');
    }

    // Set an event listener on element
    $element.on(event, function (e) {
      if (params.email) {
        e.preventDefault();
        // invoke `send` method from `emailService` passing the `params`
        return emailService.send(element, params);
      }
      // record an event passing `params`
      self.send(params);
    });
  };

  /**
   * Send analytics data to Segment
   * This function is a wrapper to send information to Segment.
   *
   * @param {Object} params - analytics/email data
   */
  AnalyticsHandler.prototype.send = function (params) {
    // reference: https://segment.com/docs/spec/track/
    setTimeout(function () {
      analytics.track(params.analytics.category, {
        category: params.analytics.category,
        action: params.analytics.action,
        label: params.analytics.label
      });
    }, 300);
  };

  /**
   * Taken straight from jed's gist: https://gist.github.com/982883
   *
   * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
   * where each x is replaced with a random hexadecimal digit from 0 to f, and
   * y is replaced with a random hexadecimal digit from 8 to b.
   */
   AnalyticsHandler.prototype.uuid = function (a) {
     return a           // if the placeholder was passed, return
       ? (              // a random number from 0 to 15
         a ^            // unless b is 8,
         Math.random()  // in which case
         * 16           // a random number from
         >> a/4         // 8 to 11
         ).toString(16) // in hexadecimal
       : (              // or otherwise a concatenated string:
         [1e7] +        // 10000000 +
         -1e3 +         // -1000 +
         -4e3 +         // -4000 +
         -8e3 +         // -80000000 +
         -1e11          // -100000000000,
         ).replace(     // replacing
           /[018]/g,    // zeroes, ones, and eights with
           this.uuid    // random hex digits
         );
   };

  // Expose object
  window.tracker = new AnalyticsHandler();
}(jQuery, window, analytics));
