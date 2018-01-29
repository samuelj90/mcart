$(function () {
    $("#test").mCart({
        productListing: {
            appendElement: $('#test'),
            template: function (product) {
                return `<div class="product col-md-3 no_padding wow animated fadeInUp">
                <div class="wrapper">
                <div class="image">
                    <img src="${product.featuredImage}"> </div>
                <span class="price">  ${product.price}</span>
                <h5> ${product.title} </h5>
                <p>${product.description}</p>
                <a class="add_to_cart">add to cart <i class="icon_cart"></i></a> <a href="cart.html" class="buy_button">Buy Now</a> </div>
                </div>`;
            },
            products: [
                { title: "TEST", description: "TEST DESCRIPTION", price: 200.00 },
                { title: "TEST", description: "TEST DESCRIPTION", price: 250.00 }
            ]
        }
    });
});