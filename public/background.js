// Create an alarm that triggers every 1 minute
chrome.alarms.create('scrapeUpwork', { periodInMinutes: 0.1 });

// Add a listener to the alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'scrapeUpwork') {
    // Call your function here
    scrapeData()
  }
});

function scrapeData() {
  fetch('https://yoftahe-merkebu.web.app/')
  .then(response => response.text())
  .then(data => {
    // Parse the HTML and extract the necessary data
    // let parser = new DOMParser();
    // let doc = parser.parseFromString(data, 'text/html');
    // let relevantData = doc.querySelector('.some-selector').innerText;
    console.log(data)

  })
  .catch(error => console.error('Error:', error));


  notifyUser()
}

const data = []

function notifyUser() {
  const newData = Math.floor(Math.random() * 10).toString()
  data.push(newData)

  chrome.runtime.sendMessage({ action: 'update_popup', data: data });

  // chrome.notifications.create({
  //   type: 'basic',
  //   iconUrl:'./icon.png',
  //   title: 'Background Event Triggered',
  //   message: 'Something happened in the background!',
  //   priority:2,
  //   buttons: [
  //     { title: 'Open Popup' }
  //   ]
  // });

  // chrome.action.setBadgeText({ text: "newData" });
  // chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
  console.log(22)

}