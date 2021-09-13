window.aboutThisMacOps = {}
window.addEventListener('load', () => {
    onChange();
    ['cpufreq', 'cpucore', 'cpu', 'mem', 'memspeed', 'memtype', 'gpu', 'gpumem', 'serial', 'model', 'version'].forEach(elem => {
        document.querySelector(`#${elem}`).addEventListener('change', onChange);
    });
});
function onChange() {
    aboutThisMacOps = {
        freq: Number(document.querySelector('#cpufreq').value),
        cpuCore: Number(document.querySelector('#cpucore').value),
        cpu: document.querySelector('#cpu').value,
        mem: Number(document.querySelector('#mem').value),
        memSpeed: Number(document.querySelector('#memspeed').value),
        memType: document.querySelector('#memtype').value,
        gpu: document.querySelector('#gpu').value,
        gpuMem: Number(document.querySelector('#gpumem').value.split(',')[0]),
        gpuMemType: document.querySelector('#gpumem').value.split(',')[1],
        serial: document.querySelector('#serial').value,
        version: document.querySelector('#version').value,
        model: document.querySelector('#model').value,
        type: document.querySelector('#model').value.startsWith('MacBook Pro') ? 'MacBook Pro' : document.querySelector('#serial').value.startsWith('MacBook Air') ? 'MacBook Air' : document.querySelector('#serial').value.startsWith('MacBook') ? 'MacBook' : document.querySelector('#serial').value.startsWith('Mac Mini') ? 'Mac Mini' : document.querySelector('#serial').value.startsWith('iMac') ? 'iMac' : document.querySelector('#serial').value.startsWith('iMac Pro') ? 'iMac Pro' : document.querySelector('#serial').value.startsWith('Mac Pro') ? 'Mac Pro' : 'Mac'
    }
    document.querySelector('#result').setAttribute('href', `${location.origin}/image?d=${btoa(encodeURIComponent(JSON.stringify(aboutThisMacOps)))}`);
    document.querySelector('#result').innerHTML = `${location.origin}/image?d=${btoa(encodeURIComponent(JSON.stringify(aboutThisMacOps)))}`;
}