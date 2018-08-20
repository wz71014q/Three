var EventUtil = { //新建对象
	addHandler: function (element, type, handler) { //定义添加事件句柄
		"use strict";
		if (element.addEventListener) { //检查是否支持DOM2级
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) { //是否IE
			element.attachEvent("on" + type, handler);
		} else { //DOM0级（老版本浏览器）
			element["on" + type] = handler;
		} //element.===element[] 
	},
	removeHandler: function (element, type, handler) { //删除事件句柄
		"use strict";
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	}
};
