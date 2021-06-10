import React, { useEffect, useState } from 'react';
import useWindowPosition from '../Hooks/useWindowPosition';
import queryString from 'query-string'

export const ModalContext = React.createContext({});

const ModalProvider = ({ children }) => {
  const { windowPosition } = useWindowPosition();
  const [sid, setSID] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const[view , setView] = useState(false);
  const[product, setProduct] = useState("");
  const[url, setUrl] = useState("");

  function getSID() {
    setLoading(true)
    window.postMessage({ type: "GET_SID" }, "*");
    // fetch('https://iapi.corp.flexoffers.com/link/24.221154.6646609').then(res => res.json()).then(data => {
    //         const { lid } = data[0];
    //         setProduct(data[0]);
    //         setView(true);
    //         setLoading(false);
    //       }).catch(err => {
    //         setProduct('');
    //         setView(true);
    //         setLoading(false);
    //       });
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
        console.log(window.location.href, "test.")
        const value = queryString.parse(
          window.location.href
        );
          let refid = Object.values(value)[0];
          console.log(refid, 'refid.')
          refid = refid.split('FOF');
          console.log(refid, 'refiD')
          let advertiserId = refid[0] ? refid[0] : '';
          // let programId = refid[1] ? refid[1] : '';
          // let promotionalId = refid[2] ? refid[2].split('FOF')[0] : '';
          // let concat = `advertiserId - ${advertiserId} --- programId --- ${programId} ---- promotionalId --- ${promotionalId}`;
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
        // }
      }
      if(event.data.type && (event.data.type === "CLEAR_LOCAL_RESULT")){
        console.log(event.data.value, 'from message cleared');
        setProduct('');
        setLoading(false);
        setView(false);
      }
     if(event.data.type && (event.data.type === "CHECK_API_HIT")){
       console.log('testing',  event.data.value);
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
        clearLocalStorage
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
