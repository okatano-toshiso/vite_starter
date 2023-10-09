import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import path from "path";
import handlebars from "vite-plugin-handlebars";
const siteData = require('./sitedata.json');

const files = [];
function readDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        if (fs.statSync(itemPath).isDirectory()) {
            if (item === "components") {
                continue;
            }
            readDirectory(itemPath);
        } else {
            if (path.extname(itemPath) !== ".html") {
                continue;
            }
            let name;
            if (dirPath === path.resolve(__dirname, "src")) {
                name = path.parse(itemPath).name;
            } else {
                const relativePath = path.relative(path.resolve(__dirname, "src"), dirPath);
                const dirName = relativePath.replace(/\//g, "_");
                name = `${dirName}_${path.parse(itemPath).name}`;
            }
            const relativePath = path.relative(path.resolve(__dirname, "src"), itemPath);
            const filePath = `/${relativePath}`;
            files.push({ name, path: filePath });
        }
    }
}
readDirectory(path.resolve(__dirname, "src"));
const inputFiles = {};
for (let i = 0; i < files.length; i++) {
    const file = files[i];
    inputFiles[file.name] = resolve(__dirname, "./src" + file.path);
}

//CSSとJSファイルに更新パラメータを追加
const htmlPlugin = () => {
    return {
        name: "html-transform",
        transformIndexHtml(html) {
            // npm run build のときのみ動作させる
            if (process.env.NODE_ENV !== "production") {
                return;
            }

            //更新パラメータ作成
            const date = new Date();
            const param = date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds();

            // CSSファイルにパラメータを追加（httpsから始まる外部リンクは除外）
            let setParamHtml = html.replace(/(?=.*<link)(?=.*css)(?!.*https).*$/gm, (match) => {
                return match.replace(/\.css/, ".css?" + param);
            });

            // JSファイルにパラメータを追加して変更内容を返す（httpsから始まる外部リンクは除外）
            return setParamHtml.replace(/(?=.*<script)(?=.*js)(?!.*https).*$/gm, (match) => {
                return match.replace(/\.js/, ".js?" + param);
            });
        },
    };
};

export default defineConfig({
    server: {
        port: 8888,
    },
    base: './', //相対パスでビルドする
    root: "./src", //開発ディレクトリ設定
    build: {
        outDir: "../dist", //出力場所の指定
        rollupOptions: {
            //ファイル出力設定
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split(".")[1];
                    //Webフォントファイルの振り分け
                    if (/ttf|otf|eot|woff|woff2/i.test(extType)) {
                        extType = "fonts";
                    }
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = "images";
                    }
                    //ビルド時のCSS名を明記してコントロールする
                    if (extType === "css") {
                        return `assets/css/style.css`;
                    }
                    return `assets/${extType}/[name][extname]`;
                },
                chunkFileNames: "assets/js/[name].js",
                entryFileNames: "assets/js/[name].js",
            },
            input: {
                t2_index: resolve(__dirname, "./src/top/index.html")
            },
        },
    },
    plugins: [
        handlebars({
            //コンポーネントの格納ディレクトリを指定
            partialDirectory: resolve(__dirname, "./src/components"),
            //各ページ情報の読み込み
            context: (pagePath) => {
                return {
                    // envUrl: command === 'serve' ? 'http:localhost' : 'https://example.com',
                    siteName: siteData.siteName,
                    siteUrl: siteData.siteUrl,
                    googleAccount: siteData.googleAccount,
                    filePath: siteData.filePath,
                    pageMeta: siteData.pageMeta[pagePath]
                }
            }
        }),
        htmlPlugin()
    ]
});
