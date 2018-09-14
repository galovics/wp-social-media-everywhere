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
One of the main features of this plugin is showing a popup on posts to ask the reader to follow on different social media platforms.

Two options are supported at the moment for popups:
- When the reader reaches the end of the post
- Seconds after the reader arrived to the post

# Installation
The plugin is not yet available on the Wordpress marketplace.

# Building the plugin
The package management for the build is done via `npm`. The build can be executed using `gulp`.

Install the dependencies first:
```
npm install
```
Then execute the build with `gulp`:
```
gulp build
```
The `dist` folder will contain the plugin files.

