export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAt: number;
  rating: number;
  image: string;
  notes: string[];
  description: string;
};

export const products: Product[] = [
  {
    id: "rose-soap",
    slug: "rose-soap",
    name: "Rose Soap",
    tagline: "Petal-soft radiance for daily bathing",
    price: 349,
    compareAt: 449,
    rating: 4.9,
    image: "/Products/rose_soap1.jpeg",
    notes: ["Rose extract", "Donkey milk", "Shea butter"],
    description: "A creamy bar enriched with donkey milk and rose botanicals for a gentle, luminous cleanse."
  },
  {
    id: "mint-soap",
    slug: "mint-soap",
    name: "Mint Soap",
    tagline: "Cooling clarity with a crisp herbal finish",
    price: 329,
    compareAt: 429,
    rating: 4.8,
    image: "/Products/Mint_soap.jpeg",
    notes: ["Mint leaf", "Donkey milk", "Olive oil"],
    description: "A refreshing, low-toxin cleansing bar designed for humid mornings and post-workday renewal."
  },
  {
    id: "nargis-soap",
    slug: "nargis-soap",
    name: "Nargis Soap",
    tagline: "Floral calm with a polished luxury lather",
    price: 379,
    compareAt: 499,
    rating: 4.9,
    image: "/Products/Nargis_soap.jpeg",
    notes: ["Nargis accord", "Donkey milk", "Coconut oil"],
    description: "A limited floral blend made for evening rituals and gifting."
  },
  {
    id: "coco-soap",
    slug: "coco-soap",
    name: "Coco Soap",
    tagline: "Cushioning cleanse for dry, tired skin",
    price: 339,
    compareAt: 439,
    rating: 4.7,
    image: "/Products/Coco_soap.jpeg",
    notes: ["Coconut milk", "Donkey milk", "Cocoa butter"],
    description: "A rich bar with coconut and milk proteins to leave skin feeling supple without heaviness."
  },
  {
    id: "lavender-soap",
    slug: "lavender-soap",
    name: "Lavender Soap",
    tagline: "Quiet comfort for a slow night ritual",
    price: 359,
    compareAt: 469,
    rating: 4.9,
    image: "/Products/Lavendar_soap.jpeg",
    notes: ["Lavender", "Donkey milk", "Almond oil"],
    description: "A tranquil lavender bar that turns ordinary baths into a soft wellness ritual."
  },
  {
    id: "plain-soap",
    slug: "plain-soap",
    name: "Plain Soap",
    tagline: "Minimal, creamy care for sensitive skin",
    price: 299,
    compareAt: 399,
    rating: 4.8,
    image: "/Products/Plain_soap.jpeg",
    notes: ["Unscented", "Donkey milk", "Glycerin"],
    description: "A fragrance-light everyday bar made for sensitive skin and family use."
  },
  {
    id: "all-products",
    slug: "all-products",
    name: "All Products",
    tagline: "Discover our complete range of natural soaps",
    price: 199,
    compareAt: 299,
    rating: 4.8,
    image: "/Products/All_products.jpeg",
    notes: ["Unscented", "Donkey milk", "Glycerin"],
    description: "All the benefits of our natural soap range in one convenient set."
}
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
