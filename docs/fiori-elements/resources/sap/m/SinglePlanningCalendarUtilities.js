/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";function t(t){this.data=t;this.level=0;this.width=1;this.prev=null;this.next=null}t.prototype.hasNext=function(){return this.next!==null};t.prototype.hasPrev=function(){return this.prev!==null};t.prototype.getData=function(){return this.data};function e(){this.head=null;this.tail=null;this.size=0;this.iterator=new i(this)}e.prototype.getHeadNode=function(){return this.head};e.prototype.getTailNode=function(){return this.tail};e.prototype.getSize=function(){return this.size};e.prototype.isEmpty=function(){return this.getSize()===0};e.prototype.createNewNode=function(e){return new t(e)};e.prototype.getIterator=function(){return this.iterator};e.prototype.indexOf=function(t,e){this.iterator.reset();var i,r=0;while(this.iterator.hasNext()){i=this.iterator.next();if(e(i)){return r}r++}return-1};e.prototype.add=function(e){var i=e;if(!(e instanceof t)){i=this.createNewNode(e)}if(this.isEmpty()){this.head=this.tail=i}else{this.tail.next=i;i.prev=this.tail;this.tail=i}this.size++;return true};e.prototype.insertFirst=function(e){if(this.isEmpty()){this.add(e)}else{var i=e;if(!(e instanceof t)){i=this.createNewNode(e)}i.next=this.head;this.head.prev=i;this.head=i;this.size++;return true}};e.prototype.insertAt=function(e,i){var r=this.getHeadNode(),n=0,s=i;if(!(i instanceof t)){s=this.createNewNode(i)}if(e<0){return false}if(e===0){return this.insertFirst(i)}if(e>this.getSize()-1){return this.add(i)}while(n<e){r=r.next;n++}r.prev.next=s;s.prev=r.prev;r.prev=s;s.next=r;this.size++;return true};e.prototype.insertAfterLevel=function(t,e){var i=this.indexOf(e,function(e){var i=e.level===t;if(e.next&&e.next.level===t){i=false}return i}),r=this.getSize();if(i+1===r||i===-1){return this.add(e)}else{return this.insertAt(i+1,e)}};function i(t){this.list=t;this.stopIterationFlag=false;this.currentNode=null}i.prototype.next=function(){var t=this.currentNode;if(this.currentNode!==null){this.currentNode=this.currentNode.next}return t};i.prototype.hasNext=function(){return this.currentNode!==null};i.prototype.reset=function(){this.currentNode=this.list.getHeadNode();return this};i.prototype.forEach=function(t,e){var i;e=e||this;this.reset();while(this.hasNext()&&!this.stopIterationFlag){i=this.next();t.call(e,i)}this.stopIterationFlag=false};i.prototype.interrupt=function(){this.stopIterationFlag=true;return this};return{iterator:i,node:t,list:e}});