import {MCartOptions} from "./mcart/mcart-options";
import {MCart} from "./mcart";

(function ($: JQueryStatic) {
   // you have to extend jQuery with the fn['pluginName'] notation because in Typescript you can't extend
   // the existing typing interface with fn.pluginName!
   $.fn[MCart.NAME] = function (options: MCartOptions) {
      return this.each(function () {
         new MCart($(this), options);
      });
   };
})(jQuery);