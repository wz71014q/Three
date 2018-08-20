// JavaScript Document
/* eslint-disable */
function getClass(obj, cls) {//自定义getElementByClassName
	"use strict";
	var oparent = document.getElementById(obj) || document;
	var ele = [],
		elements = oparent.getElementsByTagName("*");
	for(var i = 0; i < elements.length; i++) {
		if (elements[i].className === cls) {
			ele.push(elements[i]);
		}
		return ele;
	}
}



function hasClass(obj, cls) { //判断是否有该类名
	"use strict";
	var oparent = document.getElementById(obj) || document;
	return oparent.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function removeClass(obj, cls) { //删除类
	"use strict";
	var oparent = document.getElementById(obj) || document;
	if (hasClass(obj, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		oparent.className = oparent.className.replace(reg, "");
	}
}

function addClass(obj, cls) { //添加类
	"use strict";
	var oparent = document.getElementById(obj) || document;
	if (!hasClass(obj, cls)) {
		oparent.className += " " + cls;
	}
}
