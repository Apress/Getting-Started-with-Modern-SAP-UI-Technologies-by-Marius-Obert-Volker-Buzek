// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/ObjectPath"],function(e){"use strict";return r;function t(t){var r=e.get("services.Container.adapter.config",t);return{sDefaultTheme:e.get("userProfile.defaults.theme",r),sPersonalizedTheme:e.get("userProfilePersonalization.theme",r),oRangeTheme:e.get("userProfile.metadata.ranges.theme",r)}}function r(e){var r=t(e),a=r.sPersonalizedTheme,o=r.oRangeTheme,n=r.sDefaultTheme;if(r.oRangeTheme){if(Object.keys(o).indexOf(a)>-1){var i=o[a]||{};return{theme:a,root:i.themeRoot}}var s=o[n]||{};return{theme:n,root:s.themeRoot}}var u=a||n;return{theme:u,root:""}}});