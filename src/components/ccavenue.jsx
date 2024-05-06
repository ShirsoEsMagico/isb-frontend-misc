import React from "react";

const CCAvenueGatewayComponent = () => {
  const renderCCAvenueGateway = async (data) => {
    const apiUrl = "http://127.0.0.1:8080/api/v2/ccavRequestHandler";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        merchant_id: "136828",
        order_id: data.notes.receipt,
        currency: "INR",
        amount: data.amount,
        redirect_url: "http://127.0.0.1:8080/api/v2/ccavResponseHandler",
        cancel_url: "https://localhost:5173/payment",
        language: "EN",
        billing_name: "",
        billing_address: "",
        billing_city: "",
        billing_state: "",
        billing_zip: "",
        billing_country: "",
        billing_tel: "",
        billing_email: "",
        delivery_name: "",
        delivery_address: "",
        delivery_city: "",
        delivery_state: "",
        delivery_zip: "",
        delivery_country: "",
        delivery_tel: "",
        merchant_param1: "",
        merchant_param2: "",
        merchant_param3: "",
        merchant_param4: "",
        merchant_param5: "",
        promo_code: "",
        customer_identifier: "",
      }),
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const htmlContent = await response.text();
      const newWindow = window.open("", "_blank");
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClick = () => {
    const data = {
      notes: { receipt: "12345" },
      amount: 100,
    };

    renderCCAvenueGateway(data);
  };

  return (
    <div>
      <button onClick={handleClick}>Proceed to Payment</button>
    </div>
  );
};

export default CCAvenueGatewayComponent;
