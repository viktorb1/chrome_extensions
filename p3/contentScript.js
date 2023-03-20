// confirm("hello world");

const aTags = document.getElementsByTagName("a");

// for (const tag of aTags) {
//   if (tag.textContent.includes("i")) {
//     tag.style = "background-color: yellow";
//   }
//   //   tag.textContent = "Hello World";
// }

const text = [];
for (const tag of aTags) {
  text.push(tag.textContent);
}

chrome.storage.local.set({
  text,
});

// send message to background service worker
chrome.runtime.sendMessage(null, text, (response) => {
  console.log("I'm from the send response function: " + response);
});

// receive message from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
});
