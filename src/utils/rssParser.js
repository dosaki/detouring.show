const removeCDATA = (text) => {
    return text.replace(/^<!\[CDATA\[/, "").replace(/]]>$/, "");
};

const validTags = {
    "Arts": ["#animation", "#film", "#art", "#music", "#illustration"],
    "Business": ["#management", "#startup", "#administration", "#business", "#accounting", "#recruitment"],
    "Design": ["#design", "#usability", "#ux"],
    "Food Industry": ["#chef", "#pastry", "#baking", "#baker", "#food", "#restaurant"],
    "Technology": ["#softwaredevelopment", "#technology", "#datascience", "#programming", "#code", "#software", "#robotics"],
    "Medical": ["#doctor", "#medicine", "#medical", "#radiology", "#physiotherapy", "#psychology", "#neurology", "#photography"],
    "Sales & Marketing": ["#marketing", "#sales"],
    "Science": ["#science", "#physics", "#chemistry", "#scientist", "#astronomy"]
};

const hasTag = (description, tag) => {
    return validTags[tag].some(t => description.includes(t));
};

const extractTags = (description) => {
    const tags = Object.keys(validTags).filter(tag => hasTag(description, tag));
    return tags.length === 0 ? ["All", "Other"] : ["All", ...tags];
};

const parseItems = (items) => {
    return items.map((episode) => {
        const description = removeCDATA(episode.querySelector("description").innerHTML);
        const date = new Date(episode.querySelector("pubDate").innerHTML);
        const tags = extractTags(description);
        let descriptionText = description
            .replace(new RegExp(`#.* `, "g"), "")
            .replace(new RegExp(`#.*</p>`, "g"), "</p>")
            .replace("<p></p>", "");
        return {
            title: removeCDATA(episode.querySelector("title").innerHTML),
            description: descriptionText,
            link: episode.querySelector("link").innerHTML,
            author: removeCDATA(episode.querySelector("creator").innerHTML),
            date,
            timestamp: date.getTime(),
            audioFile: episode.querySelector("enclosure").getAttribute("url"),
            duration: episode.querySelector("duration").innerHTML,
            image: episode.querySelector("image").getAttribute("href"),
            isExplicit: episode.querySelector("explicit").innerHTML.toLowerCase() === "no",
            tags
        };
    });
};

const parseRss = (rss) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rss, "application/xml");
    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
        console.error("error while parsing", errorNode, doc);
        return null;
    }
    const episodes = parseItems([...doc.querySelectorAll("channel > item")]);
    return {
        title: removeCDATA(doc.querySelector("channel > title").innerHTML),
        description: removeCDATA(doc.querySelector("channel > description").innerHTML),
        link: doc.querySelector("channel > link").innerHTML,
        author: removeCDATA(doc.querySelector("channel>author").innerHTML),
        email: doc.querySelector("channel > owner > email").innerHTML,
        episodes,
        allTags: [...[...new Set(episodes.map(ep => ep.tags).flat())].filter(t => t !== "Other").sort(), "Other"]
    };
};

export default parseRss;
