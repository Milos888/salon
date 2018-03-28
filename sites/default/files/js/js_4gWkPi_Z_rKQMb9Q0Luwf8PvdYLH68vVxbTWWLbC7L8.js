(function($) {

  // Behavior to load FlexSlider
  Drupal.behaviors.flexslider = {
    attach: function(context, settings) {
      var sliders = [];
      if ($.type(settings.flexslider) !== 'undefined' && $.type(settings.flexslider.instances) !== 'undefined') {

        for (id in settings.flexslider.instances) {

          if (settings.flexslider.optionsets[settings.flexslider.instances[id]] !== undefined) {
            if (settings.flexslider.optionsets[settings.flexslider.instances[id]].asNavFor !== '') {
              // We have to initialize all the sliders which are "asNavFor" first.
              _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
            } else {
              // Everyone else is second
              sliders[id] = settings.flexslider.optionsets[settings.flexslider.instances[id]];
            }
          }
        }
      }
      // Slider set
      for (id in sliders) {
        _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
      }
    }
  };

  /**
   * Initialize the flexslider instance
   */

  function _flexslider_init(id, optionset, context) {
    $('#' + id, context).once('flexslider', function() {
      // Remove width/height attributes
      // @todo load the css path from the settings
      $(this).find('ul.slides > li > *').removeAttr('width').removeAttr('height');

      if (optionset) {
        // Add events that developers can use to interact.
        $(this).flexslider($.extend(optionset, {
          start: function(slider) {
            slider.trigger('start');
          },
          before: function(slider) {
            slider.trigger('before');
          },
          after: function(slider) {
            slider.trigger('after');
          },
          end: function(slider) {
            slider.trigger('end');
          },
          added: function(slider) {
            slider.trigger('added');
          },
          removed: function(slider) {
            slider.trigger('removed');
          }
        }));
      } else {
        $(this).flexslider();
      }
    });
  }

}(jQuery));
;
/**
 * @file
 * Initiate Owl Carousel.
 */

(function($) {

  Drupal.behaviors.owlcarousel = {
    attach: function(context, settings) {

      for (var carousel in settings.owlcarousel) {
        // Carousel instance.
        var owl = $('.' + carousel);

        // lazyLoad support.
        if (settings.owlcarousel[carousel].settings.lazyLoad) {
          var images = owl.find('img');

          $.each(images, function(i, image) {
            $(image).attr('data-src', $(image).attr('src'));
          });

          images.addClass('lazyOwl');
        }

        // Attach instance settings.
        owl.owlCarousel(settings.owlcarousel[carousel].settings);

        // Set an inline height if custom AJAX pagination is enabled;
        // otherwise replacement of carousel element causes scrolling effect.
        if (settings.owlcarousel[carousel].views.ajax_pagination) {
          var owlnav = $('.' + carousel);
          owlnav.parent().css('height', owlnav.height());

          var view = owlnav.parent().parent();
          var next = $(view).find('.pager-next a', context);
          var prev = $(view).find('.pager-previous a', context);

          // Attach Owl Carousel behaviors to pager elements.
          $(next).once('ajax', function() {
            $(next, context).click(function() {
              owlnav.trigger('owl.next');
            });
          });
          $(prev).once('ajax', function() {
            $(prev, context).click(function() {
              owlnav.trigger('owl.prev');
            });
          });
        }
      }
    }
  };

}(jQuery));
;
