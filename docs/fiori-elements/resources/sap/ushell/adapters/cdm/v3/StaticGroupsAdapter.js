// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/adapters/cdm/v3/AdapterBase","sap/ui/thirdparty/jquery"],function(t,e){"use strict";function r(e,r,o){t.call(this,e,r,o)}r.prototype=t.prototype;r.prototype._addDefaultGroup=function(t,e){return t};r.prototype._getSiteData=function(){var t=new e.Deferred;return t.resolve(this.oAdapterConfiguration.config)};return r},false);