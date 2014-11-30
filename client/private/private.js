var Privateboard = new Meteor.Collection("privateboard");
var Privatesquare = new Meteor.Collection("privatesquare");
  Template.puber.helpers({
      privateboard: function () {
        var test =  Privateboard.find();
        return Privateboard.find();
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
      Meteor.call('sendEmail',
            'eganpg@gmail.com',
            'eganpg@gmail.com',
            'Hello from Meteor!',
            'This is a test of Email.send.');
      Privateboard.insert({

        name: $('.block_name').val(),
        make: $('.block_amount').val(),
        model: $('.block_image').val(),
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