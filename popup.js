function setup() {
  const target = document.querySelector("textarea");
  chrome.storage.sync.get(null, (items) => {
    target.value = items.urlWhiteList.toString().replaceAll(',',',\n');
  });
}

function setEnteredUrl() {
  const urls = document.querySelector("textarea").value;
  const urlWhiteList = urls.replace(/\s/g, "").split(",");
  const items = {
    urlWhiteList: urlWhiteList,
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
