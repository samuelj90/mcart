import {Component, ComponentInterface, h, Prop} from '@stencil/core';
import {IProduct} from "../models/product";

@Component({
  tag: 'mc-product-card',
  styleUrl: 'mc-product-card.css',
  shadow: false,
})
export class McProductCard implements ComponentInterface {
  /**
   * The product
   */
  @Prop() product: IProduct;

  render() {
    return (
      <div class="d-block">
        <div class="card mb-3 box-shadow">
          <img class="card-img-top img-fluid" src={this.product.featuredImage} alt={this.product.title}/>
          <div class="card-body">
            <h2 class="my-0 font-weight-normal">{this.product.title.toUpperCase()}</h2>
            <h4 class="card-title pricing-card-title">{this.product.currency} {this.product.price}</h4>
            <p class="card-text">{this.product.description}</p>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary mcart-product-listing-buy-now">
              BUY NOW
            </button>
            <button type="button" class="btn btn-lg btn-block btn-outline-secondary mcart-product-listing-add-to-cart">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    );
  }
}
