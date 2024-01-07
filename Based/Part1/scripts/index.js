// index.js
// Experiment: [event: chatSend, event: itemUse]
// Don't forget to import the modules
import { world, Player } from "@minecraft/server";

// Experiment[0]
world.beforeEvents.chatSend.subscribe(({ sender, message, cancel }) => {
  cancel = true;

  // If the player says "hello," send a reply message to themselves
  if (message.startsWith("halo")) {
    sender.sendMessage("hai");
    return; // Stop the event here if the message starts with hello
  }

  // Create a rank system based on tags
  const ranks =
    sender
      .getTags()
      .find((tag) => tag.startsWith("stuka:"))
      ?.slice(6) ?? "member";

  world.sendMessage(`§7[§r${ranks}§r§7]§r §7${sender.name} > §r${message}`); // Send a message to all players on the server
});

world.afterEvents.itemUse.subscribe(({ itemStack: item, source: player }) => {
  // itemType: "stick" || "minecraft:stick"
  if (item.typeId !== "minecraft:stick") return; // Stop the event if the item type is not a stick

  // Throw the player forward
  const { x, z } = player.getViewDirection();
  player.applyKnockback(x, z, 5, 2);
});
// Done
