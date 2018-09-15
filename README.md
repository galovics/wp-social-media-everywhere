# Social Media plugin for Wordpress
The plugin tries to fill the gap for the free Wordpress social media plugins out there. A lot of them are available but missing just tiny little features or customizations like showing a simple popup at the end of each blogpost.

The currently supporter social media platforms are the following:
- Facebook
- Google+
- Twitter
- LinkedIn
- Instagram
- Youtube

# Popups
One of the main features of this plugin is showing a popup on posts to ask the reader to follow on different social media platforms. The popup will only show the platforms which have configured values.

Two options are supported at the moment for popups:
- When the reader reaches the end of the post
- Seconds after the reader arrived to the post

It's also a quite standard requirement to configure when the user will see the popup again (obviously it's not a good idea to spam and show it everytime). This is configurable on the **Settings page -> Social Media Everywhere -> Popup settings -> Popup seen expiration time**

The following format is accepted by the plugin for this value (although the same information is available in the tooltip):

**[number][unit]** - e.g. **10s** - 10 seconds

The available units currently:
- **s** - second
- **m** - minute
- **h** - hour
- **d** - day
- **mo** - month
- **y** - year

Examples:
- **10s** - Every 10 seconds the popup will be shown once
- **1d** - Every day the popup will be shown once
- **1y** - The popup will be shown once in a year

# Installation
The plugin is not yet available on the Wordpress marketplace.

# Building the plugin
The package management for the build is done by `npm`. The build can be executed using `gulp`.

Install the dependencies first:
```
npm install
```
Then execute the build with `gulp`:
```
gulp build
```
The `dist` folder will contain the plugin files.

