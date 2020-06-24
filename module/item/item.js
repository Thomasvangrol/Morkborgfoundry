/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class MorkBorgItem extends Item {
  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    // Get the Item's data
    const itemData = this.data;
    const actorData = this.actor ? this.actor.data : {};
    const data = itemData.data;
    const C = CONFIG.MB;

    if (itemData.type === "armor") {
      switch (Number(data.tier)) {
        case 0:
          data.damageReductionDice = "-1";
          data.agilityPenalty = null
          data.defencePenalty = null
          break;
        case 1:
          data.damageReductionDice = "-1d2";
          data.agilityPenalty = null
          data.defencePenalty = null
          break;
        case 2:
          data.damageReductionDice = "-1d4";
          data.agilityPenalty = 2
          data.defencePenalty = 2
          break;
        case 3:
          data.damageReductionDice = "-1d6";
          data.agilityPenalty = 4
          data.defencePenalty = 2
          break;
        default:
          data.damageReductionDice = "0";
          data.agilityPenalty = null
          data.defencePenalty = null
          break;
      }
    }
  }
}
