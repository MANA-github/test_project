import { v4 as uuidv4 } from 'uuid';

function sendUserData() {
    Fingerprint2.get((components) => {
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
    });
}
sendUserData();

if (!localStorage.getItem('user_id')) {
    const userId = uuidv4();
    localStorage.setItem('user_id', userId);
} else {
    const userId = localStorage.getItem('user_id');
}
console.log(userId);