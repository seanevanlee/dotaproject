/** @type {{ heroName: string, heroUltimate: string, imageUrl: string }[]} */
const heroPosts = [];

export function createHeroPost({ heroName, heroUltimate, imageUrl }) {
  heroPosts.push({
    id: heroPosts.length + 1,
    heroName,
    heroUltimate,
    imageUrl,
  });
  return { id: heroPosts.length, heroName, heroUltimate, imageUrl };
}

export function updateHeroPost(id, { heroName, heroUltimate, imageUrl }) {
  const index = heroPosts.findIndex((x) => x.id == id);

  heroPosts[index] = { heroName, heroUltimate, imageUrl };
}

export function getAllHeroPosts() {
  return heroPosts;
}

export function getHeroPost(id) {
  return heroPosts.find((x) => x.id == id);
}
