class Spell {
  constructor(name) {
    this.name = name;
  }

  
async checkNFTPermission(user) {
    // Implement the permission check logic here
    throw new Error("checkNFTPermission method should be implemented");
  }
  async execute(user, squareId) {
    if (await this.checkNFTPermission(user)) {
      this.castSpell(squareId); // Perform the actual spell action
    } else {
      throw new Error("User does not have permission to execute this spell");
    }
  }

  castSpell(squareId) {
    // This should be overridden by subclasses to define specific spell action
    throw new Error("castSpell method should be overridden by subclasses");
  }
}
class DefensiveSpell extends Spell {
  constructor(name) {
    super(name);
  }
  // Additional methods specific to defensive spells can go here
}

class OffensiveSpell extends Spell {
  constructor(name) {
    super(name);
  }
  // Additional methods specific to offensive spells can go here
}
class CreatePlatform extends DefensiveSpell 
{
  constructor() 
  {
    super("Create Platform");
  }

  execute(squareId) 
  {
    $(`#${squareId}`).addClass("platform");
  }
}

class CreateTree extends DefensiveSpell 
{
  constructor() 
  {
    super("Create Tree");
  }

  execute(squareId) 
  {
    $(`#${squareId}`).addClass("tree");
  }
}

class BurnSquare extends OffensiveSpell {
  constructor() {
    super("Burn Square");
  }

  execute(squareId) {
    $(`#${squareId}`).addClass("burned");
  }
}


class CreatePlatform extends DefensiveSpell 
{
  constructor() 
  {
    super("Create Platform");
  }

  execute(squareId) 
  {
    $(`#${squareId}`).addClass("platform");
  }
}
const allSpells = {
  'Create Platform': new CreatePlatform(),
  'Burn Square': new BurnSquare();
  'Create Tree': new CreateTree();
  // ... instantiate other spells
};

// When a user tries to use a spell
async function attemptToCastSpell(user, spellName, squareId) {
  const spell = allSpells[spellName];
  if (!spell) {
    throw new Error("Spell does not exist");
  }
  await spell.execute(user, squareId);
}



export { Spell, DefensiveSpell, OffensiveSpell, CreatePlatform, BurnSquare };
