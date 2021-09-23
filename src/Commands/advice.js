/* https://api.adviceslip.com/ ADVICE SLIP JSON API */
const config = require("../Data/config.json");
const Discord = require("discord.js");
const Command = require("../Structures/Command.js");
const got = require("got");

module.exports = new Command({
    name: "advice",
    description: "Generate a random piece of advice to put you at ease, or fill you with guilt and regret",
    usage: `\`${config.prefix}advice\``,
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        // Connect to the API and then fetch the data
        got('https://api.adviceslip.com/advice', { JSON: true })
            .catch(err => {
                const throwEmbed = new Discord.MessageEmbed()
                    .setAuthor("Error")
                    .setColor("RED")
                    .setDescription(`"If you need help, type \`${config.prefix}helpinfo\`\n\n` + `\`${err}\``);

                message.reply({ embeds: [throwEmbed] });
            })
            .then(result => {
                const content = JSON.parse(result.body);

                const advice = content.slip.advice;

                const adviceEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(advice);

                message.channel.send({ embeds: [adviceEmbed] });
            });



    }
});