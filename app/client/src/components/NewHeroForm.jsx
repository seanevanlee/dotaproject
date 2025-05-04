import { useState, useEffect } from "react";
import uploadImage from "../utils/upload-image";

export default function NewHeroForm({ readHeroPosts }) {
  const [name, setName] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [ultimate, setUltimate] = useState();
  const [primaryAttribute, setPrimaryAttribute] = useState("STRENGTH");
  const [attackType, setAttackType] = useState("RANGED");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload the image before the hero post gets made
    // await the promise so that it does not run in a parallel thread
    // save the return value of the uploadImage function call in a variable

    const photoUrl = await uploadImage(photoFile);

    // submit the hero idea
    const response = await fetch(`/api/hero-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        photoUrl,
        ultimate,
        primaryAttribute,
        attackType,
      }),
    });

    // 'false' if error status code
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
    // create something that reads the heroes again, call the function
    readHeroPosts();
    // const data = await response.json();
    console.log("Hero submitted!");
  };

  useEffect(() => {
    console.log("hero name has changed");
  }, [name]);

  return (
    <form className="border border-b-black rounded p-4" onSubmit={handleSubmit}>
      {/* Grab value from text box */}
      Hero Name:
      <input
        className="border border-b-black rounded p-4"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      Photo:
      <input
        className="border border-gray-200 rounded p-4"
        type="file"
        onChange={(e) => {
          setPhotoFile(e.target.files[0]);
        }}
      />
      Ultimate Idea:
      <textarea
        className="border border-gray-200 rounded p-4 w-48 resize-none field-sizing-content"
        onChange={(e) => {
          setUltimate(e.target.value);
        }}
        value={ultimate}
      ></textarea>
      Primary Attribute{" "}
      <select
        className="border border-b-black rounded p-4"
        onChange={(e) => {
          setPrimaryAttribute(e.target.value);
        }}
        value={primaryAttribute}
      >
        <option value={"STRENGTH"}>Strength</option>
        <option value={"AGILITY"}>Agility</option>
        <option value={"INTELLIGENCE"}>Intelligence</option>
      </select>
      Attack Type{" "}
      <select
        className="border border-b-black rounded p-4"
        onChange={(e) => {
          console.log(e.target.value);
          setAttackType(e.target.value);
        }}
        value={attackType}
      >
        <option value={"RANGED"}>Ranged</option>
        <option value={"MELEE"}>Melee</option>
      </select>
      <button>Submit</button>
    </form>
  );
}
