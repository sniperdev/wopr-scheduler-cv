import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/all";

interface props {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  handledDate: (e: React.FormEvent) => void;
  setOption: React.Dispatch<React.SetStateAction<string>>;
  weekend: boolean;
  setWeekend: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDate: string;
  style?: React.CSSProperties;
}

const MainModal = ({
  onClose,
  handledDate,
  setOption,
  weekend,
  clickedDate,
  setWeekend,
  style,
}: props) => {
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
        <form
          onSubmit={(e) => handledDate(e)}
          className="flex flex-col items-center justify-center grow gap-4"
        >
          <label>Wybierz numer zmiany</label>
          <select
            onChange={(e) => {
              setOption(e.target.value);
            }}
          >
            {weekend ? (
              <>
                <option value="1">1</option>
                <option value="3">3</option>
              </>
            ) : (
              <>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </>
            )}
          </select>
          <button className="w-52 h-8 rounded-2xl bg-green-600 font-bold text-white">
            Dodaj
          </button>
        </form>
      </div>
    </section>
  );
};

export default MainModal;
