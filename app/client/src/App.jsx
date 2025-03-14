import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import HeroFeed from "./components/HeroFeed";
import NewHeroForm from "./components/NewHeroForm";
import { useState, useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const [heroPosts, setHeroPosts] = useState();

  async function fetchHeroPosts() {
    // store the return value of the function in a variable
    // give option to follow redirect
    const response = await fetch("http://localhost:5173/api/hero-post", {
      method: "GET",
    });
    if (response.redirected) {
      window.location.href = response.url;
    }
    const data = await response.json();
    // intermediate state to get data into hero blocks
    setHeroPosts(data);
  }

  useEffect(() => {
    // after defining it as async above then call it again
    fetchHeroPosts();
  }, []);

  // Dota logo on left, Clerk logo on right
  return (
    <>
      <header className="flex justify-center">
        <div className="flex justify-between container border border-gray-200 rounded p-4">
          <img className="size-9" src="https://i.imgur.com/NK6Ofjs.jpeg" />

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <br></br>

      <main className="flex justify-center">
        <div className="flex items-center container flex-col space-y-7">
          <NewHeroForm readHeroPosts={fetchHeroPosts} />

          <HeroFeed heroPosts={heroPosts} readHeroPosts={fetchHeroPosts} />
        </div>
      </main>
      <footer className="flex justify-center mt-8">
        <div className="flex items-center "></div>
        Created by Sean Lee
      </footer>
    </>
  );
}

export default App;
