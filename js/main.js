//Viewオブジェクトの利用
$(function(){
  var MyView = Backbone.View.extend({
    render: function(){
      this.$el.text('Hello Backbone.js!');
      return this;
    }
  });
  var myView = new MyView();
  $('#msg').append(myView.render().$el);
});


//構造化されたコンンテンツの操作
$(function(){
  var MyView = Backbone.View.extend({
    el:'#msg2',

    render: function(){
      this.$('#title').text('※利用ブラットフォーム');
      this.$('#item1').text('Windows');
      this.$('#item2').text('macOS');
      this.$('#item3').text('Linux');
      return this;
    }
  });

  var myView = new MyView();
  myView.render();
});


//intializeによる初期化
$(function(){
  var MyView = Backbone.View.extend({
    el:'#msg3',

    initialize: function(){
      this.$title = $('#title3');
      this.$item1 = $('#item13');
      this.$item2 = $('#item23');
      this.$item3 = $('#item33');

    },
    render: function(){
      this.$title.text('※利用ブラットフォーム');
      this.$item1.text('Windows');
      this.$item2.text('macOS');
      this.$item3.text('Linux');
      return this;
    }
  });

  var myView = new MyView();
  myView.render();
});


//イベントの利用（eventプロパティ）
$(function(){
  var ButtonView = Backbone.View.extend({
    el: '#btn1',

    events: {
      'click':'onclick'
    },

    onclick(event){
      alert('click me!');
    }
  });
  var buttonView = new ButtonView;
});


//新たなエレメントの生成
$(function(){
  var MyTagView = Backbone.View.extend({
    tagName: 'p',
    className: 'msg4',
    id: function(){
      return _.uniqueId('item');
    },
    attributes: {
      'style': 'color:white;background:red;padding:5px 10px;'
    }
  });
  var myTag = new MyTagView();
  myTag.el.textContent = "これは新たに追加したタグです";
  $('#msg4').html(myTag.el);
});


//テンプレートの利用
$(function(){
  var MyView = Backbone.View.extend({
    el:'#msg5',
    tmpl:_.template($("#myview-template").html()),
    render:function(){
      this.$el.html(this.tmpl({
        'title':'山田太郎',
        'content':'●●銀行勤務<br>email:taro@yamada'
      }));
      return this;
    }
  });
  var myView = new MyView();
  myView.render();
});


//複数Viewの連結
$(function(){
  //メッセージ表示用のView
  var MyView = Backbone.View.extend({
    el:'#msg6',
    initialize:function(){
      this.$title6 = $('#title6');
      this.$item16 = $('#item16');
      this.$item26 = $('#item26');
      this.$item36 = $('#item36');
    },
    render:function(){
      this.$title6.text('※利用プラットフォーム');
      this.$item16.text('Windows');
      this.$item26.text('macOS');
      this.$item36.text('Linux');
      return this;
    }
  });

  var myView = new MyView();
  myView.render();

  //入力フィールドのView
  var InputView = Backbone.View.extend({
    el:'#input6',
    events:{
      'keypress':'onkeydown'
    },
    onkeydown(event){
      this.value = this.$el.val();
    }
  });

  var inputView = new InputView();

  //プッシュボタンのView
  var ButtonView = Backbone.View.extend({
    el:'#btn6',
    input:null,
    msg:null,

    initialize:function(obj){
      this.input = obj.input;
      this.msg = obj.msg;
      this.$el.val('click');
    },

    events:{
      'click':'onclick'
    },
    onclick(event){
      var str = this.input.$el.val();
      this.msg.$el.text('typed:' + str);
    }
  });

  var buttonView = new ButtonView({
    input:inputView,msg:myView
  });
});
