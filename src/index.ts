import "jquery";
import { MCart } from "./mcart";
import { IMCartOptions } from "./mcart/mcart-options";

(($: JQueryStatic) => {
   // you have to extend jQuery with the fn['pluginName'] notation because in Typescript you can't extend
   // the existing typing interface with fn.pluginName!
   $.fn[MCart.NAME] = function(options: IMCartOptions) {
      return this.each(() => {
         return new MCart($(this), options);
      });
   };
})(jQuery);
