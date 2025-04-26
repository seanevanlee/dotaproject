import { useState } from "react";
import EditHeroForm from "./EditHeroForm";
import { useUser } from "@clerk/clerk-react";
import NewHeroForm from "./NewHeroForm";
import NewCommentForm from "./NewCommentForm";
import { useEffect } from "react";
import { Prisma } from "@prisma/client";
import { ListBucketsCommand } from "@aws-sdk/client-s3";
// declare props below
export default function HeroBlock({
  userIdInClerk,
  id,
  heroName,
  photoUrl,
  heroUltimate,
  readHeroPosts,
  likes,
}) {
  const [mode, setMode] = useState("read");
  const [comments, setComments] = useState([]);
  // useUser will return an object with a property called User
  const { isLoaded, isSignedIn } = useUser();
  const [user, setUser] = useState();

  // useEffect with a fetch to send a request to API
  async function fetchCurrentUser() {
    // store the return value of the function in a variable
    // give option to follow redirect
    const response = await fetch(`/api/current-user`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
    const data = await response.json();
    // intermediate state to get data into hero blocks
    setUser(data);
  }

  useEffect(() => {
    fetchCurrentUser();

    // leave the dependency array blank since the code is only ran once
  }, []);

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

  // change the mode of the form to edit mode
  const handleEditClick = async () => {
    setMode("edit");
  };

  const handleLikeClick = async () => {
    const response = await fetch(`/api/hero-post/${id}/like`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
    readHeroPosts();
    console.log("like created");
  };

  const handleUnlikeClick = async () => {
    const response = await fetch(`/api/hero-post/${id}/unlike`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error("Something went wrong. Please try again.");
    }
    readHeroPosts();
    console.log("like removed");
  };
  console.log(user);
  console.log(user?.id);
  console.log(userIdInClerk);

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
          user &&
          user.idInClerk == userIdInClerk ? (
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
          Like Count: {likes.length}
          <br />
          {user && hasUserLikedHeroPost(user, likes) ? (
            <button onClick={handleUnlikeClick}>👍</button>
          ) : (
            <button onClick={handleLikeClick}>👍</button>
          )}
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

/**
 * if this user has a like in this array of likes then the function returns true; otherwise it is false
 * @param {Prisma.UserGetPayload} user
 * @param {Prisma.LikeGetPayload[]} likes
 *
 */
function hasUserLikedHeroPost(user, likes) {
  // console.log("user: ", user);
  // console.log("likes: ", likes);
  // For each of the likes
  for (let i = 0; i < likes.length; i++) {
    // If its userId property matches user.id
    if (likes[i].userId == user.id) {
      return true;
    }
  } // Return true

  return false;
}
