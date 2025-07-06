      // Sample order data
      const orders = [
        {
          id: 1,
          items: [
            { name: "Pizza", quantity: 2 },
            { name: "Garlic Bread", quantity: 1 },
          ],
          totalPrice: 25.99,
          status: "Delivered",
        },
        {
          id: 2,
          items: [{ name: "Burger", quantity: 1 }],
          totalPrice: 10.99,
          status: "In Transit",
        },
        {
          id: 3,
          items: [
            { name: "Salad", quantity: 3 },
            { name: "Juice", quantity: 2 },
          ],
          totalPrice: 18.99,
          status: "Pending",
        },
      ];
      let orderCardsEle = document.getElementById("order-cards");
      orderCardsEle.innerHTML=orders.map((order)=>createOrder(order)).join("")
      

      function createOrder(order){
        return `
        <div class="order-card">
            <div class="order-header">
                <span class="order-number">Order #${order.id}</span>
            </div>
            <div class="order-details">
                ${
                    order.items.map((item)=>{
                        return `<div class="order-details-item">
                        <span>${item.name}</span>
                        <span>${item.quantity}</span>
                    </div>`
                    }).join("")
                }
                    
                
            </div>
            <div class="order-total">Total: $${order.totalPrice}</div>
            <span class="order-status status-${order.status.toLowerCase().replace(" ","-")}">
            ${order.status}
            </span>
        </div>
        `
      }