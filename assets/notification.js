document.addEventListener('DOMContentLoaded', function () {
  var queryStringObject = convertToHash(location.search.substring(1));
  if (queryStringObject.word && queryStringObject.word.length) {
    showTodayWord(queryStringObject);
  }
  else {
    var todayWordAppUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=KkWw4oUBzm8nsVr3D7FbYOUR2F9A9YoOxUvAtZCy2PcUmWT3P4zxoNK9Q9DpZrf-PZ6EzPt3IxpzYt3BoZhTGRnt2x36vZ6om5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMkVWVuhZ_Ji_EDpXzjFnhu_Mr0dzpsTYKImT7wl107dR215DsJXelj4NjEoAWiFjw&lib=MLQcu4JvbhZZsWmuFIMFbPQqLiycxbmrY';
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
