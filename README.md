# raccbot

This is a simple playful discord bot that was created for use in personal servers that I created.
It's the first proper foray into the NodeJS universe and I'm proud of the work that I've done with it, it's helped me understand how to work with libraries and overall generally improving my abilities. I hope to maintain the development of raccbot as long as I decide to run servers, and at some point I may decide to release him into a public bot form that other people can invite to their servers. As of right now it's very tailored to my needs and I (dnglchlk) will eventually work towards making it more configurable and open for everyone else to use.

## features

- `racc.info` - Shows you information about RaccBot's current version and provides a few diagnostics.
- `racc.help` - Shows you the following commands and how to use them in an embed form.
- `racc.helios` - Command that allows raccbot to get information about the system that it runs on, as requested.
- `racc.search` - Employs the DuckDuckGo Instant Answer API through a library to retrieve answers about popular topics on the internet
- `racc.repeat` - Simon Says but in command form
- `racc.ping` / `racc.pong` - Self Explanatory
- `racc.yt` - Searches YouTube, and returns the top 3 results along with their titles and URLs.
- `racc.roll` - Rolls a die with x number of sides given x as a number.

- If configured, can allow join/leave/ban messages in a server channel
- Can reply to messages that match strings inside an array with an emoji automatically.
- Status is changed at a 1 minute interval, and can be easily modified through way of two arrays (soon to be migrated to an array of objects)
