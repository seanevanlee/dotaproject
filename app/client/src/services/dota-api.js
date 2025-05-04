import { AttackType, PrimaryAttribute } from "@prisma/client";

// make a function that returns an array of all heroes, remember to use the API URL
async function getAllHeroes() {
  const response = await fetch(`/api/heroes`, {
    method: "GET",
  });

  /** @type {object[]} */
  const data = await response.json();

  return data;
}

/**
 * Returns 3 random matching heroes.
 *
 * @param {PrimaryAttribute} primaryAttribute
 * @param {AttackType} attackType
 */
export async function getRelatedHeroes(primaryAttribute, attackType) {
  const allHeroes = await getAllHeroes();
  const matchingHeroes = allHeroes.filter((hero) => {
    // if primaryAttribute (converted to OpenDota) is equal to hero.primaryAttribute
    // AND if attackType (converted to OpenDota) is equal to hero.attackType
    // return true
    // else return false

    return (
      primaryAttributeDbToOpenDota(primaryAttribute) == hero.primary_attr &&
      attackTypeDbToOpenDota(attackType) == hero.attack_type
    );
  });

  const relatedHeroes = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * matchingHeroes.length);
    if (matchingHeroes[randomIndex]) {
      relatedHeroes.push(matchingHeroes[randomIndex]);
    }
  }

  return relatedHeroes;
}

function primaryAttributeDbToOpenDota(primaryAttribute) {
  const map = {
    STRENGTH: "str",
    AGILITY: "agi",
    INTELLIGENCE: "int",
  };

  return map[primaryAttribute];
}

function attackTypeDbToOpenDota(attackType) {
  const map = {
    RANGED: "Ranged",
    MELEE: "Melee",
  };

  return map[attackType];
}
