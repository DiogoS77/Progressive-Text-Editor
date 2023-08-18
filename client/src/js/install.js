const buttonInstall = document.getElementById("buttonInstall");
let deferredPrompt = null;

const showInstallButton = () => {
  buttonInstall.classList.remove("hidden");
};

const hideInstallButton = () => {
  buttonInstall.classList.add("hidden");
};

window.addEventListener("beforeinstallprompt", (event) => {
  deferredPrompt = event;
  showInstallButton();
});

buttonInstall.addEventListener("click", async () => {
  if (!deferredPrompt) {
    return;
  }

  deferredPrompt.prompt();

  deferredPrompt = null;
  hideInstallButton();
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
});
