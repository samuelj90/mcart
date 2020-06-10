import { newE2EPage } from '@stencil/core/testing';
import {McProductCard} from "./mc-product-card";

describe('mc-product-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    const product = {
      currency: "$",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.",
      featuredImage: "http://via.placeholder.com/200x250",
      id: 10,
      identifier: "Muffin Mix - Oatmeal",
      images: [],
      price: 247,
      sku: "",
      title: "Foam Cup 6 Oz",
    };
    let component = document.createElement('mc-product-card');
    (component as unknown as McProductCard).product = product;
    await page.setContent(component.outerHTML);

    const element = await page.find('mc-product-card');
    expect(element).toHaveClass('hydrated');
  });
});
