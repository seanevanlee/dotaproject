import { useState, useEffect } from "react";

// declare props below
export default function HeroBlock({ id, heroName, photoUrl, heroUltimate }) {
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/hero-post/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
    // create something that reads the heroes again
    // const data = await response.json();
    console.log("Hero deleted!");
  };

  return (
    <div>
      <button onClick={handleClick}>Delete</button>
      Hero Name: {heroName}
      <br />
      Photo: {photoUrl} <br />
      Hero Ultimate: {heroUltimate}
      <br />
    </div>
  );
}
