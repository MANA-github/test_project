import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/+esm';

async function sendUserData() {
    if (!localStorage.getItem('user_id')) {
        localStorage.setItem('user_id', uuidv4());
    }
    let userId = localStorage.getItem('user_id');

    if (window.Fingerprint2) {
        const components = await new Promise(resolve => {
            Fingerprint2.get(resolve);
        });

        let values = components.map(component => component.value);
        let fingerprint = Fingerprint2.x64hash128(values.join(''), 31);

        const requestData = {
            user_id: userId,
            fingerprint: fingerprint,
            timestamp: new Date().toISOString(),
            action: 'page_visit'
        };

        console.log("Sending data:", requestData);

        try {
            const response = await fetch('https://empty-moon-5b1b.manawork79.workers.dev', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });

            console.log('Response from Cloudflare:', await response.json());
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        console.error("Fingerprint2 is not available.");
    }
}
sendUserData();
