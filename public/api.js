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

// ファイルにアクセスし受信内容を確認します
function sendGA (method, url, data, async)
{
    // XMLHttpRequestオブジェクト生成
    var xmlhttp = createHttpRequest();

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
  if (data.data.length != 0){
  // document.body.innerHTML = ;
    // var emergencyElement = document.getElementById("emergency");
    var element = document.body.firstChild;
    var close = new Function("close('');");
    closeSpan = document.createElement("span");
    closeSpan.style.position = "absolute";
    closeSpan.style.right = "10px";
    closeSpan.style.cursor = "pointer";
    closeSpan.innerHTML = "×";
    closeSpan.onclick = close;


    // for(item of data.data){
      item = data.data[0];
      var disasterDiv = document.createElement('div');
      disasterDiv.style.backgroundColor = "#FFEFED";
      disasterDiv.style.color = "#EA161B";
      disasterDiv.style.textAlign = "center";
      disasterDiv.style.fontWeight = "bold";
      disasterDiv.style.marginBottom = "0.5em";
      disasterDiv.style.zIndex = "1000000";
      disasterDiv.style.width = "99%";
      disasterDiv.style.position = "absolute";
      disasterDiv.id = "infowindow";
      disasterDiv.innerHTML = "【速報】" + item.outbreakdatatime + "に" + item.location + "で震度" + item.jolt_scale + "の地震";
      disasterDiv.appendChild(closeSpan);
      // var parentDiv = emergencyElement.parentNode;
      var parentDiv = element.parentNode;
      parentDiv.insertBefore(disasterDiv, element);
      // parentDiv.insertBefore(disasterDiv, emergencyElement);
    // document.body.appendChild(disasterDiv);

    // }
  };
}
function close()
{
  var infowindow = document.getElementById("infowindow");
  infowindow.style.display = "none";
}

data = "v=1&tid=UA-69417810-1&cid=6bc1a344-e53c-4ec7-84b7-a29e2a050256&t=pageview&dh=test.test.com&dl=&dp=/?SID=haaaaa&dt=PageTitle&dr=" + encodeURIComponent(document.baseURI)
window.onload = (function(){
  sendRequest("GET", "https://flashreport.red/v1/api", null, true)
  sendGA("GET", "https://www.google-analytics.com/collect", data, true)
})();
