import { useState } from "react";
import EditHeroForm from "./EditHeroForm";
import { useUser } from "@clerk/clerk-react";

// declare props below
export default function HeroBlock({
  userIdInClerk,
  id,
  heroName,
  photoUrl,
  heroUltimate,
  readHeroPosts,
}) {
  const [mode, setMode] = useState("read");
  // useUser will return an object with a property called User
  const { user, isLoaded, isSignedIn } = useUser();

  const handleDeleteClick = async () => {
    const response = await fetch(`/api/hero-post/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
    // create something that reads the heroes again
    readHeroPosts();
    // const data = await response.json();
    console.log("Hero deleted!");
  };

  const handleEditClick = async () => {
    setMode("edit");
  };

  return (
    <>
      {mode == "edit" ? (
        <EditHeroForm
          id={id}
          readHeroPosts={readHeroPosts}
          setMode={setMode}
          initialHeroName={heroName}
          initialPhotoUrl={photoUrl}
          initialHeroUltimate={heroUltimate}
        />
      ) : (
        <div>
          <div className="text-2xl">Hero Name: {heroName}</div>
          {isLoaded == true &&
          isSignedIn == true &&
          user.id == userIdInClerk ? (
            <>
              <button onClick={handleDeleteClick}>Delete</button>
              <button onClick={handleEditClick}>Edit</button>
            </>
          ) : (
            ""
          )}
          <img src={photoUrl} />
          <br />
          Hero Ultimate: {heroUltimate}
          <br />
        </div>
      )}
    </>
  );
}
