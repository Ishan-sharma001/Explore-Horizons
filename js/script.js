const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(178, 143, 255, 0.6)";
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate only once
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".scroll-animate").forEach(el => {
  observer.observe(el);
});

const modal = document.getElementById("destinationModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".destination-card").forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-description");
    const image = card.getAttribute("data-image");

    if (title && desc && image) {
      modalTitle.textContent = title;
      modalDescription.textContent = desc;
      modalImage.src = image;
      modal.style.display = "flex";
    }
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const scrollItems = document.querySelectorAll('.scroll-animate');

const scrollObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  },
  { threshold: 0.2 }
);

scrollItems.forEach(item => {
  scrollObserver.observe(item);
});

