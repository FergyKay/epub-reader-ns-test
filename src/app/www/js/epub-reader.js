(function () {
  "use strict";

  var webViewInterface = window.nsWebViewInterface;
  var book;
  var rendition;
  var displayed;
  var chapters = []

  webViewInterface.on("loadBook", function (fileName) {
    book = ePub("books/" + fileName);
    // book = ePub("https://s3.amazonaws.com/epubjs/books/alice/OPS/package.opf");
    rendition = book.renderTo("book", {
      width: "100%",
      height: "100%",
    });
 

    rendition.themes.register("dark", {
      html: { background: "black", color: "gray" },
    });
    rendition.themes.register("light", {
      html: { background: "white", color: "black" },
    });

    rendition.themes.select("light");

    displayed = rendition.display();

    book.loaded.navigation.then(function(toc){
			toc.forEach(function(chapter) {

        chapters.push({chapterName:chapter.label,chapterUrl:chapter.href})
        
      });

     sendChapters(chapters)
    //  console.log(JSON.stringify(chapters))

			// $select.appendChild(docfrag);

			// $select.onchange = function(){
			// 		var index = $select.selectedIndex,
			// 				url = $select.options[index].ref;
			// 		rendition.display(url);
			// 		return false;
			// };


		});


  });

  webViewInterface.on("font-change", (font) => {
    rendition.themes.fontSize(font + "px");
  });

  webViewInterface.on("nextPage", function () {
    rendition.next();
    // console.log(JSON.stringify(rendition.currentLocation()))
  });

  webViewInterface.on("viewMode", (mode) => {
    // console.log(mode);
    if (mode === 1) {
      rendition.themes.select("dark");
    } else {
      rendition.themes.select("light");
    }
  });

  webViewInterface.on("prevPage", function () {
    rendition.prev();
    // console.log(JSON.stringify(rendition.currentLocation()))

  });

  webViewInterface.on('loadChapter',chapter=>{
    rendition.display(chapter)
  })

  
  function sendChapters(chapters){
    webViewInterface.emit('chapters', chapters);
}



})();
