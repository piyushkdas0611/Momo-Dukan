import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  useEffect(() => {
    // Apply the CSS to prevent scrolling on component mount
    document.body.style.overflow = "hidden";

    // Clean up the CSS when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="home">
      <div className="container">
        <h1>MOMO DUKAN</h1>
        <p>
          Momo, the delightful dumpling of the Himalayas, is a culinary
          masterpiece that has captured the hearts and taste buds of food
          enthusiasts worldwide. Originating from the beautiful regions of Nepal
          and Tibet, momo has found its way into the hearts of people across
          South Asia and beyond. These exquisite bite-sized dumplings are a
          celebration of flavors, bringing together a perfect harmony of taste,
          texture, and aroma. Traditionally filled with succulent meat, such as
          chicken, pork, or lamb, or with an assortment of vegetables for the
          herbivores, momos cater to diverse palates, making them a universal
          favorite.
        </p>
        <p>
          Momo is more than just a dish; it's a cultural icon that brings people
          together. It is the centerpiece of family gatherings, street food
          festivals, and cozy evenings with friends. The joy of sharing a plate
          of steaming hot momos, accompanied by a tangy dipping sauce, is an
          experience that creates cherished memories. As the popularity of momo
          continues to grow, innovative variations have emerged, showcasing the
          versatility of this humble dumpling. Fusion momos infused with unique
          spices and creative fillings have added new dimensions to the
          traditional recipe, appealing to adventurous foodies seeking novel
          gastronomic experiences.
        </p>
        <div className="btn">
        <Link to="/login"><button>Login</button></Link>
          <p>
            Or Take out <span>Couple Discount Available!</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
