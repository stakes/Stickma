# Stickma

![Stickma cover image](https://github.com/stakes/Stickma/raw/master/cover.png)

Well, as it turns out it's against the Giphy TOS to render animated gifs as static stickers… and Figma doesn't animate gifs on the canvas. So RIP, Stickma. It was a neat idea, though, and worth a shot.

Express yourself and give your friends and colleagues ~~better~~ more memorable feedback in sticker form.

This plugin would have been powered by Giphy's API: browse and search for stickers that capture exactly what you're trying to say, and easily drop them onto your Figma canvas for the whole team to enjoy.

I wonder if there's a way to do it with [https://github.com/signalstickers/signalstickers](Signal stickers) but I'm out of energy rn for this tbh.


## Build and develop!
* Run `yarn` to install dependencies.
* Get yourself a Giphy API key from https://developers.giphy.com/.
* Create a .env file in the project root with just one line containing your `GIPHY_API_KEY=`. 
* Run `yarn build:watch` to start webpack in watch mode.
* And then in Figma, Development > New Plugin… > Link Existing Plugin to Stickma's `manifest.json` file.
