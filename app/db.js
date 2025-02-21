/** @type {{ heroName: string, heroUltimate: string, imageUrl: string }[]} */
let heroPosts = [];
let idCounter = 1;

export function createHeroPost({ heroName, heroUltimate, imageUrl }) {
  const heroPost = {
    id: idCounter,
    heroName,
    heroUltimate,
    imageUrl,
  };
  heroPosts.push(heroPost);

  idCounter++;

  return { id: heroPost.id, heroName, heroUltimate, imageUrl };
}

export function updateHeroPost(id, { heroName, heroUltimate, imageUrl }) {
  const index = heroPosts.findIndex((x) => x.id == id);

  heroPosts[index] = { id, heroName, heroUltimate, imageUrl };
}

export function deleteHeroPost(id) {
  heroPosts = heroPosts.filter((x) => {
    return x.id != id;
  });
}
export function getAllHeroPosts() {
  return heroPosts;
}

export function getHeroPost(id) {
  return heroPosts.find((x) => x.id == id);
}
