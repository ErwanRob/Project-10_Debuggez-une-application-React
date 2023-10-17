/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from "react";
import { getMonth } from "../../helpers/Date";
import { useData } from "../../contexts/DataContext";

import "./style.scss";
// BUGSORT Created my own hook
const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback()
    }, delay ?? 3000)
    return () => clearTimeout(timer)
  }, [callback, delay])
}

// BUGSORT Now only using the focus table from the JSON
const Slider = () => {
  const { focus } = useData();
  const [index, setIndex] = useState(0);
  useTimeout(() => setIndex(index < focus.length - 1 ? index + 1 : 0), 3000)

  /* const nextCard = () => {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    // eslint-disable-next-line
    console.log("problem")
  }

  useEffect(() => {
    const timeoutId = setTimeout(nextCard, 3000);
    return () => {
      clearTimeout(timeoutId); // Clear timeout on component unmount or index change
    };
  }); */

  return (
    <div className="SlideCardList">
      {(focus)?.map((event, idx) => (

        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>

      ))}


      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {(focus)?.map((event, radioIdx) =>
          (
            <input
              key={`${event.title}--input--${radioIdx}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => { }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;



/*   const nextCard = () => {
    if (byDateDesc) {
      time = setTimeout(
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        3000
      );
    }
  }; */

/*   useEffect(() => {
  clearTimeout(time)
  nextCard();
}); */



/*
const nextCard = () => {
  if (byDateDesc) {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    setCheckedIndex(index < byDateDesc.length - 1 ? index + 1 : 0); // Update checked index
  } else{
    // eslint-disable-next-line
    console.log("problem")
  }
};

useEffect(() => {
  const timeoutId = setTimeout(nextCard, 3000);
  return () => {
    clearTimeout(timeoutId); // Clear timeout on component unmount or index change
  };
});
*/





/* useEffect(() => {
  const timeoutId = setTimeout(() => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  }, 3000);

  return () => {
    clearTimeout(timeoutId);
  };
}); */







/* useEffect(() => {
  const timeout = setTimeout(() => {
    setIndex(index < byDateDesc.length - 1 ? index + 1 : 0)
  }, 3000);
  return () => {
    clearTimeout(timeout);
  };
});

const handleRadioButtonClick = (radioIdx) => {
  setIndex(radioIdx);
}; */






/*   const nextCard = () => {
    if (byDateDesc) {
      setIndex(index < byDateDesc.length - 1 ? index + 1 : 0);
    } else{
      // eslint-disable-next-line
      console.log("problem")
    }
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(nextCard, 3000);
    return () => {
      clearTimeout(timeoutId); // Clear timeout on component unmount or index change
    };
  }); */


