// chrome.devtools.network.onRequestFinished.addListener((request) => {
//     const url = request.request.url;
  
//     // Check if the URL starts with the required prefix
//     if (url.startsWith("https://innovation-cloud-83063.lightning.force.com")) {
//       console.log("Captured Request:", url);
  
//       // Capture request details
//       const requestHeaders = request.request.headers;
//       const requestBody = request.request.postData ? request.request.postData.text : "No Body";
  
//       // Capture response details
//       request.getContent((responseBody, encoding) => {
//         console.log("Request Headers:", requestHeaders);
//         console.log("Request Body:", requestBody);
//         console.log("Response Body:", responseBody);
//       });
//     }
//   });
  
  chrome.devtools.panels.create("OS Network Logger", null, "index.html", (panel) => {
    console.log("Custom DevTools Panel Created");
  });
  