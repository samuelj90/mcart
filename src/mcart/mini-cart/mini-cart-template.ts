export const minicartTemplate = `
<a class="p-2 text-dark" href="#" id="mcart-mincart-trigger">
    <i class="fa fa-shopping-cart"></i> Cart
    <span class="badge badge-secondary mcart-mincart-counter"><%= cartItems.length%></span>
</a>
<div class="mini-cart">
    <div class="mini-cart-header">
        <i class="fa fa-shopping-cart cart-icon"></i>
        <span class="badge badge-secondary mcart-mincart-counter"><%= cartItems.length%></span>
        <div class="mini-cart-total">
            <span class="lighter-text">Total:</span>
            <span class="main-color-text"><%= total %></span>
        </div>
    </div>
    <ul class="mini-cart-items">
        <% for(var i=0; i < cartItems.length; i++) { %>
            <li class="clearfix bg-white border-bottom box-shadow">
                <img src="<%= cartItems[i].item.featuredimage %>" alt="<%= cartItems[i].item.title %>"  style="width:50px;"/>
                <span class="item-name"><%= cartItems[i].item.title %></span>
                <span class="item-price">$<%= cartItems[i].item.price %></span>
                <span class="item-quantity">Quantity: <%= cartItems[i].quantity %></span>
                <span class="item-remove" data-cartitem="<%=JSON.stringify(cartItems[i])%>">
                    <i class="fa fa-trash"></i>
                </span>
            </li>
        <% } %>
    </ul>
    <div class="mini-cart-footer">
        <button type="button" class="btn btn-secondary viewCart">VIEW CART</button>
        <button type="button" class="btn btn-secondary checkout">CHECKOUT</button>
    </div>
</div>
`;