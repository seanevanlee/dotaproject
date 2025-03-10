// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import "./App.css";
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

  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <header>DOTA HERO HEADER</header>

      <main>
        <HeroFeed heroPosts={heroPosts} readHeroPosts={fetchHeroPosts} />
        <NewHeroForm readHeroPosts={fetchHeroPosts} />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
