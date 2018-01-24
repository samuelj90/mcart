import {MCartOptions} from "./mcart-options";
import {isNullOrUndefined} from "./utils";

export class MCart {

   public static NAME: string = "mCart";

   private rootElement: JQuery;
   private options: MCartOptions;

   constructor(rootElement: JQuery, options: MCartOptions) {
      if (isNullOrUndefined(options)) {
         throw new Error("options may not be empty!");
      }

      this.rootElement = rootElement;
      this.options = options;

      this.init();
   }

   private init() {
      this.rootElement.text(this.options.label);
   }
}