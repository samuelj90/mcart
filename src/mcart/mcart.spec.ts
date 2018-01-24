import {MCart} from "./";

describe("MCartPlugin", () => {
   let rootElement;

   beforeEach(() => {
      rootElement = jQuery("<div>some content</div>");
      let myPlugin: MCart = new MCart(rootElement, {label: "My label"});
   });

   it("should render label after initialization", () => {
      expect(rootElement.text()).toBe("My label");
   });

   it("should throw error for options is null", () => {
      try {
         new MCart(rootElement, null);
         fail("an error should have been thrown here");
      } catch (error) {
         expect(error.message).toBe("options may not be empty!");
      }
   });

   it("should throw error for options is undefined", () => {
      try {
         new MCart(rootElement, undefined);
         fail("an error should have been thrown here");
      } catch (error) {
         expect(error.message).toBe("options may not be empty!");
      }
   });
});