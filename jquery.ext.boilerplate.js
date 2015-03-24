/*!
 * My 'perfect' jQuery Plugin Boilerplate - v0.1.0
 * used to kick-start new jquery plugins easily
 * jQuery("selector").PerfectBoilerplate({configuration: "goes here"});
 *
 * Extended version with already implemented support for callbacks, throttle and queuing.
 *
 * http://jquery.eisbehr.de/boilerplate/
 * Copyright 2015, Daniel 'Eisbehr' Kern
 *
 * No license, feel free to use! :)
 */
;(function($, window, document, undefined)
{
    "use strict";

    /**
     * this jquery plugin name
     * @type {string}
     */
    var pluginName = "PerfectBoilerplate";

    /**
     * makes the plugin available trough jquery
     * @param {*} [settings]
     * @returns {{object}|Plugin}
     */
    $.fn[pluginName] = function(settings)
    {
        return new Plugin(this, settings);
    };

    /**
     * plugin class constructor, may usually not be changed
     * @constructor
     * @access private
     * @param {*} elements
     * @param {*} settings
     * @returns {{object}|Plugin}
     */
    function Plugin(elements, settings)
    {
        // store plugin name
        this._name = pluginName;

        // store all selected items into plugin class
        this._items = elements;

        // overwrite and/or extend configuration with custom user settings
        if( settings ) $.extend(this._configuration, settings);

        // time to do whatever our plugin does!
        this._initialize();

        // by default the plugin is chainable, but can even return itself
        return this._configuration.chainable ? elements : this;
    }

    // extend own functions here
    $.extend(Plugin.prototype,
    {
        /**
         * the plugin name
         * @type {string}
         */
        _name: null,

        /**
         * all given items by jquery selector
         * @access private
         * @type {object}
         */
        _items: {},

        /**
         * queue timer instance
         * @access private
         * @type {null|number}
         */
        _queueTimer: null,

        /**
         * array of items in queue
         * @access private
         * @type {Array}
         */
        _queueItems: [],

        /**
         * settings and configuration data
         * @access private
         * @type {object}
         */
        _configuration:
        {
            chainable: true,
            enableThrottle: true,
            enableQueueing: true
            // append all plugin related configurations here
        },

        /**
         * initialize function, will be called once on every plugin instance
         * @access private
         * @type {function}
         * @returns void
         */
        _initialize: function()
        {
            /**
             * the plugin instance itself, use it to prevent 'this' mismatch
             * @type {Plugin}
             */
            var plugin = this;

            // create whatever your plugin will do here, like loop through all elements
            // note: 'for' is much faster than jquery 'each' in this case
            for( var i = 0; i < plugin._items.length; i++ )
            {
                $(plugin._items[i]);
            }
        },

        /**
         * helper function to throttle down event triggering
         * @access private
         * @type {function}
         * @param {number} delay
         * @param {function} call
         * @return {function}
         */
        _throttle: function(delay, call)
        {
            var _timeout, _exec = 0;

            function callable()
            {
                var elapsed = +new Date() - _exec;

                function run()
                {
                    _exec = +new Date();
                    call.apply(undefined);
                }

                _timeout && clearTimeout(_timeout);

                if( elapsed > delay || !this._configuration.enableThrottle ) run();
                else _timeout = setTimeout(run, delay - elapsed);
            }

            return callable;
        },

        /**
         * single implementation to handle callbacks and pass parameter
         * @access private
         * @type {function}
         * @param {function} callback
         * @param {object} [element]
         * @return void
         */
        _triggerCallback: function(callback, element)
        {
            if( callback )
            {
                if( element )
                    this._addToQueue(function() { callback(element); });
                else
                    this._addToQueue(callback);
            }
        },

        /**
         * set next timer for queue execution
         * @access private
         * @type {function}
         * @return void
         */
        _setQueueTimer: function ()
        {
            this._queueTimer = setTimeout(function()
            {
                this._addToQueue();
                if( this._queueItems.length ) this._setQueueTimer();
            }, 2);
        },

        /**
         * add new execution to queue
         * @access private
         * @type {function}
         * @param {object} [callable]
         * @param {object} [context]
         * @returns void
         */
        _addToQueue: function(callable, context)
        {
            if( callable )
            {
                // execute directly when queue is disabled and stop queuing
                if( !this._configuration.enableQueueing )
                {
                    callable.call(context || this);
                    return;
                }

                this._queueItems.push([callable, context || this]);

                if( this._queueItems.length == 1 ) this._setQueueTimer();

                return;
            }

            var next = this._queueItems.shift();
            if( !next ) return;

            next[0].call(next[1] || window);
        },

        /**
         * destroy this plugin instance
         * @access public
         * @type {function}
         * @returns void
         */
        destroy: function ()
        {
            this._items = {};
            this._queueItems = [];

            // maybe implement further actions e.g. unbind events, remove data, ...
        }
    });
})(jQuery, window, document);