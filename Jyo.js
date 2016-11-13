new function (win, doc) {
    "use strict";

    this.importScript = function (file, callback, onprocess, index, num) {
        /// <summary>导入脚本</summary>
        /// <param name="file" type="String 或者 Array&lt;String&gt;">要导入的文件名称或名称数组</param>
        /// <param name="callback" type="Function" optional="true">导入完成后的回调函数&#10;传入true为正确导入&#10;传入false为出现错误并额外传入一个信息对象</param>

        var script = doc.createElement("script");
        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
				index=index||0;
                index++;	
                onprocess && onprocess(index,num ?num: file instanceof Array ? file.length:1);
                // 判断是否需要导入多个脚本
                if (file instanceof Array && file.length > 1) {
					
                    Jyo.importScript(file.slice(1, file.length), callback, onprocess, index, num || file.length);
                } else {
                    callback && callback(true);
                }
                // 移除脚本
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            }
        };
        script.onerror = function (e) {
            callback && callback(false, e);
        };
        // 开始加载
        script.src = (file instanceof Array ? file[0] : file) + "?random=" + this.createGUID();
        // 将脚本添加到DOM树中
        var head = doc.getElementsByTagName('head')[0];
        if (typeof head != "undefined") {
            head.appendChild(script);
        } else {
            doc.appendChild(scrip);
        }
    };

    this.loadFile = function (url, syne, type, callback, onerror) {
        /// <summary>Ajax加载文件</summary>
        /// <param name="url" type="String">文件地址</param>
        /// <param name="syne" type="Boolean">是否同步加载</param>
        /// <param name="type" type="String">Mime类型</param>
        /// <param name="callback" type="Function">回调函数</param>
        /// <param name="onerror" type="Function">自定义错误处理函数</param>

        var xmlHttp = "XMLHttpRequest" in window ? new XMLHttpRequest() : new ActiveXObject("Msxml2.XMLHTTP");

        type = type == null ? 'text/plain' : type;

        if (!("withCredentials" in xmlHttp)) {
            xmlHttp = new XDomainRequest();
            xmlHttp.onload = function () {
                callback(this.responseText);
            };
            xmlHttp.open("GET", url);
        } else {
            xmlHttp.open('GET', url, syne == null ? false : syne);

            //定义传输的文件HTTP头信息
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        }

        // 文本格式不支持设置responseType
        if (type.indexOf("text") < 0) {
            xmlHttp.responseType = type;
        }
        xmlHttp.onerror = onerror || function () {
            throw new Error("File \"" + url + "\" failed to load");
        };
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status == 404) { this.onerror(); }
                if (callback) {
                    if (type.indexOf("text") < 0) {
                        callback(xmlHttp.response);
                    } else {
                        callback(xmlHttp.responseText);
                    }
                }
            }
        };
        xmlHttp.send(null);
    };

    this.createGUID = function () {
        /// <summary>创建GUID字符串</summary>
        /// <returns type="String"></returns>

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16).toUpperCase();
        });
    };

    win.Jyo = this;
}(window, document);