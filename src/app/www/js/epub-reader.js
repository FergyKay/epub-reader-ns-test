(function () {
  "use strict";

  var webViewInterface = window.nsWebViewInterface;
  var book;
  var rendition;
  var displayed;

  webViewInterface.on("loadBook", function (fileName) {
    // book = ePub("books/"+fileName);
    book = ePub("https://s3.amazonaws.com/epubjs/books/alice/OPS/package.opf");
    rendition = book.renderTo("book", {
      width: "100%",
      height: "100%",
    });
    //
    // rendition = book.renderTo("book", { method: "default", width: "auto", height: "100%",spread:'false' });
    // book.forceSingle()
    // rendition.themes.default({ "p": { "font-size": "10 !important"}})

    rendition.themes.register("dark", {
      html: { background: "black", color: "gray" },
    });
    rendition.themes.register("light", {
      html: { background: "white", color: "black" },
    });

    rendition.themes.select("light");

    displayed = rendition.display();
  });

  webViewInterface.on("font-change", (font) => {
    rendition.themes.fontSize(font + "px");
  });

  webViewInterface.on("nextPage", function () {
    rendition.next();
  });

  webViewInterface.on("viewMode", (mode) => {
    console.log(mode);
    if (mode === 1) {
      rendition.themes.select("dark");
    } else {
      rendition.themes.select("light");
    }
  }); 

  webViewInterface.on("prevPage", function () {
    rendition.prev();
  });
})();
