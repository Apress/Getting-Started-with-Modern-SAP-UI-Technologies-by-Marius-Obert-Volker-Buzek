/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.MultiInput control
sap.ui.define([],
	function() {
	"use strict";

	return {
		palette: {
			group: "INPUT"
		},
		templates: {
			create: "sap/m/designtime/MultiInput.create.fragment.xml"
		},
		name: {
			singular: "MULTIINPUT_NAME",
			plural: "MULTIINPUT_NAME_PLURAL"
		}
	};

});