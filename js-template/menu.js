"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  // ユーザー名をセッションストレージから取得
  const username = sessionStorage.username;
  // もしユーザー名がなければ、ログイン画面にリダイレクト
  if (!username) {
    window.alert("ログインしてください");
    location.href = "login.html";
  }
  // ページ上のユーザー名をセット
  document.querySelector("#user_name span").textContent = username;

  // データを取得して表示
  const res = await fetch("data.json");
  const obj = await res.json();
  const data = obj.list;
  console.log(data);

  // 未読数を表示
  document
    .querySelectorAll("span.unread")
    .forEach((el) => (el.textContent = data.length));

  const info_list = document.querySelector("div#info_list");

  // データをリストとして表示
  for (const item of data) {
    const record = document.createElement("div");
    record.className = "record";
    for (const [prop, val] of Object.entries(item)) {
      const el = document.createElement("div");
      // from の場合、HTML を許可して値をセット
      if (prop == "from") {
        el.innerHTML = val;
      } else {
        // それ以外の場合はテキストコンテンツをセット
        el.textContent = val;
      }
      el.className = prop;

      // subject の場合、マークを追加
      if (prop == "subject") {
        const tri = document.createElement("div");
        tri.textContent = "&nbsp;"; // トライアングルマーク
        tri.className = "tri";
        record.appendChild(tri);

        const mark = document.createElement("div");
        mark.className = "mark";
        const span = document.createElement("span");
        span.textContent = "!"; // 未読マーク
        span.className = "exmark";
        mark.appendChild(span);
        record.appendChild(mark);
      }
      record.appendChild(el);
    }
    info_list.appendChild(record);
  }
});
