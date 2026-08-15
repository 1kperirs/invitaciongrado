document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 3000);
});

const eventDate = new Date('2026-08-28T19:00:00');
const countdownEls = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();

  if (diff <= 0) {
    countdownEls.days.textContent = '00';
    countdownEls.hours.textContent = '00';
    countdownEls.minutes.textContent = '00';
    countdownEls.seconds.textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEls.days.textContent = String(days).padStart(2, '0');
  countdownEls.hours.textContent = String(hours).padStart(2, '0');
  countdownEls.minutes.textContent = String(minutes).padStart(2, '0');
  countdownEls.seconds.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

const form = document.getElementById('rsvp-form');
const message = document.getElementById('form-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim() || 'Invitado';
  const attendance = formData.get('attendance');
  const peopleCount = Number(formData.get('people')) || 1;

  message.textContent = attendance === 'yes'
    ? `¡Muchas gracias, ${name}! Confirmaste tu asistencia para ${peopleCount} persona${peopleCount > 1 ? 's' : ''}. Nos alegra celebrar juntos este momento tan especial.`
    : `Gracias, ${name}. Hemos registrado tu respuesta. Si cambias de opinión, estaremos atentos para recibirte.`;

  message.classList.add('show', 'success');
  form.reset();
  const peopleInput = document.getElementById('people');
  if (peopleInput) {
    peopleInput.value = 1;
  }
});
