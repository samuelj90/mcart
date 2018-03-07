export const productListingTemplate: string = `
<div class="card-deck">
    <div class="row">
        <% for(var i=0; i < products.length; i++) { %>
        <div class="col-sm-6 col-md-4">
            <div class="card mb-3 box-shadow">
                <img class="card-img-top img-fluid" src="<%= products[i].featuredimage %>" alt="<%= products[i].title %>">
                <div class="card-body">
                    <h2 class="my-0 font-weight-normal"><%= products[i].title.toUpperCase() %></h2>
                    <h4 class="card-title pricing-card-title">$<%= products[i].price %></h4>
                    <p class="card-text"><%= products[i].description %></p>
                    <button type="button" class="btn btn-lg btn-block btn-outline-primary mcart-productlisting-buynow" data-product="<%= JSON.stringify(products[i])%>">BUY NOW</button>
                    <button type="button" class="btn btn-lg btn-block btn-outline-secondary mcart-productlisting-addtocart"  data-product="<%= JSON.stringify(products[i]) %>">ADD TO CART</button>
                </div>
            </div>
        </div>
        <% } %>
    </div>
</div>
`;