import "jasmine";
import {MCart} from "./";

describe("MCartPlugin", () => {
   let rootElement;

   beforeEach(() => {
      rootElement = jQuery("<div>some content</div>");
   });

   it("should throw error for options is null", () => {
      try {
         // tslint:disable-next-line:no-unused-expression
         new MCart(rootElement, null);
         fail("an error should have been thrown here");
      } catch (error) {
         expect(error.message).toBe("options may not be empty!");
      }
   });

   it("should throw error for options is undefined", () => {
      try {
         // tslint:disable-next-line:no-unused-expression
         new MCart(rootElement, undefined);
         fail("an error should have been thrown here");
      } catch (error) {
         expect(error.message).toBe("options may not be empty!");
      }
   });
});
