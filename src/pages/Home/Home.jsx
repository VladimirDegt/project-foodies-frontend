import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetTestimonialsQuery } from "../../store/services/testimonialService.js";
import { TestimonialsSwiper } from "src/components";
import Hero from "../../components/Hero";
import { Loader } from "../../components/shared/Loader/Loader.jsx";
import { Categories } from "src/components/Categories/Categories.jsx";
import styles from "./styles.module.css";

const Home = () => {
  const location = useLocation();
  const [getTestimanials, setGetTestimanials] = useState([]);
  const { data: testimonials, isLoading, error: isError } = useGetTestimonialsQuery();

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      setGetTestimanials(testimonials);
    }
  }, [testimonials]);

  return (
    <>
      <Hero />
      <div className={styles.hero_container}>
        {location.pathname === "/" ? <Categories /> : <Outlet />}
        {isLoading ? (
          <Loader />
        ) : !isError ? (
          <TestimonialsSwiper getTestimanials={getTestimanials} />
        ) : (
          <p>Oops! Testimonials doesnt work now </p>
        )}
      </div>
    </>
  );
};

export default Home;
