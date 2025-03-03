import { useState, useEffect } from "react";

// declare props below
export default function HeroBlock({ heroName, photoUrl, heroUltimate }) {
  return (
    <div>
      Hero Name: {heroName}
      <br />
      Photo: {photoUrl} <br />
      Hero Ultimate: {heroUltimate}
      <br />
    </div>
  );
}
