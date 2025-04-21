import { useEffect, useState } from "react";
import useFavouriteStore from "../stores/store";
import ModalAdan from "./adan";

export const Adan = () => {
  const { timing } = useFavouriteStore();
  const [remainingTime, setRemainingTime] = useState(timing);
  const [showAdhan, setShowAdhan] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowAdhan(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);

  useEffect(() => {
    setRemainingTime(timing);
  }, [timing]);

  return <>{showAdhan && <ModalAdan onClose={() => setShowAdhan(false)} />}</>;
};
