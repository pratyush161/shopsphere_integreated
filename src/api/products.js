const PRODUCTS_API_URL = "https://dummyjson.com/products";

function classifyCategory(apiCategory) {
  if (apiCategory.startsWith("mens-")) return "men";
  if (apiCategory.startsWith("womens-")) return "women";
  return "all";
}

function normalizeProduct(product) {
  const discountPercent = Math.round(product.discountPercentage || 0);
  const salePrice = Number(product.price) || 0;
  const originalPrice = discountPercent >= 100
    ? salePrice
    : Math.round(salePrice / (1 - discountPercent / 100));

  return {
    id: String(product.id),
    sku: `DUMMY-${product.id}`,
    category: classifyCategory(product.category || ""),
    apiCategory: product.category || "uncategorized",
    name: product.title,
    brand: product.brand || "DummyJSON",
    collection: product.category || "Catalog",
    description: product.description,
    originalPrice,
    salePrice,
    discountPercent,
    currency: "USD",
    rating: Number(product.rating) || 0,
    reviewCount: Number(product.reviews?.length) || 0,
    stock: Number(product.stock) || 0,
    color: "—",
    material: "—",
    sizes: [],
    tags: Array.isArray(product.tags) ? product.tags : [],
    image: product.thumbnail || product.images?.[0] || "",
    shipping: product.shippingInformation || "Shipping information unavailable",
    returnPolicy: product.returnPolicy || "Return policy unavailable",
  };
}

export async function fetchProducts(signal) {
  const response = await fetch(PRODUCTS_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Products API request failed (${response.status})`);
  }

  const data = await response.json();

  if (!Array.isArray(data.products)) {
    throw new Error("Products API returned an unexpected response.");
  }

  return data.products.map(normalizeProduct);
}
