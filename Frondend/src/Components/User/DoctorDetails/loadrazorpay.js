export const loadScript = async (toast) => {
  try {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
    });
  } catch (error) {
    console.error("Failed to load the Razorpay script.");
    toast.error("Payment gateway is not available. Please try again later.");
  }
};
