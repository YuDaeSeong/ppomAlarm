import axios from "axios";
import iconv from "iconv-lite";
import fs from "fs";

async function main() {
  const url = "https://www.ppomppu.co.kr/zboard/zboard.php?id=ppomppu";

  const result = await axios.get(url, { responseType: "arraybuffer" });

  let data = iconv.decode(result.data, "EUC-KR");
  let productList = data
    .split("\n")
    .filter((str) => str.includes("font class=list_title") === true);

  productList.forEach((x) => {
    const parsingText = "<font class=list_title>";
    const startPos = x.indexOf(parsingText);
    const endPos = x.indexOf("</font>");

    console.log(`[Debug]: ${x}`);

    const sliceX = x.slice(startPos + parsingText.length, endPos);

    fs.appendFileSync("./app.log", sliceX + "\n");
  });
}

main();
