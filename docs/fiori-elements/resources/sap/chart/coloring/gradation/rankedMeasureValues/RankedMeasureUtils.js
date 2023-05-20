/*!
 * SAPUI5
 * (c) Copyright 2009-2023 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/chart/coloring/ColoringUtils","sap/chart/coloring/ColorPalette","sap/chart/ChartLog"],function(e,r,o){"use strict";var a={SingleColorScheme:{},DivergingColorScheme:{},TargetColorScheme:{}};var i=["NoSemantics","Positive","Negative"];var n=["NoSemantics","PositiveToNegative","NegativeToPositive","ColdToHot","HotToCold"];var t=["PositiveTarget"];var l=["LightToDark","DarkToLight"];var g=5;var c=["BelowMidArea","AboveMidArea"];var s=["MidAreaLowValue","MidAreaHighValue"];var u=["BelowTargetMidpoint","AboveTargetMidpoint"];var h=["TargetMidpoint"];var m="colorings.Gradation.RankedMeasureValues";function f(r){return e.isNumber(r)&&r%1===0&&r>=2&&r<=6}function v(e,r,o){var a=[];var i=(r-e)/o;if(i>1){if(e+Math.ceil(i)*(o-1)<r){i=Math.ceil(i)}else{i=Math.floor(i)}}for(var n=0;n<o;n++){a.push(e+i*n)}return a}function S(e,r,o,a,i){var n=e.min,t=e.max,l=e.hasOwnProperty("belowMidArea")?e.belowMidArea:e.belowTargetMidpoint,g=e.hasOwnProperty("aboveMidArea")?e.aboveMidArea:e.aboveTargetMidpoint,c=e.hasOwnProperty("midAreaLowValue")?e.midAreaLowValue:e.targetMidpoint,s=e.midAreaHighValue;var u=[],h=[],m=[],f=0;if(c!==undefined){u.push(c)}if(s!==undefined&&u.indexOf(s)===-1){u.push(s)}if(u.length>1){h.push(1);m.push(a);f++}var S;if(n<u[0]){u=[n].concat(u);h=[l].concat(h);S=i(r,l);if(r.gradationSaturation==="DarkToLight"){S=S.reverse()}m=S.concat(m);f+=l}if(t>u[u.length-1]){u=u.concat([t]);h=h.concat([g]);S=i(o,g);if(o.gradationSaturation==="DarkToLight"){S=S.reverse()}m=m.concat(S);f+=g}var d=[];for(var b=0;b<u.length-1;b++){d=d.concat(v(u[b],u[b+1],h[b]))}d=d.concat(u.slice(-1));if(m.length===0){m=i(r,1);return{feed:"color",palette:[],startColor:m[0],endColor:m[0],numOfSegments:1}}return{feed:"color",palette:m,numOfSegments:f,maxNumOfSegments:13,legendValues:d}}a.SingleColorScheme.SUPPORTED_SINGLE_SCHEMES=i;a.SingleColorScheme.SUPPORTED_SATURATIONS=l;a.SingleColorScheme.validate=function(e,r){var a=e[r].SingleColorScheme||{};if(a.Scheme&&i.indexOf(a.Scheme)===-1){throw new o("error",m,'"SingleColorScheme.Scheme" of the measure, '+r+', should be one of "'+i.join('" or "')+'".')}if(a.Saturation&&l.indexOf(a.Saturation)===-1){throw new o("error",m,'"SingleColorScheme.Saturation" of the measure, '+r+', should be one of "'+l.join('" or "')+'".')}};a.SingleColorScheme.parse=function(e,r){var o=e.settings[e.type];var a=[];if(e.byAggregation){a=e.byAggregation.LevelBoundaries}r.legend={segments:a,gradationScheme:o.Scheme||i[0],gradationSaturation:o.Saturation||l[0],numberOfLevels:o.NumberOfLevels||g,min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY}};a.SingleColorScheme.createScales=function(o){var a=[],i=o[0];var n=i.parsed.legend;var t=r.GRADATION.SingleColorScheme[n.gradationScheme];var l=n.numberOfLevels;if(n.segments.length>0){a=n.segments;l=a.length-1;var g=n.min,c=n.max;if(g<a[0]){a=[g].concat(a);l++}if(c>a[a.length-1]){a=a.concat([c]);l++}}t=e.assignColor(t,l);if(n.gradationSaturation==="DarkToLight"){t=t.reverse()}return{feed:"color",palette:t,numOfSegments:l,legendValues:a}};a.SingleColorScheme.levels=function(e,r,a){var i=e[r].SingleColorScheme;if(a){var n=false;var t=a.LevelBoundaries;if(Array.isArray(t)&&t.length>=1&&t.length<=5){n=t.reduce(function(e,r){return e<r?r:Number.POSITIVE_INFINITY},Number.NEGATIVE_INFINITY)<Number.POSITIVE_INFINITY}if(!n){throw new o("error",m,'"SingleColorScheme.RankingPerAggregationLevel.LevelBoundaries" of the measure, '+r+", may contain between 1 to 5 members in strictly increasing sequence.")}}else{if(i.hasOwnProperty("NumberOfLevels")){var l=i.NumberOfLevels;if(!f(l)){throw new o("error",m,'"SingleColorScheme.NumberOfLevels" of the measure, '+r+", should be an Integer between 2 to 6.")}}}};a.DivergingColorScheme.validate=function(e,r){var a=e[r].DivergingColorScheme;if(a.Scheme&&n.indexOf(a.Scheme)===-1){throw new o("error",m,'"DivergingColorScheme.Scheme" of the measure, '+r+', should be one of "'+n.join('" or "')+'".')}var i=a.NumberOfLevels;c.forEach(function(e){if(!f(i&&i[e])){throw new o("error",m,'"DivergingColorScheme.NumberOfLevels.'+e+'"  of the measure, '+r+", should be an Integer between 2 to 6.")}})};a.DivergingColorScheme.parse=function(e,r){var o=e.settings[e.type];r.legend={midAreaLowValue:e.byAggregation.MidAreaLowValue,midAreaHighValue:e.byAggregation.MidAreaHighValue,gradationScheme:o.Scheme||n[0],belowMidArea:o.NumberOfLevels.BelowMidArea,aboveMidArea:o.NumberOfLevels.AboveMidArea,min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY}};a.DivergingColorScheme.createScales=function(o){var a=o[0];var i=a.parsed.legend;var n=r.GRADATION.DivergingColorScheme[i.gradationScheme],t=n.slice(0,6).reverse(),l=n.slice(7);t.gradationSaturation="DarkToLight";return S(i,t,l,n[6],e.assignColor)};a.DivergingColorScheme.levels=function(r,a,i){var n=false;s.forEach(function(r){if(i.hasOwnProperty(r)){n=true;if(!e.isNumber(i[r])){throw new o("error",m,'"DivergingColorScheme.NumberOfLevels.'+r+'"  of the measure, '+a+", should be a number.")}}});if(!n){throw new o("error",m,'At least one of the "MidAreaLowValue" or "MidAreaHighValue" in "DivergingColorScheme.RankingPerAggregationLevel" of the measure, '+a+", should be specified.")}if(i.MidAreaLowValue>i.MidAreaHighValue){throw new o("error",m,'"MidAreaLowValue" should no more than "MidAreaHighValue" in "DivergingColorScheme.RankingPerAggregationLevel" of the measure, '+a+".")}};a.TargetColorScheme.validate=function(e,r){var a=e[r].TargetColorScheme;if(a.Scheme&&t.indexOf(a.Scheme)===-1){throw new o("error",m,'"TargetColorScheme.Scheme" of the measure, '+r+',  should be "'+t.join('" or "')+'".')}var i=a.NumberOfLevels;u.forEach(function(e){if(!f(i&&i[e])){throw new o("error",m,'"TargetColorScheme.NumberOfLevels.'+e+'"  of the measure, '+r+", should be an Integer between 2 to 6.")}})};a.TargetColorScheme.parse=function(e,r){var o=e.settings[e.type];r.legend={targetMidpoint:e.byAggregation.TargetMidpoint,gradationScheme:o.Scheme||t[0],belowTargetMidpoint:o.NumberOfLevels.BelowTargetMidpoint,aboveTargetMidpoint:o.NumberOfLevels.AboveTargetMidpoint,min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY}};a.TargetColorScheme.createScales=function(e){var o=e[0];var i=o.parsed.legend;var n=r.GRADATION.TargetColorScheme[i.gradationScheme],t=n.slice(0,6),l=n.slice(0,6);l.gradationSaturation="DarkToLight";return S(i,t,l,null,a.TargetColorScheme.assignColor)};a.TargetColorScheme.levels=function(r,a,i){h.forEach(function(r){if(!e.isNumber(i[r])){throw new o("error",m,'"TargetColorScheme.NumberOfLevels.'+r+'"  of the measure, '+a+", should be a number.")}})};a.TargetColorScheme.assignColor=function(e,r){switch(r){case 1:return[e[5]];case 2:return[e[0],e[5]];case 3:return[e[0],e[2],e[5]];case 4:return e.slice(0,2).concat(e.slice(4,6));case 5:return e.slice(0,3).concat(e.slice(4,6));case 6:return e.slice(0,6);default:return null}};return a});