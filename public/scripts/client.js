/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function loadTweets() {
    $.ajax({ url: 'http://localhost:8080/tweets',
    type: 'GET',
    context: document.body,
    success: function(data) {
      renderTweets(data);
    }});
  }

  loadTweets();

  const $button = $('#tweet-btn');
  const $form = $('.new-tweet form');

  //Event listeners 
  $button.on('click', function(e) {
    e.preventDefault();
    postTweet();
  });

  $form.on('submit', function(e) {
    e.preventDefault();
    postTweet();
  });

  $('.newtweet').on('click', function() {
    $('#tweet-text').focus();
  })



  //Scrolling behavior
  $(document).scroll(function () {
    let $nav = $('nav');
    $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
  });

  function postTweet() {
    const formData = $form.serialize();
    const tweetText = $('#tweet-text').val();

    if (tweetText === null || tweetText === '') {
      alert('The form data is empty');
      return;
    }

    if (tweetText.length > 140) {
      alert('Tweet exceeded the character limit!');
      return;
    }

    try {
      $.ajax({ url: '/tweets',
       type: 'POST',
       data: formData,
      success: function(data) {
        loadTweets();
        $('#tweet-text').val(''); //TODO: must be a better way of doing this
      } });
    }
    catch(error) {
      console.log('an error occured when posting the tweet!');
    }

  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    if (typeof tweets === undefined) {
      console.log('Tweet is undefined');
      return;
    }
    let alltweets = '';

    // Sort tweets according to the created date 
    tweets.sort(function(a,b) {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    tweets.forEach(function(tweet) {
      alltweets = alltweets + createTweetElement(tweet);
    });

    $('.new-tweet').after(alltweets);
  };

  const createTweetElement = function(tweet) {

    let $tweet = `<section class="tweet">
      <article>
        <header>
          <div class="profile">
            <div class="profile-right">
              <img src="${tweet.user.avatars}" alt="profile picture">
              <p>${tweet.user.name}</p>
            </div>
            <span><strong>${tweet.user.handle}</strong></span>
          </div>
        </header>
        <div class="tweet-content">
          <span><strong>${tweet.content.text}</strong></span>
        </div>
        <hr>
        <footer>
          <span>${timeago.format(tweet.created_at)}</span>
          <div class="tweet-btns">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    </section>`;

    return $tweet;
  };

});
