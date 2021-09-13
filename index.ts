import http from 'http';
import canvas from 'canvas';
import fs from 'fs';
import url from 'url';
interface ImageProperties {
    freq: number,
    cpuCore: number,
    cpu: 'Intel Core i3' | 'Intel Core i5' | 'Intel Core i7' | 'Intel Core i9' | 'Intel Xeon',
    mem: number,
    memSpeed: number,
    memType: 'DDR2' | 'DDR3' | 'DDR4',
    serial: string,
    gpu: string,
    gpuMem: number,
    gpuMemType: 'GB' | 'MB',
    version: string,
    type: 'MacBook Air' | 'MacBook Pro' | 'MacBook' | 'iMac' | 'iMac Pro' | 'Mac Mini' | 'Mac Pro',
    model: string
}
const server = http.createServer(async (req, res) => {
    const parsedUrl = new url.URL(req.url!, `http://${req.headers.host || 'example.com'}`);
    switch (parsedUrl.pathname) {
        case '/':
        case '/index.html':
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.writeHead(200);
            res.end(fs.readFileSync('./assets/index.html', 'utf8'));
            break;
        case '/script.js':
            res.setHeader('Content-Type', 'text/javascript; charset=UTF-8');
            res.writeHead(200);
            res.end(fs.readFileSync('./assets/script.js', 'utf8'));
            break;
        case '/style.css':
            res.setHeader('Content-Type', 'text/css; charset=UTF-8');
            res.writeHead(200);
            res.end(fs.readFileSync('./assets/style.css', 'utf8'));
            break;
        case '/image':
            try {
                const rawProperties = decodeURIComponent(Buffer.from(parsedUrl.searchParams.get('d')!, 'base64').toString());
                const properties: ImageProperties = JSON.parse(rawProperties);
                if (!properties.freq || !properties.cpuCore || !properties.cpu || !properties.mem || !properties.memType || !properties.memSpeed || !properties.gpu || !properties.gpuMem || !properties.gpuMemType || !properties.type || !properties.model || !properties.version) {
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    res.writeHead(400);
                    res.end("Invalid data");
                    return;
                }
                if (!['MacBook Air', 'MacBook Pro', 'MacBook'].includes(properties.type)) {
                    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                    res.writeHead(400);
                    res.end("Only MacBook Air, MacBook Pro, and MacBook is supported now.");
                    return;
                }
                canvas.registerFont('./assets/SF-Pro-Text-Regular.otf', {
                    family: 'SF Pro'
                });
                canvas.registerFont('./assets/AppleSDGothicNeoR00-04.otf', {
                    family: 'Apple SD Gothic Neo'
                });
                const canv = canvas.createCanvas(1172, 692);
                const ctx = canv.getContext('2d');
                const img = await canvas.loadImage('./assets/macbook.jpg');
                ctx.font = '22px "SF Pro"';
                ctx.drawImage(img, 0, 0);
                ctx.fillText(properties.version, 554, 235);
                ctx.font = '22px "Apple SD Gothic Neo"'
                ctx.fillText(properties.model, 509, 300);
                ctx.font = '22px "SF Pro"';
                ctx.fillText(properties.freq.toString(), 600, 338);
                ctx.font = '22px "Apple SD Gothic Neo"'
                ctx.fillText(`${properties.cpuCore == 1 ? '싱글 ' : properties.cpuCore == 2 ? '듀얼 ': properties.cpuCore == 4 ? '쿼드 ' : properties.cpuCore}코어 ${properties.cpu}`, 691, 339);
                ctx.font = '22px "SF Pro"';
                ctx.fillText(properties.mem.toString(), 581 + properties.mem.toString().length * 10, 376);
                ctx.fillText(properties.memSpeed.toString(), 646, 376);
                ctx.fillText(properties.memType, 761, 376);
                ctx.fillText(`${properties.gpu} ${properties.gpuMem.toString()} ${properties.gpuMemType}`, 581, 413);
                ctx.fillText(properties.serial, 605, 450);
                res.setHeader('Content-Type', 'image/png');
                res.writeHead(200);
                res.end(canv.toBuffer());
            } catch (e) {
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.writeHead(400);
                res.end("Invalid data");
                return;
            }
    }
});
server.listen(3000);