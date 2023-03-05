export const log = (...message: any) => {
  console.log(`[${new Date().toISOString()}]:`, ...message);
};
