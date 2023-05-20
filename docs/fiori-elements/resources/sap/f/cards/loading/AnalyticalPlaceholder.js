/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core"],function(C,e){"use strict";var t=C.extend("sap.f.cards.loading.AnalyticalPlaceholder",{metadata:{library:"sap.f",properties:{chartType:{type:"string",defaultValue:""},minHeight:{type:"string",defaultValue:""}}},renderer:{apiVersion:2,render:function(C,t){var H=e.getLibraryResourceBundle("sap.ui.core"),a=H.getText("BUSY_TEXT");C.openStart("div",t).class("sapFCardContentPlaceholder").class("sapFCardContentAnalyticalPlaceholder").attr("tabindex","0").attr("title",a).style("min-height",t.getMinHeight());C.accessibilityState(t,{role:"progressbar",valuemin:"0",valuemax:"100"});C.openEnd();C.openStart("div").openEnd();this.renderSVG(t,C);C.close("div");C.close("div")},renderSVG:function(C,e){var t=C.getChartType().toLowerCase();e.openStart("svg").class("sapFCardLoadingShimmer").attr("width","100%").attr("height","100%").attr("xmlns","http://www.w3.org/2000/svg").attr("version","1.1");if(t.indexOf("line")>-1){e.attr("viewBox","0 0 262 191")}else if(t.indexOf("bar")>-1){e.attr("viewBox","0 0 268 186")}else if(t.indexOf("pie")>-1||t.indexOf("donut")>-1){e.attr("viewBox","0 0 263 165")}else{e.attr("viewBox","0 0 266 188")}e.class("sapFCardSVG").openEnd();e.openStart("path");if(t.indexOf("line")>-1){e.attr("d","M262 0H0V191H262V0ZM3 5C3 3.89543 3.89543 3 5 3H11C12.1046 3 13 3.89543 13 5V7C13 8.10457 12.1046 9 11 9H5C3.89543 9 3 8.10457 3 7V5ZM18 6C18 5.44772 18.4477 5 19 5H258C258.552 5 259 5.44772 259 6C259 6.55228 258.552 7 258 7H19C18.4477 7 18 6.55228 18 6ZM18 42C18 41.4477 18.4477 41 19 41H236.084L239.727 38.3375C239.26 37.3217 239 36.1913 239 35C239 30.5817 242.582 27 247 27C251.418 27 255 30.5817 255 35C255 37.3894 253.952 39.5341 252.292 41H258C258.552 41 259 41.4477 259 42C259 42.5523 258.552 43 258 43H247H240.127L215.092 61.2945C215.672 62.4023 216 63.6629 216 65C216 69.4183 212.418 73 208 73C204.96 73 202.316 71.3044 200.962 68.8073L175.988 75.4461C175.958 75.9797 175.877 76.4993 175.748 77H258C258.552 77 259 77.4477 259 78C259 78.5523 258.552 79 258 79H174.93C173.547 81.3912 170.961 83 168 83C165.69 83 163.608 82.0207 162.148 80.4546L135.905 92.7659C135.968 93.1681 136 93.5803 136 94C136 98.4183 132.418 102 128 102C126.483 102 125.066 101.578 123.857 100.845L111.391 113H258C258.552 113 259 113.448 259 114C259 114.552 258.552 115 258 115H109.339L94.9479 129.032C95.6173 130.201 96 131.556 96 133C96 137.418 92.4183 141 88 141C86.2836 141 84.6935 140.459 83.3905 139.539L72.0664 149H258C258.552 149 259 149.448 259 150C259 150.552 258.552 151 258 151H69.6725L55.3905 162.932C55.7832 163.877 56 164.913 56 166C56 170.418 52.4183 174 48 174C45.9336 174 44.0501 173.217 42.6305 171.93L23.5663 183H257C258.105 183 259 183.895 259 185C259 186.105 258.105 187 257 187H5C3.89543 187 3 186.105 3 185C3 183.895 3.89543 183 5 183H16.129L15.9957 182.77L40.4267 168.585C40.1501 167.774 40 166.904 40 166C40 161.582 43.5817 158 48 158C49.8812 158 51.6107 158.649 52.9767 159.736L63.4335 151H19C18.4477 151 18 150.552 18 150C18 149.448 18.4477 149 19 149H65.8275L80.8 136.491C80.2875 135.436 80 134.252 80 133C80 128.582 83.5817 125 88 125C89.5231 125 90.9468 125.426 92.1587 126.164L103.609 115H19C18.4477 115 18 114.552 18 114C18 113.448 18.4477 113 19 113H105.661L121.061 97.9844C120.386 96.8113 120 95.4507 120 94C120 89.5817 123.582 86 128 86C130.569 86 132.854 87.2105 134.318 89.0922L155.83 79H19C18.4477 79 18 78.5523 18 78C18 77.4477 18.4477 77 19 77H160.094L160.235 76.9335C160.082 76.3144 160 75.6667 160 75C160 70.5817 163.582 67 168 67C171.169 67 173.908 68.843 175.203 71.5157L200 64.9241C200.041 60.5408 203.607 57 208 57C209.622 57 211.132 57.4829 212.393 58.3128L233.347 43H19C18.4477 43 18 42.5523 18 42ZM5 39C3.89543 39 3 39.8954 3 41V43C3 44.1046 3.89543 45 5 45H11C12.1046 45 13 44.1046 13 43V41C13 39.8954 12.1046 39 11 39H5ZM3 77C3 75.8954 3.89543 75 5 75H11C12.1046 75 13 75.8954 13 77V79C13 80.1046 12.1046 81 11 81H5C3.89543 81 3 80.1046 3 79V77ZM5 111C3.89543 111 3 111.895 3 113V115C3 116.105 3.89543 117 5 117H11C12.1046 117 13 116.105 13 115V113C13 111.895 12.1046 111 11 111H5ZM3 149C3 147.895 3.89543 147 5 147H11C12.1046 147 13 147.895 13 149V151C13 152.105 12.1046 153 11 153H5C3.89543 153 3 152.105 3 151V149Z")}else if(t.indexOf("bar")>-1){e.attr("d","M0 0H268V186H0V0ZM7 2C5.89543 2 5 2.89544 5 4.00001V180C5 181.105 5.89543 182 7 182C7.17265 182 7.34019 181.978 7.5 181.937C7.65981 181.978 7.82735 182 8 182H261C262.105 182 263 181.105 263 180C263 178.895 262.105 178 261 178H9V4C9 2.89543 8.10457 2 7 2ZM25 10C23.8954 10 23 10.8954 23 12V33C23 34.1046 23.8954 35 25 35H249C250.105 35 251 34.1046 251 33V12C251 10.8954 250.105 10 249 10H25ZM23 44C23 42.8954 23.8954 42 25 42H188C189.105 42 190 42.8954 190 44V65C190 66.1046 189.105 67 188 67H25C23.8954 67 23 66.1046 23 65V44ZM25 74C23.8954 74 23 74.8954 23 76V97C23 98.1046 23.8954 99 25 99H212C213.105 99 214 98.1046 214 97V76C214 74.8954 213.105 74 212 74H25ZM23 108C23 106.895 23.8954 106 25 106H191C192.105 106 193 106.895 193 108V129C193 130.105 192.105 131 191 131H25C23.8954 131 23 130.105 23 129V108ZM25 138C23.8954 138 23 138.895 23 140V161C23 162.105 23.8954 163 25 163H171C172.105 163 173 162.105 173 161V140C173 138.895 172.105 138 171 138H25Z")}else if(t.indexOf("pie")>-1||t.indexOf("donut")>-1){e.attr("d","M263 0H0V165H263V0ZM178 5C176.895 5 176 5.89543 176 7V21C176 22.1046 176.895 23 178 23H258C259.105 23 260 22.1046 260 21V7C260 5.89543 259.105 5 258 5H178ZM176 30C176 28.8954 176.895 28 178 28H240C241.105 28 242 28.8954 242 30V44C242 45.1046 241.105 46 240 46H178C176.895 46 176 45.1046 176 44V30ZM178 51C176.895 51 176 51.8954 176 53V67C176 68.1046 176.895 69 178 69H258C259.105 69 260 68.1046 260 67V53C260 51.8954 259.105 51 258 51H178ZM176 76C176 74.8954 176.895 74 178 74H240C241.105 74 242 74.8954 242 76V90C242 91.1046 241.105 92 240 92H178C176.895 92 176 91.1046 176 90V76ZM178 97C176.895 97 176 97.8954 176 99V113C176 114.105 176.895 115 178 115H258C259.105 115 260 114.105 260 113V99C260 97.8954 259.105 97 258 97H178ZM176 122C176 120.895 176.895 120 178 120H240C241.105 120 242 120.895 242 122V136C242 137.105 241.105 138 240 138H178C176.895 138 176 137.105 176 136V122ZM84 161.961V121.92C104.098 120.632 120 103.923 120 83.5C120 69.1297 112.127 56.5982 100.459 49.9838L120.206 15.1903C143.97 28.6843 160 54.2201 160 83.5C160 126.018 126.197 160.641 84 161.961ZM81 121.997V161.998C37.8758 161.729 3 126.688 3 83.5C3 59.3758 13.8821 37.7933 31.0052 23.3933L56.6947 54.0549C48.32 61.1173 43 71.6874 43 83.5C43 104.596 59.9675 121.729 81 121.997ZM117.569 13.7589L97.7909 48.6064C92.8434 46.2926 87.3226 45 81.5 45C73.128 45 65.3802 47.6722 59.0629 52.2102L33.3379 21.5062C46.6349 11.1611 63.3479 5 81.5 5C94.5039 5 106.769 8.16194 117.569 13.7589Z")}else{e.attr("d","M266 0H0V188H266V0ZM4 5.00001C4 3.89544 4.89543 3 6 3C7.10457 3 8 3.89543 8 5V179H260C261.105 179 262 179.895 262 181C262 182.105 261.105 183 260 183H6C4.89543 183 4 182.105 4 181V5.00001ZM46 33C47.1046 33 48 33.8954 48 35V161C48 162.105 47.1046 163 46 163H26C24.8954 163 24 162.105 24 161V35C24 33.8954 24.8954 33 26 33H46ZM88 25C88 23.8954 87.1046 23 86 23H66C64.8954 23 64 23.8954 64 25V161C64 162.105 64.8954 163 66 163H86C87.1046 163 88 162.105 88 161V25ZM126 46C127.105 46 128 46.8954 128 48V161C128 162.105 127.105 163 126 163H106C104.895 163 104 162.105 104 161V48C104 46.8954 104.895 46 106 46H126ZM168 61C168 59.8954 167.105 59 166 59H146C144.895 59 144 59.8954 144 61V161C144 162.105 144.895 163 146 163H166C167.105 163 168 162.105 168 161V61ZM206 72C207.105 72 208 72.8954 208 74V161C208 162.105 207.105 163 206 163H186C184.895 163 184 162.105 184 161V74C184 72.8954 184.895 72 186 72H206ZM248 61C248 59.8954 247.105 59 246 59H226C224.895 59 224 59.8954 224 61V161C224 162.105 224.895 163 226 163H246C247.105 163 248 162.105 248 161V61Z")}e.attr("fill-rule","evenodd").attr("clip-rule","evenodd").openEnd().close("path");e.close("svg")}}});return t});