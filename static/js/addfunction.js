// JavaScript Document
/* eslint-disable */
function add(fun) {
	"use strict";
	var oldfun = window.onload;
	if (typeof window.onload !== "function") {
		window.onload = fun;
	} else {
		window.onload = function () {
			oldfun();
			fun();
		};
	}
}
