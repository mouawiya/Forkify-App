// the goal of this file(module) is to contain couple of functions that we reuse over and over in the project
import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// will return a new promise, which will reject after a certain number of seconds
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // we make the fetch promise race with the timeout function we create, it needs to return with either reject or fulfill in order not to trigger the error of the timeout function

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // we have to rethow the error in order to catch it in the model.js file. We propagated the error down from one async function to the other
  }
};

/*
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // we make the fetch promise race with the timeout function we create, it needs to return with either reject or fulfill in order not to trigger the error of the timeout function

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // we have to rethow the error in order to catch it in the model.js file. We propagated the error down from one async function to the other
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // we make the fetch promise race with the timeout function we create, it needs to return with either reject or fulfill in order not to trigger the error of the timeout function

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err; // we have to rethow the error in order to catch it in the model.js file. We propagated the error down from one async function to the other
  }
};
*/
