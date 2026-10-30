const categoryImages = {
  "Veg Noodles":
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80",
  "Non-Veg Noodles":
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80",
  "Veg Fried Rice":
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80",
  "Non-Veg Fried Rice":
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80",
  Manchurian:
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80",
  "Cool Drinks":
    "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80",
};

export const getFoodImage = (category) =>
  categoryImages[category] || categoryImages["Veg Noodles"];

const menu = [
  // Veg Noodles
  ["Veg Hakka Noodles", "Veg Noodles", 119],
  ["Veg Schezwan Noodles", "Veg Noodles", 129],
  ["Veg Singapore Noodles", "Veg Noodles", 149],
  ["Veg Chilli Garlic Noodles", "Veg Noodles", 139],
  ["Veg Manchurian Noodles", "Veg Noodles", 149],
  ["Veg Hong Kong Noodles", "Veg Noodles", 149],
  ["Veg Triple Noodles", "Veg Noodles", 169],
  ["Veg American Chopsuey", "Veg Noodles", 159],
  ["Veg Garlic Noodles", "Veg Noodles", 129],
  ["Veg Special Noodles", "Veg Noodles", 169],

  // Non-Veg Noodles
  ["Chicken Hakka Noodles", "Non-Veg Noodles", 159],
  ["Chicken Schezwan Noodles", "Non-Veg Noodles", 169],
  ["Egg Hakka Noodles", "Non-Veg Noodles", 139],
  ["Egg Schezwan Noodles", "Non-Veg Noodles", 149],
  ["Chicken Chilli Garlic Noodles", "Non-Veg Noodles", 169],
  ["Chicken Singapore Noodles", "Non-Veg Noodles", 179],
  ["Chicken Manchurian Noodles", "Non-Veg Noodles", 179],
  ["Double Egg Noodles", "Non-Veg Noodles", 149],
  ["Chicken Triple Noodles", "Non-Veg Noodles", 199],
  ["Special Chicken Noodles", "Non-Veg Noodles", 189],

  // Veg Fried Rice
  ["Veg Fried Rice", "Veg Fried Rice", 129],
  ["Veg Schezwan Fried Rice", "Veg Fried Rice", 139],
  ["Veg Singapore Fried Rice", "Veg Fried Rice", 149],
  ["Veg Garlic Fried Rice", "Veg Fried Rice", 139],
  ["Veg Manchurian Fried Rice", "Veg Fried Rice", 159],
  ["Veg Hong Kong Fried Rice", "Veg Fried Rice", 149],
  ["Veg Triple Fried Rice", "Veg Fried Rice", 169],
  ["Paneer Fried Rice", "Veg Fried Rice", 169],
  ["Veg Chilli Fried Rice", "Veg Fried Rice", 139],
  ["Special Veg Fried Rice", "Veg Fried Rice", 179],

  // Non-Veg Fried Rice
  ["Chicken Fried Rice", "Non-Veg Fried Rice", 169],
  ["Chicken Schezwan Fried Rice", "Non-Veg Fried Rice", 179],
  ["Egg Fried Rice", "Non-Veg Fried Rice", 139],
  ["Egg Schezwan Fried Rice", "Non-Veg Fried Rice", 149],
  ["Chicken Garlic Fried Rice", "Non-Veg Fried Rice", 179],
  ["Chicken Singapore Fried Rice", "Non-Veg Fried Rice", 189],
  ["Chicken Manchurian Fried Rice", "Non-Veg Fried Rice", 199],
  ["Mixed Fried Rice", "Non-Veg Fried Rice", 199],
  ["Chicken Triple Fried Rice", "Non-Veg Fried Rice", 209],
  ["Special Chicken Fried Rice", "Non-Veg Fried Rice", 199],

  // Manchurian
  ["Veg Manchurian Dry", "Manchurian", 129],
  ["Veg Manchurian Gravy", "Manchurian", 139],
  ["Gobi Manchurian", "Manchurian", 139],
  ["Paneer Manchurian", "Manchurian", 169],
  ["Mushroom Manchurian", "Manchurian", 159],
  ["Baby Corn Manchurian", "Manchurian", 149],
  ["Schezwan Veg Manchurian", "Manchurian", 149],
  ["Crispy Veg Manchurian", "Manchurian", 149],
  ["Chilli Paneer", "Manchurian", 179],
  ["Special Veg Manchurian", "Manchurian", 179],

  // Cool Drinks
  ["Coca-Cola", "Cool Drinks", 40],
  ["Sprite", "Cool Drinks", 40],
  ["Thums Up", "Cool Drinks", 40],
  ["Fanta", "Cool Drinks", 40],
  ["Limca", "Cool Drinks", 40],
  ["Fresh Lime Soda", "Cool Drinks", 49],
  ["Lemon Soda", "Cool Drinks", 49],
  ["Mango Drink", "Cool Drinks", 45],
  ["Iced Tea", "Cool Drinks", 69],
  ["Cold Coffee", "Cool Drinks", 89],
];

export const products = menu.map(([name, category, price], index) => ({
  id: String(index + 1),
  name,
  category,
  price,
  rating: Number((4.1 + (index % 9) * 0.1).toFixed(1)),
  featured: index < 8 || (index >= 20 && index < 24),
  image: getFoodImage(category),
  description: `${name} freshly prepared for your FoodieExpress order.`,
}));

export default products;