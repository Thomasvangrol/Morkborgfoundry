// Import Modules
import { MB } from "./config.js";
import { MorkBorgActor } from "./actor/actor.js";
import { MorkBorgActorSheet } from "./actor/actor-sheet.js";
import { MorkBorgItem } from "./item/item.js";
import { MorkBorgItemSheet } from "./item/item-sheet.js";
import { preloadHandlebarsTemplates } from "./templates.js";

Hooks.once('init', async function() {

  CONFIG.MB = MB;

  game.morkborg = {
    MorkBorgActor,
    MorkBorgItem
  };

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom Entity classes
  CONFIG.Actor.entityClass = MorkBorgActor;
  CONFIG.Item.entityClass = MorkBorgItem;

  // Register sheet application classes
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("morkborg", MorkBorgActorSheet, { makeDefault: true });
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("morkborg", MorkBorgItemSheet, { makeDefault: true });

  // If you need to add Handlebars helpers, here are a few useful examples:
  Handlebars.registerHelper('concat', function() {
    var outStr = '';
    for (var arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg];
      }
    }
    return outStr;
  });

  Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase();
  });

  // Preload Handlebars Templates
  preloadHandlebarsTemplates();
});