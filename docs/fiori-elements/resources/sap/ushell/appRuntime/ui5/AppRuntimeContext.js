// Copyright (c) 2009-2023 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/assert"],function(t){"use strict";function e(){var t=false,e="",n;this.setAppLifeCycleAgent=function(t){n=t};this.setIsScube=function(e){t=e};this.getIsScube=function(){return t};this.setRemoteSystemId=function(t){e=t};this.getRemoteSystemId=function(){return e};this.checkDataLossAndContinue=function(){return n?n.checkDataLossAndContinue():true}}return new e});