document.getElementById("checkoutForm")?.addEventListener("submit", async (e)=>{
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if(cart.length === 0){
    alert("Cart empty");
    return;
  }

  // calculate total
  const total = cart.reduce((sum,item)=>sum+item.price*(item.qty||1),0);

  try {
    const res = await fetch("https://shardha-backend.onrender.com/create-order",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({amount:total})
    });

    const order = await res.json();

    var options = {
      key: "QLkXSB0NgVBSik",
      amount: order.amount,
      currency: "INR",
      name: "Sharda Musical",
      order_id: order.id,

      handler: function(){
        localStorage.removeItem("cart");
        window.location.href="success.html";
      }
    };

    new Razorpay(options).open();

  } catch(err){
    alert("Payment error");
    console.error(err);
  }
});
