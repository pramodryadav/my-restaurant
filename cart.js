let foodItems = []
let containerEle = document.querySelector(".card-items");
let priceContainerEle = document.querySelector(".amount-container");
let pEle = document.createElement("p");
let itemCountEle = document.querySelector(".item-count");
console.log("containerEle", containerEle);

function getCartItems() {
    foodItems = JSON.parse(localStorage.getItem("cart"));

    populateItems(foodItems)
}
getCartItems()


function populateItems(items) {
    let innerHTML = items.length> 0 ? items.map((item) => createCartItem(item)).join("") : null;
    containerEle.innerHTML = innerHTML;
    calclateTotal(items);
    updateCart()
}

function createCartItem(item) {
    console.log("item", item)
    return `<div class="cart-item">
                
                <img src=${item.imgUrl} alt="abc">

               <div class="cart-item-detail">
               <p>${item.title}</p>
                <p class="price">$${item.price}</p>
                <div class="item-quantity">
                    <button onclick="decrement('${item.id}')" class="decrement">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increment('${item.id}')" class="decrement">+</button>
                    <button onclick="remove('${item.id}')"  class="remove-btn">Remove</button>
                </div>
            
               </div>
            </div>`

}

function decrement(id) {
    let item = foodItems.find(item => item.id === id);
    console.log("found", item)
    if (item.quantity > 1) {
        item.quantity -= 1;
    }
    console.log("foodItems", foodItems)
    localStorage.setItem("cart", JSON.stringify(foodItems))
    populateItems(foodItems)
}

function increment(id) {
    let item = foodItems.find(item => item.id === id);
    console.log("found", item)
    item.quantity += 1;
    console.log("foodItems", foodItems)
    localStorage.setItem("cart", JSON.stringify(foodItems))
    populateItems(foodItems)
}

function remove(id) {
    let item = foodItems.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(item))


    populateItems(item)
}

function calclateTotal(items) {
    console.log("items",items)
    pEle.innerHTML = "";
   const totalAmt = items.reduce((accu,currVal)=>{
        
         accu+=Number(currVal.quantity * currVal.price);
         return accu;
         
   },0);
   console.log("totalAmt",totalAmt)
   pEle.innerHTML = `Total Price: $${totalAmt.toFixed(2)}`;
   priceContainerEle.appendChild(pEle);
   console.log("priceContainerEle",priceContainerEle)
}

function updateCart(){
    let cartaItems = JSON.parse(localStorage.getItem("cart")) || [];
    itemCountEle.innerHTML = "";
    const totalItem = cartaItems.reduce((accu,currVal)=>{
        
        accu+=currVal.quantity;
        return accu;
        
  },0);
  itemCountEle.innerHTML= `(${totalItem})`
}

updateCart();

