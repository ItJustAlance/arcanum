import $ from "jquery";

$(function() {
  // Header: затемнение при скролле
  $(window).on('scroll', function() {
    $('.js-header').toggleClass('is-scrolled', $(this).scrollTop() > 50);
  });

  $(".js-btn-modal").on("click", function (){
    const modal = $(this).data("modal");
    $("body").addClass("lock just-modal--default")
    $("#" + modal).addClass("open ");
    setTimeout(() => ($("#" + modal).addClass("in")), 300);
    return false
  });
  $(".just-modal__overlay, .js-just-modal__close").on("click", function (){
    $("body").removeClass("lock just-modal--default")
    $(".just-modal").removeClass("open in");
  });
});
