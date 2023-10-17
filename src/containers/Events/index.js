/* eslint-disable no-unused-vars */
import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { events, error, isLoading } = useData();
  const [type, setType] = useState(null);
  const typeList = new Set((events)?.map((event) => event.type));
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEvents = type !== null ?
    (events)?.filter((event) => event.type === type) : (events || [])


  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  // BUGSORT
  // defined the number of page to display for the content
  // changed floor to ceil, to round up to next high up value
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);


  // Separated and Reworked the spread by page function
  const getEventsForCurrentPage = () => {
    const firstEventIndex = currentPage * PER_PAGE - PER_PAGE;
    const lastEventIndex = currentPage * PER_PAGE;
    const paginatedEvents = (filteredEvents)?.slice(firstEventIndex, lastEventIndex)

    return paginatedEvents;
  }
  // BUGSORT Loading state check : 
  // to avoid data validating the loading state of the page and showing undefined
  return (
    <>
      {error && <div>An error occured</div>}
      {isLoading ? (
        "loading..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => changeType(value)}
          />
          <div id="events" className="ListContainer">
            {getEventsForCurrentPage()?.map((event) => (
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
