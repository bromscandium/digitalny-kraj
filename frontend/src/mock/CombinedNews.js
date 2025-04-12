import eventData from "./Events.js";
import newsData from "./news.js";

const combinedNews = [
    ...newsData.map(item => ({ ...item, type: "news" })),
    ...eventData.map(item => ({ ...item, type: "event" }))
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Сортировка по дате

export default combinedNews;
