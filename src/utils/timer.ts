export const setInterval = (callback: (args: void) => void, interval: number): HTimer => {
  const timer = CreateTimer();
  TimerStart(timer, interval / 1000, true, () => {
    callback();
  });
  return timer;
};

export const clearInterval = (timer: HTimer): void => {
  DestroyTimer(timer);
};

export const setTimeout = (callback: (args: void) => void, interval: number): HTimer => {
  const timer = CreateTimer();
  TimerStart(timer, interval / 1000, false, () => {
    DestroyTimer(timer);
    callback();
  });
  return timer;
};

export const clearTimeout = (timer: HTimer): void => {
  DestroyTimer(timer);
};
