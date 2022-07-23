export const timeout = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
