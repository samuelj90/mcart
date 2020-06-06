export const minicartTemplate = `
<% var cartItems = cartModel.cartItems %>
<% var cartItemsTotal = cartModel.cartItemsTotal %>
<a class="p-2 text-dark mcart-minicart-trigger" href="#">
    <i class="fa fa-shopping-cart"></i> Cart
    <span class="badge badge-secondary mcart-minicart-counter"><%= cartItems.length%></span>
</a>
<div class="mcart-minicart-wrapper">
    <div class="mcart-minicart-header">
        <i class="fa fa-shopping-cart cart-icon"></i>
        <span class="badge badge-secondary mcart-minicart-counter"><%= cartItems.length%></span>
        <div class="mcart-minicart-total">
            <span class="lighter-text">Total:</span>
            <span class="main-color-text"><%= cartItemsTotal %></span>
        </div>
    </div>
    <ul class="mcart-minicart-items">
        <% for(var i=0; i < cartItems.length; i++) { %>
            <li class="clearfix bg-white border-bottom box-shadow">
                <img src="<%= cartItems[i].item.featuredimage %>" alt="<%= cartItems[i].item.title %>"  style="width:50px;"/>
                <span class="mcart-minicart-item-name"><%= cartItems[i].item.title %></span>
                <span class="mcart-minicart-item-price">$<%= cartItems[i].item.price %></span>
                <span class="mcart-minicart-item-quantity">Quantity: <%= cartItems[i].quantity %></span>
                <span class="mcart-minicart-item-remove" data-cartitem="<%=JSON.stringify(cartItems[i])%>">
                    <i class="fa fa-trash"></i>
                </span>
            </li>
        <% } %>
    </ul>
    <div class="mini-cart-footer">
        <button type="button" class="btn btn-secondary mcart-minicart-view-cart">VIEW CART</button>
        <button type="button" class="btn btn-secondary mcart-minicart-checkout">CHECKOUT</button>
    </div>
</div>
`;