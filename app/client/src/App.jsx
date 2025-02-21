// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import // SignedIn,
// SignedOut,
// SignInButton,
// UserButton,
// "@clerk/clerk-react";

import "./App.css";
import { Hero } from "./components/Hero";

function App() {
  // const [count, setCount] = useState(0)

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
      <header>Header test</header>
      <main>
        <Hero />
        <Hero />
        <Hero />
        <Hero />
        <Hero />
        <Hero />
      </main>
      <footer>Footer test</footer>
    </>
  );
}

export default App;
