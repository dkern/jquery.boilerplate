## My 'perfect' jQuery Plugin Boilerplate
I'll use this boilerplate to fast and easy kick-start new plugins for jQuery. This is the 'perfect' solution for my personal needs. :)

## How to Start
Grab your copy of the normal or extended boilerplate and change the `pluginName`. You're ready to go, only implement whatever your plugin should do or extend own functions.

## Chainable and Instance Related
The plugin is available over jQuery and chainable by default:
```JS
jQuery(".selector").PerfectBoilerplate({configuration: "goes here"}).chainableFunction();
```

The plugin create an own instance for every call. Use this in an object oriented manner to access internal functions like `destroy` or own implementations:
```JS
var pluginInstance = jQuery(".selector").PerfectBoilerplate({chainable: false});
pluginInstance.destroy();
```

## Extended Boilerplate
There is a normal and a extended version of this boilerplate. The extended version has support for some more features I'll need very often. Just remove parts you don't need in your project or use the normal boilerplate.

## Extended: Callbacks
I like to have one central functions in my plugins to trigger a callback function. You can use the internal function `_triggerCallback` to execute e.g. a configurable callback function and pass an optional element to it:
```JS
this._triggerCallback(this.configuration.sampleCallback, $(element));
```

## Extended: Throttle
The `_throttle` function helps to limit executions of a function. Just specify a function to execute and a time delay the function should be executed once in a time. You will receive a new function you can pass to heavily executed events like `scroll` or `resize`:
```JS
var throttledFunction = this._throttle(250, function() {
	// will be executed once every 250 milliseconds
});

jQuery(window).on("scroll", throttledFunction);
```

## Extended: Queueing
The build-in queue has different responsibilities. It's usable to late-bind events, execute more prioritized code first or run your whole plugin in a lower priority as your other scripts to create a non-blocking plugin. Put everything you want to execute only when nothing is blocking or you want to run in a lower priority inside the queue. It will executed automatically when nothing else is running. 
```JS
var throttledFunction = this._throttle(250, function() {
    // will be executed once every 250 milliseconds
    this._addToQueue(function() {
        // will only be executed when nothing else is executed
    });
});

jQuery(window).on("scroll", throttledFunction);
```

## Bugs / Feature request
Please [report](http://github.com/eisbehr-/jquery.boilerplate/issues) bugs and feel free to [ask](http://github.com/eisbehr-/jquery.boilerplate/issues) for new features directly on GitHub.

## License
This boilerplate is license-free. Just use it as you like. :)
