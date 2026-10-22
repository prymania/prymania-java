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

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!window.crypto?.subtle) {
        message.textContent = "เบราว์เซอร์นี้เปิดเฉลยไม่ได้ (ต้องเปิดผ่าน https หรือไฟล์ในเครื่อง)";
        return;
      }
      message.textContent = "กำลังตรวจรหัส...";
      try {
        answer.innerHTML = await decryptAnswer(answer.dataset.enc, input.value.trim());
      } catch {
        message.textContent = "รหัสผ่านไม่ถูกต้อง ลองอีกครั้ง";
        input.select();
        return;
      }
      message.textContent = "";
      answer.hidden = false;
      form.hidden = true;
      addCopyButtons();
      answer.querySelector("h4")?.focus();
    });
  });
});

// Answers are AES-256-GCM encrypted at build time (tools/lesson-builder/lib.mjs: encryptAnswer).
// Payload = base64(salt[16] | iv[12] | ciphertext+tag); key = PBKDF2-SHA256(password, salt).
// A wrong password fails the GCM tag check, so decrypt() throws.
const PBKDF2_ITERATIONS = 100000;
async function decryptAnswer(payload, password) {
  const bytes = Uint8Array.from(atob(payload), (ch) => ch.charCodeAt(0));
  const salt = bytes.slice(0, 16);
  const iv = bytes.slice(16, 28);
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, bytes.slice(28));
  return new TextDecoder().decode(plain);
}
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
    // code panel with a header bar: the button goes in the header
    const head = pre.parentElement.classList.contains("code-block") ? pre.parentElement.querySelector(".code-head") : null;
    if (head && head.querySelector(".copy-button")) return;
    let wrap = head;
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "code-wrap";
      pre.replaceWith(wrap);
      wrap.append(pre);
    }

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
