'use strict';

const { encode } = require('he');

const HEADER = '<!-- lit-html-server -->';

module.exports = {
  HEADER,
  addHeader,
  hasHeader,
  removeHeader,
  sanitize
};

/**
 * Add header to 'str'
 * @param {string} str
 * @returns {string}
 */
function addHeader(str) {
  if (hasHeader(str)) {
    return str;
  }
  return `${HEADER}${str}`;
}

/**
 * Determine if 'str' has header
 * @param {string} str
 * @returns {boolean}
 */
function hasHeader(str) {
  return typeof str === 'string' && str.indexOf(HEADER) === 0;
}

/**
 * Remove header from 'str'
 * @param {string} str
 * @returns {string}
 */
function removeHeader(str) {
  if (!hasHeader(str)) {
    return str;
  }
  return str.slice(24);
}

/**
 * Remove header from 'str' if present,
 * or encode 'str' for html
 * @param {string} str
 * @returns {string}
 */
function sanitize(str) {
  if (typeof str !== 'string') {
    return str;
  }
  if (hasHeader(str)) {
    return str.slice(24);
  }
  return encode(str);
}