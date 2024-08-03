export const FLASK_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://gpt.clawlaw.in/api/v1"
    : "http://20.193.128.165:80/api/v1";

export const NODE_API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://claw-app.onrender.com/api/v1"
    : "http://localhost:8000/api/v1";

export const splitContentIntoPages = (text, maxWordsPerPage) => {
  const words = text.split(" ");
  const pages = [];

  for (let i = 0; i < words.length; i += maxWordsPerPage) {
    pages.push(words.slice(i, i + maxWordsPerPage).join(" "));
  }

  return pages;
};
export function MultipleItems() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
}
