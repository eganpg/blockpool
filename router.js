Router.configure({
  layoutTemplate:'layout'
   trackPageView: true
});


Router.map(function () {
  this.route('Home', {path:'/'});
  this.route('Builder', {path:'/builder'});
  this.route('About', {path:'/about'});
  this.route('Private', {path:'/private'});
  this.route('Pub', {path:'/pub'});
  this.route('newBoard', {path:'/pub/new'});
  this.route('PrivateDetail', {path:'/private/:_id'});
  this.route('referfriends', {path:'/refer_friends'});
  this.route('PrivateDetailStat', {path:'/stat'});
});

