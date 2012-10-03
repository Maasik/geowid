var pointsQueue=[],chunkSize=4,ptTime=2E3,ajaxTimeOut=3E3,timeBetweenChunks=250,viewType="svg";function MapEvent(a,b,c){this.caption=a;this.color=b;this.enabled=c}var mapEvents={def:new MapEvent("customer","#FF2121",!0),mob:new MapEvent("mobile customer","#1AE832",!0),api:new MapEvent("APIs call","#FFFF63",!1)},generalColor="#21E9FF";
L.Control.View=L.Control.extend({options:{position:"bottomright"},onAdd:function(a){var b=L.DomUtil.create("div","leaflet-control-view");this._map=a;this._createButton("View","leaflet-control-view-button",b,this._click,this);return b},_createButton:function(a,b,c,d,f){b=L.DomUtil.create("a",b,c);b.href="#";b.title=a;L.DomEvent.on(b,"click",L.DomEvent.preventDefault).on(b,"click",d,f);L.DomEvent.disableClickPropagation(b);return b},_click:function(a){var b,c;$("#view-dialog").css({right:$(window).width()-
L.DomEvent.getMousePosition(a).x,bottom:$(window).height()-L.DomEvent.getMousePosition(a).y}).mouseleave(function(){b=setTimeout(function(){$("#view-dialog").fadeOut("slow")},500)}).mouseenter(function(){void 0!==b&&clearTimeout(b);void 0!==c&&clearTimeout(c)}).fadeIn("fast");c=setTimeout(function(){$("#view-dialog").fadeOut("slow")},5E3)}});
var pointColor={_all_flag:!1,_add:function(a){void 0!==mapEvents[a]&&(this[a]=this._all_flag?generalColor:mapEvents[a].color)},_rem:function(a){void 0!==this[a]&&delete this[a]},_all:function(){this._all_flag=!0;for(var a in this)void 0!==mapEvents[a]&&(this[a]=generalColor)},_default:function(){this._all_flag=!1;for(var a in this)void 0!==mapEvents[a]&&(this[a]=mapEvents[a].color)}};
function checkHandler(a){"all"==a?$("#all").is(":checked")?pointColor._all():pointColor._default():$("#"+a).is(":checked")?pointColor._add(a):pointColor._rem(a)}function getPseudoGUID(){for(var a=[],b=0;36>b;b++)a[b]="0123456789abcdef".substr(Math.floor(16*Math.random()),1);a[14]="4";a[19]="0123456789abcdef".substr(a[19]&3|8,1);a[8]=a[13]=a[18]=a[23]="-";return a.join("")}
var SimpleMarker=L.Icon.extend({options:{iconSize:[10,10],iconAnchor:[5,5],popupAnchor:[9,1]}}),blueMarker=new SimpleMarker({iconUrl:"pics/blue.png"}),redMarker=new SimpleMarker({iconUrl:"pics/red.png"}),greenMarker=new SimpleMarker({iconUrl:"pics/green.png"}),yellowMarker=new SimpleMarker({iconUrl:"pics/yellow.png"});
function show(a,b,c){if(void 0!==pointColor[a.type])switch(viewType){case "svg":b.pulse(a.lat,a.lng,pointColor[a.type],ptTime);break;case "pic":var d;if(!0===pointColor._all_flag)d=L.marker([a.lat,a.lng],{icon:blueMarker});else switch(a.type){case "def":d=L.marker([a.lat,a.lng],{icon:redMarker});break;case "mob":d=L.marker([a.lat,a.lng],{icon:greenMarker});break;case "api":d=L.marker([a.lat,a.lng],{icon:yellowMarker});break;default:console.log('Unknown marker type "'+a.type+'"')}c.addLayer(d);setTimeout(function(){c.removeLayer(d)},
ptTime);break;default:console.log("Unknown marker view type")}}function correct(a){var b=L.latLngBounds([-50,-150],[78,179]);a.panTo(b.getCenter());a.setZoom(a.getBoundsZoom(b))}
$(function(){$("#wait").fadeIn("slow");for(var a in mapEvents)$("#view-dialog").append("<label><input type='checkbox' id='"+a+"'><span style='color: "+mapEvents[a].color+"'>"+mapEvents[a].caption+"</span></label><br>"),$("#"+a).attr("onchange",'checkHandler("'+a+'");'),mapEvents[a].enabled&&(pointColor._add(a),$("#"+a).attr("checked","checked"));$("#view-dialog").append("<hr noshade size='1'><label><input type='checkbox' onchange='checkHandler(\"all\");' id='all' checked='checked'><span style='color: "+
generalColor+"'>one color for all</span></label>");pointColor._all();var b=L.map("map",{zoomControl:!1}).fitWorld();correct(b);$(window).resize(function(){correct(b)});L.tileLayer("http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png",{key:"8d75191ff95943ad89dc5e650d23ffeb",styleId:999,attribution:'Map data by <a href="http://www.ecwid.com/">Ecwid</a>',detectRetina:!0,reuseTiles:!0}).addTo(b);b.addControl(new L.Control.View);var c=new R.PulseLayer(100);b.addLayer(c);var d=0,f=!1,g=0,
h="get/?id="+getPseudoGUID();(function i(){$.ajax({url:h,success:function(a){f=!0;g=pointsQueue.length;pointsQueue=pointsQueue.concat(a);pointsQueue.length>=chunkSize&&(d=0,$("#wait").fadeOut("slow"))},dataType:"json",complete:i,timeout:ajaxTimeOut,cache:!1})})();setInterval(function(){if(f&&0!=g){f=!1;for(var a=pointsQueue.splice(0,g),e=0;e<g;e++)show(a[e],c,b)}else if(pointsQueue.length>=chunkSize){a=pointsQueue.splice(0,chunkSize);for(e=0;e<chunkSize;e++)show(a[e],c,b)}else d++,d>=ptTime/timeBetweenChunks+
1E3/timeBetweenChunks&&$("#wait").fadeIn("slow")},timeBetweenChunks)});