export const productListingTemplate: string = `
<div class="card-deck mb-3 text-center">
    <% for(var i=0; i < products.length; i++) { %>
    <div class="card mb-4 box-shadow">
        <div class="card-header">
            <h4 class="my-0 font-weight-normal"><%= products[i].title %></h4>
        </div>
        <div class="card-body">
            <img src="<%= products[i].featuredimage %>" style="max-width:100%" alt="<%= products[i].title %>">
            <h1 class="card-title pricing-card-title">$<%= products[i].price %></h1>
            <div><%= products[i].description %></div>
            <button type="button" class="btn btn-lg btn-block btn-outline-primary">BUY NOW</button>
        </div>
    </div>
    <% } %>
</div>
`;