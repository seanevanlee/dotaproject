import { useState } from "react";

export default function NewCommentForm({
  // a list of props
  heroPostId,
  readComments,
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/hero-post/${heroPostId}/comment`, {
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
    readComments();

    console.log("comment added!");
  };

  return (
    <form className="border border-b-black" onSubmit={handleSubmit}>
      Add a Comment:
      <textarea
        className="border border-b-black rounded p-4 w-48 resize-none field-sizing-content"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      ></textarea>
      <button>Add Comment</button>
    </form>
  );
}
