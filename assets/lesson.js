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
      const expectedPassword = window.EXERCISE_PASSWORDS?.[answerId] ?? window.PRACTICE_EXERCISE_PASSWORDS?.[answerId];

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
function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.append(helper);
    helper.select();
    try {
      document.execCommand("copy") ? resolve() : reject();
    } catch (error) {
      reject(error);
    } finally {
      helper.remove();
    }
  });
}

function addCopyButtons() {
  document.querySelectorAll("pre.source-code, .answer-content pre, pre.copyable").forEach((pre) => {
    if (pre.parentElement.classList.contains("code-wrap")) return;
    const wrap = document.createElement("div");
    wrap.className = "code-wrap";
    pre.replaceWith(wrap);
    wrap.append(pre);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "คัดลอก";
    button.setAttribute("aria-label", "คัดลอก source code");
    button.addEventListener("click", () => {
      copyText(pre.innerText.replace(/ /g, " ")).then(() => {
        button.textContent = "คัดลอกแล้ว ✓";
        button.classList.add("copied");
      }, () => {
        button.textContent = "คัดลอกไม่สำเร็จ";
      }).finally(() => {
        setTimeout(() => {
          button.textContent = "คัดลอก";
          button.classList.remove("copied");
        }, 1600);
      });
    });
    wrap.append(button);
  });
}

document.addEventListener("DOMContentLoaded", () => setTimeout(addCopyButtons, 0));
