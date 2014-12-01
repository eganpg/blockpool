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

Template.PrivateDetailStat.helpers({
    counter: function() {
      userid = Meteor.user()._id;
      return Privateboard.find({ user: userid}).count();
    },
    total_square: function() {
      userid = Meteor.user()._id;
      return Privatesquare.find({ user: userid}).count();
    },
    need_sell: function() {
      userid = Meteor.user()._id;
      var board_count =  Privateboard.find({ user: userid}).count();
      var square_count = Privatesquare.find({ user: userid}).count();
      return ((board_count * 100) - square_count);
    },
    board_names: function() {
      userid = Meteor.user()._id;
      return Privateboard.find({ user: userid });
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
  });

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

  // Returns something about the number of square purchase on that specific board

  Template.PrivateDetail.helpers({
      squares: function() {
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      userid = Meteor.user()._id;
      console.log(userid);
      return Privatesquare.find({ user: userid, game_id: gamerid });
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
    // var picked = Privatesquare.find({game_id: gamerid}).count();
    for(i=0; i<101; i++){
      iii = i + 1
      ii = String(iii);
      console.log(ii);
      var occupied = Privatesquare.findOne({ square_id: ii, game_id: gamerid});
      console.log(occupied);
      if(occupied != undefined){
      var btn = '.btn' + (i+1);
      
      $(btn).css({"backgroundColor":"white","color":"black"});
    }
  }
    
  }

// Login for owning a square

  Template.PrivateDetail.events({
    'click .btn1': function() {
      var value = $('.btn1').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value, game_id: gamerid});
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
    'click .btn31': function() {
      var value = $('.btn31').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn31").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn31').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn32': function() {
      var value = $('.btn32').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn32").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn32').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn33': function() {
      var value = $('.btn33').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn33").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn33').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn34': function() {
      var value = $('.btn34').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn34").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn34').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn35': function() {
      var value = $('.btn35').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn35").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn35').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn36': function() {
      var value = $('.btn36').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn36").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn36').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn37': function() {
      var value = $('.btn37').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn37").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn37').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn38': function() {
      var value = $('.btn38').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn38").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn38').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn39': function() {
      var value = $('.btn39').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value3 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value3);
      if(!value3) {
        $(".btn39").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn39').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn40': function() {
      var value = $('.btn40').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn40").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn40').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn21': function() {
      var value = $('.btn21').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn21").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn21').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn22': function() {
      var value = $('.btn22').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn22").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn22').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn23': function() {
      var value = $('.btn23').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn23").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn23').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn24': function() {
      var value = $('.btn24').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn24").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn24').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn25': function() {
      var value = $('.btn25').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn25").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn25').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn26': function() {
      var value = $('.btn26').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn26").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn26').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn27': function() {
      var value = $('.btn27').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn27").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn27').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn28': function() {
      var value = $('.btn28').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn28").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn28').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn29': function() {
      var value = $('.btn29').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value2 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value2);
      if(!value2) {
        $(".btn29").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn29').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn30': function() {
      var value = $('.btn30').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn30").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn30').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn41': function() {
      var value = $('.btn41').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn41").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn41').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn42': function() {
      var value = $('.btn42').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn42").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn42').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn43': function() {
      var value = $('.btn43').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn43").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn43').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn44': function() {
      var value = $('.btn44').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn44").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn44').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn45': function() {
      var value = $('.btn45').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn45").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn45').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn46': function() {
      var value = $('.btn46').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn46").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn46').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn47': function() {
      var value = $('.btn47').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn47").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn47').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn48': function() {
      var value = $('.btn48').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn48").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn48').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn49': function() {
      var value = $('.btn49').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value4 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value4);
      if(!value4) {
        $(".btn49").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn49').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn50': function() {
      var value = $('.btn50').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn50").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn50').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn51': function() {
      var value = $('.btn51').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn51").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn51').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn52': function() {
      var value = $('.btn52').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn52").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn52').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn53': function() {
      var value = $('.btn53').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn53").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn53').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn54': function() {
      var value = $('.btn54').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn54").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn54').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn55': function() {
      var value = $('.btn55').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn55").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn55').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn56': function() {
      var value = $('.btn56').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn56").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn56').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn57': function() {
      var value = $('.btn57').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn57").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn57').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn58': function() {
      var value = $('.btn58').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn58").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn58').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn59': function() {
      var value = $('.btn59').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value5 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value5);
      if(!value5) {
        $(".btn59").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn59').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn60': function() {
      var value = $('.btn60').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn60").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn60').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn61': function() {
      var value = $('.btn61').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn61").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn61').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn62': function() {
      var value = $('.btn62').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn62").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn62').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn63': function() {
      var value = $('.btn63').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn63").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn63').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn64': function() {
      var value = $('.btn64').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn64").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn64').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn65': function() {
      var value = $('.btn65').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn65").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn65').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn66': function() {
      var value = $('.btn66').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn66").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn66').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn67': function() {
      var value = $('.btn67').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn67").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn67').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn68': function() {
      var value = $('.btn68').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn68").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn68').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn69': function() {
      var value = $('.btn69').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value6 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value6);
      if(!value6) {
        $(".btn69").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn69').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn70': function() {
      var value = $('.btn70').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn70").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn70').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn71': function() {
      var value = $('.btn71').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn71").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn71').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn72': function() {
      var value = $('.btn72').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn72").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn72').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn73': function() {
      var value = $('.btn73').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn73").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn73').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn74': function() {
      var value = $('.btn74').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn74").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn74').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn75': function() {
      var value = $('.btn75').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn75").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn75').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn76': function() {
      var value = $('.btn76').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn76").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn76').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn77': function() {
      var value = $('.btn77').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn77").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn77').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn78': function() {
      var value = $('.btn78').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn78").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn78').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn79': function() {
      var value = $('.btn79').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value7 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value7);
      if(!value7) {
        $(".btn79").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn79').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn80': function() {
      var value = $('.btn80').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn80").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn80').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn81': function() {
      var value = $('.btn81').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn81").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn81').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn82': function() {
      var value = $('.btn82').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn82").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn82').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn83': function() {
      var value = $('.btn83').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn83").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn83').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn84': function() {
      var value = $('.btn84').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn84").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn84').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn85': function() {
      var value = $('.btn85').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn85").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn85').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn86': function() {
      var value = $('.btn86').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn86").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn86').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn87': function() {
      var value = $('.btn87').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn87").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn87').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn88': function() {
      var value = $('.btn88').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn88").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn88').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn89': function() {
      var value = $('.btn89').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value8 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value8);
      if(!value8) {
        $(".btn89").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn89').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn90': function() {
      var value = $('.btn90').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn90").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn90').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn91': function() {
      var value = $('.btn91').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn91").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn91').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn92': function() {
      var value = $('.btn92').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn92").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn92').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn93': function() {
      var value = $('.btn93').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn93").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn93').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn94': function() {
      var value = $('.btn94').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn94").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn94').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn95': function() {
      var value = $('.btn95').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn95").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn95').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn96': function() {
      var value = $('.btn96').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn96").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn96').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn97': function() {
      var value = $('.btn97').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn97").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn97').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn98': function() {
      var value = $('.btn98').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn98").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn98').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn99': function() {
      var value = $('.btn99').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value9 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value9);
      if(!value9) {
        $(".btn99").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn99').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
    'click .btn100': function() {
      var value = $('.btn100').val();
      var game_id = window.location.pathname;
      var gamerid = game_id.substring(9);
      var value1 = Privatesquare.findOne({square_id: value,game_id: gamerid});
      console.log(gamerid);
      console.log(value1);
      if(!value1) {
        $(".btn100").css({"backgroundColor":"white","color":"black"});
        Privatesquare.insert({
          square_id: $('.btn100').val(),
          user: Meteor.user()._id,
          game_id: gamerid
          });
      }
      else {
        alert('This Square has Already been Boughten');
      }
    },
  });