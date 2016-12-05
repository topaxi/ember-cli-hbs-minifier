/* jshint node: true */
'use strict'

const HbsMinifierFilter = require('./lib/hbs-minifier')

module.exports = {
  name: 'ember-cli-hbs-minifier',

  included: function(app) {
    this._super.included.apply(this, arguments)

    this.app = app
  },

  minifyOptions: function() {
    let app     = this.app
    let options = app && app.options && app.options.minifyHbs || {}

    return options
  },

  setupPreprocessorRegistry: function(type, registry) {
    let getOptions = this.minifyOptions.bind(this)

    registry.add('template', {
      name: 'hbs-minifier',
      ext: 'hbs',
      toTree: function(tree) {
        return new HbsMinifierFilter(tree, getOptions())
      }
    })

    if (registry.remove) {
      registry.remove('template', 'ember-hbs-minifier')
    }
  }
}
