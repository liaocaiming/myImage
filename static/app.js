// 入口文件
define(function(require,exports,model){
    var ImgCollection = require("modules/collection/img")
    var List = require('modules/list/list');
    var Layer = require('modules/layer/layer');
    var ic = new ImgCollection();
    var list = new List({
    	 el : $('#app'),
         collection: ic
    });
    var layer = new Layer({
    	el : $("#app"),
        collection : ic
    });
  
    var Router = Backbone.Router.extend({
    	routes :{
    		'layer/:id' : 'showLayer',
    		'*other' : 'showList'
    	},
    	showLayer : function(id){
            layer.render(id);
            $(".list").hide();
            $(".layer").show();
    	},
    	showList : function(){
            // list.render();
            $(".list").show();
            $(".layer").hide();
    	}
    })
   
    var router = new Router();




	model.exports = function(){
	 	
	 	Backbone.history.start();
	 }
})