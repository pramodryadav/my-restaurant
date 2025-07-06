let foodItems = [];

let categoryContainer = document.getElementById("menu-category");
let itemCountEle = document.querySelector(".item-count");
let searchItemContainer = document.createElement("div");
searchItemContainer.className = "ourmenu-items"
searchItemContainer.innerHTML =   `<p>No Item Searched Yet...</p>`;
let searchEleContainer = document.querySelector("#search-items");
searchEleContainer.appendChild(searchItemContainer);

async function fetchFoodItems() {
    try {
        const response = await fetch("foodItems.json");
        if (!response.ok) {
            throw new Error("Failed to fetch food items")
        }

        foodItems = await response.json();
        populateItems(foodItems);
    } catch (error) {
        console.log(error.message)
    }
}

fetchFoodItems();

function populateItems(foodItems) {
   
    const categories = {
        "best_sellers": [],
        "trending": [],
        "starter": [],
        "beverages": [],
        "main_course": []
    }

    foodItems.forEach(item => {
        if (item.best_seller === "yes") {
            categories.best_sellers.push(item)
        }
        if (item.trending === "yes") {
            categories.trending.push(item)
        }

        let cat = item.category.toLowerCase().replace(" ", "_");
        categories[cat].push(item);
    });

    console.log("categories", categories)


    for (let category in categories) {
        
        const categoryEle = document.createElement("div");
        const categoryHeader = document.createElement("div");
        const categoryHeading = document.createElement("h3");
        const itemContainer = document.createElement("div");
        itemContainer.className = 'ourmenu-items';
        categoryEle.id = category;
        categoryEle.className = "ourmenu-category";
        categoryHeader.className = "ourmenu-category-header";
        categoryHeading.textContent = category.replace("_"," ").toUpperCase();
        categoryHeader.appendChild(categoryHeading)
        categoryEle.appendChild(categoryHeader)
        categoryContainer.appendChild(categoryEle)
        console.log("categoryEle")


        const innerHtml = categories[category].map((item) => createMenuItem(item)).join("");
        itemContainer.innerHTML = innerHtml;
        categoryEle.appendChild(itemContainer)
    }
}

function createMenuItem(item) {
    return `<div class="ourmenu-card">

        <img src=${item.imageurl} alt=${item.title}>

        <div class="menu-card-content">

          <h4>${item.title}</h4>

          <p>${item.description}</p>

          <span>Price: <strike class="strike-price">$${item.actual_price}</strike> $${item.selling_price} <span
              style="color:rgb(243, 57, 57); font-size: 13px;">10% off</span></span>

        </div>

        <div class="add-to-cart-btn">

          <button onclick="addToCart('${item.id}','${item.selling_price}','${item.title}','${item.imageurl}')" class="cta-button">Add to Cart</button>

        </div>

      </div>`
}




function searchItem(query) {

    let filteredItems = foodItems.filter(item => {
        if (!query) return false;
        return item.title.toLowerCase().includes(query?.toLowerCase())
    })
    
    if (filteredItems.length >0) {
        searchItemContainer.innerHTML = filteredItems.map(item => createMenuItem(item)).join("")
    }else{
        searchItemContainer.innerHTML=`<p>No Item Searched Yet...</p>`
    }
   
    searchEleContainer.appendChild(searchItemContainer)
}
let timeId;
let searchEle = document.querySelector(".search-input");

searchEle.addEventListener("keyup", function (e) {
    let query = e.target.value;
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => { searchItem(query) }, 1000)


})


function addToCart(itemId, itemPrice, itemTitle, ItemImg) {
    let cartaItems = JSON.parse(localStorage.getItem("cart")) || [];
    let itemIndex = cartaItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        cartaItems[itemIndex].quantity += 1;
    } else {
        cartaItems.push({
            id: itemId,
            price: itemPrice,
            title: itemTitle,
            imgUrl: ItemImg,
            quantity: 1
        })
    }
    localStorage.setItem("cart", JSON.stringify(cartaItems));
    updateCart(cartaItems)
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



