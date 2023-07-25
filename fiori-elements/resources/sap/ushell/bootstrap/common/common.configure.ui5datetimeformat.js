// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/base/util/ObjectPath","sap/ui/core/Configuration"],function(t,e,a){"use strict";return r;function r(r){var o=e.get("services.Container.adapter.config.userProfile.defaults",r);var s="Date Format is incorrectly set for the User";var i="Time Format is incorrectly set for the User";try{var c=o&&o.sapDateFormat;a.getFormatSettings().setLegacyDateFormat(c)}catch(e){t.error(s,e.stack,"sap/ushell/bootstrap/common/common.configure.ui5datetimeformat")}try{var m=o&&o.sapTimeFormat;a.getFormatSettings().setLegacyTimeFormat(m)}catch(e){t.error(i,e.stack,"sap/ushell/bootstrap/common/common.configure.ui5datetimeformat")}}},false);