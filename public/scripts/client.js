/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1637773619533
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1637860019533
    }
  ];

  const $button = $('#tweet-btn');
  $button.on('submit', function (event) {
    $.ajax('https://www.google.com/', { method: 'GET' })
    .then(function (results) {
      // function to perform 
      event.preventDefault();
    });
  });

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    if (typeof tweets === undefined) {
      console.log('Tweet is undefined');
      return;
    }
    let alltweets= '';
    tweets.forEach( function(tweet) {
      alltweets = alltweets + createTweetElement(tweet);
    });

    $('.new-tweet').after(alltweets);
  }

  const createTweetElement = function(tweet) {

    let $tweet = `<section class="tweet">
      <article>
        <header>
          <div class="profile">
            <div class="profile-right">
              <img src="/images/profile-hex.png" alt="">
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
  }

  renderTweets(data);
});
