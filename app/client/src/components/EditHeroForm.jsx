import { useState } from "react";

export default function EditHeroForm({ id, readHeroPosts }) {
  const [heroName, setHeroName] = useState("");
  const handleSubmit = async () => {
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

  return (
    <form onSubmit={handleSubmit}>
      Name:
      <input
        type="text"
        onChange={(e) => {
          setHeroName(e.target.value);
        }}
        value={heroName}
      />
      <button>Save</button>
    </form>
  );
}
