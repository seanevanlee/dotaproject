import { useState, useEffect } from "react";
import uploadImage from "../utils/upload-image";

export default function NewHeroForm({ readHeroPosts }) {
  const [name, setName] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [ultimate, setUltimate] = useState();

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
      body: JSON.stringify({ name, photoUrl, ultimate }),
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
    <form
      className="border border-amber-700 rounded p-4"
      onSubmit={handleSubmit}
    >
      {/* Grab value from text box */}
      Submit Hero Name:
      <input
        className="border border-gray-200 rounded p-4"
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      Submit Photo:
      <input
        className="border border-gray-200 rounded p-4"
        type="file"
        onChange={(e) => {
          setPhotoFile(e.target.files[0]);
        }}
      />
      Submit Ultimate Idea:
      <textarea
        className="border border-gray-200 rounded p-4"
        onChange={(e) => {
          setUltimate(e.target.value);
        }}
        value={ultimate}
      ></textarea>
      <button>Submit</button>
    </form>
  );
}
