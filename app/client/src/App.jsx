// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import // SignedIn,
// SignedOut,
// SignInButton,
// UserButton,
// "@clerk/clerk-react";

import "./App.css";
import HeroFeed from "./components/HeroFeed";
import NewHeroForm from "./components/NewHeroForm";
import { useState, useEffect } from "react";

function App() {
  // const [count, setCount] = useState(0)
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
    // <header>
    //   <SignedOut>
    //     <SignInButton />
    //   </SignedOut>
    //   <SignedIn>
    //     <UserButton />
    //   </SignedIn>
    // </header>
    <>
      <header>DOTA HERO HEADER</header>
      <main>
        <HeroFeed heroPosts={heroPosts} />
        <NewHeroForm />
      </main>
      <footer>Footer test</footer>
    </>
  );
}

export default App;
