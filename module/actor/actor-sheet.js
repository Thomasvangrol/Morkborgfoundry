import { MbClassList } from "../config.js"; 

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class MorkBorgActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["morkborg", "sheet", "actor"],
      width: 900,
      height: 620,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "class" }]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  get template() {
    const path = "systems/morkborg/templates/actor";
    return `${path}/${this.actor.data.type}-sheet.html`;
  }
  
  /* -------------------------------------------- */

  /** @override */
  async getData() {
    const data = super.getData();
    const dataActor = data.actor;

    data.dtypes = ["String", "Number", "Boolean"];

    // Include CONFIG values
    data.config = CONFIG.MB;

    // Prepare items.
    if (this.actor.data.type == 'character') {
      dataActor.classNameList = await MbClassList.getClasses(true);
      dataActor.classObjectList = await MbClassList.getClasses(false);
      this._prepareCharacterItems(data);
    }
    // else if (this.actor.data.type == 'npc') {
    //   this._prepareNpcItems(data);
    // }

    return data;
  }

   /**
   * Organize and classify Items for Character sheets.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareCharacterItems(data) {
    const dataActor = data.actor;

    this._processClass(data)

    // Initialize containers.
    const gears = [];
    const weapons = [];
    const armors = [];
    const scrolls = {
      "unclean": [],
      "sacred": [],
      "unknown": []
    }

    // Iterate through items, allocating to containers
    // let totalWeight = 0;
    for (let i of data.items) {
      let item = i.data;
      i.img = i.img || DEFAULT_TOKEN;

      // Append to weapons.
      if (i.type === 'weapon') {
        weapons.push(i);
      }
      
      // Append to armors.
      else if (i.type === 'armor') {
        armors.push(i);
      }

      // Append to scrolls.
      else if (i.type === 'scroll') {
        // scrolls.push(i);
        switch (item.scrollType) {
          case 'unclean':
            scrolls[item.scrollType].push(i);
            break;
          case 'sacred':
            scrolls[item.scrollType].push(i);
            break;
          default:
            scrolls["unknown"].push(i);
            break;
        }
      }
      
      // Append to gear list.
      else if (i.type === 'gear') {
        gears.push(i);
      }
    }

    // Assign and return
    dataActor.gears = gears;
    dataActor.weapons = weapons;
    dataActor.armors = armors;
    dataActor.scrolls = scrolls;
  }

  _processClass(data) {
    const dataActor = data.actor;
    const dataData = data.data;
    
    const classObj = dataActor.classObjectList.find(classObject => classObject.name === dataData.class.name)
    dataActor.classObj = classObj ? classObj.data : {}
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Add Inventory Item
    html.find('.item-create').click(this._onItemCreate.bind(this));

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    // Rollable abilities.
    html.find('.rollable').click(this._onRoll.bind(this));
  }

  /* -------------------------------------------- */

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      data: data
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.data["type"];

    // Finally, create the item!
    return this.actor.createOwnedItem(itemData);
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.roll) {
      let roll = new Roll(dataset.roll, this.actor.data.data);
      let label = dataset.label ? `Rolling ${dataset.label}` : '';
      roll.roll().toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label
      });
    }
  }

}
