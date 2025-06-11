const { join: path } = require('path');

// ======= CONFIG ======= \\
//* NOTE: Variables names need to be the same as:
//*         clientId for the bot ID
//*         token for the bot token

const Discord_API_Version = '10'; //! The Discord API is depreciated under V8 (V7-V1)
const { clientId, guildId } = require('../config.json');
const ApplyOnSpecificGuild = false; // false or the guild ID
const { token } = require('../warning.json');
const Commands_Directory = path(__dirname, 'commands');

// ======= CONFIG ======= \\

/*
*  Made by Befaci with ❤️ especially for beginners

*  The Github:    https://github.com/befaci03/Templates
*   The template: https://github.com/befaci03/Templates/djs/slashcommand_deployer.js
*   The license:  https://github.com/befaci03/Templates/?tab=AGPL-3.0-1-ov-file (GNU AGPL-3.0.1)
*/


// Script Part (don't touch!!)
const {REST}=require('@discordjs/rest');const {Routes}=require(`discord-api-types/v${Discord_API_Version}`);const fs=require('fs');const commandFiles=fs.readdirSync(Commands_Directory).filter(file=>file.endsWith('.js'));const commands=[];for(const file of commandFiles){const command=require(`./commands/${file}`);if(command.data){commands.push(command.data.toJSON());}};const rest=new REST({version:Discord_API_Version}).setToken(token);(async()=>{try{console.log('Registering all slashes...');if(ApplyOnSpecificGuild)await rest.put(Routes.applicationGuildCommands(clientId,ApplyOnSpecificGuild),{body:commands});else await rest.put(Routes.applicationCommands(clientId),{body:commands});console.info('All slash commands has been implemented! Ctrl+R on Discord to see new commands.');}catch(error){console.error(error);}})();
