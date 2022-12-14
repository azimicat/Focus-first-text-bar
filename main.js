window.addEventListener("load", main, false);

/**
 * URLが指定のドメインの時trueを返す
 * @returns Promise<boolean>
 */
async function isSameDomain() {
  var currentUrl = location.href;
  if (location.href.match(/\/$/) === null) {
    currentUrl = location.href + "/";
  }
  return new Promise((resolve) => {
    chrome.storage.sync.get(null, (items) => {
      const flag = items.urlWhiteList.some((domain) => {
        const removeEndOfSlash = domain.replace(/\/$/, "");
        const replacedSlashDomain = removeEndOfSlash.replaceAll("/", "\\/");
        const replacedSlashAndDotDomain = replacedSlashDomain.replaceAll(
          ".",
          "\\."
        );
        const regex = new RegExp(
          "^.+" + replacedSlashAndDotDomain + "[/\?]+[A-Za-z0-9]?",
          "ig"
        );
        const result = currentUrl.match(regex);
        return result !== null;
      });
      resolve(flag);
    });
  });
}

async function main(e) {
  const res = await isSameDomain();
  if (res) {
    document.querySelector("input[type=text]").focus();
  }
}
