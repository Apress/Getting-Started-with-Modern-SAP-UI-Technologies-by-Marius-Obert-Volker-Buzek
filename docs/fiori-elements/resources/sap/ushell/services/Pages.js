// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ushell/utils/RestrictedJSONModel","sap/base/util/deepClone","sap/base/util/extend","sap/base/util/deepExtend","sap/ushell/resources","sap/ushell/utils","sap/ushell/Config","sap/ushell/adapters/cdm/v3/utilsCdm","sap/ushell/adapters/cdm/v3/_LaunchPage/readUtils","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/base/util/ObjectPath"],function(e,i,t,n,r,a,o,s,d,c,u,l){"use strict";var h=function(){this.COMPONENT_NAME="sap/ushell/services/Pages";this._oCdmServicePromise=sap.ushell.Container.getServiceAsync("CommonDataModel");this._oCSTRServicePromise=sap.ushell.Container.getServiceAsync("ClientSideTargetResolution");this._oPagesModel=new i({pages:[]});this._bImplicitSaveEnabled=true;this._aPagesToBeSaved=[]};h.prototype._generateId=function(e){var i=[];var t=this.getModel().getProperty(this.getPagePath(e));t.sections.forEach(function(e){i.push(e.id);e.visualizations.forEach(function(e){i.push(e.id)})});return o.generateUniqueId(i)};h.prototype.getModel=function(){return this._oPagesModel};h.prototype.enableImplicitSave=function(e){this._bImplicitSaveEnabled=e};h.prototype.getPageIndex=function(e){var i=this._oPagesModel.getProperty("/pages");for(var t=0;t<i.length;++t){if(i[t].id===e){return t}}return undefined};h.prototype.getPagePath=function(e){var i=this.getPageIndex(e);if(typeof i==="undefined"){return""}return"/pages/"+i};h.prototype.loadPage=function(i){var t=this.getPagePath(i);if(t){return Promise.resolve(t)}o.setPerformanceMark(["FLP-Pages-Service-loadPage-start[",i,"]"].join(""));return this._oCdmServicePromise.catch(function(i){e.error("Pages - loadPage: Couldn't resolve CDM Service.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){return Promise.all([e.getPage(i),e.getCachedVisualizations(),e.getApplications(),e.getCachedVizTypes()])}).then(function(e){var i=e[0];var t=e[1];var n=e[2];var r=e[3];return this._getModelForPage(i,t,n,r)}.bind(this)).then(function(e){var t=this._oPagesModel.getProperty("/pages/").length;var n="/pages/"+t;this._oPagesModel._setProperty(n,e);o.setPerformanceMark(["FLP-Pages-Service-loadPage-end[",i,"]"].join(""));return n}.bind(this)).catch(function(i){e.error("Pages - loadPage: Failed to gather site data.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this))};h.prototype.loadPages=function(e){return this._oCdmServicePromise.then(function(i){return i.getPages(e)}).then(function(){return Promise.all(e.map(function(e){return this.loadPage(e)}.bind(this)))}.bind(this)).then(function(i){var t={};e.forEach(function(e,n){t[e]=i[n]});return t})};h.prototype.findVisualization=function(i,t,n,r){return this._oCdmServicePromise.catch(function(i){e.error("Pages - findVisualization: Personalization cannot be saved: CDM Service cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(a){return Promise.all([this.loadPage(i),a.getCachedVisualizations(),a.getApplications()]).then(function(e){var a=e[0];var o=this.getModel().getProperty(a+"/sections")||[];return o.reduce(function(e,a,o){if(t&&a.id!==t){return e}var s=a.visualizations.reduce(function(e,i,t){if(n&&i.vizId===n||r&&i.id===r){e.push(t)}return e},[]);if(s.length){e.push({pageId:i,sectionIndex:o,vizIndexes:s})}return e},[])}.bind(this)).catch(function(i){e.error("Pages - findVisualization: Couldn't load page, get visualizations or applications.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this))}.bind(this))};h.prototype.moveVisualization=function(i,n,r,a,o){if(n===a&&r===o){return Promise.resolve({visualizationIndex:o})}this.setPersonalizationActive(true);var s=this._oPagesModel.getProperty("/pages/"+i);var d=s.id;var c=s.sections;var u=c[n];var l=c[a];var h=u.id;var v=l.id;var f=u.visualizations[r];var g=f.id;u.visualizations=u.visualizations.concat([]);l.visualizations=l.visualizations.concat([]);u.visualizations.splice(r,1);if(o===-1){o=l.visualizations.length}l.visualizations.splice(o,0,f);var P;if(l.visualizations[o]){P=o-1}else{P=l.visualizations.length-2}var p;if(l.visualizations[P]){p=l.visualizations[P].id}if(u.default&&!u.visualizations.length){c.splice(n,1)}this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(d)}).catch(function(i){e.error("Pages - moveVisualization: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i=e.payload.sections[h];var r=i.layout.vizOrder;var a=i.viz;var o=e.payload.sections[v];var s=o.layout.vizOrder;var c=o.viz;var u=t(a[g]);var l=r.indexOf(g);r.splice(l,1);var f=p?s.indexOf(p)+1:0;s.splice(f,0,g);if(h!==v){delete a[g];c[g]=u}if(i.default&&!Object.keys(a).length){delete e.payload.sections[h];e.payload.layout.sectionOrder.splice(n,1)}return this._conditionalSavePersonalization(d)}.bind(this)).then(function(){return{visualizationIndex:o}}).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.deleteVisualization=function(i,t,n){var r=this._oPagesModel.getProperty("/pages/"+i);var a=r.sections[t];if(a.default&&a.visualizations.length<2){return this.deleteSection(i,t)}this.setPersonalizationActive(true);var o=a.visualizations;var s=o[n];o.splice(n,1);this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(r.id)}).catch(function(i){e.error("Pages - deleteVisualization: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i=e.payload.sections[a.id].layout.vizOrder;var t=e.payload.sections[a.id].viz;var n=i.indexOf(s.id);delete t[s.id];if(n>-1){i.splice(n,1)}return this._conditionalSavePersonalization(e.identification.id)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype._getSectionIndex=function(e,i){var t=this.getModel().getProperty(e+"/sections")||[];var n=0;for(;n<t.length;n+=1){if(t[n].id===i){return n}}};h.prototype._getVisualizationData=function(e,i,t,n,r,a,o){var s=n||{vizId:i};var d={applications:r,visualizations:t,vizTypes:a};var u=c.getVizData(d,s,o);if(!u.id){u.id=this._generateId(e)}return u};h.prototype.addVisualization=function(i,t,n,r){return this._oCdmServicePromise.catch(function(i){e.error("Pages - addVisualization: Personalization cannot be saved: CDM Service cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(o){return Promise.all([this.loadPage(i),o.getVisualizations(),o.getApplications(),o.getVizTypes()]).catch(function(i){e.error("Pages - addVisualization: Personalization cannot be saved: Failed to load page, get visualizations or get applications.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(s){var d=s[0];var c=s[1];var u=s[2];var l=s[3];var h=this._getSectionIndex(d,t);var v=this.getModel().getProperty(d+"/sections")||[];var f=this._getVisualizationData(i,n,c,null,u,l);if(r){f.displayFormatHint=r}var g;for(var P=0;P<v.length;P++){if(v[P].default){g=P}}if(h!==undefined||g!==undefined){this.setPersonalizationActive(true);var p=h!==undefined?h:g||0;var z=d+"/sections/"+p+"/visualizations";this.getModel().getProperty(z).push(f);this.getModel().refresh();return o.getPage(i).catch(function(i){e.error("Pages - addVisualization: Personalization cannot be saved: Failed to get page.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var a=e.payload.sections[t||e.payload.layout.sectionOrder[0]];a.layout.vizOrder.push(f.id);a.viz[f.id]={id:f.id,vizId:n};if(r){a.viz[f.id].displayFormatHint=r}return this._conditionalSavePersonalization(i)}.bind(this))}var m=parseInt(d.split("/")[2],10);return this.addSection(m,0,{title:a.i18n.getText("DefaultSection.Title"),default:true,visualizations:[f]})}.bind(this))}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.copyVisualization=function(e,i,t){var n=t.isBookmark;if(!n){return this.addVisualization(e,i,t.vizId,t.displayFormatHint)}return this.addBookmarkToPage(e,{title:t.title,subtitle:t.subtitle,url:t.targetURL,icon:t.icon,info:t.info,serviceUrl:t.indicatorDataSource?t.indicatorDataSource.path:"",serviceRefreshInterval:t.indicatorDataSource?t.indicatorDataSource.refresh:"",numberUnit:t.numberUnit,vizType:t.vizType,vizConfig:t.vizConfig},i)};h.prototype.moveSection=function(i,t,n){if(t===n){return Promise.resolve()}this.setPersonalizationActive(true);var r=this._oPagesModel.getProperty("/pages/"+i+"/id");var a=this._oPagesModel.getProperty("/pages/"+i+"/sections");var o=this._oPagesModel.getProperty("/pages/"+i+"/sections/"+t);var s=o.id;a.splice(t,1);if(t<n){n--}a.splice(n,0,o);this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(r)}).catch(function(i){e.error("Pages - moveSection: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i=e.payload.layout.sectionOrder;i.splice(i.indexOf(s),1);i.splice(n,0,s);return this._conditionalSavePersonalization(r)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.addSection=function(i,t,n){this.setPersonalizationActive(true);var r=n||{};var a=this._oPagesModel.getProperty("/pages/"+i+"/sections");var o=this._oPagesModel.getProperty("/pages/"+i+"/id");var s={id:r.id!==undefined?r.id:this._generateId(o),title:r.title!==undefined?r.title:"",visible:r.visible!==undefined?r.visible:true,preset:r.preset!==undefined?r.preset:false,locked:r.locked!==undefined?r.locked:false,default:r.default!==undefined?r.default:false,visualizations:r.visualizations!==undefined?r.visualizations:[]};a.splice(t,0,s);this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(o)}).catch(function(i){e.error("Pages - addSection: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i={id:s.id,title:s.title,visible:s.visible,preset:s.preset,locked:s.locked,default:s.default,layout:{vizOrder:[]},viz:{}};if(s.visualizations){var n=0;var r;for(;n<s.visualizations.length;n++){r=s.visualizations[n];i.layout.vizOrder.push(r.id);if(r.isBookmark){i.viz[r.id]=c.getVizRef(r)}else{i.viz[r.id]={id:r.id,vizId:r.vizId};if(r.displayFormatHint){i.viz[r.id].displayFormatHint=r.displayFormatHint}}}}e.payload.layout.sectionOrder.splice(t,0,s.id);e.payload.sections[s.id]=i;return this._conditionalSavePersonalization(o)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.deleteSection=function(i,t){this.setPersonalizationActive(true);var n=this._oPagesModel.getProperty("/pages/"+i+"/id");var r=this._oPagesModel.getProperty("/pages/"+i+"/sections");var a=r[t].id;r.splice(t,1);this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(n)}).catch(function(i){e.error("Pages - deleteSection: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){delete e.payload.sections[a];e.payload.layout.sectionOrder.splice(t,1);return this._conditionalSavePersonalization(n)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.setSectionVisibility=function(i,t,n){this.setPersonalizationActive(true);var r=this._oPagesModel.getProperty("/pages/"+i+"/id");var a=this._oPagesModel.getProperty("/pages/"+i+"/sections/"+t+"/id");var o=this._oPagesModel.getProperty("/pages/"+i+"/sections/"+t);if(o.visible===n){return Promise.resolve()}o.visible=n;this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(r)}).catch(function(i){e.error("Pages - setSectionVisibility: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){e.payload.sections[a].visible=n;return this._conditionalSavePersonalization(r)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.renameSection=function(i,t,n){this.setPersonalizationActive(true);var r=this._oPagesModel.getProperty("/pages/"+i);var a=r.sections[t];a.title=n;this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(r.id)}).catch(function(i){e.error("Pages - renameSection: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){e.payload.sections[a.id].title=n;return this._conditionalSavePersonalization(e.identification.id)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.resetSection=function(i,n){this.setPersonalizationActive(true);var r=this._oPagesModel.getProperty("/pages/"+i+"/id");var a=this._oPagesModel.getProperty("/pages/"+i+"/sections/"+n+"/id");return this._oCdmServicePromise.then(function(e){return Promise.all([e.getCachedVisualizations(),e.getApplications(),e.getPage(r),e.getOriginalPage(r),e.getCachedVizTypes()])}).catch(function(i){e.error("Pages - resetSection: Personalization cannot be saved: Failed to gather data from CDM Service.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i=e[0];var t=e[1];var n=e[2];var r=e[3];var a=e[4];return Promise.all([this._getModelForPage(r,i,t,a),n,r])}.bind(this)).then(function(e){var o=e[0];var s=e[1];var d=e[2];var c=t(o.sections.find(function(e){return e.id===a}),20);var u=c.visualizations.map(function(e){return e.id});var l=this._oPagesModel.getProperty("/pages/"+i);l.sections.forEach(function(e){if(c.id!==e.id){e.visualizations.forEach(function(i){if(u.indexOf(i.id)!==-1){var n=this._generateId(r);var a=t(s.payload.sections[e.id].viz[i.id]);delete s.payload.sections[e.id].viz[i.id];var o=s.payload.sections[e.id].layout.vizOrder.indexOf(a.id);a.id=n;s.payload.sections[e.id].viz[n]=a;s.payload.sections[e.id].layout.vizOrder[o]=n;i.id=n}}.bind(this))}}.bind(this));this._oPagesModel._setProperty("/pages/"+i+"/sections/"+n,c);s.payload.sections[c.id]=d.payload.sections[c.id];return this._conditionalSavePersonalization(s.identification.id)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.resetPage=function(i){this.setPersonalizationActive(true);var n=this._oPagesModel.getProperty("/pages/"+i+"/id");return this._oCdmServicePromise.then(function(e){return Promise.all([e.getCachedVisualizations(),e.getApplications(),e.getPage(n),e.getOriginalPage(n),e.getCachedVizTypes()])}).catch(function(i){e.error("Pages - resetPage: Personalization cannot be saved: Failed to gather data from CDM Service.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i=e[0];var t=e[1];var n=e[2];var r=e[3];var a=e[4];return Promise.all([this._getModelForPage(r,i,t,a),n,r])}.bind(this)).then(function(e){var n=e[0];var r=e[1];var a=e[2];this._oPagesModel._setProperty("/pages/"+i,n);r.payload=t(a.payload);return this._conditionalSavePersonalization(r.identification.id)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype.setPersonalizationActive=function(e){if(!this._bDirtyState&&e===true){this._bDirtyState=true;this._oCopiedModelData=t(this._oPagesModel.getProperty("/"),20)}else if(this._bDirtyState&&e===false){this._oPagesModel._setData(this._oCopiedModelData);this._bDirtyState=false}};h.prototype.savePersonalization=function(i){var n;if(!i){n=t(this._aPagesToBeSaved)}else{n=[i]}return this._oCdmServicePromise.then(function(e){return Promise.all(n.map(function(i){var t=this._aPagesToBeSaved.indexOf(i);this._aPagesToBeSaved.splice(t,1);return new Promise(function(t,n){e.save(i).then(t,n)}).catch(function(e){if(this._aPagesToBeSaved.indexOf(i)===-1){this._aPagesToBeSaved.push(i)}return Promise.reject(e)}.bind(this))}.bind(this)))}.bind(this)).then(function(){this._bDirtyState=false}.bind(this)).catch(function(i){e.error("Pages - savePersonalization: Personalization cannot be saved: CDM Service cannot be retrieved or the save process encountered an error.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this))};h.prototype._conditionalSavePersonalization=function(e){if(this._bImplicitSaveEnabled){return this.savePersonalization(e)}if(this._aPagesToBeSaved.indexOf(e)===-1){this._aPagesToBeSaved.push(e)}return Promise.resolve()};h.prototype._getModelForPage=function(i,t,n,r){var d={id:i&&i.identification&&i.identification.id||"",title:i&&i.identification&&i.identification.title||"",description:"",sections:[]};o.setPerformanceMark(["FLP-Pages-Service-getModelForPage-start[",d.id,"]"].join(""));return Promise.all([this._oCSTRServicePromise]).catch(function(e){return Promise.reject(e)}).then(function(c){var u=c[0];var l=s.last("/core/catalog/enableHideGroups");return Promise.all(i.payload.layout.sectionOrder.map(function(o){var s=i.payload.sections[o];var c={id:s.id||"",title:s.default?a.i18n.getText("DefaultSection.Title"):s.title||"",visualizations:[],visible:!l||(s.visible!==undefined?s.visible:true),locked:s.locked!==undefined?s.locked:false,preset:s.preset!==undefined?s.preset:true,default:s.default!==undefined?s.default:false};d.sections.push(c);return Promise.all(s.layout.vizOrder.map(function(a){var o=s.viz[a];var d=o.vizId;return u.getSystemContext(o.contentProviderId).then(function(a){var s=this._getVisualizationData(i.identification.id,d,t,o,n,r,a);c.visualizations.push(s);return this._isIntentSupported(s,u).then(function(i){if(!i){var t=c.visualizations.findIndex(function(e){return e.id===s.id});c.visualizations.splice(t,1);e.warning("The visualization "+s.vizId+" is filtered out, because it does not have a supported intent.")}})}.bind(this))}.bind(this)))}.bind(this))).then(function(){o.setPerformanceMark(["FLP-Pages-Service-getModelForPage-end[",d.id,"]"].join(""));return d})}.bind(this))};h.prototype.removeUnsupportedVisualizations=function(e,i){return this._oCSTRServicePromise.then(function(t){var n=this.getModel().getProperty("/pages/"+e+"/sections/"+i+"/visualizations/");var r=[];for(var a=n.length-1;a>=0;--a){r.push(this._isIntentSupported(n[a],t).then(function(e,i){if(!i){n.splice(e,1)}return i}.bind(this,a)))}return Promise.all(r).then(function(e){if(e.indexOf(false)!==-1){this.getModel().refresh()}}.bind(this))}.bind(this))};h.prototype._isIntentSupported=function(e,i){if(e.target===undefined){return Promise.resolve(false)}if(e.target.type==="URL"){if(u.isStandardVizType(e.vizType)){return Promise.resolve(!!e.target.url)}return Promise.resolve(true)}return new Promise(function(t,n){i.isIntentSupported([e.targetURL]).then(function(i){t(i[e.targetURL].supported)}).fail(function(){t(false)})})};h.prototype.addBookmarkToPage=function(i,t,n,r){if(!i){return Promise.reject("Pages - addBookmarkToPage: Adding bookmark tile failed: No page id is provided.")}var o=c.getBookmarkVizTypeIds(t);this.setPersonalizationActive(true);return Promise.all([this._oCdmServicePromise,this._oCSTRServicePromise]).then(function(e){var t=e[0];var n=e[1];var a=o.map(function(e){return t.getVizType(e)});return Promise.all(a).then(function(e){var t={};e.forEach(function(e,i){t[o[i]]=e;return t});return Promise.all([this.loadPage(i),t,n.getSystemContext(r)])}.bind(this))}.bind(this)).catch(function(i){e.error("Pages - addBookmarkToPage: Personalization cannot be saved: Could not load page.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(o){var s=o[0];var u=o[1];var h=o[2];var v={id:this._generateId(i),vizType:t.vizType,title:t.title,subTitle:t.subtitle,icon:t.icon,info:t.info,numberUnit:t.numberUnit,target:d.toTargetFromHash(t.url),indicatorDataSource:{path:t.serviceUrl,refresh:t.serviceRefreshInterval},vizConfig:t.vizConfig,isBookmark:true};if(t.dataSource){v.dataSource={type:t.dataSource.type,settings:{odataVersion:l.get(["dataSource","settings","odataVersion"],t)}}}if(r){v.contentProviderId=r}var f=this._getVisualizationData(i,undefined,{},v,{},u,h);var g=parseInt(/pages\/(\d+)/.exec(s)[1],10);var P=this._oPagesModel.getProperty(s);var p;if(n){p=P.sections.find(function(e){return e.id===n});if(!p){e.error("Pages - addBookmarkToPage: Adding bookmark tile failed: specified section was not found in the page.");return Promise.reject("Pages - addBookmarkToPage: Adding bookmark tile failed: specified section was not found in the page.")}}else{p=P.sections.find(function(e){return e.default});if(!p){return this.addSection(g,0,{title:a.i18n.getText("DefaultSection.Title"),default:true,visualizations:[f]})}}p.visualizations.push(f);this._oPagesModel.refresh();return this._oCdmServicePromise.then(function(e){return e.getPage(i)}).catch(function(i){e.error("Pages - addBookmarkToPage: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var t=e.payload.sections[p.id];t.layout.vizOrder.push(f.id);t.viz[f.id]=c.getVizRef(f);return this._conditionalSavePersonalization(i)}.bind(this))}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype._visitPages=function(e){return this._oCdmServicePromise.then(function(e){return e.getAllPages()}).then(function(i){i=i||[];i.forEach(function(i){e(i)})})};h.prototype._visitSections=function(e){return this._visitPages(function(i){var t=i.payload&&i.payload.sections||{};Object.keys(t).forEach(function(n){e(t[n],i)})})};h.prototype._visitVizReferences=function(e){return this._visitSections(function(i,t){var n=i.viz||{};Object.keys(n).forEach(function(r){e(n[r],i,t)})})};h.prototype._findBookmarks=function(e){var i=[];return Promise.resolve().then(function(){var t=d.toTargetFromHash(e.url);t=c.harmonizeTarget(t);return this._visitVizReferences(function(n,r,a){if(n.isBookmark&&e.vizType===n.vizType&&(n.contentProviderId||"")===(e.contentProviderId||"")&&d.isSameTarget(t,n.target)){i.push({vizRefId:n.id,sectionId:r.id,pageId:a.identification.id})}}).then(function(){return i})}.bind(this))};h.prototype.countBookmarks=function(e){return this._findBookmarks(e).then(function(e){return e.length})};h.prototype.deleteBookmarks=function(e,i,t){var n=0;return this._findBookmarks(e).then(function(e){return e.reduce(function(e,r){if(i&&r.pageId!==i){return e}if(t&&r.sectionId!==t){return e}return e.then(function(){return this.findVisualization(r.pageId,r.sectionId,null,r.vizRefId)}.bind(this)).then(function(e){var i=e[0];var t=this.getPageIndex(i.pageId);return this.deleteVisualization(t,i.sectionIndex,i.vizIndexes[0])}.bind(this)).then(function(){n=n+1}).catch(function(){})}.bind(this),Promise.resolve())}.bind(this)).then(function(){return n})};h.prototype.updateBookmarks=function(i,t){if(!i||!i.url||typeof i.url!=="string"){e.error("Fail to update bookmark. No valid URL");return Promise.reject("Invalid URL provided")}if(!t||typeof t!=="object"){e.error("Fail to update bookmark. No valid parameters, URL is: "+i.url);return Promise.reject("Missing parameters")}var n=0;return Promise.all([this._findBookmarks(i)]).then(function(e){var i=e[0];return i.reduce(function(e,i){return e.then(function(){return this.findVisualization(i.pageId,i.sectionId,null,i.vizRefId)}.bind(this)).then(function(e){var i=e[0];var n=this.getPageIndex(i.pageId);var r={subtitle:t.subtitle,icon:t.icon,info:t.info,numberUnit:t.numberUnit,indicatorDataSource:{path:t.serviceUrl,refresh:t.serviceRefreshInterval},vizConfig:t.vizConfig};if(t.title){r.title=t.title}if(t.url){r.target=c.harmonizeTarget(d.toTargetFromHash(t.url))}return this.updateVisualization(n,i.sectionIndex,i.vizIndexes[0],r)}.bind(this)).then(function(){n=n+1}).catch(function(){})}.bind(this),Promise.resolve())}.bind(this)).then(function(){return n})};h.prototype.updateVisualization=function(e,i,a,o){return this._oCdmServicePromise.then(function(e){return Promise.all([e.getCachedVisualizations(),e.getApplications(),e.getCachedVizTypes()])}).then(function(s){var u=s[0];var l=s[1];var h=s[2];var v=this._oPagesModel.getProperty("/pages/"+e);var f=v.sections[i];var g=f.visualizations;var P=g[a];var p={};this.setPersonalizationActive(true);if(this._isPropertyChanged(P.title,o.title)){p.title=o.title}if(o.target&&!d.isSameTarget(P.target,o.target)){p.target=o.target}if(this._isPropertyChanged(P.subtitle,o.subtitle)){p.subtitle=o.subtitle}if(this._isPropertyChanged(P.icon,o.icon)){p.icon=o.icon}if(this._isPropertyChanged(P.info,o.info)){p.info=o.info}if(this._isPropertyChanged(P.numberUnit,o.numberUnit)){p.numberUnit=o.numberUnit}if(this._isPropertyChanged(P.displayFormatHint,o.displayFormatHint)){p.displayFormatHint=o.displayFormatHint}if(o.indicatorDataSource&&P.indicatorDataSource&&(this._isPropertyChanged(P.indicatorDataSource.path,o.indicatorDataSource.path)||this._isPropertyChanged(P.indicatorDataSource.refresh,o.indicatorDataSource.refresh))){p.indicatorDataSource=t(P.indicatorDataSource);n(p.indicatorDataSource,o.indicatorDataSource)}if(o.vizConfig){P.vizConfig=r({},P.vizConfig,o.vizConfig);p.vizConfig=P.vizConfig}n(P,p);var z=c.getVizRef(P);P=this._getVisualizationData(v.id,z.vizId,u,z,l,h);g[a]=P;this._oPagesModel.refresh();return this._updateVisualizationCDMData(v.id,f.id,P.id,p).then(function(){return{pageId:v.id,sectionId:f.id,vizRefId:P.id}})}.bind(this))};h.prototype._updateVisualizationCDMData=function(i,t,r,a){return this._oCdmServicePromise.then(function(e){return e.getPage(i)}).catch(function(i){e.error("Pages - updateVisualization: Personalization cannot be saved: CDM Service or Page cannot be retrieved.",i,this.COMPONENT_NAME);return Promise.reject(i)}.bind(this)).then(function(e){var i=e.payload.sections[t].viz[r];var o=c.getVizRef(a);o.vizConfig=a.vizConfig;n(i,o);return this._conditionalSavePersonalization(e.identification.id)}.bind(this)).catch(function(e){this.setPersonalizationActive(false);return Promise.reject(e)}.bind(this))};h.prototype._isPropertyChanged=function(e,i){if((i||i==="")&&e!==i){return true}return false};h.hasNoAdapter=true;return h},true);