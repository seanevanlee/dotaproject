import { useState, useEffect } from "react";

export default function NewHeroForm() {
  const [name, setName] = useState();
  const [photoUrl, setPhotoUrl] = useState();
  const [ultimate, setUltimate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/hero-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, photoUrl, ultimate }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    // const data = await response.json();
    console.log("Hero submitted!");
  };

  useEffect(() => {
    console.log("hero name has changed");
  }, [name]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Grab value from text box */}
      Submit Hero Name:
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      Submit Photo:
      <input
        type="text"
        onChange={(e) => {
          setPhotoUrl(e.target.value);
        }}
        value={photoUrl}
      />
      Submit Ultimate Idea:
      <textarea
        onChange={(e) => {
          setUltimate(e.target.value);
        }}
        value={ultimate}
      ></textarea>
      <button>Submit</button>
    </form>
  );
}
