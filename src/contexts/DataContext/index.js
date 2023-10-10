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
    // eslint-disable-next-line 
    //console.log("Fetched Data:", data); // Log the fetched data to inspect its structure
    return data;
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // added last state for it to be set at the fetch)
  // BUGSORT BEFORE : rien AFTER const [last, setLast] = useState(null);
  const [last, setLast] = useState(); // Add a new state for the last event
  // BUGSORT sorted data event list desc into sortEventsByDateDesc
  const sortEventsByDateDesc = (events) => 
  events.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));

  const getData = useCallback(async () => {
    try {
      const fetchedData = await api.loadData();
      const sortedEvents = sortEventsByDateDesc(fetchedData.events);
      setData({...fetchedData, events: sortedEvents});
      setLast(sortedEvents[0]);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  },[data, getData]);
  
  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
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
