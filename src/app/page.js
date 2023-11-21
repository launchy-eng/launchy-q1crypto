"use client"
import MediaQuery from 'react-responsive';
import { useState, useEffect } from 'react';
import { db } from './resources/db';
import { config } from './resources/config';
import {
  collection,
  addDoc,
} from 'firebase/firestore';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import { Timestamp } from "@firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {
  const [emailValue, setEmailValue] = useState('');
  const [isToast, setIsToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [processCondition, setProcessCondition] = useState('Subs');
  const [StateLoad, setStateLoad] = useState(false);

  useEffect(() => {
    if (!StateLoad) {
      setStateLoad(true);
      return;
    }
    // Load Facebook Pixel script
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1300812337127101');
    fbq('track', 'PageView');

    // Load Google Tag Manager script
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'UA-251307142-1');
  }, []);

  async function save(e) {
    e.preventDefault();
    setProcessCondition('Load');
    try {
      let data = {
        "publication_id": process.env.NEXT_PUBLIC_PUBLICATION_ID,
        "email": emailValue,
        "reactivate_existing": false,
        "send_welcome_email": true,
        "utm_medium": "organic",
        "referring_site": `${config.subdomainName}.launchy.app`
      }

      await axios.post(`/api/subs`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((result) => {
        console.log(result);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_ACCESS, process.env.NEXT_PUBLIC_KEY)
          .then(async () => {
            let noteDate = Timestamp.fromDate(new Date())
            const colRefget = collection(db, 'registerCollaboration');
            const saveRegistrant = async (email) => {
              await addDoc(colRefget, {
                email: email,
                status: 'pending',
                referring: config.subdomainName,
                createdAt: noteDate,
              });
            };
            saveRegistrant(
              emailValue,
            ).then(() => {
              setProcessCondition('Success');
              setTimeout(function () {
                setEmailValue('');
                setProcessCondition('Subs');
                window.location.replace(config.dataLink);
              }, 1000);
            }).catch(function (error) {
              console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
            setProcessCondition('Subs');
            setIsToast(true);
            setToastMessage('Something wrong, please try again later!');
          });
      }).catch(function (error) {
        console.log(error);
        setProcessCondition('Subs');
        setIsToast(true);
        setToastMessage('Something is wrong, please refresh and try again!');
      });
    } catch (err) {
      console.log(err);
      setProcessCondition('Subs');
    }
  };

  useEffect(() => {
    if (!isToast) return;

    const intervalId = setInterval(() => {
      setIsToast(false);
      setToastMessage('');
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isToast]);

  return (
    <section className="py-0 bg-white md:py-16 lg:py-20 flex-center h-screen">
      <img className='cub-1' src="./assets/compo/Cub.png" alt='' />
      <img className='cub-2' src="./assets/compo/Cub.png" alt='' />
      <img className='cub-3' src="./assets/compo/Cub.png" alt='' />
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        <MediaQuery minWidth={768}>
          <div className='absolute right-10 top-5'>
            <a href={config.twitter} target="_blank" rel="noreferrer">
              <img className="inline-block rounded-full w-7 h-7 ring-2 ring-white mx-2" src="./assets/twitter.png" alt="" />
            </a>
            <a href={config.linkedIn} target="_blank" rel="noreferrer">
              <img className="inline-block w-7 h-7 ring-2 ring-white mx-2" src="./assets/linkedin.png" alt="" />
            </a>
          </div>
          <div>
            <img className="md:w-3/12 lg:w-2/12 mt-4 h-8 mx-auto h-auto" src="./assets/launchy.png" alt="" />
          </div>
        </MediaQuery>

        <div className="grid max-w-lg grid-cols-1 mx-auto mt-4 md:mt-8 gap-y-12 lg:mt-24 lg:max-w-none lg:grid-cols-2 bg-transparent z-50 relative px-2">
          <div className="lg:pr-16 xl:pr-24 self-center">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl xl:text-4xl font-pj">{config.title}</h1>

              <div className="flex justify-center flex-shrink-0 mt-8 -space-x-4 overflow-hidden">
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/ethereum.jpg" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/solana.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/arbitrum.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/aptos.jpg" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/sui.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/near.jpg" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/avalanche.png" alt="" />
                <img className="inline-block rounded-full w-14 h-14 ring-2 ring-white" src="./assets/chain/cardano.png" alt="" />
              </div>

              <p className="px-4 mt-5 text-lg font-normal text-gray-900 sm:px-0 font-pj">Fill your email to get the <span className="font-semibold">{config.desc}</span>.</p>
            </div>

            <div className="space-y-3 mt-10">
              <MediaQuery maxWidth={991.5}>
                <img src="./assets/sheets/sheets.png" alt='sheets' />
              </MediaQuery>
              <div className='wrap-input'>
                <div className='block w-full'>
                  <label className="email-input sr-only" htmlFor=""> Email address </label>
                  <input
                    value={emailValue}
                    onChange={(e) => {
                      setEmailValue(e.target.value);
                    }}
                    type="email"
                    placeholder="Email address"
                    className="input-style focus:border-red-900 focus:outline-none focus:ring-white"
                    autoFocus
                  />
                </div>
                <div className='btn-input-wrap block'>
                  <button className='btn-input-style focus:ring-core-900 focus:border-red-900 focus:outline-none' onClick={(e) => {
                    let mailChecker = EmailValidator.validate(emailValue);
                    if (mailChecker) {
                      save(e);
                    } else {
                      setIsToast(true);
                      setToastMessage('Please enter your email correctly.');
                    }
                  }}>
                    {processCondition === 'Subs' &&
                      <span className="font-extrabold">{config.buttonTitle}</span>
                    }
                    {processCondition === 'Success' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check mx-auto" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" fill="white"></path>
                      </svg>
                    }
                    {processCondition === 'Load' &&
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-three-dots mx-auto" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="white"></path>
                      </svg>
                    }
                  </button>
                </div>
              </div>
            </div>
            <p className='text-xs text-gray-500 pt-2 pl-3'>By submitting this form, you agree to subscribe to Chain Catalyst (Web3 Builder-investor Newsletter). You can unsubscribe at any time.</p>
          </div>
          <MediaQuery minWidth={992}>
            <div className="self-center">
              <img src="./assets/sheets/sheets.png" alt='sheets' />
            </div>
          </MediaQuery>
        </div>
        <div className='px-4 md:px-28 w-full mt-8 md:mt-16'>

          <MediaQuery minWidth={992}>
            <div className='flex items-center justify-center'>
              <a href={config.telegram} target="_blank" rel="noreferrer" className='p-4 inline-flex'>
                <div className='relative border border-red-900 px-6 py-1 rounded-xl'>
                  <h2 className='w-full text-sm md:text-md lg:text-xl font-black text-red-900 px-2 range-text-join'>Click to Join Our Web3 Telegram Group</h2>
                  <div className='mx-auto btn-tele rounded-full'>
                    <a href={config.telegram} target="_blank" rel="noreferrer" className='p-4 inline-flex'>
                      <img className='mx-auto join-logo-white' src="./assets/compo/join-white.png" alt="" />
                    </a>
                  </div>
                </div>
              </a>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={991.9}>
            <a href={config.telegram} target="_blank" rel="noreferrer" className='border-2 lg:border-4 border-red-900 py-2 px-6 lg:px-8 lg:py-6 flex items-center border-join justify-center bg-white z-50 relative'>
              <h2 className='w-full text-sm md:text-md lg:text-xl font-black text-red-900 px-2 range-text-join'>Join Our Web3 Telegram Group</h2>
              <div className='text-end min-w-fit lg:min-w-unset'>
                <img className='md:mx-2' style={{ width: '2.5vh' }} src="./assets/compo/join.png" alt='' />
              </div>
            </a>
          </MediaQuery>
        </div>
      </div>
      {
        isToast &&
        <div id="toast-bottom-right" className="bg-core-900 flex fixed right-5 bottom-5 items-center p-4 space-x-4 w-full max-w-xs text-gray-50 rounded-lg divide-x divide-gray-200 shadow" role="alert">
          <div className="text-sm font-normal flex items-center">
            <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="mr-2 bi bi-exclamation-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" fill="white"></path> <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" fill="white"></path>
            </svg>
            <span>{toastMessage}</span>
          </div>
        </div>
      }
    </section >
  );
}
