chrome.runtime.onInstalled.addListener((details) => {
  chrome.storage.local.set({
    shows: [],
  });
  chrome.contextMenus.create({
    title: "Test Context Menu",
    id: "contextMenu1",
    contexts: ["page", "selection"],
  });
  chrome.contextMenus.onClicked.addListener((event) => {
    console.log(event);
    // chrome.search.query({
    //   disposition: "NEW_TAB",
    //   text: `imdb ${event.selectionText}`,
    // });
    // chrome.tabs.query(
    //   {
    //     currentWindow: true,
    //   },
    //   (tabs) => {
    //     console.log(tabs);
    //   }
    // );
    // chrome.tabs.create({
    //   url: `https://www.imdb.com/find?q=${event.selectionText}`,
    // });
    fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        chrome.storage.local.set({
          shows: data,
        });
      });
  });

  // chrome.contextMenus.create({
  //   title: "Test Context Menu 1",
  //   id: "contextMenu2",
  //   parentId: "contextMenu1",
  //   contexts: ["page", "selection"],
  // });

  // chrome.contextMenus.create({
  //   title: "Test Context Menu 2",
  //   id: "contextMenu3",
  //   parentId: "contextMenu1",
  //   contexts: ["page", "selection"],
  // });
});

console.log("background script running");

chrome.storage.local.get(["text"], (res) => {
  console.log(res);
});

// receive message from content_script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse("received message from background");

  // send message from background script
  chrome.tabs.sendMessage(sender.tab.id, "Got your message from background");
});
