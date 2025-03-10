// import { useState } from "react";
import HeroBlock from "./HeroBlock";

export default function HeroFeed({ heroPosts, readHeroPosts }) {
  // call a useEffect before the return render to only render all heroes at once when page first loads
  // use a fetch to call the url to back-end app, GET method as listed in the HTTP test

  return (
    <div>
      {heroPosts
        ? heroPosts.map((heroPost, i) => (
            <HeroBlock
              readHeroPosts={readHeroPosts}
              key={i}
              id={heroPost.id}
              heroName={heroPost.name}
              photoUrl={heroPost.photoUrl}
              heroUltimate={heroPost.ultimate}
            />
          ))
        : "LOADING..."}
    </div>
  );
}
