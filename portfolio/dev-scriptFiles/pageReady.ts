// 100ms delay before adding classes + backups
requestAnimationFrame(() => {
  setTimeout(() => {
    document.body.classList.add("opacity-100");
  }, 200);
});

if (document.fonts) {
  document.fonts.ready.then(() => {
    setTimeout(() => {
      document.body.classList.add("opacity-100");
    }, 200);
  });
}

setTimeout(() => {
  document.body.classList.add("opacity-100");
}, 700); // 500 + 100ms delay
