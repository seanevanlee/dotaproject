import { useState } from "react";
import EditHeroForm from "./EditHeroForm";
import { useUser } from "@clerk/clerk-react";
import NewHeroForm from "./NewHeroForm";
import NewCommentForm from "./NewCommentForm";
import { useEffect } from "react";
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
  const [comments, setComments] = useState([]);
  // useUser will return an object with a property called User
  const { user, isLoaded, isSignedIn } = useUser();

  async function fetchComments() {
    // store the return value of the function in a variable
    // give option to follow redirect
    const response = await fetch(`/api/hero-post/${id}/comment`, {
      method: "GET",
    });
    if (response.redirected) {
      window.location.href = response.url;
    }
    const data = await response.json();
    // intermediate state to get data into hero blocks
    setComments(data);
  }

  useEffect(() => {
    fetchComments();
  }, []);

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
          <div className="text-5xl">Hero Name: {heroName}</div>
          {isLoaded == true &&
          isSignedIn == true &&
          user.id == userIdInClerk ? (
            <>
              <button onClick={handleDeleteClick}>Delete</button>
              <br />
              <button onClick={handleEditClick}>Edit</button>
            </>
          ) : (
            ""
          )}
          <img className="w-2xl" src={photoUrl} />
          <br />
          Hero Ultimate: {heroUltimate}
          <br />
          <div>
            <NewCommentForm heroPostId={id} readComments={fetchComments} />

            {comments.map((comment, i) => {
              return (
                <div key={i}>
                  {comment.user.username}: {comment.message}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
