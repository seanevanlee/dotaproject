import { useState, useEffect } from "react";
import EditHeroForm from "./EditHeroForm";
// declare props below
export default function HeroBlock({
  id,
  heroName,
  photoUrl,
  heroUltimate,
  readHeroPosts,
}) {
  const [mode, setMode] = useState("read");

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
        <EditHeroForm id={id} readHeroPosts={readHeroPosts} />
      ) : (
        <div>
          <button onClick={handleDeleteClick}>Delete</button>
          <button onClick={handleEditClick}>Edit</button>
          Hero Name: {heroName}
          <br />
          Photo: {photoUrl} <br />
          Hero Ultimate: {heroUltimate}
          <br />
        </div>
      )}
    </>
  );
}
