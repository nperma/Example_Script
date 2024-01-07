// main.ts
// Experiment: [event: chatSend, event: itemUse]
// Don't forget to import the modules
import { world, Player } from "@minecraft/server";

// Experiment[0]
world.beforeEvents.chatSend.subscribe(
  /**
   * Handles the chatSend event.
   * @param {Object} data - The event data.
   * @param {Player} data.sender - The player sending the chat message.
   * @param {string} data.message - The content of the chat message.
   * @param {boolean} data.cancel - Flag to cancel the event (true to cancel).
   */
  (data: { sender: Player, message: string, cancel: boolean }) => {
    const { sender, message } = data;

    data.cancel = true;

    // If the player says "hello," send a reply message to themselves
    if (message.startsWith("halo")) {
      sender.sendMessage("hai");
      return; // Stop the event here if the message starts with hello
    }

    // Create a rank system based on tags
    const ranks =
      sender
        .getTags()
        .find(
          /**
           * Checks if a tag starts with "stuka:" and extracts the rank.
           * @param {string} tag - The tag to check.
           * @returns {string} The extracted rank or "member" if not found.
           */
          (tag: string) => tag.startsWith("stuka:")
        )?.slice(6) ?? "member";

    world.sendMessage(`§7[§r${ranks}§r§7]§r §7${sender.name} > §r${message}`); // Send a message to all players on the server
  }
);

world.afterEvents.itemUse.subscribe(
  /**
   * Handles the itemUse event.
   * @param {Object} eventData - The event data.
   * @param {any} eventData.itemStack - The item stack being used.
   * @param {Player} eventData.source - The player using the item.
   */
  ({ itemStack: item, source: player }: { itemStack: any, source: Player }) => {
    // itemType: "stick" || "minecraft:stick"
    if (item.typeId !== "minecraft:stick") return; // Stop the event if the item type is not a stick

    // Throw the player forward
    const { x, z } = player.getViewDirection();
    player.applyKnockback(x, z, 5, 2);
  }
);
// Done
