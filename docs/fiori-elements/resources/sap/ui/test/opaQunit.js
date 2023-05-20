/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/ui/Global","sap/ui/test/Opa","sap/ui/test/Opa5","sap/ui/test/qunitPause","sap/ui/thirdparty/jquery"],function(e,t,n,i,s,o){"use strict";s.setupAfterQUnit();QUnit.begin(function(e){var i=document.getElementById("#qunit-userAgent");if(i){i.innerText+="; UI5: "+t.version}n._usageReport.begin({uri:window.location.href,totalTests:e.totalTests})});QUnit.moduleStart(function(e){n._usageReport.moduleStart(e)});QUnit.testStart(function(){n._usageReport.testStart()});QUnit.testDone(function(e){n._usageReport.testDone(e);var t=e.assertions.some(function(e){return!e.result&&e.message==="Test timed out"});if(t){n._stopQueue({qunitTimeout:QUnit.config.testTimeout/1e3})}});QUnit.moduleDone(function(e){n._usageReport.moduleDone(e)});QUnit.done(function(e){n._usageReport.done(e)});window.opaSkip=r;window.opaTest=a;window.opaTodo=QUnit.todo?u:a;function a(){f("test",arguments,function(e,t){n._usageReport.opaEmpty();p();t()},function(e,t,i){n._usageReport.opaEmpty(i);e.ok(false,i.errorMessage);p();if(!s.shouldPauseOnAssert()){s.emitPause()}var a=o.Deferred();s.onResume(function(){if(!i.qunitTimeout){setTimeout(t,0)}a.resolve()});return a.promise()})}function u(){f("todo",arguments,function(e,t){p();t()},function(e,t,n){if(n.qunitTimeout){p()}else{e.ok(false,n.errorMessage);p();setTimeout(t,0)}})}function r(e,t,n,i){l();var s=function(){};if(d()){QUnit.skip(e,s)}else{QUnit.skip(e,t,s,i)}}function f(e,t,n,i){l();var s={testName:t[0],expected:t.length===2?null:t[1],callback:t.length===2?t[1]:t[2],async:t[3]};if(d()&&typeof s.async!=="undefined"){throw new Error("Qunit >=2.0 is used, which no longer supports the 'async' parameter for tests.")}var o=c(s,n,i);var a=[s.testName,o,s.async];if(!d()){a.splice(1,0,s.expected)}QUnit[e].apply(this,a)}function c(e,t,o){return function(a){var u=a.async();n.config.testName=e.testName;n.assert=a;i.assert=a;if(d()&&e.expected!==null){a.expect(e.expected)}e.callback.call(this,n.config.arrangements,n.config.actions,n.config.assertions);s.setupBeforeOpaTest();n.emptyQueue().done(function(){t(a,u)}).fail(function(e){o(a,u,e)})}}function l(){if(!QUnit.config.testTimeout||QUnit.config.testTimeout===3e4){QUnit.config.testTimeout=9e4}QUnit.config.reorder=false;QUnit.config.scrolltop=false}function p(){n.assert=undefined;i.assert=undefined}function d(){return QUnit.test.length===2}QUnit.config.urlConfig.push({id:"opaExecutionDelay",value:{400:"fast",700:"medium",1e3:"slow"},label:"Opa speed",tooltip:"Each waitFor will be delayed by a number of milliseconds. If it is not set Opa will execute the tests as fast as possible"});i._getEventProvider().attachEvent("onExtensionAfterInit",function(t){var i=t.getParameters();if(i.extension.getAssertions){var s=i.extension.getAssertions();e(s,function(e,t){QUnit.assert[e]=function(){var e=this;var s=t.apply(i.appWindow,arguments).always(function(t){if(typeof e.pushResult==="function"){e.pushResult(t)}else{e.push(t.result,t.actual,t.expected,t.message)}});n.config.assertions._schedulePromiseOnFlow(s)}})}});return a});