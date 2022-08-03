window.addEventListener("load", main, false);

/**
 * URLが指定のURLと同じ時trueを返す
 * @returns Promise<boolean>
 */
async function isSameUrl() {
  const currentUrl = location.href;
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (items) => {
      const flag = items.urlList.some((url) => {
        return url === currentUrl;
      });
      resolve(flag);
    });
  });
}

async function main(e) {
  console.log("main");
  const res = await isSameUrl();
  console.log(res);
  if (res) {
    console.log("focusしません");
    return;
  }
  console.log("focusします");
  document.querySelector("input[type=text]").focus();
}
