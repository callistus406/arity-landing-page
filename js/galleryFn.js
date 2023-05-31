var previous = document.getElementById("btnPrevious");
var next = document.getElementById("btnNext");
var gallery = document.getElementById("image-gallery");
var pageIndicator = document.getElementById("page");
var galleryDots = document.getElementById("gallery-dots");
var imageName = [
  "Image_2023-05-30.jpg",
  "Image_2023-05-40.jpg",
  "Image_2023-05-44.jpg",
  "Image_2023-05-49.jpg",
  "Image_2023-05-53.jpg",
  "Image_2023-05-33.jpg",
  "Image_2023-05-41.jpg",
  "Image_2023-05-45.jpg",
  "Image_2023-05-50.jpg",
  "Image_2023-05-56.jpg",
  "Image_2023-05-34.jpg",
  "Image_2023-05-42.jpg",
  "Image_2023-05-46.jpg",
  "Image_2023-05-51.jpg",
  "Image_2023-05-59.jpg",
  "Image_2023-05-38.jpg",
  "Image_2023-05-43.jpg",
  "Image_2023-05-48.jpg",
  "Image_2023-05-52.jpg",
  "Image_2023-05-39.jpg",
];
var images = [];
for (let i = 0; i < imageName.length; i++) {
  images.push({
    title: "Image " + (i + 1),
    source: `../images/gallery/${imageName[i]}`,
  });
}

var perPage = 8;
var page = 1;
var pages = Math.ceil(images.length / perPage);

// Gallery dots
for (var i = 0; i < pages; i++) {
  var dot = document.createElement("button");
  var dotSpan = document.createElement("span");
  var dotNumber = document.createTextNode(i + 1);
  dot.classList.add("gallery-dot");
  dot.setAttribute("data-index", i);
  dotSpan.classList.add("sr-only");

  dotSpan.appendChild(dotNumber);
  dot.appendChild(dotSpan);

  dot.addEventListener("click", function (e) {
    var self = e.target;
    goToPage(self.getAttribute("data-index"));
  });

  galleryDots.appendChild(dot);
}

// Previous Button
previous.addEventListener("click", function () {
  if (page === 1) {
    page = 1;
  } else {
    page--;
    showImages();
  }
});

// Next Button
next.addEventListener("click", function () {
  if (page < pages) {
    page++;
    showImages();
  }
});

// Jump to page
function goToPage(index) {
  index = parseInt(index);
  page = index + 1;

  showImages();
}

// Load images
function showImages() {
  while (gallery.firstChild) gallery.removeChild(gallery.firstChild);

  var offset = (page - 1) * perPage;
  var dots = document.querySelectorAll(".gallery-dot");

  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  dots[page - 1].classList.add("active");

  for (var i = offset; i < offset + perPage; i++) {
    if (images[i]) {
      var template = document.createElement("div");

      var title = document.createElement("p");
      var titleText = document.createTextNode(images[i].title);
      var img = document.createElement("img");

      template.classList.add("template");
      // template.style.borderRadius = "10px";
      img.setAttribute("src", images[i].source);
      img.setAttribute("alt", images[i].title);

      // title.appendChild(titleText);
      template.appendChild(img);
      template.appendChild(title);
      gallery.appendChild(template);
    }
  }

  // Animate images
  var galleryItems = document.querySelectorAll(".template");
  for (var i = 0; i < galleryItems.length; i++) {
    var onAnimateItemIn = animateItemIn(i);
    setTimeout(onAnimateItemIn, i * 100);
  }

  function animateItemIn(i) {
    var item = galleryItems[i];
    return function () {
      item.classList.add("animate");
    };
  }

  // Update page indicator
  pageIndicator.textContent = "Page " + page + " of " + pages;
}

showImages();
