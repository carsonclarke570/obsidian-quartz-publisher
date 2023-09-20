---
tags: monster, campaign/dsrpg
category: Boss
---

# Asylum Demon
Clutching a gigantic mace, its segmented stomach undulating and rippling with grotesque animation, such demons are often set as guards, preventing entrance (or exit) to or from some sacred spot. The creature gains its name from its infamous position as warden of the Undead Asylum in Lordran. There, any undead attempting to escape the gloom and misery of that unwholesome prison were smashed to pieces beneath its vast, crushing blows. It was eventually slain by the Chosen Undead. Whatever happened to them?

```statblock
name: Asylum Demon
size: Large
type: demon

ac: "13"
hp: 90 
hit_dice: 12d10+24
speed: 30 feet

stats: [16, 15, 15, 9, 11, 11]

saves:
  - Str: 5
  - Con: 4
  - Wis: 2

cr: 5
senses: darkvision 120 feet
damage_immunities: poison
condition_immunities: "poisoned, charmed, unconscious, grappled"
damage_resistances: fire, cold

traits:
  - name: Demon's Sight
    desc: Magical darkness doesn't impede the Asylum Demon's darkvision.
  - name: Magic Resistance
    desc: The Asylum Demon has advantage on saving throws against spells and other magical effects.
  - name: Steadfast
    desc: The Asylum Demon can't be frightened while it can see an allied creature within 30 feet of it.

actions:
  - name: Multiattack
    desc: "The Asylum Demon makes two attacks: one with its Ground Pound and one with its Hammer Drive."
  - name: Ground Pound
    desc: "All creatures in a 15 feet cone from the asylum demon must immediately make a DC 12 Constitution saving throw. On a failure they are knocked prone and suffer 11 (2d8+2) bludgeoning damage, and their speed is reduced by 10ft until the start of the Asylum Demon’s next turn. On a successful saving throw the creature suffers half damage."
  - name: Hammer Drive
    desc: "Melee Weapon Attack: +5 to hit, reach 10 feet, one target. Hit: 8 (1d10+3) bludgeoning damage. If the target is a creature other than construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) Position at the start of each of its turns due to the awful wound inflicted. Each time the demon hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to staunch the wound with a successful DC 12 Wisdom (Medicine) check.The wound also closes if the target receives magical healing."
  - name: Long Range Hammer
    desc: "Ranged Weapon Attack: +4 to hit, range 60 feet, one target. Hit: 8 (1d10+3) bludgeoning damage."
```



