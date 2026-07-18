const fs = require('fs');

let css = fs.readFileSync('src/components/Features.css', 'utf8');

// Replace the grid CSS we just added with the horizontal scroll CSS
css = css.replace(
`/* Feature cards grid */
.features-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 1rem 0 3rem 0;
}

@media (min-width: 640px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Individual feature card */
.feature-card {
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.feature-card:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  transform: translateY(-0.5rem) scale(1.02);
}

@media (min-width: 768px) {
  .feature-card {
    padding: 2.5rem;
  }`,
`/* Feature cards horizontal scroll */
.features-grid {
  width: 100%;
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 1.5rem 3rem 1.5rem;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
@media (min-width: 768px) {
  .features-grid {
    padding-left: 2.5rem; padding-right: 2.5rem; margin-left: -2.5rem; margin-right: -2.5rem;
  }
}
@media (min-width: 1024px) {
  .features-grid {
    padding-left: 3rem; padding-right: 3rem; margin-left: -3rem; margin-right: -3rem;
  }
}

.features-grid::-webkit-scrollbar { display: none; }

/* Individual feature card */
.feature-card {
  flex: 0 0 calc(100vw - 3rem);
  scroll-snap-align: center;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

@media (min-width: 640px) {
  .feature-card {
    flex: 0 0 calc(50% - 1rem);
    padding: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .feature-card {
    flex: 0 0 calc(25% - 1.5rem);
  }
}

.feature-card:hover {
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  transform: translateY(-0.5rem) scale(1.02);
}`
);

fs.writeFileSync('src/components/Features.css', css);
console.log("Updated Features.css to restore horizontal scroll");
