/*
 * jQuery Expander plugin
 * Version 1.0  (January 23, 2010)
 * @requires jQuery v1.2+
 * @author Karl Swedberg - karl *at* learningjquery *dot* com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */


(function($) {

  $.fn.summarize = function(options) {

    var opts = $.extend({}, $.fn.summarize.defaults, options);
    return this.each(function() {
      var $container = $(this),
          $kids = $container.children();
      
      var o = $.meta ? $.extend({}, opts, $container.data()) : opts;
      
      if ($kids.length <= o.summaryElements) {
        return;
      }

      var summaryCount = +o.summaryElements-1,
          $expandElement = $(o.expandWrapper)
            .addClass(o.expandClass)
            .html('<a href="#">' + o.expandText + '</a>'),
          $collapseElement = $(o.collapseWrapper)
            .addClass(o.collapseClass)
            .html('<a href="#">' + o.collapseText + '</a>'),
          $lastSummaryElement = $kids.filter(':eq(' + (summaryCount) + ')');      

      $container.children(':gt(' + summaryCount + ')').wrapAll('<div class="' + o.detailClass + '"></div>');
      var $details = $container.find('div.' + o.detailClass).hide();
      $expandElement[o.expandInsertion]($lastSummaryElement);
      if (o.collapseText) {
        $collapseElement[o.collapseInsertion]($details);
        $collapseElement.hide();
      }
      $container.click(function(event) {
        var tgt = event.target,
          parentClass = tgt.parentNode.className;
        if (event.target.nodeName.toLowerCase() === 'a' && (parentClass === o.expandClass || parentClass === o.collapseClass)) {
          if (parentClass === o.expandClass) {
            $details[o.expandEffect](o.expandSpeed, function() {
              if (o.collapseText) { $collapseElement.show(); }
              o.expandCallback();
            });
          } else if (parentClass === o.collapseClass) {
            $details[o.collapseEffect](o.collapseSpeed, function() {
              $expandElement.show();              
              o.collapseCallback();
            });
          }
          tgt.parentNode.style.display = 'none';
          return false;
        }
      });
    });
  };
    // plugin defaults
  $.fn.summarize.defaults = {
    summaryElements:    1,  // the number of child elements after which a div. 
    detailClass:        'details', // class of the div that will wrap all elements as specified.

  /* expander element */
    expandText:         'read more...', // text displayed in a link instead of the hidden elements. 
    expandWrapper:      '<div></div>',
    expandClass:        'expand',
    expandInsertion:    'insertAfter', // method to use, relative to last summary element. Reasonable choices include 'insertAfter' and 'appendTo'

    expandEffect:       'fadeIn',
    expandSpeed:        '',   // speed in milliseconds of the animation effect for expanding the text
    expandCallback:     function() {}, //function to be fired *after* elements are expanded


  /* collapser element */    
    collapseText:       'read less...', // allow the user to re-collapse the expanded text.
                                        // use '' or null if you don't want user to re-collapse
    collapseWrapper:    '<div></div>',
    collapseClass:      'collapse', 
    collapseInsertion:  'insertAfter', // method to use, relative to the "details" div containing the initially hidden elements 

    collapseEffect:     'fadeOut',
    collapseSpeed:      '',
    collapseCallback:     function() {} //function to be fired *after* elements are collapsed

  };
})(jQuery);
