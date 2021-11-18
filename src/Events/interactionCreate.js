/**@format */

const Event = require("../Structures/event")

module.exports = new Event("interactionCreate", (client, interaction) => {
   if (interaction.user.bot || !interaction.isCommand() || !interaction.guild) return

   const args = [
      interaction.commandName,
      ...client.commands
         .find((command) => command.name.toLowerCase() == interaction.commandName)
         .slashCommandOptions.map((v) => `${interaction.options.get(v.name).value}`),
   ]

   const command = client.commands.find((command) => command.name.toLowerCase() == interaction.commandName)

   if (!command) return interaction.reply("Invalid command.")

   const permission = interaction.member.permissions.has(command.permission)

   if (!permission) return interaction.reply("Permission override detected !!!")

   command.run(interaction, args, client)
})