import express from "express";

const homeRoutes = express.Router();

const blogPosts = [
    {
        id: 1,
        title: "Einführung in Js",
        category: "JavaScript",
        example: "Stellen Sie sich vor, die Person geht in ein Restaurant und bestellt eine Pizza. In einem synchronen Programmiermodell würde die Person vor Ort bleiben und warten, bis die Pizza fertig ist.",
        image: "bild2.png",
        creator: "Erstellt mit DALL-E",
        date: "2021-01-01",
        text: "JavaScript ist eine weit verbreitete Programmiersprache, die in Webanwendungen für die dynamische Interaktion mit Benutzern verwendet wird. In diesem Blog-Beitrag erfahren Sie die Grundlagen von JavaScript und wie Sie es in Ihren Projekten einsetzen können."
    },
    {
        id: 2,
        title: "Arbeiten mit DOM",
        category: "JavaScript",
        example: "Stellen Sie sich vor, die Person geht in ein Restaurant und bestellt eine Pizza. In einem synchronen Programmiermodell würde die Person vor Ort bleiben und warten, bis die Pizza fertig ist.",
        image: "4.png",
        creator: "Erstellt mit DALL-E",
        date: "2021-01-01",
        text: "Das Document Object Model (DOM) ist eine Baumstruktur, die die Hierarchie von HTML- oder XML-Dokumenten darstellt. In diesem Blog-Beitrag lernen Sie, wie Sie mit dem DOM in JavaScript interagieren können, um HTML-Elemente zu manipulieren und dynamische Webseiten zu erstellen."
    },
    {
        id: 3,
        title: "JavaScript-Frameworks",
        category: "JavaScript",
        example: "Stellen Sie sich vor, die Person geht in ein Restaurant und bestellt eine Pizza. In einem synchronen Programmiermodell würde die Person vor Ort bleiben und warten, bis die Pizza fertig ist.",
        image: "bild.png",
        creator: "Erstellt mit DALL-E",
        date: "2021-01-01",
        text: "Es gibt verschiedene JavaScript-Frameworks und Bibliotheken, die die Entwicklung von Webanwendungen erleichtern. In diesem Blog-Beitrag vergleichen wir die beliebten Frameworks Angular, React und Vue und diskutieren ihre Vor- und Nachteile."
    },
    {
        id: 4,
        title: "Asynchrone Programmierung",
        category: "JavaScript",
        example: "Stellen Sie sich vor, die Person geht in ein Restaurant und bestellt eine Pizza. In einem synchronen Programmiermodell würde die Person vor Ort bleiben und warten, bis die Pizza fertig ist.",
        image: "pizza.png",
        creator: "Erstellt mit DALL-E",
        date: "2021-01-01",
        text: "Asynchrone Programmierung ist entscheidend, um reaktionsfähige Webanwendungen zu erstellen. In diesem Blog-Beitrag erfahren Sie, wie Sie Promises, async/await und Callbacks verwenden, um asynchrone Aufgaben in JavaScript effizient zu verwalten."
    },
    {
        id: 5,
        title: "Tipps und Tricks für Js-Entwickler",
        category: "JavaScript",
        example: "Stellen Sie sich vor, die Person geht in ein Restaurant und bestellt eine Pizza. In einem synchronen Programmiermodell würde die Person vor Ort bleiben und warten, bis die Pizza fertig ist.",
        image: "bild.png",
        creator: "Erstellt mit DALL-E",
        date: "2021-01-01",
        text: "Hier sind einige hilfreiche Tipps und Tricks für JavaScript-Entwickler, darunter Best Practices, Debugging-Techniken und Empfehlungen für die Verbesserung Ihrer JavaScript-Fähigkeiten."
    }
];

homeRoutes.get("/", (req, res) => {
    res.render('./home/homeView', { blogPosts: blogPosts });
});

homeRoutes.get("/about", (req, res) => {
    res.render('./admin/aboutView');
});

homeRoutes.get("/blog", (req, res) => {
    res.render('./blog/blogView', { blogPosts: blogPosts });
});

homeRoutes.get("/blog/:id", (req, res) => {
    const id = req.params.id;
    const blogPost = blogPosts.find(blogPost => blogPost.id == id);
    res.render('./blog/singlePostView', { blogPost: blogPost });
});

export default homeRoutes;