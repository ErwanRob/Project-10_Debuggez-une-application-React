import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    const data = await json.json();
    return data;
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  // BUGSORT Spreaded data into event and focus, added loading state.
  const [events, setEvents] = useState([]);
  const [focus, setFocus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sortEventsByDateDesc = (evt) =>
    evt.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));

  const getData = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedData = await api.loadData();
      // BUGSORT
      // Sort data if available otherwise sort an empty array to avoid unwanted resort
      const sortedEvents = sortEventsByDateDesc(fetchedData?.events || []);
      setFocus(fetchedData?.focus || [])
      setEvents(sortedEvents || [])
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (focus.length && events.length) return;
    getData();
  }, [focus.length, events.length]);

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        events,
        focus,
        error,
        isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;
