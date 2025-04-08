import { useEffect, useState } from "react";
import Banner from "./Movies/Banner";
import Footer from "./Movies/Footer";
import MoviesContainerPage from "./Movies/MoviesContainerPage";
import { useNavigate } from "react-router-dom";
import Login from "./Auth/Login";

const Home = () => {
  const navigate = useNavigate();

  const [userinfo, setUserinfo] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userInfo")) {
      setUserinfo(true);
    } else {
      setUserinfo(false);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <section className="mt-[3px]">
        {userinfo ? (
          <>
            {/* if user login so show this part */}
            <Banner />
            <MoviesContainerPage />
            <Footer />
          </>
        ) : (
          // if user not login so show this part
          <Login />
        )}
      </section>
    </>
  );
};

export default Home;
