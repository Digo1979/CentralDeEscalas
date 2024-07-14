/*
Template: Webkit - Responsive Bootstrap 4 Admin Dashboard Template
Author: iqonic.design
Design and Developed by: iqonic.design
NOTE: This file contains the styling for responsive Template.
*/

/*----------------------------------------------
Index Of Script
------------------------------------------------

:: Tooltip
:: Fixed Nav
:: Magnific Popup
:: Ripple Effect
:: Sidebar Widget
:: FullScreen
:: Page Loader
:: Counter
:: Progress Bar
:: Page Menu
:: Close  navbar Toggle
:: Mailbox
:: chatuser
:: chatuser main
:: Chat start
:: todo Page
:: user toggle
:: Data tables
:: Form Validation
:: Active Class for Pricing Table
:: Flatpicker
:: Scrollbar
:: checkout
:: Datatables
:: image-upload
:: video
:: Button
:: Pricing tab

------------------------------------------------
Index Of Script
----------------------------------------------*/
window.myGlobalFunction = function () {
  "use strict";

  /*---------------------------------------------------------------------
  Tooltip
  -----------------------------------------------------------------------*/
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  /*---------------------------------------------------------------------
  Fixed Nav
  -----------------------------------------------------------------------*/
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $(".iq-top-navbar").addClass("fixed");
    } else {
      $(".iq-top-navbar").removeClass("fixed");
    }
  });

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 0) {
      $(".white-bg-menu").addClass("sticky-menu");
    } else {
      $(".white-bg-menu").removeClass("sticky-menu");
    }
  });

  /*---------------------------------------------------------------------
  Magnific Popup
  -----------------------------------------------------------------------*/
  if (typeof $.fn.magnificPopup !== typeof undefined) {
    $(".popup-gallery").magnificPopup({
      delegate: "a.popup-img",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item) {
          return item.el.attr("title") + "<small>by Marsel Van Oosten</small>";
        },
      },
    });
    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });
  }

  /*---------------------------------------------------------------------
  Ripple Effect
  -----------------------------------------------------------------------*/
  $(document).on("click", ".iq-waves-effect", function (e) {
    // Remove any old one
    $(".ripple").remove();
    // Setup
    let posX = $(this).offset().left,
      posY = $(this).offset().top,
      buttonWidth = $(this).width(),
      buttonHeight = $(this).height();

    // Add the element
    $(this).prepend("<span class='ripple'></span>");

    // Make it round!
    if (buttonWidth >= buttonHeight) {
      buttonHeight = buttonWidth;
    } else {
      buttonWidth = buttonHeight;
    }

    // Get the center of the element
    let x = e.pageX - posX - buttonWidth / 2;
    let y = e.pageY - posY - buttonHeight / 2;

    // Add the ripples CSS and start the animation
    $(".ripple")
      .css({
        width: buttonWidth,
        height: buttonHeight,
        top: y + "px",
        left: x + "px",
      })
      .addClass("rippleEffect");
  });

  /*---------------------------------------------------------------------
  Sidebar Widget
  -----------------------------------------------------------------------*/
  $(document).on("click", ".iq-menu > li > a", function () {
    $(".iq-menu > li > a").parent().removeClass("active");
    $(this).parent().addClass("active");
  });

  // Active menu
  var parents = $("li.active").parents(".iq-submenu.collapse");

  parents.addClass("show");

  parents.parents("li").addClass("active");
  $('li.active > a[aria-expanded="false"]').attr("aria-expanded", "true");

  /*---------------------------------------------------------------------
  FullScreen
  -----------------------------------------------------------------------*/
  $(document).on("click", ".iq-full-screen", function () {
    let elem = $(this);
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement && // Mozilla
      !document.webkitFullscreenElement && // Webkit-Browser
      !document.msFullscreenElement
    ) {
      // MS IE ab version 11

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    elem
      .find("i")
      .toggleClass("ri-fullscreen-line")
      .toggleClass("ri-fullscreen-exit-line");
  });

  /*---------------------------------------------------------------------
  Page Loader
  -----------------------------------------------------------------------*/
  $("#load").fadeOut();
  $("#loading").delay().fadeOut("");

  /*---------------------------------------------------------------------
  Counter
  -----------------------------------------------------------------------*/
  if (window.counterUp !== undefined) {
    const counterUp = window.counterUp["default"];
    const $counters = $(".counter");
    $counters.each(function (ignore, counter) {
      var waypoint = new Waypoint({
        element: $(this),
        handler: function () {
          counterUp(counter, {
            duration: 1000,
            delay: 10,
          });
          this.destroy();
        },
        offset: "bottom-in-view",
      });
    });
  }

  /*---------------------------------------------------------------------
  Progress Bar
  -----------------------------------------------------------------------*/
  $(".iq-progress-bar > span").each(function () {
    let progressBar = $(this);
    let width = $(this).data("percent");
    progressBar.css({
      transition: "width 2s",
    });

    setTimeout(function () {
      progressBar.appear(function () {
        progressBar.css("width", width + "%");
      });
    }, 100);
  });

  $(".progress-bar-vertical > span").each(function () {
    let progressBar = $(this);
    let height = $(this).data("percent");
    progressBar.css({
      transition: "height 2s",
    });
    setTimeout(function () {
      progressBar.appear(function () {
        progressBar.css("height", height + "%");
      });
    }, 100);
  });

  /*---------------------------------------------------------------------
  Page Menu
  -----------------------------------------------------------------------*/
  $(document).on("click", ".wrapper-menu", function () {
    $(this).toggleClass("open");
  });

  $(document).on("click", ".wrapper-menu", function () {
    $("body").toggleClass("sidebar-main");
  });

  /*---------------------------------------------------------------------
  Close  navbar Toggle
  -----------------------------------------------------------------------*/
  $(".close-toggle").on("click", function () {
    $(".h-collapse.navbar-collapse").collapse("hide");
  });

  /*---------------------------------------------------------------------
  Mailbox
  -----------------------------------------------------------------------*/
  $(document).on("click", "ul.iq-email-sender-list li", function () {
    $(this).next().addClass("show");
    // $('.mail-box-detail').css('filter','blur(4px)');
  });

  $(document).on("click", ".email-app-details li h4", function () {
    $(".email-app-details").removeClass("show");
  });

  /*---------------------------------------------------------------------
  chatuser
  -----------------------------------------------------------------------*/
  $(document).on("click", ".chat-head .chat-user-profile", function () {
    $(this).parent().next().toggleClass("show");
  });
  $(document).on("click", ".user-profile .close-popup", function () {
    $(this).parent().parent().removeClass("show");
  });

  /*---------------------------------------------------------------------
  chatuser main
  -----------------------------------------------------------------------*/
  $(document).on("click", ".chat-search .chat-profile", function () {
    $(this).parent().next().toggleClass("show");
  });
  $(document).on("click", ".user-profile .close-popup", function () {
    $(this).parent().parent().removeClass("show");
  });

  /*---------------------------------------------------------------------
  Chat start
  -----------------------------------------------------------------------*/
  $(document).on("click", "#chat-start", function () {
    $(".chat-data-left").toggleClass("show");
  });
  $(document).on("click", ".close-btn-res", function () {
    $(".chat-data-left").removeClass("show");
  });
  $(document).on("click", ".iq-chat-ui li", function () {
    $(".chat-data-left").removeClass("show");
  });
  $(document).on("click", ".sidebar-toggle", function () {
    $(".chat-data-left").addClass("show");
  });

  /*---------------------------------------------------------------------
  todo Page
  -----------------------------------------------------------------------*/
  $(document).on("click", ".todo-task-list > li > a", function () {
    $(".todo-task-list li").removeClass("active");
    $(".todo-task-list .sub-task").removeClass("show");
    $(this).parent().toggleClass("active");
    $(this).next().toggleClass("show");
  });
  $(document).on("click", ".todo-task-list > li li > a", function () {
    $(".todo-task-list li li").removeClass("active");
    $(this).parent().toggleClass("active");
  });

  /*---------------------------------------------------------------------
  user toggle
  -----------------------------------------------------------------------*/
  $(document).on("click", ".iq-user-toggle", function () {
    $(this).parent().addClass("show-data");
  });

  $(document).on("click", ".close-data", function () {
    $(".iq-user-toggle").parent().removeClass("show-data");
  });
  $(document).on("click", function (event) {
    var $trigger = $(".iq-user-toggle");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
      $(".iq-user-toggle").parent().removeClass("show-data");
    }
  });
  /*-------hide profile when scrolling--------*/
  $(window).scroll(function () {
    let scroll = $(window).scrollTop();
    if (scroll >= 10 && $(".iq-user-toggle").parent().hasClass("show-data")) {
      $(".iq-user-toggle").parent().removeClass("show-data");
    }
  });
  let Scrollbar = window.Scrollbar;
  if ($(".data-scrollbar").length) {
    Scrollbar.init(document.querySelector(".data-scrollbar"), {
      continuousScrolling: false,
    });
  }

  /*---------------------------------------------------------------------
  Data tables
  -----------------------------------------------------------------------*/
  if ($.fn.DataTable) {
    $(".data-table").DataTable();
  }

  /*---------------------------------------------------------------------
  Form Validation
  -----------------------------------------------------------------------*/
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  window.addEventListener(
    "load",
    function () {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );

  /*---------------------------------------------------------------------
  Active Class for Pricing Table
  -----------------------------------------------------------------------*/
  $("#my-table tr th").click(function () {
    $("#my-table tr th").children().removeClass("active");
    $(this).children().addClass("active");
    $("#my-table td").each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }
    });
    var col = $(this).index();
    $("#my-table tr td:nth-child(" + parseInt(col + 1) + ")").addClass(
      "active"
    );
  });

  /*------------------------------------------------------------------
  Select 2 Selectpicker
  * -----------------------------------------------------------------*/
  if ($.fn.select2 !== undefined) {
    $("#single").select2({
      placeholder: "Select a Option",
      allowClear: true,
    });
    $("#multiple").select2({
      placeholder: "Select a Multiple Option",
      allowClear: true,
    });
    $("#multiple2").select2({
      placeholder: "Select a Multiple Option",
      allowClear: true,
    });
  }

  /*------------------------------------------------------------------
  Flatpicker
  * -----------------------------------------------------------------*/
  if ($.fn.flatpickr !== undefined) {
    if ($(".basicFlatpickr").length > 0) {
      $(".basicFlatpickr").flatpickr();
    }

    if ($("#inputTime").length > 0) {
      $("#inputTime").flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
      });
    }
    if ($("#inputDatetime").length > 0) {
      $("#inputDatetime").flatpickr({
        enableTime: true,
      });
    }
    if ($("#inputWeek").length > 0) {
      $("#inputWeek").flatpickr({
        weekNumbers: true,
      });
    }
    if ($("#inline-date").length > 0) {
      $("#inline-date").flatpickr({
        inline: true,
      });
    }
    if ($("#inline-date1").length > 0) {
      $("#inline-date1").flatpickr({
        inline: true,
      });
    }
  }

  /*------------------------------------------------------------------
  Flatpicker
  * -----------------------------------------------------------------*/
  if ($(".date-input").hasClass("basicFlatpickr")) {
    $(".basicFlatpickr").flatpickr();
    $("#inputTime").flatpickr({
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i",
    });
    $("#inputDatetime").flatpickr({
      enableTime: true,
    });
    $("#inputWeek").flatpickr({
      weekNumbers: true,
    });
    $("#inline-date").flatpickr({
      inline: true,
    });
    $("#inline-date1").flatpickr({
      inline: true,
    });
  }

  /*---------------------------------------------------------------------
  Scrollbar
  -----------------------------------------------------------------------*/
  $(window)
    .on("resize", function () {
      if ($(this).width() <= 1299) {
        $("#salon-scrollbar").addClass("data-scrollbar");
      } else {
        $("#salon-scrollbar").removeClass("data-scrollbar");
      }
    })
    .trigger("resize");

  $(".data-scrollbar").each(function () {
    var attr = $(this).attr("data-scroll");
    if (typeof attr !== typeof undefined && attr !== false) {
      let Scrollbar = window.Scrollbar;
      var a = $(this).data("scroll");
      Scrollbar.init(document.querySelector('div[data-scroll= "' + a + '"]'));
    }
  });

  /*---------------------------------------------------------------------
  Pricing tab
  -----------------------------------------------------------------------*/
  $(window).on("scroll", function (e) {
    // Pricing Pill Tab
    var nav = $("#pricing-pills-tab");
    if (nav.length) {
      var contentNav = nav.offset().top - window.outerHeight;
      if ($(window).scrollTop() >= contentNav) {
        e.preventDefault();
        $("#pricing-pills-tab li a").removeClass("active");
        $("#pricing-pills-tab li a[aria-selected=true]").addClass("active");
      }
    }
  });

  /*---------------------------------------------------------------------
  Sweet alt Delete
  -----------------------------------------------------------------------*/
  $('[data-extra-toggle="delete"]').on("click", function (e) {
    const closestElem = $(this).attr("data-closest-elem");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-primary ml-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {
          swalWithBootstrapButtons
            .fire({
              title: "Deleted!",
              text: "Your note has been deleted.",
              icon: "success",
              showClass: {
                popup: "animate__animated animate__zoomIn",
              },
              hideClass: {
                popup: "animate__animated animate__zoomOut",
              },
            })
            .then(() => {
              if (closestElem == ".card") {
                $(this).closest(closestElem).parent().remove();
              } else {
                $(this).closest(closestElem).remove();
              }
            });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Your note is safe!",
            showClass: {
              popup: "animate__animated animate__zoomIn",
            },
            hideClass: {
              popup: "animate__animated animate__zoomOut",
            },
          });
        }
      });
  });

  /*---------------------------------------------------------------------
  Circle Progress
  -----------------------------------------------------------------------*/
  const progressBar = document.getElementsByClassName("circle-progress");
  Array.from(progressBar, (elem) => {
    const minValue = elem.getAttribute("data-min-value");
    const maxValue = elem.getAttribute("data-max-value");
    const value = elem.getAttribute("data-value");
    const type = elem.getAttribute("data-type");
    if (elem.getAttribute("id") !== "" && elem.getAttribute("id") !== null) {
      new CircleProgress("#" + elem.getAttribute("id"), {
        min: minValue,
        max: maxValue,
        value: value,
        textFormat: type,
      });
    }
  });

  /*---------------------------------------------------------------------
  List and Grid
  -----------------------------------------------------------------------*/
  $(document).on("click", '[data-toggle-extra="tab"]', function () {
    const target = $(this).attr("data-target-extra");
    $('[data-toggle-extra="tab-content"]').removeClass("active");
    console.log($(target));
    $(target).addClass("active");
    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");
  });
};
