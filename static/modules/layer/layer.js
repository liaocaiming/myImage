define(function(require,exports,model){
	  var h = $(window).height();
	  require('modules/layer/layer.css')
        var Layer = Backbone.View.extend({
             imgId : 0,
             imgArr :[],
      	     tpl : _.template($("#layer-tpl").text()),
             events : {
                'swipeLeft .layer-container' : 'showNextImg',
                'swipeRight .layer-container' : 'showPreImg',
                // 'tap .layer .arrow' : 'goBackImg',
                'tap .layer .arrow' : 'goBackImg',
                'tap .layer-container ' : 'isTitle'
             },
             /**
              *数组去重的方法
              * @id 表示数组将要添加的项,如果存在,则不添加;
              */
             Arrquchong :function(id){
                  for(var i=0;i<this.imgArr.length;i++) {
                          //判断有没有数组在里面，没有就放进去
                          if(this.imgArr.indexOf(id) > -1 ){
                                  return;
                          }
                  }
                  this.imgArr.push(id)

             },
            /*
            *判断是否要显示title;
            */
             isTitle : function(){
                this.$el.find('.layer .header').toggleClass('hide');
               
             },
             /**
              *返回上一张浏览过的图
              */
             goBackImg : function(){
                this.imgArr.pop();
                var id = this.imgArr[this.imgArr.length-1];
                if (id !== undefined) {
                        // 获取id对应的模型
                        var model = this.collection.get(id);
                        // 将该模型显示出来
                        this.changeView(model);
                        location.hash = '#layer/' + id;
                   } else {
                       location.hash = '#'
                   }
                  
             },
             //显示向左滑动要显示的图片;
             showNextImg :function(){
                 this.imgId++;
                 var model = this.collection.get(this.imgId);
                 if (model) {
                     
                      location.hash = "#layer/" + this.imgId;
                 }else {
                     alert('已经是最后一张了')
                     this.imgId--;
                     return ;
                 }
                 this.changeView(model);
                 // this.imgArr.push(this.imgId);
                 // this.render( this.imgId);
             },
             //显示向右滑动要显示的图片;
             showPreImg :function(){
                 this.imgId--;
                 
                  var model = this.collection.get(this.imgId);
                  if (model) {
                     location.hash = "#layer/" + this.imgId;
                 }else {
                     alert('已经是第一张了')
                     this.imgId++
                     return ;
                 }
                 this.changeView(model);
                 // this.imgArr.push(this.imgId);

                   // this.render( this.imgId);
                 
             },
             // goBackImg : function(){
             //    location.hash = "#" 
             // },
             //改变要渲染的图片和title;
             changeView : function(model){
                  var url = model.get('url');
                  var title = model.get('title');
                  this.$el.find('.layer-container img').attr('src',url);
                  this.$el.find('.layer .header h1').html(title);
             },
             /**
              *渲染页面的函数;
              *@id  动态捕获的图片的id;
              */
      	     render : function(id){
                this.imgId = id;
      	     	  var model = this.collection.get(this.imgId);
                if (!model) {
                      location.hash = "#";
                       return
                };
                // this.imgArr.push(this.imgId);
                this.Arrquchong(this.imgId);

      	     	  var data = {
      	     	  	  title : model.get("title"),
      	     	  	  url : model.get("url"),
      	     	  	  style: "line-height:"+  h + "px"
      	     	  };
      	     	  var tpl = this.tpl;
      	     	  var html = tpl (data);
      	     	  
      	     	  this.$el.find('.layer').html(html);
      	     }
      });

      model.exports = Layer;
})