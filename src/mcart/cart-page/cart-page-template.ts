export const cartPageTemplate = `
<div class="container mb-4">
    <form id="mcart-cartpage-form" autocomplete="on">
    <div class="row">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th> Product Tite     </th>
                            <th class="text-right"> Qty</th>
                            <th class="text-right">Price</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <% cartItems.forEach(function (cartItem, index, cartItems) { %>
                        <tr>
                            <td>
                                <img src="<%= cartItem.item.featuredimage %>"  alt="<%= cartItem.item.title %>" style="width:100px;"/> </td>
                            <td>
                                <%= cartItem.item.title %>
                                <input type="hidden" name="cartItem[<%= index %>].id" value="<%= cartItem.item.id %>">
                            </td>
                            <td>
                                <div style="width:140px; float:right">
                                    <div class="input-group">
                                        <div class="input-group-prepend mcart-cartpage-cartitem-decrementer" data-cartitem="<%= JSON.stringify(cartItem) %>">
                                            <span class="input-group-text"><i class="fa fa-minus"></i></span>
                                        </div>
                                        <input class="form-control mcart-cartpage-cartitem-quantity" readonly type="number" name="cartItem[<%= index %>][quantity]"  value="<%= cartItem.quantity %>"/>
                                        <div class="input-group-append mcart-cartpage-cartitem-incrementer" data-cartitem="<%= JSON.stringify(cartItem) %>">
                                            <span class="input-group-text"><i class="fa fa-plus"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right">$ <%= cartItem.item.price %></td>
                            <td class="text-right">
                                <button class="btn btn-sm btn-danger mcart-cartpage-cartitem-remove" data-cartitem="<%= JSON.stringify(cartItem) %>">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <%})%>
                        <tr>
                            <td colspan="3" class="text-right">Sub-Total</td>
                            <td colspan="2" class="text-right"> $ <%= subtotal %></td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">Tax</td>
                            <td colspan="2" class="text-right">$ <%= subtotal/10 %></td>
                        </tr>
                        <tr>
                        <td colspan="3" class="text-right">Shipping</td>
                        <td colspan="2" class="text-right">$ <%= shipping = 0 %></td>
                    </tr>
                        <tr>
                            <td colspan="3" class="text-right">
                                <strong>Total</strong>
                            </td>
                            <td colspan="2" class="text-right">
                                <strong>$ <%= shipping + subtotal + subtotal/10 %></strong>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-4">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <i class="fa fa-beer"></i> Coupon Details.
                </div>
                <div class="card-body">
                <div class="form-group">
                    <label for="Coupon Code">Coupon Code</label>
                    <input type="text" class="form-control" name="couponcodeDetails[couponcode]"  placeholder="Enter coupon code" autocomplet="off">
                </div>
                <div class="mx-auto">
                    <button type="submit" class="btn btn-primary text-right">Update</button>
                </div>
                </div>
            </div>
        </div>
        <div class="col-8">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <i class="fa fa-envelope"></i> Shipping Details.
                </div>
                <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" name="shippingDetails[name]" autocomplete='name' placeholder="Enter name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" name="shippingDetails[email]"  autocomplete='email' placeholder="Enter email" required>
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group">
                            <label for="message">Address</label>
                            <textarea class="form-control" name="shippingDetails[address]" rows="2"  autocomplete='address' placeholder="Enter Address" required></textarea>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group">
                            <label for="name">Country</label>
                            <select name="shippingDetails[country]" class="form-control w-100" autocomplete='country-name' required>
                                <option value="">Choose...</option>
                                <option>United States</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="name">State</label>
                            <select name="shippingDetails[state]" class="form-control w-100"  autocomplete='address-level1' required>
                                <option value="">Choose...</option>
                                <option>United States</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="name">Phone</label>
                            <input type="text" class="form-control" name="shippingDetails[phone]" autocomplete='tel' placeholder="Enter Phone" required>
                        </div>
                        <div class="mx-auto">
                            <button class="btn btn-primary text-right">Update totals</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="col-12" style="margin-top: 20px;">
            <div class="row">
                <div class="col-sm-12  col-md-6">
                    <button class="btn btn-lg btn-block btn-light">Continue Shopping</button>
                </div>
                <div class="col-sm-12 col-md-6 text-right">
                    <button type="submit" class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                </div>
            </div>
        </div>
    </div>
    </form>
</div>
`;