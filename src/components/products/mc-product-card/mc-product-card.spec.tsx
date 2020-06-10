import {newSpecPage} from '@stencil/core/testing';
import {McProductCard} from './mc-product-card';

describe('mc-product-card', () => {

  it('renders', async () => {

    const page = await newSpecPage({
      components: [McProductCard],
      html: `<Host></Host>`,
    });

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

    let component = page.doc.createElement("mc-product-card");
    (component as unknown as McProductCard).product = product;

    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.root).toEqualText('FOAM CUP 6 OZ$ 247Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue.BUY NOWADD TO CART');
  });
});
