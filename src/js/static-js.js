import $ from "jquery";

$(function() {
  // Header: затемнение при скролле
  $(window).on('scroll', function() {
    $('.js-header').toggleClass('is-scrolled', $(this).scrollTop() > 50);
  });
	
	// Interior slider
	$('.js-interior-slider').slick({
		variableWidth: true,
		slidesToScroll: 1,
		infinite: true,
		arrows: false,
	});
	
	// Events slider
	$('.js-events-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		infinite: true,
		prevArrow: $('.js-events-prev'),
		nextArrow: $('.js-events-next')
	});
	$('.js-interior-multi-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		arrows: true,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					variableWidth: true,
				}
			}
		]
	});

  // VIP slider
  $('.js-vip-slider').slick({
    slidesToShow: 1,
    fade: true,
    cssEase: 'linear',
    prevArrow: $('.js-vip-prev'),
    nextArrow: $('.js-vip-next')
  });

  // Persons counter
  class PersonsCounter {
    constructor(el) {
      this.$wrap  = $(el);
      this.$value = this.$wrap.find('.js-counter-value');
      this.min    = 1;
      this.max    = 30;
      this._bind();
    }
    _bind() {
      this.$wrap.find('.js-counter-minus').on('click', () => this._change(-1));
      this.$wrap.find('.js-counter-plus').on('click',  () => this._change(+1));
    }
    _change(delta) {
      const next = parseInt(this.$value.text()) + delta;
      if (next >= this.min && next <= this.max) this.$value.text(next);
    }
  }
  $('.js-persons-counter').each(function() { new PersonsCounter(this); });

  // Mobile menu
  class MobileMenu {
    constructor() {
      this.$menu   = $('.js-mobile-menu');
      this.$burger = $('.js-burger');
      this._bind();
    }
    _bind() {
      this.$burger.on('click', () => this.open());
      $('.js-mobile-menu-close').on('click', () => this.close());
    }
    open()  { this.$menu.addClass('is-open'); $('body').addClass('lock'); }
    close() { this.$menu.removeClass('is-open'); $('body').removeClass('lock'); }
  }
  new MobileMenu();

  // Service tabs
  $('.js-service-tab').on('click', function() {
    $('.js-service-tab').removeClass('is-active');
    $(this).addClass('is-active');
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
	
	$('.js-tabs-list').delegate('li:not(.active)', 'click', function() {
		$(this).addClass('active').siblings().removeClass('active')
			.parents('.js-tabs-wrapper').find('.js-tabs-box').eq($(this).index()).addClass('show').siblings('.js-tabs-box').removeClass('show');
	})
});
