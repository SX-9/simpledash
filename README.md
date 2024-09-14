![image](https://github.com/user-attachments/assets/c0609dfc-4a59-4ffe-8540-796c32f8867c)

```sh
export INSTALLATION_DIR=/root/simpledash # can be anything you want

# installing
git clone https://github.com/SX-9/simpledash $INSTALLATION_DIR
cd $INSTALLATION_DIR
npm i && npm run build

mv config.example.json config.json
vim config.json # configuration

docker run -itd --name simpledash \
    --restart unless-stopped -p 8097:3000 \
    -v $INSTALLATION_DIR:/simpledash \
    -e CONFIG_PATH="/simpledash/config.json" \
    node:18.20-bookworm-slim /simpledash/build/index.js

# updating
cd $INSTALLATION_DIR
git pull && npm i && npm run build
docker restart simpledash
```
