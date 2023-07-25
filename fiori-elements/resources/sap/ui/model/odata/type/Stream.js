/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType"],function(e,t,a,o,n){"use strict";function i(t,a){var o;t.oConstraints=undefined;if(a){o=a.nullable;if(o===false){t.oConstraints={nullable:false}}else if(o!==undefined&&o!==true){e.warning("Illegal nullable: "+o,null,t.getName())}}}var r=n.extend("sap.ui.model.odata.type.Stream",{constructor:function(e,t){n.apply(this,arguments);if(e!==undefined){throw new Error("Unsupported arguments")}i(this,t)}});r.prototype.formatValue=function(e,a){switch(this.getPrimitiveType(a)){case"any":case"string":return e;default:throw new t("Don't know how to format "+this.getName()+" to "+a)}};r.prototype.getName=function(){return"sap.ui.model.odata.type.Stream"};r.prototype.parseValue=function(){throw new a("Type 'sap.ui.model.odata.type.Stream' does not support parsing")};r.prototype.validateValue=function(){throw new o("Type 'sap.ui.model.odata.type.Stream' does not support validating")};return r});