var productArr = []

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

    for(var i = 0; i < quantCount; i++) {
        var pillow = new Product(type, selectedColor, selectedFilling, quantity);
        productArr.push(pillow);
    }

    console.log('productArr: ', productArr);

    updateCartNumber(productArr.length)
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
    items.innerHTML = 'test';
}


function cartList() {
    var loadedProductArr = localStorage.getItem('order');
    var productArr2 = JSON.parse(loadedProductArr);

    var items = [];
    var summaryList = [];

    for(var i = 0; i < productArr2.length; i++) {
       var type = productArr2[i]['type'];
       var color = productArr2[i]['color'];
       var filling = productArr2[i]['filling'];
       var quantity = productArr2[i]['quantity'];
       summary = quantity + 'x ' + type + ' (Color: ' + color + ', Filling: ' + filling + ')' + '<br>';
       summaryList.push(summary);
       // console.log(summary)

    }
    var itemList = document.getElementById('itemList');

    // for(var i=0; i<summaryList.length;i++){
    //     summaryListEdited = summaryList[i];
    // }
    itemList.innerHTML = summaryList;

}
