var productArr = [];
var productArr2 = [];



class Product {
    constructor(type, color, filling, quantity) {
        this.type = type
        this.color = color
        this.filling = filling
        this.quantity = quantity
    }
}

function addToCart() {

    var type = document.getElementById('bedPillowTitle').innerHTML;

    var colors = document.getElementsByName("color");
    var selectedColor = 'none';

    for(var i = 0; i < colors.length; i++) {
       if(colors[i].checked) {
           selectedColor = colors[i].value;
       }
    }


    var fillings = document.getElementsByName("filling");
    var selectedFilling = 'none';

    for(var i = 0; i < fillings.length; i++) {
       if(fillings[i].checked) {
           selectedFilling = fillings[i].value;
       }
    }

    var quantity = document.getElementById('quantity').value;
    var quantCount = parseInt(quantity);

    var pillow = new Product(type, selectedColor, selectedFilling, quantity);
    productArr.push(pillow);

    console.log('productArr: ', productArr);

    updateCartNumber(productArr.length);
}


function updateCartNumber(num) {
    var cartCount = document.getElementById('cartCount')
    cartCount.innerHTML = num
}


function goToCartPage() {
    localStorage.setItem('order', JSON.stringify(productArr));

    var loadedProductArr = localStorage.getItem('order');
    var productArr2 = JSON.parse(loadedProductArr);

    var items = document.getElementById('itemList');

}

var itemList = [];

var deleteButton = '<button id="delete" type="button" onclick="deleteItem(this)">Delete Item</button>';

function cartList() {
    var loadedProductArr = localStorage.getItem('order');
    var productArr2 = JSON.parse(loadedProductArr);

    var items = [];
    var summaryList = [];

    if (productArr2.length > 0) {
        console.log('productArr2: ' + productArr2);
        for (var c = 0; c < productArr2.length; c++) {
            var type = productArr2[c]['type'];
            var color = productArr2[c]['color'];
            var filling = productArr2[c]['filling'];
            var quantity = productArr2[c]['quantity'];
            var quantityNumber = parseInt(quantity);

            if (quantityNumber <= 1) {
                summary = '<span id="' + c + '">' + quantity + 'x ' + type + ' (Color: ' + color + ', Filling: ' + filling + ')' + deleteButton + '</span>' + '<br>';
                summaryList.push(summary);
            }
            else if (quantityNumber > 1) {
                for (var i = 0; i < quantityNumber; i++) {
                    if (i == 0) {
                        summary = '<span id="' + c + '">' + quantity + 'x ' + type + ' (Color: ' + color + ', Filling: ' + filling + ')' + deleteButton + '</span>' + '<br>';
                        summaryList.push(summary);                    }
                }
            }
        }
    console.log('summary list: ' + summaryList);
    }

    // grab HTML element
    itemList = document.getElementById('itemList');

    // display cart info without list formatting
    for (var i = 0; i < summaryList.length; i++){
        itemList.innerHTML += summaryList[i];
    }
}

function deleteItem(elem) {
    var itemID = elem.parentNode.id;
    var element = document.getElementById(itemID);
    element.innerHTML = '';

    var loadedProductArr = localStorage.getItem('order');
    var productArr2 = JSON.parse(loadedProductArr);

    productArr2.splice(itemID, 1);

    localStorage.setItem('order', JSON.stringify(productArr2));
    console.log('productArr2:');
    console.log(productArr2);
}


function goToCheckoutPage() {
    window.location.href = "checkout.html";
}
