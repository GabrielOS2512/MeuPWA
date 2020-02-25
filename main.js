//Main JS

//Service Worker
// Checar se o SW é suportado pelo navegador
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(console.error);
  });
}

function notificar(){
//Notificar
  if (window.Notification) {

    function showNotification() {

      let notifOpt = {
        body: 'Exemplo de Notificação.',
        icon: 'images\icons\icon-72x72.png'
      }

      let n = new Notification('Notificação.', notifOpt);

      n.onclick = () => {
        console.log('Notificação Clicada');
      }
    }

    // Permissão
    if (Notification.permission === 'granted') {
      showNotification();

    } else if (Notification.permission !== 'denied') {

      Notification.requestPermission( (permission) => {

        if (permission === 'granted') {
          showNotification();
        }
      });

    }
  }
}
