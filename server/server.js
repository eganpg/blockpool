Houston.add_collection(Meteor.users);
// Houston.add_collection(Meteor.privateboard);
// Houston.add_collection(Meteor.privatesquare);
// Houston.add_collection(Meteor.publicboard);
Houston.add_collection(Houston._admins);
// Houston.add_collection(Meteor.publicsquare);

var Privateboard = new Meteor.Collection("privateboard");
var Privatesquare = new Meteor.Collection("privatesquare");

// In your server code: define a method that the client can call
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    console.log(text);
    // check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});