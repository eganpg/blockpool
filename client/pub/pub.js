var Publicboard = new Meteor.Collection("publicboard");
var Publicsquare = new Meteor.Collection("publicsquare");
var cells = [[1,2,4],[8,16,32],[64,128,256]]; 

  Template.puber.helpers({
      publicboard: function () {
        var test =  Publicboard.find();
        return Publicboard.find();
      }
    });
  Template.newBoard.rendered = function() {
    $('.rental_form').hide();
  };

  Template.newBoard.events({
    'click .new_rental': function () {
      $('.rental_form').toggle();
    },

    'click .rental_submit': function() {
      Publicboard.insert({
        name: $('.rental_name').val(),
        make: $('.rental_make').val(),
        model: $('.rental_model').val(),
        user: Meteor.user()._id
      });
    }
  });

  Template.PubDetail.events({
    'click .btn1': function() {
      var value = $('.btn1').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(5);
      
      var value1 = Publicsquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        Publicsquare.insert({
          square_id: $('.btn1').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn2': function() {
      alert('adding an event');
      Publicsquare.insert({
        square_id: $('.btn2').val(),
        user: Meteor.user()._id
      });
    },
    'click .btn3': function() {
      alert('adding an event');
      Publicsquare.insert({
        square_id: $('.btn3').val(),
        user: Meteor.user()._id
      });
    }
  });
