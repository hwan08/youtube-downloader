# Installation
**코드를 실행하기 위해 모듈을 다운받아주세요.**
```
npx tsc --init --module NodeNext --moduleResolution NodeNext --target ES2022 --types node --emitDeclarationOnly true --allowImportingTsExtensions true --esModuleInterop
npm init -y
npm pkg set type=module
npm install -g typescript ts-node
npm install @types/node
```

# Example Code
```javascript
import { download, search } from "./src/index.ts";

(async() => {
    const list = await search("fromis9 Supersonic");
    
    if (list.length > 0 && list[0]?.url) {
        const first_url = list[0].url;
        const result = await download(first_url, "./files", "001", "mp3");

        console.log(result);
    }
})();
```

# Search Value
```json
[
  {
    title: "[KPOP IN PUBLIC] fromis_9 (프로미스나인) 'Supersonic' | BELGIUM",
    channel: '1Nbetween',
    url: 'https://www.youtube.com/watch?v=d0HqYMmI8hI'
  },
  {
    title: '[KPOP IN PUBLIC | ONE TAKE] FROMIS_9 (프로미스나인) SUPERSONIC DANCE COVER | London',
    channel: 'BBKOVZ',
    url: 'https://www.youtube.com/watch?v=GotermcG0Xc'
  },
  {
    title: 'fromis_9, Supersonic (프로미스나인, Supersonic) [THE SHOW 240820]',
    channel: 'THE K-POP',
    url: 'https://www.youtube.com/watch?v=PfOHYCujtn0'
  },
  {
    title: '[KPOP IN PUBLIC] Supersonic - fromis_9 DANCE COVER by Blossom Wave',
    channel: 'Blossom Wave',
    url: 'https://www.youtube.com/watch?v=f1LiKJmnj9w'
  },
  {
    title: 'fromis_9 (프로미스나인) – Supersonic (Joenast Remix)',
    channel: 'Joenast',
    url: 'https://www.youtube.com/watch?v=_RAx48iN9CI'
  }
]
```

# Download Value
```json
{
  stats: 'success',
  code: 0,
  url: 'https://www.youtube.com/watch?v=d0HqYMmI8hI',
  ext: 'mp3',
  size: 6180236,
  location: 'C:\\Users\\hwan0\\Desktop\\1\\youtube-downloader\\files\\001.mp3'
}
```

# Image
[Image]([https://example.com/image.png](https://cdn.discordapp.com/attachments/1307112787528515595/1472552465386705058/image.png?ex=6992fcda&is=6991ab5a&hm=0bd73d541a9bdfc7eafc521cae0f2404a4babd3f8d4509a8dae35701838b6f4a&))
