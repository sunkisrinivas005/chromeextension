import React from 'react';
import Draggable from 'react-draggable';
import { ModalContext } from '../Contexts/ModalProvider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { Button } from '@material-ui/core';


const regex = /(?:\d+FOF\d+)/i;
// regex.test(sid) ? "sid is valid" : "sid is not valid"

const Modal = () => {
  return (
    <ModalContext.Consumer>
      {({
        windowPosition,
        hasDraggedWindowPosition,
        sid,
        getSID,
        loading,
        view,
        product,
        url,
        clearLocalStorage,
        messageUrl,
        getConversionTrackingUrl,
        type,
        setView
      }) => (
        <Draggable
          handle=".modal-handle"
          defaultPosition={{ x: windowPosition.x, y: windowPosition.y }}
          position={
            hasDraggedWindowPosition
              ? { x: windowPosition.x, y: windowPosition.y }
              : null
          }
        >
          <div
            id="modal"
            className="modal-window"
            style={{
              transform: windowPosition,
            }}
          >
            {console.log(messageUrl, messageUrl['https://track.flexlinks.com/conversiontracking.ashx?AID'], 'messageUrl123')}
            <div className="modal-window-inner-border">
              <>
                <div className="modal-body">
                  <div className="modal-handle"></div>
                  <div className="col-lg-12" style={{ textAlign: 'center', }}>
                    <h3 style={{ color: 'white' }}>
                      {' '}
                      Direct Advertiser - Tracking Tool
                    </h3>
                  </div>
                  <div className="modal-content">
                    <>
                      {view ? type === 1 ? (
                        <div
                          style={{
                            padding: '25px 0px 0px 0px',
                            alignSelf: "center"
                          }}
                        >
                          <div
                            className="col-lg-12 row"
                            style={{
                              justifyContent: 'space-between',
                              margin: '10px',
                            }}
                          >
                            <div
                              className='col-lg-2'
                            >
                              {sid && sid.length ? (
                                <CheckCircleIcon
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    color: '#008000',
                                  }}
                                />
                              ) : (
                                <CancelIcon
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    color: 'red',
                                  }}
                                />
                              )}
                            </div>
                            <div className="col-lg-9" style={{ justifyContent: "space-between" }}>
                              <h5
                                style={{ color: 'black', marginTop: '4px' }}
                              >
                                SID found
                              </h5>
                              <p style={{ color: 'black', fontWeight: 'bold' }}>
                                {sid ? sid : 'no sid found'}
                              </p>
                            </div>
                          </div>
                          <div
                            className="col-lg-12 row"
                            style={{
                              justifyContent: 'space-between',
                              margin: '10px',
                            }}
                          >
                            <div
                              className='col-lg-2'
                            >
                              {sid && sid.length ? (
                                <CheckCircleIcon
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    color: '#008000',
                                  }}
                                />
                              ) : (
                                <CancelIcon
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    color: 'red',
                                  }}
                                />
                              )}
                            </div>
                            <div className="col-lg-9" style={{ justifyContent: "space-between" }}>
                              <h5
                                style={{ color: 'black', marginBottom: '0px' }}
                              >
                                SID Valid
                              </h5>
                              <p style={{ color: 'black', fontWeight: 'bold', marginBottom: '2px' }}>
                                {sid && sid.length
                                  ? regex.test(sid)
                                    ? 'valid sid format'
                                    : 'sid is not valid'
                                  : 'sid not found'}
                              </p>
                            </div>
                          </div>
                          <div
                            className="col-lg-12 row"
                            style={{
                              justifyContent: 'space-between',
                              margin: '10px',
                            }}
                          >
                            <div
                              className='col-lg-2'
                            >
                              {product && product ? (
                                <CheckCircleIcon
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    color: '#008000',
                                  }}
                                />
                              ) : (
                                <CancelIcon
                                  style={{
                                    width: '60px',
                                    height: '60px',
                                    color: 'red',
                                  }}
                                />
                              )}
                            </div>
                            <div className="col-lg-9" style={{ justifyContent: "space-between" }}>
                              <h5
                                style={{ color: 'black', marginBottom: '0px' }}
                              >
                                {product ? 'Link Id found' : 'Link not found'}
                              </h5>
                              <p style={{ color: 'black', fontWeight: 'bold' }}>
                                {product && product.advertiserId ? (
                                  <>
                                    <span> Program name: {product.programName}</span>
                                    <br />
                                    <span>Categories: {product.categories}</span>
                                    <br />
                                    <span>promotionalTypes : {product.promotionalTypes}</span>
                                    <br />
                                    <span>link id: {product.lid}</span>
                                  </>
                                ) : 'Not a valid link from advertiser'}
                              </p>
                            </div>
                          </div>
                          <div style={{ flexDirection: 'row', textAlign: 'center', justifyContent:'space-between' }}>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => clearLocalStorage()}
                            >
                              Clear Local Storage
                            </Button>
                            <Button
                              variant='contained'
                              color='primary'
                              style = {{marginLeft:"30px"}}
                              onClick={() => setView(false)}
                            >
                              Back
                            </Button>
                          </div>
                        </div>
                      ) : type === 2 ?
                        <div style={{ color: "black" }}>
                          <div className='col-lg-12' style={{ color: "black", justifyContent: 'center', alignSelf: 'center' }}>
                            <p>AID : {messageUrl['https://track.flexlinks.com/conversiontracking.ashx?AID']}</p>
                            <p>UID : {messageUrl['UID']}</p>
                            <p>SID : {messageUrl['SID']}</p>
                            <p>AMT : {messageUrl['AMT']}</p>
                            <p style = {{width:'500px'}}>URL : {url}</p>
                          </div>
                          <div style={{ flexDirection: 'row', textAlign: 'center' }}>
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => setView(false)}
                            >
                              Back
                            </Button>
                          </div>
                        </div>
                        : loading ? (
                          <p>loading..........</p>
                        ) : null : null
                      }
                    </>
                    {!view &&
                      <div className='col-lg-12 row' style={{ justifyContent: 'center' }}>
                        <div
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            marginBottom: '25px',
                          }}
                        >
                          <button onClick={() => getSID()} className="modal-button">
                            Validate Values
                          </button>
                        </div>
                        <div
                          style={{
                            padding: '10px',
                            textAlign: 'center',
                            marginBottom: '25px',
                          }}
                        >
                          <button onClick={() => getConversionTrackingUrl()} className="modal-button">
                            Conversion Tracking Details
                          </button>
                        </div>
                      </div>}
                  </div>
                </div>
              </>
            </div>
          </div>
        </Draggable>
      )}
    </ModalContext.Consumer>
  );
};

export default Modal;




