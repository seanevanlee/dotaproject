import { useState, useEffect } from "react";
import HeroBlock from "./HeroBlock";

export default function HeroFeed({ heroPosts }) {
  // call a useEffect before the return render to only render all heroes at once when page first loads
  // use a fetch to call the url to back-end app, GET method as listed in the HTTP test

  return (
    <div>
      {heroPosts
        ? heroPosts.map((heroPost, i) => (
            <HeroBlock
              key={i}
              id={heroPost.id}
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
