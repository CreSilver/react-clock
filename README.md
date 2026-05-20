# Clock

This web app is my first React and TypeScript project.
It is just a simple clock with stopwatch and timer.
Do not expect anything special.

## UserManual

### Something for installation

If you want to run this simple project, zou need to have installed Node.js.
After that place this app inside your project template and run application as React application.
It was developed on Fedora so if you are using Windows or different OS, probably installation will be absolutely different.  

### How to use 

By pressing `space` clock will change design. \
Thanks to topbar (navigation bar on top) you can change between clock, stopwatch and timer. \
In clock you can set Alarm by tipping time when you want to get time notification `--:--:--` \
In stopwatch you have 3 buttons. If you want to save time, at the first you need to start stopwatch. \
In timer if you want to set timer on some time, just write it in the box: `--:--:--` 

And alarm itself had to be allowed or nothing well happen. You can allow it by pressing allow button in clock site.
The alarm will make some boob sound when it is triggered, and it will make notification in your device.

## Manual for someone who wants to see my code

Main app is in `src` folder called `App.tsx` and app components is in `componnents` folder. \
Nav bar is in navbar, clock have some func what is in whole project, alarm have alarm functions and Page components have whole pages. \
App using routing for changing between pages. It is in main App file and navbar component.