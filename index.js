/* jshint node: true */
'use strict'

const HbsMinifierFilter = require('./lib/hbs-minifier')

module.exports = {
  name: 'ember-cli-hbs-minifier',

  included: function(app) {
    this.app = app
    this.options = app.options.minifyHbs || {}
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('template', {
      name: 'hbs-minifier',
      ext: 'hbs',
      toTree: function(tree) {
        return new HbsMinifierFilter(tree, this.options)
      }
    })

    if (registry.remove) {
      registry.remove('template', 'ember-hbs-minifier')
    }
  }
}
