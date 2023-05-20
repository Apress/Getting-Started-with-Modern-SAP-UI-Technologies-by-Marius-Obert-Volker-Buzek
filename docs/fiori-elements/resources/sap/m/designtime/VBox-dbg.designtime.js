/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the Design Time Metadata for the sap.m.VBox control
sap.ui.define([],
	function () {
		"use strict";

		return {
			name: {
				singular: "VBOX_NAME",
				plural: "VBOX_NAME_PLURAL"
			},
			palette: {
				group: "LAYOUT",
				icons: {
					svg: "sap/m/designtime/VBox.icon.svg"
				}
			},
			templates: {
				create: "sap/m/designtime/VBox.create.fragment.xml"
			}
		};
	});