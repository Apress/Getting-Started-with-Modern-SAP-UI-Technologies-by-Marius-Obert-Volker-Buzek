/*!
 * Copyright (c) 2009-2023 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/base/Log","sap/ushell/appRuntime/ui5/plugins/baseRta/AppLifeCycleUtils"],function(e,n){"use strict";var t={getRenderer:function(e){var t=n.getContainer();return new Promise(function(n,r){var i=t.getRenderer();if(i){e.oRenderer=i;n(i)}else{e._onRendererCreated=function(t){i=t.getParameter("renderer");if(i){e.oRenderer=i;n(i)}else{r("Illegal state: shell renderer not available after recieving 'rendererCreated' event.")}};t.attachRendererCreatedEvent(e._onRendererCreated,e)}})},createActionButton:function(n,t,r){return this.getRenderer(n).then(function(e){e.addActionButton("sap.ushell.ui.launchpad.ActionItem",{id:n.mConfig.id,text:n.mConfig.i18n.getText(n.mConfig.text),icon:n.mConfig.icon,press:t,visible:r},true,false,[e.LaunchpadState.App])}).catch(function(t){e.error(t,undefined,n.mConfig.sComponentName)})},exit:function(){}};return t},true);