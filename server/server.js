Houston.add_collection(Meteor.users);
// Houston.add_collection(Meteor.privateboard);
// Houston.add_collection(Meteor.privatesquare);
// Houston.add_collection(Meteor.publicboard);
Houston.add_collection(Houston._admins);
// Houston.add_collection(Meteor.publicsquare);

var Privateboard = new Meteor.Collection("privateboard");
var Privatesquare = new Meteor.Collection("privatesquare");