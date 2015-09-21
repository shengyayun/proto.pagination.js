(function(module, undefined) {
     function pagination(containerId, pageIndex, pageCount, options) {
          if (typeof this.setting == "undefined") throw "new required";
          this.container = document.getElementById(containerId);
          if (this.container == null) throw "container is null";
          this.pageIndex = parseInt(pageIndex) < 1 ? 1 : parseInt(pageIndex);
          this.pageCount = parseInt(pageCount) < 1 ? 1 : parseInt(pageCount);
          this.setting = this.setting(options);
          with(document) 0[(getElementsByTagName("head")[0] || body).appendChild(document.createElement("style")).innerHTML = this.setting.css];
     }
     pagination.prototype.setting = function(options) {
          var setting = {
               "href": location.pathname + "?pageIndex={0}&pageCount={1}",
               "labelSize": 7,
               "prevBtn": true,
               "nextBtn": true,
               "ellipsis": "....",
               "css": ".qd_pagination_ul{height:35px;}.qd_pagination_ul li a,.qd_pagination_ul li span{padding:0 12px;}.qd_pagination_ul li a:hover{color:#515151}.qd_pagination_ul li{color:#d9d9d9;list-style:none;float:left;font-size:16px;text-align:center;height:32px;line-height:32px;border:1px solid #d9d9d9;border-radius:2px;margin-right:10px}.qd_pagination_ul li span{cursor:default}.qd_pagination_ul li.active{color:#fff;background:#cc2931;border:1px solid #cc2931}.qd_pagination_ul li.ellipsis{border:0;}.qd_pagination_ul li a{color:#515151;text-decoration:none;}"
          };
          if (typeof options != "undefined") {
               for (var property in options) {
                    setting[property] = options[property];
               }
          }
          return setting;
     }
     pagination.prototype.draw = function() {
          var target = this.container;
          var pageIndex = this.pageIndex;
          var pageCount = this.pageCount;
          var setting = this.setting;
          var result = "";
          var labelSize = this.setting.labelSize;
          var ellipsis = this.setting.ellipsis;

          function format(tmpStr) {
               var iLen = arguments.length;
               for (var i = 1; i < iLen; i += 1)
                    tmpStr = tmpStr.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);

               return tmpStr;
          }

          function buildLabel(index) {
               if (index == ellipsis) {
                    return '<li class="ellipsis"><span>...</span></li>';
               }
               if (index == pageIndex) {
                    return '<li class="active"><span>' + index + '</span></li>';
               }
               return format("<li><a href='{0}'>{1}</a></li>", format(setting.href, index, pageCount), index);
          }

          function buildList() {
               var result = "";
               if (pageCount <= labelSize + 2) {
                    for (var i = 1; i <= pageCount; i++) {
                         result += buildLabel(i);
                    }
                    return result;
               }
               var half = parseInt((labelSize - 1) / 2);
               if (pageIndex - half - 1 <= 0) {
                    for (var i = 1; i <= labelSize; i++) {
                         result += buildLabel(i);
                    }
                    result += buildLabel(ellipsis);
                    result += buildLabel(pageCount);
                    return result;
               }
               result += buildLabel(1);
               result += buildLabel(ellipsis);
               if (pageIndex + half + 1 < pageCount) {
                    for (var i = pageIndex - half; i <= pageIndex + half; i++) {
                         result += buildLabel(i);
                    }
                    result += buildLabel(ellipsis);
                    result += buildLabel(pageCount);
                    return result;
               }
               for (var i = pageCount + 1 - labelSize; i <= pageCount; i++) {
                    result += buildLabel(i);
               }
               return result;
          }
          if (setting.prevBtn) {
               if (pageIndex <= 1) {
                    result += '<li class="prev_page"><span>上一页</span></li>';
               } else {
                    result += format('<li class="prev_page"><a href="{0}">上一页</a></li>', format(setting.href, pageIndex - 1, pageCount));
               }
          }
          result += buildList();
          if (setting.nextBtn) {
               if (pageIndex >= pageCount) {
                    result += '<li class="next_page"><span>下一页</span></li>';
               } else {
                    result += format('<li class="next_page"><a href="{0}">下一页</a></li>', format(setting.href, pageIndex + 1, pageCount));
               }
          }
          target.innerHTML = '<ul class="qd_pagination_ul">' + result + '</ul>';
     }
     module.Pagination = pagination;
})(window);
