export const host: string = "https://ecommerce-backend-x85q.onrender.com"; 

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
