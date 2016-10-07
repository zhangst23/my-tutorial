var requests = require( '../../requests/request.js' );
var utils = require( '../../utils/util.js' );

Page( {
  data: {
    id: null,
    loadingHidden: false,
    bookData: null
  },
  onLoad: function( option ) {
    console.log(option)
    this.setData({
      id: option.id
    });
  },
  onReady: function() {
    var id = this.data.id;
    var _this = this;
    requests.requestBookDokDetail(
      id, 
      {fields: 'image,summary,publisher,title,rating,pubdate,author,author_intro,catalog'}, 
      ( data ) => {
        console.log(data)
        _this.setData({
          bookData: data
        });
    }, () => {
      wx.navigateBack();
    }, () => {
      _this.setData( {
        loadingHidden: true
      });
    });
  }
});