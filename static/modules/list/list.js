define(function(require,exports,model){
	 require('modules/list/list.css')
	 var List = Backbone.View.extend({
	 	  events : {
	 	  	'click .search span' : 'showSearchView',
	 	  	'click .nav li' : 'showTypeView'
	 	  },
	 	  leftHeight : 0,
	 	  rightHeight : 0,
	 	  tpl:_.template('<a href="#layer/<%=id%>"><img src="<%=url%>" alt="" style="<%=style%>"/></a>'),
         initialize : function(){
         	  var me = this;
              // 获取数据
              this.getData();
              //得打dom ;
              this.initDom();

         	  this.listenTo(this.collection,'add',function(model,collection){
                     this.render(model);
         	  });
         	  $(window).scroll(function(){
         	  	    var h = $("body").height() - $(window).height()-$(window).scrollTop()-200 < 0;
         	  	    if (h) {
         	  	    	me.getData();
         	  	    };
         	  })
         },
	 	  render : function(model){
	 	  	  var data = {
	 	  	  	  id : model.get("id"),
	 	  	  	  url : model.get("url"),
	 	  	  	  style :  'width: ' + model.get('viewWidth') + 'px; height: ' + model.get('viewHeight') + 'px;'
	 	  	  };
	 	  	  var tpl = this.tpl;
	 	  	  var html = tpl(data);
	 	  	  if (this.leftHeight <= this.rightHeight) {
	 	  	  	  this.renderLeft(model,html);
	 	  	  }else {
	 	  	  	  this.renderRight(model,html);
	 	  	  }
	 	  	  
	 	  },
	 	  getData : function(){
	 	  	  this.collection.fetchData();
	 	  },
	 	  initDom : function(){
	 	  	  this.leftcontainer = this.$el.find('.left-container');
	 	  	  this.rightcontainer = this.$el.find('.right-container');
	 	  },
	 	  renderLeft : function(model,html){
	 	  	  //上树;
	 	  	  this.leftcontainer.append(html);
	 	  	  this.leftHeight += model.get("viewHeight") + 6;
	 	  },
	 	   renderRight : function(model,html){
	 	  	  //上树;
	 	  	  this.rightcontainer.append(html);
	 	  	  this.rightHeight += model.get("viewHeight") + 6;
	 	  },
           //得到要搜搜的值
	 	  getSearchValue : function(){
	 	  	  return this.$el.find('.search input').val();
	 	  },
	 	  //检测要搜搜的值
	 	  checkValue : function(value){
	 	  	   var v = this.getSearchValue(value);
	 	  	   if (/^\s*$/.test(v)) {
	 	  	   	   return false;
	 	  	   };
	 	  	   return true;
	 	  },
	 	  collectionFilterByKey : function(value,key){
	 	  	  var myKey = key || 'title'
			  var result = this.collection.filter(function (model) {
				if (myKey === 'type') {
					return model.get(myKey) == value;
				}
				// 返回过滤条件
				return model.get(myKey).indexOf(value) > -1;
			  })
			// 将结果返回
			  return result;
	 	  },
	 	  //重新渲染页面;
	 	  resetview : function(arr){
	 	  	  
                 var me = this ;
	 	  	    this.clearView();
                 arr.forEach(function(model){
                     me.render(model);
                 })
	 	  }, 
	 	  //清空;
	 	  clearView : function(){
	 	  	  this.leftcontainer.html("");
	 	  	  this.rightcontainer.html("");
	 	  	  this.leftHeight = 0;
	 	  	  this.rightHeight = 0;
	 	  },
	 	  showSearchView : function(){
	 	  	   
	 	  	   var value = this.getSearchValue();
	 	  	   if (!this.checkValue(value)) {
	 	  	   	   return ;
	 	  	   };
	 	  	   value = value.replace(/^\s+|\s+$/g, '')
	 	  	   var arr =  this.collectionFilterByKey(value);
	 	  	   this.resetview(arr);
	 	  },
	 	  getDomId : function(dom){
                 return $(dom).data("id")
	 	  },
	 	  showTypeView : function(e){
	 	  	   console.log(3333)
	 	  	   // console.log(e)
               var id = this.getDomId(e.target);
               console.log(id)
               var result = this.collectionFilterByKey(id,'type');
               console.log(result)
               this.resetview(result);
	 	  }

	 });





	 model.exports = List;
})