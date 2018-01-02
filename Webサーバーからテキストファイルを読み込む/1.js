//ロードするファイルのパス
var path = "data.txt"

//ボタンクリックのイベントリスナーを設定
var btn = document.getElementById('btn');
btn.addEventListener('click', loadFile, false);

//テキストファイルをロードする
function loadFile() {
	var req = new XMLHttpRequest();　// new演算子によりXMLHttpRequestオブジェクトを生成して、変数reqに代入
    req.responseType = 'text';　// responceTypeを'text'に設定して、テキスト型式のデータを受け取る
    req.open('GET', path, true);  
    // open()メソッドがHTTPリクエストを生成するメソッド
    // 最初の引数には、GETかPOSTを指定　=> HTTPプロトコルのメソッド => HTMLフォームのmethodに指定する値と同じ
    // 2番目の引数はURL
    // 3番目の引数は非同期/同期の指定 => trueにすると非同期通信になる

    // loadイベントのイベントリスナーを設定
    req.addEventListener('load', function(ev) { // 下記を参照
        if((ev.target.status == 200) && (ev.target.readyState == 4)) {　// 下記を参照
            document.getElementById('myArea').innerHTML = ev.target.responseText　// 下記を参照
        } else {
            console.log('エラーです');
        }
    }, false);

    // send()メソッドで生成したHTTPリクエストを送信
    req.send(null);
}

/*
------------------------------------------

XMLHttpRequestを使った非同期通信の流れ

1.XMLHttpRequestオブジェクトを生成する
2.responceTypeプロパティにデータ型を指定する
3.HTTPリクエストを生成するopen()メソッドを非同期オプションで実行
4.addEventListener()メソッドで、loadイベントに対応するコールバック関数を設定
5.send()メソッドでリクエストを送信する

こうすることでHTTPレスポンスを受け取った時点で
4.で指定したコールバック関数が呼び出される

------------------------------------------

statusプロパティ

200:リクエストが正しく処理された
404:ファイルが見つからない

------------------------------------------

readyStateプロパティ

0:未初期化状態
1:リクエスト準備中　open()メソッドが実行されて、send()メソッドが実行されていない
2:リクエスト完了　send()メソッドが実行された
3:データ受信中
4:データ取得完了

------------------------------------------

イベントオブジェクト.target.プロパティのついて

・サーバから取得したテキストデータは、XMLHttpRequestオブジェクトのresponseTextプロパティに保存される
・コールバック関数の最初の引数には、イベントオブジェクトが渡される(ev)
・readyState/status/responseTextプロパティは、Eventオブジェクトのtargetプロパティのプロパティとしてアクセスできる

"イベントオブジェクト.target.プロパティ""

function (ev) {
    if((ev.target.readyState == 4) && (ev.target.status == 200)) {
                ここでev.target.responseTextを処理
    }
}

------------------------------------------
*/