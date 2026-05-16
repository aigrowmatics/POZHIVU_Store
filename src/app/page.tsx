import { About, Benefits, FeaturedProducts, Hero, InstagramGallery, Newsletter, Testimonials } from "@/components/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <About />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
