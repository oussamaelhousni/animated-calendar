import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { startOfMonth } from "date-fns/fp";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import useMeasure from "react-use-measure";
function App() {
  const [ref, bounds] = useMeasure();
  const [monthString, setMonthString] = useState(format(new Date(), "yyyy-MM"));
  const [direction, setDirection] = useState(1);
  const month = parse(monthString, "yyyy-MM", new Date());
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  const nextMonth = () => {
    const next = addMonths(month, 1);
    setDirection(1);
    setMonthString(format(next, "yyyy-MM"));
  };

  const previousMonth = () => {
    const prev = subMonths(month, 1);
    setDirection(-1);
    setMonthString(format(prev, "yyyy-MM"));
  };

  const variants = {
    initial: (direction: number) => ({
      x: `${1 * direction * 100}%`,
    }),
    current: { x: "0%" },
    exit: (direction: number) => ({
      x: `${-1 * direction * 100}%`,
    }),
  };
  return (
    <div className="w-screen h-screen bg-zinc-950 flex items-center justify-center">
      <MotionConfig transition={{ bounce: 0, duration: 0.2 }}>
        <div className="bg-white w-full max-w-md rounded-xl select-none overflow-hidden">
          <div className="py-8 pb-10 flex flex-col items-center text-center ">
            <header className="px-8 flex items-center justify-between w-full">
              <button onClick={previousMonth}>
                <MdKeyboardArrowLeft size={20} />
              </button>
              <p className="font-semibold flex-1 text-center">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={monthString}
                    className="block"
                    custom={direction}
                    variants={variants}
                    initial="initial"
                    animate="current"
                    exit="exit"
                    transition={{ duration: 0.1 }}
                  >
                    {monthString}
                  </motion.div>
                </AnimatePresence>
              </p>
              <button onClick={nextMonth}>
                <MdKeyboardArrowRight size={20} />
              </button>
            </header>

            <>
              <motion.div className="items-center px-8 w-full gap-y-6 mt-6 relative">
                <header className="grid grid-cols-7">
                  <span key="Su" className={`font-semibold text-zinc-600`}>
                    Su
                  </span>
                  <span key="Mo" className={`font-semibold text-zinc-600`}>
                    Mo
                  </span>
                  <span key="Tu" className={`font-semibold text-zinc-600`}>
                    Tu
                  </span>
                  <span key="We" className={`font-semibold text-zinc-600`}>
                    We
                  </span>
                  <span key="Th" className={`font-semibold text-zinc-600`}>
                    Th
                  </span>
                  <span key="Fr" className={`font-semibold text-zinc-600`}>
                    Fr
                  </span>

                  <span key="Sa" className={`font-semibold text-zinc-600`}>
                    Sa
                  </span>
                </header>
                <motion.div animate={{ height: bounds.height }}>
                  <AnimatePresence custom={direction}>
                    <motion.div
                      className="grid grid-cols-7 gap-y-4 w-full mt-4 absolute top-4 left-0 px-8 "
                      custom={direction}
                      variants={variants}
                      initial="initial"
                      animate="current"
                      exit="exit"
                      key={monthString}
                      ref={ref}
                    >
                      {days.map((day) => {
                        return (
                          <span
                            key={format(day, format(day, "yyyy-MM-dd"))}
                            className={` ${
                              !isSameMonth(month, day) && "text-zinc-400"
                            } font-semibold`}
                          >
                            {format(day, "d")}
                          </span>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </>
          </div>
        </div>
      </MotionConfig>
    </div>
  );
}

export default App;
