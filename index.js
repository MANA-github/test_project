import { v4 as uuidv4 } from 'uuid';

async function sendUserData() {
    if (window.Fingerprint2) {
        const components = await new Promise(resolve => {
            Fingerprint2.get(resolve);
        });

        let values = components.map(component => component.value);
        let fingerprint = Fingerprint2.x64hash128(values.join(''), 31);

        fetch('https://empty-moon-5b1b.manawork79.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fingerprint: fingerprint,
                timestamp: new Date().toISOString(),
                action: 'page_visit'
            })
        }).then(response => console.log('Sent to Cloudflare:', response))
          .catch(error => console.error('Error:', error));
    } else {
        console.error("Fingerprint2 is not available.");
    }
}
sendUserData();

let userId;
if (!localStorage.getItem('user_id')) {
    userId = uuidv4();
    localStorage.setItem('user_id', userId);
} else {
    userId = localStorage.getItem('user_id');
}
console.log(userId);
