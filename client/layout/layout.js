WebFontConfig = {
  google: { families: [ 'Maven+Pro:400,700:latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})(); 

 Template.puber.helpers({
  publicboard: function () {
    alert('looking for public boards');
    // this helper returns a cursor of
    // all of the posts in the collection
    var test =  Publicboard.find().fetch();
    console.log(test);
  }
});