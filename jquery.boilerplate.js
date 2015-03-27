/*!
 * My 'perfect' jQuery Plugin Boilerplate - v0.1.1
 * used to kick-start new jquery plugins easily
 * jQuery("selector").PerfectBoilerplate({configuration: "goes here"});
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
     * @param {object} [settings]
     * @returns {object|Plugin}
     */
    $.fn[pluginName] = function(settings)
    {
        return new Plugin(this, settings);
    };

    /**
     * plugin class constructor, may usually not be changed
     * @constructor
     * @access private
     * @param {object} elements
     * @param {object} settings
     * @returns {object|Plugin}
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
         * settings and configuration data
         * @access private
         * @type {object}
         */
        _configuration:
        {
            chainable: true
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
         * destroy this plugin instance
         * @access public
         * @type {function}
         * @returns void
         */
        destroy: function ()
        {
            this._items = {};
            // maybe implement further actions e.g. unbind events, remove data, ...
        }
    });
})(jQuery, window, document);