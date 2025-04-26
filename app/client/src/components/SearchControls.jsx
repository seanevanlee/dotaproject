import { useState } from "react";

export default function SearchControls({ readHeroPosts }) {
  const handleSortChange = async (e) => {
    // create something that reads the heroes again
    // add a parameter to sort the hero posts
    // e.target.value to give value of selected option
    readHeroPosts({ sort: e.target.value, order: "desc" });
    // const data = await response.json();
    console.log("Heroes sorted");
  };
  return (
    <select onChange={handleSortChange}>
      <option value={"createdAt"}>Most Recent</option>
      <option value={"likes"}>Most Liked</option>
    </select>
  );
}
