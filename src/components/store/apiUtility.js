import { apiVersion, sfConn, formatDate } from "@/assets/helper";
import { getActionByName } from "./sfdcActions";

let args = new URLSearchParams(location.search.slice(1));
let sfHost = args.get("host");

const performAPIcallout = (url, obj) => {
  return new Promise((resolve, reject) => {
    sfConn
      .getSession(sfHost)
      .then(() => {
        // console.log("getSession inside");
        let limitsPromise = sfConn.rest(url, obj);
        limitsPromise
          .then((data) => {
            //console.log('limitsPromise data --> ', data);
            resolve(data); // Resolve the promise with the fetched data
          })
          .catch((error) => {
            console.error("Error fetching limits: ", error);
            reject(error); // Reject the promise if there is an error
          });
      })
      .catch((error) => {
        console.error("Error getting session: ", error);
        reject(error); // Reject the promise if there is an error getting the session
      });
  });
};

// Perform Salesforce GET, POST API Callout
const hitSFAPI = async (sfdcAction, recordId = null, params = null, method = "GET") => {
  try {
    // Get API URL
    const url = getActionByName(sfdcAction, recordId);
    console.log('url --> '+JSON.stringify(url));
    // Make API call
    const data = await performAPIcallout(url, {
      method,
      body: JSON.parse(params), // Pass the payload
    });
    // console.log('hitSFAPI : '+sfdcAction +' --> ' + JSON.stringify(data));
    return data; // Handle API response
  } catch (error) {
    console.error("error --> ", error);
    // addToast(error, 'Error');
    return "UNKNOWN_ERROR_CATCHBLOCK";
  }
};

/*
// Handle HIT API  Response
const handleHitAPIResponse = async (data) => {
  if (data?.success) {
      //When Status == 204 but no response body - scenario apex log body, trace flag renewal
      if (!data?.response) {
          return 'API_SUCCESS_NO_BODY'; //apiSuccessNoResponse
      }
      return data?.response;
  }
  //Handle success == false 
  else {
      return data?.response;
  }
}*/

// Export the fucntions
export { performAPIcallout, hitSFAPI };
