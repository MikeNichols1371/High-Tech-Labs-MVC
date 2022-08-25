//   Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')


//   Open Cart
cartIcon.onclick = () => {
    cart.classList.add('active');
}

//    Close Cart
closeCart.onclick = () => {
    cart.classList.remove('active');
}




//    Cart JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready();
}

function ready() {
    //   Remove Button

    var remove = document.getElementsByClassName('cart-remove')

    for (var i = 0; i < remove.length; i++) {
        var button = remove[i]
        button.addEventListener('click', removeItemsLocalStorage)
        button.addEventListener('click', removeItem)
        button.addEventListener('click', removeCartNumber)

    }

    //   Quantity Change

    var quantityInput = document.getElementsByClassName('cart-quantity')
    for (var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    //    Add To Cart

    var addToCart = document.getElementsByClassName('add-to-cart')
    for (var i = 0; i < addToCart.length; i++) {
        var button = addToCart[i]
        button.addEventListener('click', addCartClicked);
        button.addEventListener('click', cartNumbers);
    }
    //     Cash Out
    document.getElementsByClassName('buy-btn')[0].addEventListener('click', buyButtonClicked)

    //     Local Storage
    onLoadCartNumbers()
    onLoadCart()

}
//   Cash Out Button
function buyButtonClicked(event) {
    alert('Your order has been placed!')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateCart()
    localStorage.clear()
    window.location.reload()
}

function removeItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateCart();
    /*console.log(buttonClicked.parentElement)*/
    let products = JSON.parse(localStorage.getItem('products'));
    for (var item in products) {
        var isButtonClicked = event.target
        console.log(isButtonClicked)
        buttonClicked.parentElement.remove();
        var productId = buttonClicked.parentElement.getElementsByClassName('product-name')[0].innerText;
        console.log(products)
        if (isButtonClicked) {
            var productId = buttonClicked.parentElement.getElementsByClassName('product-name')[0].innerText;
            products = products.filter(x => x.id.toString() !== productId.toString())
            localStorage.setItem('products', JSON.stringify(products));
            window.location.reload()
            break;
        }
    }
    /*localStorage.setItem('products', JSON.stringify(products));*/
}

//    Update Cart

function updateCart() {
    var cartContent = document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = priceElement.innerText.replace('$', '')
        var quantity = quantityElement.value
        total = total + (price * quantity)


    }
    document.getElementsByClassName('total-price')[0].innerText = `$${total}`
}

//     Quantity Changes

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCart()
}

//    Add to Cart

function addCartClicked(event) {
    var button = event.target
    var shopProducts = button.parentElement.parentElement.parentElement
    var productName = shopProducts.getElementsByClassName('card-title')[0].innerText
    var productPrice = shopProducts.getElementsByClassName('card-price')[0].innerText
    var productDescription = shopProducts.getElementsByClassName('card-details')[0].innerText
    var productImage = shopProducts.getElementsByClassName('card-img-top')[0].src
    addToCart(productImage, productName, productDescription, productPrice)
    updateCart()
}

function addToCart(productImage, productName, productDescription, productPrice) {
    let products = [];
    var productQuantity = 1
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));

    }
    products.push({ id: productName, image: productImage, name: productName, productDescription: productDescription, productPrice: productPrice, productQuantity: productQuantity });
    localStorage.setItem('products', JSON.stringify(products));

    var newBox = document.createElement('div')
    newBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0]
    var cartItemNames = cartItems.getElementsByClassName('product-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == productName) {
            alert('Product is already in Cart.')
            return;
        }
        

    }
    var cartBoxContent = `<img src="${productImage}" alt="" class="cart-image">
    <div class="detail-box">
      <div class="product-name">${productName}</div>
      <div class="details">${productDescription}</div>
      <div class="cart-price">${productPrice}</div>
      <input type="number" value="${productQuantity}" min="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash bx-tada-hover cart-remove' data-id="${productName}"></i>`
    newBox.innerHTML = cartBoxContent
    cartItems.append(newBox)
    /*newBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeItemsLocalStorage)*/
    newBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeItem)
    newBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartNumber)
    newBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    if (productNumbers) {
        document.querySelector('#cart-icon').setAttribute('value', productNumbers)
    }

}
function onLoadCart() {
    let products = localStorage.getItem('products')
    products = JSON.parse(products)
    var cartRow = document.getElementsByClassName('cart-content')[0]
    if (products && cartRow) {

        cartRow.innerHTML = ''
        Object.values(products).map(item => {
            cartRow.innerHTML += `<div class="cart-box"><img src="${item.image}" alt="" class="cart-image">
                <div class="detail-box">
                    <div class="product-name">${item.name}</div>
                    <div class="details">${item.productDescription}</div>
                    <div class="cart-price">${item.productPrice}</div>
                    <input type="number" value="${item.productQuantity}" min="1" class="cart-quantity">
                </div>
                <i class='bx bx-trash bx-tada-hover cart-remove' data-id="${item.name}" ></i>
                </div>`
        })
        for (var product in products) {
            /*document.getElementsByClassName('cart-remove')[product].addEventListener('click', removeItemsLocalStorage)*/
            document.getElementsByClassName('cart-remove')[product].addEventListener('click', removeItem)
            document.getElementsByClassName('cart-remove')[product].addEventListener('click', removeCartNumber)
            document.getElementsByClassName('cart-quantity')[product].addEventListener('change', quantityChanged)
            updateCart()
        }



    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    productNumbers = parseInt(productNumbers)
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('#cart-icon').setAttribute('value', productNumbers + 1)

    }
    else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('#cart-icon').setAttribute('value', 1)
    }

}


function removeCartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers')

    if (productNumbers > 0) {
        localStorage.setItem('cartNumbers', productNumbers - 1)
    }

}
//function removeItemsLocalStorage() {
//    let products = JSON.parse(localStorage.getItem('products'));
//    for (var item in products) {
//        console.log(item);
//        var cartItems = document.getElementsByClassName('cart-content')[item];
//        var productName = cartItems.getElementsByClassName('product-name')[item].innerText;
//        if (products[item].name === productName) {
//            products.splice(item, 1);
//            /*window.location.reload()*/
//            break;
//        }
//    }
//    localStorage.setItem('products', JSON.stringify(products));
/*}*/

//////     PayPal

//const fundingSources = [
//    paypal.FUNDING.PAYPAL,
//    paypal.FUNDING.CARD
//]

//for (const fundingSource of fundingSources) {
//    const paypalButtonsComponent = paypal.Buttons({
//        fundingSource: fundingSource,

//        // optional styling for buttons
//        // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
//        style: {
//            shape: 'pill',
//            height: 40,
//        },

//        // set up the transaction
//        createOrder: (data, actions) => {
//            // pass in any options from the v2 orders create call:
//            // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
//            const createOrderPayload = {
//                purchase_units: [
//                    {
//                        amount: {
//                            value: '88.44',
//                        },
//                    },
//                ],
//            }

//            return actions.order.create(createOrderPayload)
//        },

//        // finalize the transaction
//        onApprove: (data, actions) => {
//            const captureOrderHandler = (details) => {
//                const payerName = details.payer.name.given_name
//                console.log('Transaction completed!')
//            }

//            return actions.order.capture().then(captureOrderHandler)
//        },

//        // handle unrecoverable errors
//        onError: (err) => {
//            console.error(
//                'An error prevented the buyer from checking out with PayPal',
//            )
//        },
//    })

//    if (paypalButtonsComponent.isEligible()) {
//        paypalButtonsComponent
//            .render('#paypal')
//            .catch((err) => {
//                console.error('PayPal Buttons failed to render')
//            })
//    } else {
//        console.log('The funding source is ineligible')
//    }
//}









