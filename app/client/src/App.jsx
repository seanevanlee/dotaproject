// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import // SignedIn,
// SignedOut,
// SignInButton,
// UserButton,
// "@clerk/clerk-react";

import "./App.css";
import NewHeroForm from "./components/NewHeroForm";

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
      <header>DOTA HERO HEADER</header>
      <main>
        <NewHeroForm />
      </main>
      <footer>Footer test</footer>
    </>
  );
}

export default App;
