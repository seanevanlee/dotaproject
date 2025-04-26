import { useState } from "react";

export default function EditHeroForm({
  id,
  readHeroPosts,
  setMode,
  initialHeroName,
  initialPhotoUrl,
  initialHeroUltimate,
}) {
  // these states have the data
  // for useState, grab values from existing data so user does not have to re-type info for UX purposes
  const [heroName, setHeroName] = useState(initialHeroName);
  const [photoUrl, setPhotoUrl] = useState(initialPhotoUrl);
  const [heroUltimate, setHeroUltimate] = useState(initialHeroUltimate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/hero-post/${id}`, {
      headers: { "Content-Type": "application/json" },
      // the body of what is to be edited, coming from what's defined above
      method: "PUT",
      body: JSON.stringify({
        name: heroName,
        ultimate: heroUltimate,
        photoUrl: photoUrl,
      }),
    });

    // send new data to back-end
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    setMode("read");
    // create something that reads the heroes again
    readHeroPosts();
    // const data = await response.json();
    console.log("Hero edited!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <img className="h-28" src={photoUrl} />
      Name:
      <input
        type="text"
        onChange={(e) => {
          setHeroName(e.target.value);
        }}
        value={heroName}
      />
      Photo:
      <input
        type="text"
        onChange={(e) => {
          setPhotoUrl(e.target.value);
        }}
        value={photoUrl}
      />
      Ultimate:
      <input
        type="text"
        onChange={(e) => {
          setHeroUltimate(e.target.value);
        }}
        value={heroUltimate}
      />
      <button>Save</button>
    </form>
  );
}
