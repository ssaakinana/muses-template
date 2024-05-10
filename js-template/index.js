"use strict";

// ページの読み込みが完了した時に実行される処理
document.addEventListener("DOMContentLoaded", async () => {
  // セッションストレージからユーザー名を取得
  const username = sessionStorage.username;
  // もしユーザー名が存在しない場合はログインページにリダイレクトし、アラートを表示する
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  // ユーザー名を表示する要素にユーザー名を設定する
  document.querySelector("#user_name span").textContent = username;

  // data.jsonからデータを取得し、未読件数を表示する
  const res = await fetch("data.json"); // データを取得するためのリクエストを送信
  const obj = await res.json(); // レスポンスをJSON形式に変換
  document
    .querySelectorAll("span.unread")
    .forEach((el) => (el.textContent = obj.list.length)); // 未読件数を表示する
});
