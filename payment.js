document.getElementById("payBtn")?.addEventListener("click", async () => {

  const amount = 12000; // get dynamic amount from cart or product

  const res = await fetch("http://localhost:5000/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  const order = await res.json();

  var options = {
    key: "YOUR_KEY_ID",
    amount: order.amount,
    currency: "INR",
    name: "Sharda Musical",
    description: "Purchase Payment",
    order_id: order.id,

    handler: function (response) {
      alert("Payment Successful!");
      console.log(response);
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
