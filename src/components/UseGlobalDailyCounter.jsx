import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { getTodayResetUTC } from "./GetResetTime";

export default function useGlobalDailyCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      const ref = doc(db, "counters", "viewsToday");
      const snap = await getDoc(ref);

      const now = Date.now();
      const lastReset = snap.data()?.lastReset || 0;
      const resetTime = getTodayResetUTC();

      let newCount = snap.data()?.count || 0;
      if (lastReset < resetTime) {
        newCount = 0;
        await updateDoc(ref, {
          count: 0,
          lastReset: resetTime,
        });
      }

      newCount += 1;
      await updateDoc(ref, { count: newCount });

      setCount(newCount);
    };

    run();
  }, []);

  return count;
}
