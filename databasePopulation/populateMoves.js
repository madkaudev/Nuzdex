#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

// Retrieve model
const Move = require("../models/move.js");

// Create array for records
const moves = [];

// Set up mongoDB connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = userArgs[0];
main().catch((err) => console.log(err));
async function main() {
    console.log("Connecting to the database.");
    await mongoose.connect(mongoDB);
    console.log("Creating moves.");
    await createMoves();
    console.log("Closing connection.");
    mongoose.connection.close();
}

// Create a record of a move
async function moveCreate(index, generation, name, type, category, pp, power, accuracy, description, effect, effectRate, critRate, priority, target) {
    // Create move instance
    const moveDetail = { 
        generation: generation, 
        name: name, 
        type: type, 
        category: category, 
        pp: pp, 
        power: power,
        accuracy: accuracy,
        description: description, 
        effect: effect,
        effectRate: effectRate,
        critRate: critRate,
        priority: priority, 
        target: target 
    };

    // Save move
    const move = new Move(moveDetail);
    await move.save();
    moves[index] = move;
    console.log(`Added move: Gen ${move.generation} ${move.name}`);
}

// Populate moves
async function createMoves() {
    console.log("Adding moves...")
    await Promise.all([
        moveCreate(0,1,"Absorb","Grass","Special",20,20,100,"A GRASS-type attack. It adds half the HP it drained from the target to the attacker's HP.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(1,1,"Acid","Poison","Physical",30,40,100,"A POISON-type attack. Has a one-in-three chance of lowering the target's DEFENSE.","N/A",33,"N/A",0,"All opponent Pokemon in range"),
        moveCreate(2,1,"Acid Armor","Poison","Status",40,"N/A","N/A","Melts the user's body for protection. A move that sharply raises DEFENSE.","N/A","N/A","N/A",0,"User"),
        moveCreate(3,1,"Agility","Psychic","Status",30,"N/A","N/A","A special technique that greatly boosts the user's SPEED. Can normally be used up to three times.","N/A","N/A","N/A",0,"User"),
        moveCreate(4,1,"Amnesia","Psychic","Status",20,"N/A","N/A","Sharply raises the user's SPECIAL stat. Also increases protection against special attacks.","N/A","N/A","N/A",0,"User"),
        moveCreate(5,1,"Aurora Beam","Ice","Special",20,65,100,"An ICE-type attack. Has a one-in-three chance of reducing the target's ATTACK power.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(6,1,"Barrage","Normal","Physical",20,15,85,"Several spheres are thrown consecutively at the target to inflict damage.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(7,1,"Barrier","Psychic","Status",30,"N/A","N/A","Instantly forms a barrier between the user and the opponent. DEFENSE is sharply increased.","N/A","N/A","N/A",0,"User"),
        moveCreate(8,1,"Bide","Normal","Status",10,"N/A","N/A","The user waits for several turns. At the end, it returns double the damage it received.","N/A","N/A","N/A",1,"User"),
        moveCreate(9,1,"Bind","Normal","Physical",20,15,75,"Traps and squeezes the target over several turns. The target cannot move while under attack.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(10,1,"Bite","Normal","Physical",25,60,100,"A bite made using sharp fangs. This may cause the opponent to flinch, and it might not attack.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(11,1,"Blizzard","Ice","Special",5,120,90,"The strongest ICE-type attack. Has a one-in-ten chance of freezing the target solid.","N/A",10,"N/A",0,"All opponent Pokemon in range"),
        moveCreate(12,1,"Body Slam","Normal","Physical",15,85,100,"A NORMAL-type attack. Has a one-in-three chance of paralyzing the target if it connects.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(13,1,"Bone Club","Ground","Physical",20,65,85,"A physical attack using a bone as a club. If it connects, it may cause the target to flinch.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(14,1,"Bonemerang","Ground","Physical",10,50,90,"A boomerang made of bone is thrown to inflict damage twice -- on the way out and on its return.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(15,1,"Bubble","Water","Special",30,20,100,"A WATER-type attack. Has a one-in-three chance of reducing the target's SPEED.","N/A",30,"N/A",0,"All opponent Pokemon in range"),
        moveCreate(16,1,"Bubble Beam","Water","Special",20,65,100,"A WATER-type attack. Has a one-in-three chance of reducing the target's SPEED.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(17,1,"Clamp","Water","Special",10,35,75,"The target is gripped in the attacker's shell for two to five turns. It can't move while under attack.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(18,1,"Comet Punch","Normal","Physical",15,18,85,"Although each slap is weak, this attack hits the target two to five times in succession.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(19,1,"Confuse Ray","Ghost","Status",10,"N/A","N/A","A sinister flash of light makes the target confused. A special GHOST-type technique.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(20,1,"Confusion","Psychic","Special",25,50,100,"A PSYCHIC-type attack. Has a one-in-ten chance of leaving the target confused.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(21,1,"Constrict","Normal","Physical",35,10,100,"A NORMAL-type attack. Has a one-in-three chance of reducing the target's SPEED.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(22,1,"Conversion","Normal","Status",30,"N/A","N/A","A special move that switches the user's elemental type to that of the target.","N/A","N/A","N/A",0,"User"),
        moveCreate(23,1,"Counter","Fighting","Physical",20,"N/A",100,"A retaliation move that pays back double the damage of a physical attack. Highly accurate.","N/A","N/A","N/A",-5,"Special"),
        moveCreate(24,1,"Crabhammer","Water","Special",10,90,85,"A move that is used only by Pokemon with pincers. Likely to get a critical hit.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(25,1,"Cut","Normal","Physical",30,50,95,"A NORMAL-type attack. Also used for cutting small bushes to open new paths.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(26,1,"Defense Curl","Normal","Status",40,"N/A","N/A","Raises the user's DEFENSE. Can normally be used up to six times in a row.","N/A","N/A","N/A",0,"User"),
        moveCreate(27,1,"Dig","Ground","Physical",10,100,100,"The attacker digs underground in the first turn, then pops up in the next turn to attack.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(28,1,"Disable","Normal","Status",20,"N/A","N/A","A technique that disables one of the target's moves. The disabled move can't be used until it wears off.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(29,1,"Dizzy Punch","Normal","Physical",10,70,100,"A NORMAL-type attack. The punch is relatively strong and highly accurate.","N/A",20,"N/A",0,"Selected target"),
        moveCreate(30,1,"Double-Edge","Normal","Physical",15,100,100,"A charging tackle attack. One quarter of the damage it inflicts comes back to hurt the attacker.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(31,1,"Double Kick","Fighting","Physical",30,30,100,"A FIGHTING-type attack. As the name implies, it is actually two quick kicks in succession.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(32,1,"Double Slap","Normal","Physical",10,15,85,"Although each slap is weak, this attack hits the target two to five times in succession.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(33,1,"Double Team","Normal","Status",15,"N/A","N/A","Creates illusionary copies of the user. The copies disorient the enemy, reducing its accuracy.","N/A","N/A","N/A",0,"User"),
        moveCreate(34,1,"Dragon Rage","Dragon","Special",10,"N/A",100,"A DRAGON-type attack. It inflicts a set amount of damage, regardless of the target's type.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(35,1,"Dream Eater","Psychic","Special",15,100,100,"Works only on sleeping Pokemon. This technique steals the target's HP and adds it to the user's HP.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(36,1,"Drill Peck","Flying","Physical",20,80,100,"A standard FLYING-type attack. It is strong and highly likely to hit the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(37,1,"Earthquake","Ground","Physical",10,100,100,"An attack that inflicts damage by shaking the ground. It is useless against FLYING-type Pokemon.","N/A","N/A","N/A",0,"All adjacent to user"),
        moveCreate(38,1,"Egg Bomb","Normal","Physical",10,100,75,"A NORMAL-type attack. An egg is launched at the target. It may miss, however.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(39,1,"Ember","Fire","Special",25,40,100,"A FIRE-type attack. Has a one-in-ten chance of leaving the target with a damaging burn.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(40,1,"Explosion","Normal","Physical",5,170,100,"The most powerful attack of all. However, the attacker faints after using this move.","N/A","N/A","N/A",0,"All adjacent to user"),
        moveCreate(41,1,"Fire Blast","Fire","Special",5,120,85,"The strongest FIRE-type attack. Has a one-in-three chance of inflicting a burn on the target.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(42,1,"Fire Punch","Fire","Special",15,75,100,"A special FIRE-type attack. Has a one-in-ten chance of inflicting a burn on the target.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(43,1,"Fire Spin","Fire","Special",15,15,70,"A FIRE-type attack that lasts two to five turns. The target cannot move while surrounded by flames.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(44,1,"Fissure","Ground","Physical",5,"N/A",30,"Causes a single-hit knockout if it hits. Useless against FLYING-type Pokemon.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(45,1,"Flamethrower","Fire","Special",15,95,100,"A powerful FIRE-type attack. Has a one-in-ten chance of leaving the target with a damaging burn.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(46,1,"Flash","Normal","Status",20,"N/A","N/A","Creates a brilliant flash of light that blinds the target. This technique reduces the opponent's accuracy.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(47,1,"Fly","Flying","Physical",15,70,95,"The Pokemon flies high, then strikes in the next turn. Used for flying to places already visited.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(48,1,"Focus Energy","Normal","Status",30,"N/A","N/A","Raises the likelihood of nailing the opponent's weak spot for a critical hit.","N/A","N/A","N/A",0,"User"),
        moveCreate(49,1,"Fury Attack","Normal","Physical",20,15,85,"A NORMAL-type attack. The Pokemon rapidly jabs at its opponent several times.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(50,1,"Fury Swipes","Normal","Physical",15,18,80,"The target is scratched by sharp claws two to five times in quick succession.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(51,1,"Glare","Normal","Status",30,"N/A","N/A","The target is transfixed with terrifying sharp eyes. The target is frightened into paralysis.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(52,1,"Growl","Normal","Status",40,"N/A","N/A","A technique that lowers the target's ATTACK power. Can normally be used up to six times.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(53,1,"Growth","Normal","Status",40,"N/A","N/A","Raises SPECIAL to make special attacks stronger and enhance protection against special moves.","N/A","N/A","N/A",0,"User"),
        moveCreate(54,1,"Guillotine","Normal","Physical",5,"N/A",30,"A single-hit knockout attack. Learned only by Pokemon that have large pincers.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(55,1,"Gust","Normal","Physical",35,40,100,"A NORMAL-type attack used by bird Pokemon. A powerful wind is generated by flapping wings.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(56,1,"Harden","Normal","Status",30,"N/A","N/A","Raises the user's DEFENSE. Useful when battling physically strong Pokemon.","N/A","N/A","N/A",0,"User"),
        moveCreate(57,1,"Haze","Ice","Status",30,"N/A","N/A","Eliminates all changes affecting status, such as SPEED and accuracy, of both Pokemon in battle.","N/A","N/A","N/A",0,"Field"),
        moveCreate(58,1,"Headbutt","Normal","Physical",15,70,100,"A NORMAL-type attack. Has a one-in-three chance of making the target flinch if it connects.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(59,1,"Hi Jump Kick","Fighting","Physical",20,85,90,"Stronger than a JUMP KICK. If it misses, the attacker sustains 1/8 the damage it should have caused.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(60,1,"Horn Attack","Normal","Physical",25,65,100,"A NORMAL-type attack. A sharp horn is driven hard into the target to inflict damage.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(61,1,"Horn Drill","Normal","Physical",5,"N/A",30,"A single-hit knockout attack. Learned only by Pokemon with a horn or horns.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(62,1,"Hydro Pump","Water","Special",5,120,80,"The strongest WATER-type attack. However, while it is powerful, it may miss the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(63,1,"Hyper Beam","Normal","Physical",5,150,90,"An extremely powerful attack. The attacker becomes so tired, it has to rest the next turn.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(64,1,"Hyper Fang","Normal","Physical",15,80,90,"A NORMAL-type attack. Has a one-in-ten chance of making the target flinch.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(65,1,"Hypnosis","Psychic","Status",20,"N/A","N/A","A special PSYCHIC-type move. The target is hypnotized into a deep sleep.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(66,1,"Ice Beam","Ice","Special",10,95,100,"An ICE-type attack. Has a one-in-ten chance of freezing the target solid.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(67,1,"Ice Punch","Ice","Special",15,75,100,"A special ICE-type attack. Has a one-in-ten chance of freezing the target.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(68,1,"Jump Kick","Fighting","Physical",25,70,95,"A forceful FIGHTING-type attack. If it misses, however, the attacker gets hurt.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(69,1,"Karate Chop","Normal","Physical",25,50,100,"A NORMAL-type attack. Often turns into a critical hit and inflicts double the damage.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(70,1,"Kinesis","Psychic","Status",15,"N/A","N/A","A special move of bending spoons to confound the enemy. Makes the user harder to hit.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(71,1,"Leech Life","Bug","Physical",15,20,100,"An HP-draining attack. It adds half the HP it drained from the target to the attacker's HP.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(72,1,"Leech Seed","Grass","Status",10,"N/A","N/A","Plants a seed on the target Pokemon. The seed slowly drains the target's HP for the attacker.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(73,1,"Leer","Normal","Status",30,"N/A","N/A","A technique that lowers the target's DEFENSE. Useful against tough, armored Pokemon.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(74,1,"Lick","Ghost","Physical",30,20,100,"A GHOST-type attack. Has a one-in-three chance of leaving the target with paralysis.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(75,1,"Light Screen","Psychic","Status",30,"N/A","N/A","Reduces damage from special attacks by about half. A special PSYCHIC-type technique.","N/A","N/A","N/A",0,"User and Allies"),
        moveCreate(76,1,"Lovely Kiss","Normal","Status",10,"N/A","N/A","A special move that puts the target to sleep with a big kiss. (Actually, the victim passes out.)","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(77,1,"Low Kick","Fighting","Physical",20,50,90,"A FIGHTING-type attack. Has a one-in-three chance of making the target flinch if it connects.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(78,1,"Meditate","Psychic","Status",40,"N/A","N/A","A special technique that boosts the user's ATTACK power. Can normally be used up to six times.","N/A","N/A","N/A",0,"User"),
        moveCreate(79,1,"Mega Drain","Grass","Special",10,40,100,"A GRASS-type attack. It adds half the HP it drained from the target to the attacker's HP.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(80,1,"Mega Kick","Normal","Physical",5,120,75,"A NORMAL-type attack. Out of all the Pokemon kicking attacks, this is the strongest.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(81,1,"Mega Punch","Normal","Physical",20,80,85,"A NORMAL-type attack move. It is highly accurate and relatively powerful.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(82,1,"Metronome","Normal","Status",10,"N/A","N/A","The user waggles its finger, triggering a move. There is no telling what will happen.","N/A","N/A","N/A",0,"User"),
        moveCreate(83,1,"Mimic","Normal","Status",10,"N/A","N/A","A move for learning one of the opponent's moves, for use during that battle only.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(84,1,"Minimize","Normal","Status",20,"N/A","N/A","Reduces the user's size and makes it harder to hit. Can normally be used up to six times.","N/A","N/A","N/A",0,"User"),
        moveCreate(85,1,"Mirror Move","Flying","Status",20,"N/A","N/A","A move that strikes back with the opponent's last move. This move comes after the enemy's move.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(86,1,"Mist","Ice","Status",30,"N/A","N/A","Provides full protection against any enemy status attack, such as those that lower DEFENSE.","N/A","N/A","N/A",0,"User and Allies"),
        moveCreate(87,1,"Night Shade","Ghost","Status",15,"N/A","N/A","A GHOST-type attack. Highly accurate, it inflicts damage regardless of the target's type.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(88,1,"Pay Day","Normal","Physical",20,40,100,"A move that also nets money at the end of battle. How much depends on the attack frequency and level.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(89,1,"Peck","Flying","Physical",35,35,100,"A standard FLYING-type attack. It is favored by Pokemon that have beaks and/or horns.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(90,1,"Petal Dance","Grass","Special",20,70,100,"A dance-like attack that lasts two to three turns. Afterwards, the attacker becomes confused.","N/A","N/A","N/A",0,"Random Opponent"),
        moveCreate(91,1,"Pin Missile","Bug","Physical",20,14,85,"An attack that fires many needle-like projectiles from the body. Strikes several times.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(92,1,"Poison Gas","Poison","Status",40,"N/A","N/A","A poisonous cloud of gas is forcefully expelled to poison the target.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(93,1,"Poison Powder","Poison","Status",35,"N/A","N/A","A technique that poisons the target. If poisoned, the victim loses HP steadily.","N/A",20,"N/A",0,"Selected target"),
        moveCreate(94,1,"Poison Sting","Poison","Physical",35,15,100,"A POISON-type attack. Has a one-in- five chance of leaving the target  with the lingering effects of poison.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(95,1,"Pound","Normal","Physical",35,40,100,"A NORMAL-type attack. Slightly stronger than TACKLE. Many Pokemon know this move.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(96,1,"Psybeam","Psychic","Special",20,65,100,"A PSYCHIC-type attack. Has a one-in-ten chance of making the target confused.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(97,1,"Psychic","Psychic","Special",10,90,100,"A PSYCHIC-type attack. Has a one-in-three chance of lowering the target's SPECIAL rating.","N/A",30,"N/A",0,"Selected target"),
        moveCreate(98,1,"Psywave","Psychic","Special",15,"N/A",80,"A PSYCHIC-type attack of varying intensity. It occasionally inflicts  heavy damage.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(99,1,"Quick Attack","Normal","Physical",30,40,100,"An attack that always strikes first. If both Pokemon use this, the one with higher SPEED attacks first.","N/A","N/A","N/A",1,"Selected target"),
        moveCreate(100,1,"Rage","Normal","Physical",20,20,100,"A non-stop attack move. The user's ATTACK power increases every time it sustains damage.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(101,1,"Razor Leaf","Grass","Special",25,55,95,"A GRASS-type attack that sends sharp-edged leaves at the target. Likely to get a critical hit.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(102,1,"Razor Wind","Normal","Physical",10,80,75,"A two-turn attack with the wind attack in the second turn. Learned by many FLYING-type Pokemon.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(103,1,"Recover","Normal","Status",20,"N/A","N/A","Restores HP by 1/2 of the user's maximum HP. Few Pokemon learn this technique on their own.","N/A","N/A","N/A",0,"User"),
        moveCreate(104,1,"Reflect","Psychic","Status",20,"N/A","N/A","Reduces damage from physical attacks by about half. A special PSYCHIC-type technique.","N/A","N/A","N/A",0,"User and Allies"),
        moveCreate(105,1,"Rest","Psychic","Status",10,"N/A","N/A","The user takes a nap to fully restore its HP and recover from any status abnormalities.","N/A","N/A","N/A",0,"User"),
        moveCreate(106,1,"Roar","Normal","Status",20,"N/A","N/A","A terrifying roar that drives wild Pokemon away. It is useful only in the wild.","N/A","N/A","N/A",-6,"Selected target"),
        moveCreate(107,1,"Rock Slide","Rock","Physical",10,75,90,"A ROCK-type attack that hits the target with an avalanche of rocks and boulders.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(108,1,"Rock Throw","Rock","Physical",15,50,65,"A ROCK-type attack. As the name implies, a huge boulder is dropped on the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(109,1,"Rolling Kick","Fighting","Physical",15,60,85,"A sharp FIGHTING-type attack. Has a one-in-three chance of making the target flinch if it connects.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(110,1,"Sand-Attack","Normal","Status",15,"N/A","N/A","An attack in which sand is used to blind the target and reduce its attack accuracy.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(111,1,"Scratch","Normal","Physical",35,40,100,"A NORMAL-type attack. Sharp claws are used to inflict damage on the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(112,1,"Screech","Normal","Status",40,"N/A","N/A","A move that makes a horrible noise. It sharply reduces the target's DEFENSE.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(113,1,"Seismic Toss","Fighting","Physical",20,"N/A",100,"A FIGHTING-type attack. Throws the target with enough force to flip the world upside down.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(114,1,"Self-Destruct","Normal","Physical",5,130,100,"The user explodes, inflicting damage on the enemy, then faints. Useless against GHOST-type.","N/A","N/A","N/A",0,"All adjacent to user"),
        moveCreate(115,1,"Sharpen","Normal","Status",30,"N/A","N/A","Raises the user's ATTACK power. The edges of the Pokemon are made harder for more impact.","N/A","N/A","N/A",0,"User"),
        moveCreate(116,1,"Sing","Normal","Status",15,"N/A","N/A","A special NORMAL-type technique. A soothing melody lulls the target to sleep.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(117,1,"Skull Bash","Normal","Physical",15,100,100,"In the first turn, the attacker tucks in its head. The next turn, it head-butts at full steam.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(118,1,"Sky Attack","Flying","Physical",5,140,90,"The strongest FLYING-type attack. Energy is stored in the first turn, then fired the next turn.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(119,1,"Slam","Normal","Physical",20,80,75,"A NORMAL-type attack move. The attacker uses an appendage (e.g. tail) to slam the target hard.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(120,1,"Slash","Normal","Physical",20,70,100,"A NORMAL-type attack. It has a high probability of a critical hit for inflicting double the damage.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(121,1,"Sleep Powder","Grass","Status",15,"N/A","N/A","Induces sleep. A Pokemon will stay asleep for several turns if an item isn't used to wake it.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(122,1,"Sludge","Poison","Physical",20,65,100,"A POISON-type attack. Has a fifty-fifty chance of poisoning the target.","N/A",50,"N/A",0,"Selected target"),
        moveCreate(123,1,"Smog","Poison","Physical",20,20,70,"Smog is spewed as a cloud. Has a fifty-fifty chance of poisoning the target.","N/A",50,"N/A",0,"Selected target"),
        moveCreate(124,1,"Smokescreen","Normal","Status",20,"N/A","N/A","Creates an obscuring cloud of smoke that reduces the enemy's accuracy.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(125,1,"Soft-Boiled","Normal","Status",10,"N/A","N/A","Restores HP by 1/2 of the user's maximum HP. May also be used in the field.","N/A","N/A","N/A",0,"User"),
        moveCreate(126,1,"Solar Beam","Grass","Special",10,120,100,"The strongest GRASS-type attack. Energy is absorbed in the first turn, then fired the next turn.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(127,1,"Sonic Boom","Normal","Physical",20,"N/A",90,"A NORMAL-type attack. It inflicts a set amount of damage regardless of the target's type.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(128,1,"Spike Cannon","Normal","Physical",15,20,100,"A physical attack consisting of two to five consecutive hits. Highly accurate.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(129,1,"Splash","Normal","Status",40,"N/A","N/A","A move that involves only flopping and SPLASHing around in front of the opponent. It has no effect.","N/A","N/A","N/A",0,"User"),
        moveCreate(130,1,"Spore","Grass","Status",15,"N/A","N/A","Special spores are scattered from mushrooms. If the opponent inhales the spores, it will fall asleep.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(131,1,"Stomp","Normal","Physical",20,65,100,"A NORMAL-type attack. Has a one-in-three chance of making the target flinch if it connects.","N/A",33,"N/A",0,"Selected target"),
        moveCreate(132,1,"Strength","Normal","Physical",15,80,100,"A very powerful NORMAL-type attack. Also used for moving obstacles like boulders.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(133,1,"String Shot","Bug","Status",40,"N/A","N/A","Strings are sprayed out and wrapped around the target to reduce its SPEED.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(134,1,"Struggle","Normal","Physical",10,50,100,"Used only if the user runs totally out of PP. The user is hit with 1/4 of the  damage it inflicts.","N/A","N/A","N/A",0,"Random Opponent"),
        moveCreate(135,1,"Stun Spore","Grass","Status",30,"N/A","N/A","A special move that causes paralysis. When paralyzed, the victim has a one-in-four chance of immobility.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(136,1,"Submission","Fighting","Physical",25,80,80,"The strongest FIGHTING attack. One quarter of the damage it inflicts comes back to hurt the attacker.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(137,1,"Substitute","Normal","Status",10,"N/A","N/A","Uses 1/4 of the user's maximum HP to create a substitute that takes the opponent's attacks.","N/A","N/A","N/A",0,"User"),
        moveCreate(138,1,"Super Fang","Normal","Physical",10,"N/A",90,"If it hits, this attack cuts the target's HP in half. Learned by Pokemon with developed fangs.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(139,1,"Supersonic","Normal","Status",20,"N/A","N/A","A special NORMAL-type technique. Supersonic sound waves are used to confuse the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(140,1,"Surf","Water","Special",15,95,100,"A WATER-type attack. The power of this technique is strong and highly accurate.","N/A","N/A","N/A",0,"All adjacent to user"),
        moveCreate(141,1,"Swift","Normal","Physical",20,60,100,"A NORMAL-type attack. It is highly accurate, so it can be counted on to inflict damage.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(142,1,"Swords Dance","Normal","Status",30,"N/A","N/A","A special move that greatly boosts the user's ATTACK power. Can normally be used up to three times.","N/A","N/A","N/A",0,"User"),
        moveCreate(143,1,"Tackle","Normal","Physical",35,35,95,"A NORMAL-type attack. Many Pokemon know this attack right from the start.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(144,1,"Tail Whip","Normal","Status",30,"N/A","N/A","A technique that lowers the target's DEFENSE. Useful against tough, armored Pokemon.","N/A","N/A","N/A",0,"All opponent Pokemon in range"),
        moveCreate(145,1,"Take Down","Normal","Physical",20,90,85,"A charging attack. One quarter of the damage it inflicts comes back to hurt the attacker.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(146,1,"Teleport","Psychic","Status",20,"N/A","N/A","A special technique for instantly escaping from wild Pokemon. Useful in the wild only.","N/A","N/A","N/A",0,"User"),
        moveCreate(147,1,"Thrash","Normal","Physical",20,90,100,"An attack that lasts two to three turns. Afterwards, the attacker becomes confused.","N/A","N/A","N/A",0,"Random Opponent"),
        moveCreate(148,1,"Thunder","Electric","Special",10,120,70,"The strongest of all ELECTRIC-type attacks. Has a one-in-ten chance of paralyzing the target.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(149,1,"Thunderbolt","Electric","Special",15,95,100,"An ELECTRIC-type attack. Has a one-in-ten chance of paralyzing the target.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(150,1,"Thunder Punch","Electric","Special",15,75,100,"A special ELECTRIC-type attack. Has a one-in-ten chance of paralyzing the target.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(151,1,"Thunder Shock","Electric","Special",30,40,100,"An ELECTRIC-type attack. Has a one-in-ten chance of paralyzing the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(152,1,"Thunder Wave","Electric","Status",20,"N/A","N/A","A special move that causes paralysis. When paralyzed, the victim has a one-in-four chance of immobility.","N/A",10,"N/A",0,"Selected target"),
        moveCreate(153,1,"Toxic","Poison","Status",10,"N/A","N/A","A technique that badly poisons the target. The amount of damage from the poison increases every turn.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(154,1,"Transform","Normal","Status",10,"N/A","N/A","Transforms the user into a copy of the target, including the type. All moves have only five PP each.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(155,1,"Tri Attack","Normal","Physical",10,80,100,"A NORMAL-type attack. A triangular field of energy is created and launched at the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(156,1,"Twineedle","Bug","Physical",20,25,100,"An attack that strikes twice. The target may occasionally become poisoned.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(157,1,"Vice Grip","Normal","Physical",30,55,100,"A NORMAL-type attack used only by Pokemon with pincers. The target is gripped and injured.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(158,1,"Vine Whip","Grass","Special",10,35,100,"A GRASS-type attack. The Pokemon uses its cruel whips to strike the opponent.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(159,1,"Waterfall","Water","Special",15,80,100,"A WATER-type attack. The target is hit with a blow packing the power of fish traveling up waterfalls.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(160,1,"Water Gun","Water","Special",25,40,100,"A WATER-type attack. Stronger than BUBBLE. Many WATER-type Pokemon learn this move.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(161,1,"Whirlwind","Normal","Status",20,"N/A","N/A","Generates a powerful wind that blows away wild Pokemon. Useful in the wild only.","N/A","N/A","N/A",-6,"Selected target"),
        moveCreate(162,1,"Wing Attack","Flying","Physical",35,35,100,"A FLYING-type attack. The attacking Pokemon spreads its wings and charges at the target.","N/A","N/A","N/A",0,"Selected target"),
        moveCreate(163,1,"Withdraw","Water","Status",40,"N/A","N/A","Used mainly by Pokemon with shells. By withdrawing into the shell, DEFENSE is increased.","N/A","N/A","N/A",0,"User"),
        moveCreate(164,1,"Wrap","Normal","Physical",20,15,85,"Traps and squeezes the target over two to five turns. The target cannot move while under attack.","N/A","N/A","N/A",0,"Selected target"),
    ]);
}
