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
        alert('you need to enter a valid referral code');
      }
    }
  })

// Hides both the for views when page is loaded

  Template.newBoard.rendered = function() {
    $('.rental_form').hide();
    $('.submit_message').hide();
  };

// Displays the list of games based on the user who created in the referfriends template in private

  Template.referfriends.helpers({ 
      boards: function() {
      userid = Meteor.user()._id;
      return Privateboard.find({ user: userid });
    }
  });

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
      var amount1 = amount.to_s;
      var total = amount * 100;
      Meteor.call('sendEmail',
            'eganpg@gmail.com',
            'winning@blockpool.com',
            'Hello from Meteor!',
            amount1 );

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
      var last = Privateboard.last;
      alert(last)
       Router.go('/refer_friends/');
    }
  });


  Template.PrivateDetail.rendered = function() {
    var game_id = window.location.pathname;
    var gamerid = game_id.substring(9);
    var picked = Privatesquare.find({game_id: gamerid}).count();
    console.log(picked);
    for(i=0; i<picked; i++){
      var btn = '.btn' + (i+1);
      console.log(btn);
      $(btn).css({"backgroundColor":"white","color":"black"});
    }
    
  }

// Login for owning a square

  Template.PrivateDetail.events({
    'click .btn1': function() {
      var value = $('.btn1').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn1").css({"backgroundColor":"white","color":"black"});
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
      var value = $('.btn2').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn2").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn2').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn3': function() {
      var value = $('.btn3').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn3").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn3').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn4': function() {
      var value = $('.btn4').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn4").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn4').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn5': function() {
      var value = $('.btn5').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn5").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn5').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn6': function() {
      var value = $('.btn6').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn6").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn6').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn7': function() {
      var value = $('.btn7').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn7").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn7').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn8': function() {
      var value = $('.btn8').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn8").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn8').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn9': function() {
      var value = $('.btn9').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn9").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn9').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn10': function() {
      var value = $('.btn10').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn10").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn10').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn11': function() {
      var value = $('.btn11').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn11").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn11').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn12': function() {
      var value = $('.btn12').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn12").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn12').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn13': function() {
      var value = $('.btn13').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn13").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn13').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn14': function() {
      var value = $('.btn14').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn14").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn14').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn15': function() {
      var value = $('.btn15').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn15").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn15').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn16': function() {
      var value = $('.btn16').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn16").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn16').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn17': function() {
      var value = $('.btn17').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn17").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn17').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn18': function() {
      var value = $('.btn18').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn18").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn18').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn19': function() {
      var value = $('.btn19').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn19").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn19').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn20': function() {
      var value = $('.btn20').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn20").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn20').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
  });