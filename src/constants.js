export const serverRootUrl =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://woomool-be.handong.app";
