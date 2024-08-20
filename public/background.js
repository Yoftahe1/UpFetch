chrome.notifications.onClicked.addListener((url) => {

  chrome.tabs.create({ url });

});