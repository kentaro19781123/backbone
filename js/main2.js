//Modelオブジェクトについて
$(function(){
  //model作成
  var MyDataModel = Backbone.Model.extend({
  });
  var myDataModel = new MyDataModel();

  //Collection作成
  var MyDataCollection = Backbone.Collection.extend({
    model:MyDataModel,
    url:'db.php/mydata',
  });
  var myDataCollection = new MyDataCollection();

  //データをfetchする
  myDataCollection.fetch();

  //Viewの作成
  var myDataItemView = Backbone.View.extend({
    initialize(){
      this.listenTo(myDataCollection,'add',this.render);
    },

    tmpl:_.template($("#mydata_tmpl").html()),

    render(item){
      var data = item.attributes;
      $('#list').append(this.tmpl(data));
      return this;
    }
  });

  var myDataItemView = new myDataItemView({
    model:myDataCollection
  });

  function onclickFind(event){
    var id = $('#my_id').val();
    var result = myDataCollection.get(id);
    var data = result.attributes;
    $('#list').empty();
    myDataItemView.render(result);
  }
  $('#findBtn').bind('click',onclickFind);

  function onclickCreate(event){
    myDataCollection.create(
      {
        'name':$("#name").val(),
        'mail':$("#mail").val(),
        'tel':$("#tel").val()
      },
      {
        success:function(collection, result, options){
          $("#name").val('');
          $("#mail").val('');
          $("#tel").val('');
        }
      }
    );
  }

  $('#createBtn').bind('click', onclickCreate);

});
