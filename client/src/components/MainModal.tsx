import React, { useEffect } from "react";
import { DateList } from "../interfaces/DateList";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  handledDate: (e: React.FormEvent) => void;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  weekend: boolean;
  setWeekend: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDate: string;
  style?: React.CSSProperties;
  dateList: DateList[];
  optionsToShow: string[];
  nextMonthDate: string;
}

const MainModal = ({
  onClose,
  handledDate,
  setOption,
  weekend,
  clickedDate,
  setWeekend,
  style,
  optionsToShow,
  nextMonthDate,
}: Props) => {
  useEffect(() => {
    const isWeekend = () => {
      const date = new Date(clickedDate);
      const day = date.getDay();
      if (day === 0 || day === 6) {
        setWeekend(true);
      }
    };
    isWeekend();
  }, []);
  const checkIfDateIsInRange = () => {
    if (clickedDate < nextMonthDate) {
      return (
        <p className="text-center h-full">Ta data jest już poza zakresem</p>
      );
    } else
      return (
        <form
          onSubmit={(e) => handledDate(e)}
          className="flex flex-col items-center justify-center grow gap-4"
        >
          <label>Wybierz numer zmiany</label>
          {(optionsToShow.includes("1") || optionsToShow.includes("2")) &&
          optionsToShow.includes("3") ? (
            <p>Nie ma już innych opcji</p>
          ) : optionsToShow.includes("1") || optionsToShow.includes("2") ? (
            <select onChange={(event) => setOption(event.target.value)}>
              <option value=""></option>
              <option value="3">3</option>
            </select>
          ) : optionsToShow.includes("3") ? (
            <select onChange={(event) => setOption(event.target.value)}>
              <option value=""></option>
              <option value="1">1</option>
              {!weekend && <option value="2">2</option>}
            </select>
          ) : (
            <select onChange={(event) => setOption(event.target.value)}>
              <option value=""></option>
              <option value="1">1</option>
              {!weekend && <option value="2">2</option>}
              <option value="3">3</option>
            </select>
          )}
          <button className="w-52 h-8 rounded-2xl bg-green-600 font-bold text-white">
            Dodaj
          </button>
        </form>
      );
  };
  return (
    <section className="w-screen h-screen fixed top-0 left-0 z-10">
      <div
        style={style}
        className="flex flex-col items-center bg-white w-1/5 h-1/4 border-2"
      >
        <button
          onClick={() => {
            onClose(false);
            setWeekend(false);
          }}
          className="self-end"
        >
          <AiOutlineClose />
        </button>
        {checkIfDateIsInRange()}
      </div>
    </section>
  );
};

export default MainModal;
