// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Avatar","sap/m/library","sap/ui/Device","sap/ushell/EventHub","sap/ushell/resources","sap/ushell/ui/shell/ShellHeadItem"],function(e,t,s,n,i,r){"use strict";var a=t.AvatarSize;var o=[];function u(e,t,s){o.push(p(s))}function l(){o.forEach(function(e){var t=sap.ui.getCore().byId(e);if(t){if(t.destroyContent){t.destroyContent()}t.destroy()}});o=[]}function p(t){var s="userActionsMenuHeaderButton",r=sap.ushell.Container.getUser(),o=i.i18n.getText("UserActionsMenuToggleButtonAria",r.getFullName());var u=new e({id:s,src:"{/userImage/personPlaceHolder}",initials:r.getInitials(),ariaHasPopup:"Menu",displaySize:a.XS,tooltip:o,press:function(){n.emit("showUserActionsMenu",Date.now())}});u.setModel(t);return s}return{init:u,destroy:l}});