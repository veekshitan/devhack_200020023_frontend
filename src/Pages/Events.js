import React, { useState, useEffect } from 'react';
import './events.css';
// import event1 from '../constants/assets/OIP.jpeg';
import TopHeader from './TopHeader';
import RegistrationPopup from '../components/RegistrationPopup';
import { useNavigate } from 'react-router-dom';
import EventPopup from './EventPopup';
import axios from 'axios';
import { URL } from '../constants/actionTypes';
import { useSelector } from "react-redux";
import bg4 from "../constants/assets/bg7.jpg"

const Events = () => {
  const [isEventPopupOpen, setEventPopupOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [counter, setCounter] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // Initialize with null
  const [selectedSubEvent, setSelectedSubEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const openEventPopup = () => {
    setEventPopupOpen(true);
  };

  const closeEventPopup = () => {
    // setCounter(!counter);
    setEventPopupOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your backend endpoint
        const response = await axios.get(`${URL}/events`);

        // Extract data from the response
        const eventData = response.data;

        // Format the data as per your requirement
        const formattedEvents = eventData.map((event, eventId) => {
          console.log("sub_events", event.sub_events.registrationLink)
          const formattedSubEvents = event.sub_events.names.map((subEventName, subEventId) => ({
            id: subEventId + 1,
            name: subEventName,
            link: event.sub_events.registrationLinks[subEventId],
          }));

          return {
            id: eventId + 1,
            name: event.name,
            image: event.image,
            description: event.description,
            website_link: event.website_link,
            subEvents: formattedSubEvents,
          };
        });

        // Set the formatted data to the state
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
    // setSelectedEvent(events[0]);
    // setLoading(false);
  }, [counter]);

  useEffect(()=> {
    setSelectedEvent(events[0]);
  }, [events])

  const canAddEvent = JSON.parse(localStorage.getItem("userInfo"))["can_add_event"];
  const roll_num_event = JSON.parse(localStorage.getItem("userInfo"))["roll_no"];

  const handleSubEventClick = (subEvent) => {
    setSelectedSubEvent(subEvent);
  };

  const closeRegistrationModal = () => {
    setSelectedSubEvent(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDeleteClick = async (event, eventName) => {
    setSelectedEvent(event);
    const requestData = {
      roll_no: roll_num_event,
      name: eventName
    }
    console.log(requestData)
    try {
      // Make a DELETE request to your backend endpoint for deleting the event
      await axios.post(`${URL}/deleteEvents`, requestData);

      // Reload the entire page
      // window.location.reload();
      setCounter(!counter);
    } catch (error) {
      console.error('Error deleting event:', error);
      // Handle error as needed
    }
  };

  return (
    <>
      <TopHeader color="#87CEEB" />
      <div className="App" style={{ backgroundImage: `url(${bg4})`, backgroundSize: 'cover', backgroundPosition: 'bottom', height: '86vh'}}>
        <div className="event-page">
          <div className="event-sidebar">
            <h2 style={{marginLeft:'10px', marginBottom: '25px'}}>Events</h2>
            <ul>
              {events.map((event) => (
                <li key={event.id} className={selectedEvent && event.name === selectedEvent.name ? 'selected' : ''} onClick={() => handleEventClick(event)}>
                  {event.name}
                </li>
              ))}
              <div className="event-button">
                {canAddEvent ?
                  <button onClick={openEventPopup} style={{ color: "white", borderRadius: "25px", fontWeight: "bold", fontFamily:"monospace" }}>
                    ADD EVENT
                  </button> :
                  null}
              </div>
            </ul>
          </div>
          <div className="event-details">
            {selectedEvent ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , marginTop: "15px"}}>
                  <img className="event-image" src={selectedEvent.image} alt="Cycle" style={{ width: 250, height: 200, marginRight: '10px'  }} />
                  <div style={{ marginLeft: "10px" }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: "40px", fontWeight: 'bold', margin: 0}}>{selectedEvent.name}</p>
                      {canAddEvent ?
                        <button onClick={() => handleDeleteClick(selectedEvent, selectedEvent.name)} style={{fontFamily:"monospace"}}>
                          Delete Event
                        </button>
                        : null}
                    </div>
                    <p style={{ fontSize: "16px", textAlign: 'left' }} >{selectedEvent.description}</p>
                  </div>
                </div>

                <ul>
                  {selectedEvent.subEvents.map((subEvent) => (
                    <li key={subEvent.id}>
                      {subEvent.name}
                      {selectedSubEvent && selectedSubEvent.id === subEvent.id ? (
                        'Registered'
                      ) : (
                        <button 
                        style={{
                          fontFamily:"monospace",
                          fontSize: '16px',
                          borderRadius: '5px',
                          padding: '10px 15px',
                          marginRight: '10px',
                        }}
                        onClick={() => {
                          window.open(subEvent.link, '_blank');
                        }}>Register</button>
                      )}
                    </li>
                  ))}
                </ul>
                <button 
                style={{
                  fontSize: '18px',
                  borderRadius: '5px',
                  padding: '10px 25px',
                  marginRight: '10px',
                  marginTop: '15px',
                  fontFamily:"monospace"
                }}
                onClick={() => {
                  window.open(selectedEvent.website_link, '_blank');
                }}>Visit Website</button>
                {selectedSubEvent && (
                  <RegistrationPopup
                    onClose={closeRegistrationModal}
                    subEventName={selectedSubEvent.name} />
                )}
              </>
            ) : (
              <p>Select an event from the sidebar to view details.</p>
            )}
          </div>
          {/* Event Popup */}
          <EventPopup counter={counter} setCounter={setCounter} isOpen={isEventPopupOpen} onClose={closeEventPopup} />
        </div>
      </div>
    </>
  );
};

export default Events;
