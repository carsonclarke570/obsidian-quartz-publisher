---
tags: monster, campaign/dsrpg
category: "Demon & Fiends"
---
# Stone Demon

Squat, dragon-shaped gargoyles that lurk in ancient, forgotten places connected to the flame-wrought children of chaos. Often fading into the stonework, indistinguishable from other statues, they wake to drift languidly towards interlopers. Though plodding and clumsy, these demons channel the fury of chaos to roast those unlucky enough to cross their path. Their naturally dense stone skin offers strong defence against physical attacks and their demon heritage protects them from magical aggression.

#### Statblock

```statblock
name: Stone Demon
size: Medium
type: demon

ac: 15
hp: 52 (7d8 + 21)
hit_dice: 18d10+18
speed: 20 feet

stats: [10, 6, 16, 3, 8, 5]

saves:
  - Con: 5

senses: darkvision 60ft
damage_immunities: poison
damage_resistances: fire, lightning
condition_immunities: "poisoned, charmed, unconscious, grappled, prone"

cr: 2

traits:
  - name: Demon's Sight
    desc: "Magical darkness doesn't impede the Stone Demon's darkvision."
  - name: Magic Resistance
    desc: The Stone Demon has advantage on saving throws against spells and other magical effects.
  - name: False Appearance
    desc: While the Stone Demon remains motionless, it is indistinguishable from an inanimate statue.

actions:
  - name: Multiattack
    desc: "The Stone Demon makes two attacks."
  - name: Hurl Flame
    desc: "Ranged Spell Attack: +2 to hit, range 50 ft., one target. Hit: 7 (2d6) fire damage. If the target is a flammable object that isn't being worn or carried, it also catches fire."
  - name: Fire Stream
    desc: "The Stone Demon exhales fire in a 15-foot line. Each creature in that area must make a DC 12 Dexterity saving throw, taking 14 (4d6) fire damage on a failed save, or half as much damage on a successful one."
```
