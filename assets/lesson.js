document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".answer-gate").forEach((gate) => {
    const openButton = gate.querySelector(".answer-open");
    const form = gate.querySelector(".password-form");
    const input = form.querySelector("input");
    const message = form.querySelector(".password-message");
    const answer = gate.querySelector(".answer-content");

    openButton.addEventListener("click", () => {
      form.hidden = false;
      openButton.hidden = true;
      input.focus();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const answerId = gate.dataset.answerId;
      const expectedPassword = window.EXERCISE_PASSWORDS?.[answerId];

      if (expectedPassword && input.value === expectedPassword) {
        answer.hidden = false;
        form.hidden = true;
        answer.querySelector("h4")?.focus();
        return;
      }

      message.textContent = "รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง";
      input.select();
    });
  });
});