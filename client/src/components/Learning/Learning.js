import React from "react";
import "./style.css";
import learn1 from "../../image/Blue and White Corporate E-Learning Twitter Post (1).svg";
import learn3 from "../../image/Laptop Computer Illustration Instagram posts.svg";
const Learning = () => {
  return (
    <div className="learning-contianer">
      <div className="learning-url">
        <img src={learn1} alt="" className="lerning-img" />
        <section>
          <div className="link">
            <h1>Training aids</h1>
            <a href="https://developer.mozilla.org/en-US/">MDN Web Docs</a>
            <span>
              The MDN Web Docs site provides information about Open Web
              technologies including HTML, CSS, and APIs for both Web sites and
              progressive web apps.
            </span>
          </div>
          <div className="link">
            <a href="https://www.w3schools.com/">
              W3Schools Free Online Web Tutorials
            </a>
            <span>
              W3Schools offers free online tutorials, references and exercises
              in all the major languages of the web. Covering popular subjects
              like HTML, CSS, JavaScript, Python, SQL, Java, and many, many
              more.
            </span>
          </div>
          <div className="link">
            <a href="https://www.freecodecamp.org/news">freeCodeCamp</a>
            <span>
              Browse thousands of programming tutorials written by experts.
              Learn Web Development, Data Science, DevOps, Security, and get
              developer career advice.
            </span>
          </div>
          <div className="link">
            <a href="https://www.w3.org/">World Wide Web Consortium (W3C)</a>
            <span>
              The World Wide Web Consortium (W3C) is an international community
              where Member organizations, a full-time staff, and the public work
              together to develop Web standards.
            </span>
          </div>
          <div className="link">
            <a href="https://www.geeksforgeeks.org/">GeeksforGeeks</a>
            <span>GeeksforGeeks | A computer science portal for geeks</span>
          </div>
        </section>
      </div>

      <div className="learning-youtuber">
        <section>
          <h1 style={{ color: "red" }}>Youtuber</h1>
          <div className="link">
            <a href="https://www.youtube.com/c/WebDevSimplified/videos">
              Web Dev Simplified
            </a>
            <span>
              Web Dev Simplified is all about teaching web development skills
              and techniques in an efficient and practical manner. If you are
              just getting started in web development Web Dev Simplified has all
              the tools you need to learn the newest and most popular
              technologies to convert you from a no stack to full stack
              developer. Web Dev Simplified also dee...
            </span>
          </div>
          <div className="link">
            <a href="https://www.youtube.com/c/Fireship">Fireship</a>
            <span>
              High-intensity ⚡ code tutorials to help you build & ship your app
              faster. Subscribe for new videos every week covering intermediate
              to advanced lessons about JavaScript, Flutter, Firebase, and
              modern app development. The original home of #100SecondsOfCode and
              #CodeThisNotThat. Created by Jeff Delaney. Building an app? Get
              project support, adv...
            </span>
          </div>
          <div className="link">
            <a href="https://www.youtube.com/c/programmingwithmosh">
              Programming with Mosh
            </a>
            <span>
              i train professional software engineers that companies love to
              hire. My courses: http://codewithmosh.com My blog:
              http://programmingwithmosh.com Connect on social media:
              http://www.twitter.com/moshhamedani
              https://www.facebook.com/programmingwithmosh #python #javascript
              #chsarp
            </span>
          </div>
          <div className="link">
            <a href="https://www.youtube.com/c/JavaScriptMastery">
              JavaScript Mastery
            </a>
            <span>
              The purpose of JavaScript Mastery is to help aspiring developers
              in pursuit of taking their development skills to the next level.
              On this channel, you'll find videos on various topics from the web
              development world. We primarily focus on JavaScript, React, and
              Next.js
            </span>
          </div>
          <div className="link">
            <a href="https://www.youtube.com/user/AlgoRythmics">AlgoRythmics</a>
            <span>Musically explained algorithms</span>
          </div>
        </section>
        <img src={learn3} alt="" />
      </div>
    </div>
  );
};

export default Learning;
