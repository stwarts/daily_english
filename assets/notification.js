document.addEventListener('DOMContentLoaded', function () {
  Push.config({ serviceWorker: "./js/push/serviceWorker.min.js" });

  var todayWordAppUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=L9_Dwf3Cokmuqikrn6idlwBnyasW-oct5paAem8WcmEE-3QdQyz0T0SwMoRsqNVUuH9Ep3fgeRuv7_k_MJLngwkNLssVPuIim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMkVWVuhZ_Ji_EDpXzjFnhu_Mr0dzpsTYKImT7wl107dR215DsJXeljVUVBnrrGuSN9SeJxDBnhlQWnTxpm2YOUUMTLGEaH11Q&lib=MLQcu4JvbhZZsWmuFIMFbPQqLiycxbmrY';
  var s = document.createElement('script');
  s.src = todayWordAppUrl;
  document.body.appendChild(s);
});

function handleTodayWord(todayWordObject) {
  if (todayWordObject.word && todayWordObject.word.length) {
    Push.create(todayWordObject.word, { body: "It's your new word today", link: '/daily_english?' + new URLSearchParams(todayWordObject).toString() });
  }
}
