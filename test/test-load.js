/* global describe, it, beforeEach */
'use strict';
var assert = require('assert');


describe('typescript EdgarJs', function() {
    /**
     * Test 1: Project is successfully compiled, and can be imported.
     */
    it('can be imported without blowing up', function() {
        assert(require('../app/build/edgarjs.js') !== undefined);
    });
});