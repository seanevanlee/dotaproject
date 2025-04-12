// import { useState } from "react";
import HeroBlock from "./HeroBlock";

export default function HeroFeed({ heroPosts, readHeroPosts }) {
  // call a useEffect before the return render to only render all heroes at once when page first loads
  // use a fetch to call the url to back-end app, GET method as listed in the HTTP test
  console.log(heroPosts);
  return (
    <div className="border border-b-blue-950 rounded p-4">
      {heroPosts
        ? heroPosts.map((heroPost, i) => (
            <HeroBlock
              userIdInClerk={heroPost.user.idInClerk}
              readHeroPosts={readHeroPosts}
              key={i}
              id={heroPost.id}
              heroName={heroPost.name}
              photoUrl={heroPost.photoUrl}
              heroUltimate={heroPost.ultimate}
              likes={heroPost.likes}
            />
          ))
        : "LOADING..."}
    </div>
  );
}
