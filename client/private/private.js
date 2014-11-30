//Declare Variables

var Privateboard = new Meteor.Collection("privateboard");
var Privatesquare = new Meteor.Collection("privatesquare");
var checkout = StripeCheckout.configure({
  key: 'pk_test_hWFPqjft5pAb7hbr569QZzhu',
  image: '/logo.png',
  // The callback after checkout is complete
  token: function(token) {
    // do something here (a Meteor.method, perhaps?)
  }
});

// Old public helpers

  Template.puber.helpers({
      privateboard: function () {
        var test =  Privateboard.find();
        return Privateboard.find();
      }
    });

// Only goes to valid referral code board

  Template.private.events({
    'click .referral': function() {
      var referral_code = $('.private').val();
      var privateboard_exist = Privateboard.findOne({_id: referral_code});
      if(privateboard_exist) {
      Router.go('PrivateDetail', {_id: referral_code});
        }
      else {
        alert('die');
      }

    }
  })

// Hides both the for views when page is loaded

  Template.newBoard.rendered = function() {
    $('.rental_form').hide();
    $('.submit_message').hide();
  };

  // Create a blockpool toggle

  Template.newBoard.events({
    'click .new_rental': function () {
      $('.rental_form').toggle();
    },

      'click .existing': function () {
      Router.go('/refer_friends/');
    },


    // onclick of submit button send a email with a referral code

    'click .rental_submit': function(event, template) {
      var amount = $('.block_amount').val();
      var total = amount * 100;
      Meteor.call('sendEmail',
            'eganpg@gmail.com',
            'test@test.com',
            'Hello from Meteor!',
            'You referral code is.' );
      // StripeCheckout Integration
      event.preventDefault();
      checkout.open({
        name: 'BlockPool',
        description: 'easy sports fun',
        amount: total  // this is cents, not dollars
      });

      $('.submit_message').toggle();

      // Create a Database item
      
      Privateboard.insert({
        name: $('.block_name').val(),
        make: $('.block_amount').val(),
        model: $('.block_image').val(),
        user: Meteor.user()._id
      });
       Router.go('/refer_friends/');
    }
  });


// Login for owning a square
  Template.PrivateDetail.events({
    'click .btn1': function() {
      var value = $('.btn1').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(5);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        Privatesquare.insert({
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