/* global require, module */
const Filter = require('broccoli-filter')
const merge = require('lodash.merge')
const HbsMinifier = require('html-minifier')
const minify = HbsMinifier.minify

const defaultOptions = {
  customAttrSurround: [
    [ /\{\{#[^}]+\}\}/, /\{\{\/[^}]+\}\}/ ]
  ],
  ignoreCustomFragments: [
    /\{\{[^\}]+\}\}/g
  ],
  customAttrAssign: [

  ],
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: false,
  sortAttributes: true,
  decodeEntities: true
}

function HbsMinifierFilter(inputTree, options) {
  if (!(this instanceof HbsMinifierFilter)) {
    return new HbsMinifierFilter(inputTree, options)
  }

  Filter.call(this, inputTree)

  this.name = 'ember-hbs-minifier'
  this.inputTree = inputTree
  this.minifierOptions = merge({}, defaultOptions, options)
}

HbsMinifierFilter.prototype = Object.create(Filter.prototype)
HbsMinifierFilter.prototype.constructor = HbsMinifierFilter
HbsMinifierFilter.prototype.extensions = [ 'hbs' ]
HbsMinifierFilter.prototype.targetExtension = 'hbs'
HbsMinifierFilter.prototype.processString = function(string) {
  return minify(string, this.minifierOptions)
}

module.exports = HbsMinifierFilter
