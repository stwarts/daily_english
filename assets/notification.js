document.addEventListener('DOMContentLoaded', function () {
  var queryStringObject = convertToHash(location.search.substring(1));
  if (queryStringObject.word && queryStringObject.word.length) {
    showTodayWord(queryStringObject);
  }
  else {
    var todayWordAppUrl = 'https://script.google.com/macros/s/AKfycbyEN5E71Yy9RROSXgIpCtzn1SJvXdJqYBrqVHk3z63M5uTcrLHaqVyU5D_IzC5WqOIm/exec';
    var s = document.createElement('script');
    s.src = todayWordAppUrl;
    document.body.appendChild(s);
  }
});

function handleTodayWord(todayWordObject) {
  if (todayWordObject.word && todayWordObject.word.length) {
    showTodayWord(todayWordObject);

    Push.create(
      todayWordObject.word,
      {
        body: "It's your new word today",
        onClick: function () {
          window.focus();
          window.location.search = '?' + convertShallowObjectToQueryString(todayWordObject);
          this.close();
        }
      }
    )
  }
}

function convertToHash(queryString) {
  if (queryString && queryString.length && queryString.search('=') >= 0) {
    return JSON.parse('{"' + decodeURIComponent(queryString).replace(/\+/g, ' ').replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
  }
  else {
    return {};
  }
}

function convertShallowObjectToQueryString(object) {
  var queryString = Object.keys(object).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
  }).join('&');

  return queryString;
}

function showTodayWord(wordObject) {
  document.getElementById('word').innerHTML = wordObject.word;

  var googleWordAnchor = document.getElementById('search-google');
  googleWordAnchor.href = 'https://www.google.com/search?q=' + encodeURIComponent(wordObject.word);
  googleWordAnchor.innerHTML = 'Google it';

  document.getElementById('description').innerHTML = wordObject.description || '';
}
