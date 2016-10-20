define(function(require,exports,model){
	var w = ($(window).width()-6*3)/2;
	
	var ImgModel = Backbone.Model.extend({
		  initialize : function(){
               this.on('add',function(model){
               	   // console.log(model)
               	    var W = model.get("width");
	                var H = model.get("height");
	                var h = H/W*w;
	                model.set({
	                	viewWidth : w ,
	                	viewHeight : h
	                })
               })

		  }
	})
    // console.log(22222)
    model.exports = ImgModel;
})