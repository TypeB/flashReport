// XMLHttpRequestオブジェクト生成
function createHttpRequest()
{
  var xmlhttp = null;
  if(window.ActiveXObject){
    try {
      // MSXML2以降用
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        // 旧MSXML用
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {

      }
    }
  } else if(window.XMLHttpRequest){
    // Win Mac Linux m1,f1,o8 Mac s1 Linux k3用
    xmlhttp = new XMLHttpRequest();
  } else {

  }
  if (xmlhttp == null) {
    alert("Can not create an XMLHTTPRequest instance");
  }
  return xmlhttp;
}

// ファイルにアクセスし受信内容を確認します
function sendRequest (method, url, data, async)
{
    // XMLHttpRequestオブジェクト生成
    var xmlhttp = createHttpRequest();

    // 受信時に起動するイベント
    xmlhttp.onreadystatechange = function() {
        // readyState値は4で受信完了
        if (xmlhttp.readyState == 4) {
            //コールバック
            renderhtml(xmlhttp.responseText);
        }
    }
    // open メソッド
    xmlhttp.open(method, url, async);
    // HTTPリクエストヘッダを設定
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // send メソッド
    xmlhttp.send(data);
}

function renderhtml (rawJson)
{
  var data = JSON.parse(rawJson);
  if (data.items.length != 0){
  // document.body.innerHTML = ;
    var emergencyElement = document.getElementById("emergency");
    for(item of data.items){
      var disasterDiv = document.createElement('div');
      disasterDiv.style.backgroundColor = "#FFEFED";
      disasterDiv.style.color = "#EA161B";
      disasterDiv.style.textAlign = "center";
      disasterDiv.style.fontWeight = "bold";
      disasterDiv.style.marginBottom = "0.5em";
      disasterDiv.innerHTML = "【速報】" + item.location + "で震度" + item.joult_scale + "の地震ｷﾀ━━━━━(((ﾟ∀ﾟ)))━━━━━!!!!";
      var parentDiv = emergencyElement.parentNode;
      parentDiv.insertBefore(disasterDiv, emergencyElement);
    }
  };
}


window.onload = sendRequest("GET", "http://localhost:3000/api", null, true)
