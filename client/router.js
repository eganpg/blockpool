Router.configure({
  layoutTemplate:'layout'
});


Router.map(function () {
  this.route('Home', {path:'/'});
  this.route('Builder', {path:'/builder'});
  this.route('About', {path:'/about'});
});
