import React from "react";
import "./home.css";
import boyHome from "../../image/boyhome.png";
import girlHome from "../../image/girlhome.png";
const Home = () => {
  return (
    <div className="home">
      <div className="home-contianer">
        <section className="homeHeader">
          <div className="homeHead_img">
            <img src={girlHome} alt="" />
          </div>
          <aside className="home-head-text">
            <h1>About Tech House</h1>
            <span>
              this site is created for people who want to learn programming, on
              this site you can do exercise and earn scores. if you need support
              you can contact us. on this site you can upload codes and share it
              to friends, also if you are beginner and you want to start
              learning, you can find good advices about videos and books.
            </span>
          </aside>
        </section>
        <section className="homeBottom">
          <aside className="home-bottom-text">
            <h1>Rate system</h1>
            <span>
              you can earn scores by posts which is uploaded by 10 level
              members. you have rate system which is depend on difficulty of
              exercise. you can rate post with 5, 10 or 15 score. when you do
              exercise link of code would be uploaded in comments, author of
              post will rate your exercise between 1-5 stars. each star will be
              multipled on score of post, this way you will earn and collect xp
              and reach higher level. when you will be 10 level, you would be
              allowed to upload posts. Lorem Ipsum.
            </span>
          </aside>
          <div className="homeBottom-img">
            <img src={boyHome} alt="" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
