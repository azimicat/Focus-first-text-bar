function setup() {
  const target = document.querySelector("textarea");
  chrome.storage.sync.get(null, (items) => {
    target.value = items.urlList.toString();
  });
}

function setEnteredUrl() {
  const urls = document.querySelector("textarea").value;
  const urlList = urls.replace(/\s/g, "").split(",");
  const items = {
    urlList: urlList,
  };
  chrome.storage.sync.set(items);
}

/**
 * saveボタンが押された時、chrome storageに保存する。
 */
document.querySelector("#save").addEventListener("click", async () => {
  setEnteredUrl();
});

setup();
