import { useState } from "react";
import HeroBlock from "./HeroBlock";

export default function NewCommentForm({
  // a list of props
  heroPostId,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/hero-posts/${heroPostId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }

    // create something that reads the heroes again
    // readComments();
    // const data = await response.json();
    console.log("comment added!");
  };

  return (
    <form
      className="border border-amber-700 rounded p-4"
      onSubmit={handleSubmit}
    >
      Add a Comment:
      <textarea
        className="border border-gray-200 rounded p-4 w-48 resize-none field-sizing-content"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      ></textarea>
      <button>Add Comment</button>
    </form>
  );
}
