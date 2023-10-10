import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // problem ici

  const filteredEvents = (
    (!type ? data?.events : data?.events) || []
  ).filter((event, index) => {
    // Check if the event type matches the selected type (if type is not null)
    const isTypeMatch = !type || event.type === type;
    
    // Check if the event falls within the current page range
    const isPageInRange = (currentPage - 1) * PER_PAGE <= index && PER_PAGE * currentPage > index;
  
    // Return true if the event type matches the selected type and it's within the current page range
    return isTypeMatch && isPageInRange;
  });

  /* 
  // Previous version which was not handling the type in filtering. 
  const filteredEvents = (
    (!type ? data?.events : data?.events) || []
  ).filter((event, index) => {
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  }); */


  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    // eslint-disable-next-line
    console.log(evtType);
  };

  // defined the number of page to display for the content
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

  const typeList = new Set(data?.events.map((event) => event.type));


  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}

            {/* {filteredEvents.map((event) => {
              // eslint-disable-next-line
              console.log("Event Image Src in EventLIST ------- :", event.cover); // Log imageSrc to verify its value
              // eslint-disable-next-line
              console.log("Event Title in EventLIST ------- :", event.title); // Log title to verify its value
              return (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                    />
                  )}
                </Modal>
              );
            })} */}






          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
