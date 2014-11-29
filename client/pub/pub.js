var Publicboard = new Meteor.Collection("publicboard");
  
  Template.puber.helpers({
      publicboard: function () {
        alert('looking for public boards');
        // this helper returns a cursor of
        // all of the posts in the collection
        var test =  Publicboard.find();
        return Publicboard.find();
        console.log(test);
      }
    });
  Template.newBoard.events({
    'click .new_rental': function () {
      $('.rental_form').toggle();
    },

    'click .rental_submit': function() {
      alert('youmade it');
      Publicboard.insert({
        name: $('.rental_name').val(),
        make: $('.rental_make').val(),
        model: $('.rental_model').val(),
        user: Meteor.user()._id
      });
    }
  });
