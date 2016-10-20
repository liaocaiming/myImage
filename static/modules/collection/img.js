define(function(require,exports,model){
   var ImgModel =  require('modules/model/img');
   
   var ImgCollection = Backbone.Collection.extend({
   	     model : ImgModel,
   	     imgId : 0,
   	     fetchData : function(fn){
   	     	var me = this;
   	     	$.get('data/imageList.json',function(res){
   	     		 res.data.sort(function(){
   	     		 	   return Math.random() > 0.5 ? 1:-1;
   	     		 })
   	     		
   	     		 res.data.map(function(model){
   	     		 	  model.id = me.imgId++;
   	     		 })
   	     		 // console.log(res.data)
   	     		 if (res && res.errno == 0) {
                         me.add(res.data);
   	     		 };
   	     	})
   	     }
   })
   model.exports = ImgCollection;
})