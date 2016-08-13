
    $(document).ready(function(){
      $(window).scroll(function() { // check if scroll event happened
        if ($(document).scrollTop() > 10) { // check if user scrolled more than 50 from top of the browser window
          $(".navbar").css("background-color", "#3d3c3c"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
        } else {
          $(".navbar").css("background-color", "transparent"); // if not, change it back to transparent
        }
      });
    });
