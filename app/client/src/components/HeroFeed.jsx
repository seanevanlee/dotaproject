import { useState, useEffect } from "react";
import HeroBlock from "./HeroBlock";

export default function HeroFeed() {
  // call a useEffect before the return render to only render all heroes at once when page first loads
  // use a fetch to call the url to back-end app, GET method as listed in the HTTP test
  const [heroPosts, setHeroPosts] = useState();

  useEffect(() => {
    async function fetchHeroPosts() {
      // store the return value of the function in a variable
      const response = await fetch("http://localhost:5173/api/hero-post", {
        method: "GET",
      });
      const data = await response.json();
      // intermediate state to get data into hero blocks
      setHeroPosts(data);
    }
    // after defining it as async above then call it again
    fetchHeroPosts();
  }, []);
  return (
    <div>
      {heroPosts
        ? heroPosts.map((heroPost, i) => (
            <HeroBlock
              key={i}
              heroName={heroPost.name}
              photoUrl={heroPost.photoUrl}
              heroUltimate={heroPost.ultimate}
            />
          ))
        : "LOADING..."}
      {/* //   <HeroBlock
    //     heroName={heroPosts[0].name}
    //     photoUrl={heroPosts[0].photoUrl}
    //     heroUltimate={heroPosts[0].ultimate}
    //   /> */}
      {/* <HeroBlock
        heroName={"Goku"}
        photoUrl={"https://i.imgur.com/kFPrWNl.jpeg"}
        heroUltimate={"Spirit bomb"}
      />
      <HeroBlock
        heroName={"Tom Brady"}
        photoUrl={"https://i.imgur.com/kFPrWNl.jpeg"}
        heroUltimate={"Retire many times"}
      /> */}
    </div>
  );
}
