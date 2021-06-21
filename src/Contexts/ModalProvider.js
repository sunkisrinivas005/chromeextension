import React, { useEffect, useState } from 'react';
import useWindowPosition from '../Hooks/useWindowPosition';
import queryString from 'query-string'

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();
  const [sid, setSID] = useState(null);
  const [loading, setLoading] = useState(false);
  const[view , setView] = useState(false);
  const[product, setProduct] = useState("");
  const[url, setUrl] = useState("");
  const [type, setType] = useState(null);
  const [messageUrl, setMessageURL] = useState('');
  // const

  function getSID() {
    setLoading(true);
    setType(1);
    window.postMessage({ type: "GET_SID" }, "*");
  }

  function getConversionTrackingUrl() {
    setLoading(true);
    setType(2);
    window.postMessage({type: "MESSAGE_URL"}, '*');
    // setLoading(false);
  }

  function clearLocalStorage(){
    setLoading(true);
    window.postMessage({type: 'CLEAR_LOCAL_STORAGE'}, '*');
  }

  useEffect(() => {
    // Set up event listeners from Content script
    window.addEventListener("message", function(event) {
      if (event.source !== window) return;
      if (event.data.type && (event.data.type === "SID_RESULT")) {
        setSID(event.data.sid);
        const value = queryString.parse(
          window.location.href
        );
          let refid = Object.values(value)[0];
          // console.log(refid, 'refid.')
          refid = refid && refid.split('FOF');
          let advertiserId = refid[0] ? refid[0] : '';
          if(advertiserId && advertiserId.length) {
            fetch('https://iapi.corp.flexoffers.com/link/'+ advertiserId).then(res => res.json()).then(data => {
              const { lid } = data[0];
              setProduct(data[0]);
              setView(true);
              setLoading(false);
            }).catch(err => {
              setProduct('');
              setView(true);
              setLoading(false);
            });
          }else {
            
          }
          // let programId = refid[1] ? refid[1] : '';
          // let promotionalId = refid[2] ? refid[2].split('FOF')[0] : '';
          // let concat = `advertiserId - ${advertiserId} --- programId --- ${programId} ---- promotionalId --- ${promotionalId}`;
         
        // }
      }
      if(event.data.type && (event.data.type === "CLEAR_LOCAL_RESULT")){
        // console.log(event.data.value, 'from message cleared');
        setProduct('');
        setLoading(false);
        setView(false);
      }
      if(event.data.type && (event.data.type === "MESSAGE_URL_RESULT")){
        // console.log(event.data, 'from message cleared');
        let values = event.data.value ? event.data.value : event.data.urlSaved;
        const value = queryString.parse(
          values
        );
        setUrl(values);
        setView(true);
        // console.log(value, 'values...')
        setMessageURL(value);
        setLoading(false)
      }
     if(event.data.type && (event.data.type === "CHECK_API_HIT")){
      //  console.log('testing',  event.data.value);
     }
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        sid,
        getSID,
        windowPosition,
        view,
        loading,
        product,
        url,
        clearLocalStorage,
        messageUrl,
        getConversionTrackingUrl,
        type,
        setView
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
