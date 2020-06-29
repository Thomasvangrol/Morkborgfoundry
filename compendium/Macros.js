// Working file pattern:
// systems/<your system folder>/<path to file>/<file>
// -----------------

( async () => {
    // Reference a Compendium pack by it's collection ID
    // const armorPack = game.packs.find(p => p.collection === `morkborg.armor`);
    // const gearPack = game.packs.find(p => p.collection === `morkborg.gear`);
    // const weaponsPack = game.packs.find(p => p.collection === `morkborg.weapons`);
    // const scrollsPack = game.packs.find(p => p.collection === `morkborg.scrolls`);
    // const classesPack = game.packs.find(p => p.collection === `morkborg.classes`);
    const bestiaryPack = game.packs.find(p => p.collection === `morkborg.bestiary`);

    // Load an external JSON data file which contains data for import
    // const armorResponse = await fetch(`systems/morkborg/compendium/armor.json`);
    // const gearResponse = await fetch(`systems/morkborg/compendium/gear.json`);
    // const weaponsResponse = await fetch(`systems/morkborg/compendium/weapons.json`);
    // const scrollsResponse = await fetch(`systems/morkborg/compendium/scrolls.json`);
    // const classesResponse = await fetch(`systems/morkborg/compendium/classes.json`);
    const bestiaryResponse = await fetch(`systems/morkborg/compendium/bestiary.json`);
    
    // const armorContent = await armorResponse.json();
    // const gearContent = await gearResponse.json();
    // const weaponsContent = await weaponsResponse.json();
    // const scrollsContent = await scrollsResponse.json();
    // const classesContent = await classesResponse.json();
    const bestiaryContent = await bestiaryResponse.json();

    // Create temporary Item entities which impose structure on the imported data
    // const armorItems = await Item.create(armorContent, {temporary: true});
    // const gearItems = await Item.create(gearContent, {temporary: true});
    // const weaponsItems = await Item.create(weaponsContent, {temporary: true});
    // const scrollsItems = await Item.create(scrollsContent, {temporary: true});
    // const classesItems = await Item.create(classesContent, {temporary: true});
    const bestiaryItems = await Actor.create(bestiaryContent, {temporary: true});

    // console.log(armorPack);
    // console.log(gearPack);
    // console.log(weaponsPack);
    // console.log(scrollsPack);
    // console.log(classesPack);
    console.log(bestiaryPack);

    // Save each temporary Item into the Compendium pack
    // for ( let i of armorItems ) {
    //     await armorPack.importEntity(i);
    //     console.log(`Imported Item ${i.name} into Compendium armorPack ${armorPack.collection}`);
    // }
    // for ( let i of gearItems ) {
    //   await gearPack.importEntity(i);
    //   console.log(`Imported Item ${i.name} into Compendium gearPack ${gearPack.collection}`);
    // }
    // for ( let i of weaponsItems ) {
    //   await weaponsPack.importEntity(i);
    //   console.log(`Imported Item ${i.name} into Compendium weaponsPack ${weaponsPack.collection}`);
    // }
    // for ( let i of scrollsItems ) {
    //   await scrollsPack.importEntity(i);
    //   console.log(`Imported Item ${i.name} into Compendium scrollsPack ${scrollsPack.collection}`);
    // }
    // for ( let i of classesItems ) {
    //   await classesPack.importEntity(i);
    //   console.log(`Imported Item ${i.name} into Compendium classesPack ${classesPack.collection}`);
    // }
    for ( let i of bestiaryItems ) {
      await bestiaryPack.importEntity(i);
      console.log(`Imported Actor ${i.name} into Compendium bestiaryPack ${bestiaryPack.collection}`);
    }
})()

// NPCs
( async () => {
  const bestiaryPack = game.packs.find(p => p.collection === `morkborg.bestiary`);
  const bestiaryResponse = await fetch(`systems/morkborg/compendium/bestiary.json`);
  const bestiaryContent = await bestiaryResponse.json();
  const bestiaryItems = await Actor.create(bestiaryContent, {temporary: true});

  console.log(bestiaryPack);

  for ( let i of bestiaryItems ) {
    await bestiaryPack.importEntity(i);
    console.log(`Imported Actor ${i.name} into Compendium bestiaryPack ${bestiaryPack.collection}`);
  }
})()

// async function fetchAsync () {
//    let response = await fetch('systems/morkborg/compendium/armor.json');
//    let data = await response.json();
// }
// fetchAsync ();
// -----------------
// D:\FoundryVTT\Data\systems\morkborg\compendium\armor.json
// ( async () => {
//     const data = await fetch("D:\FoundryVTT\Data\systems\morkborg\compendium\armor.json").then(r => r.json())
// })()
// -----------------
// const bestiary = await fetch("bestiare.json").then(resp => resp.json());
// for ( let creature of bestiary ) {
//   setProperty(creature, "data.abilities.dex.value", parseInt(creature.header.monster.dex));
//   await pack.createEntity(creature);
// });
// -----------------
// // Example of how to import compendium content.
// async function importGear(content) {
//     // Reference a Compendium pack by it's callection ID
//     const pack = game.packs.find(p => p.collection === `starwarsffg.gear`);
  
//     // Create temporary Actor entities which impose structure on the imported data
//     Item.createMany(content, { temporary: true }).then(items => {
//       // Save each temporary Actor into the Compendium pack
//       for (let i of items) {
//         pack.importEntity(i);
//         console.log(`Imported Item ${i.name} into Compendium pack ${pack.collection}`);
//       }
//     });
//   }
  
//   // Load an external JSON data file which contains data for import
//   async function fetchAsync (url) {
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
//   }
  
//   var f = fetchAsync('./Gear.json');
//   var content = [];
//   for (let obj of f) {
//     for (let i of obj) {
//         var gear = {
//           "name": i.Name,
//           "type": "gear",
//           "data": {
//             "description": i.Description,
//             "encumbrance": {
//               "value": i.Encumbrance,
//             },
//             "price": {
//               "value": i.Price,
//             },
//             "rarity": {
//               "value": i.Rarity,
//             },
//             "attributes": {}
//           },
//         }
//         content.push(gear);
//     }
//   }
  
//   importGear(content);