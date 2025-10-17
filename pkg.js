// 引入 Node.js 内置文件操作模块（无需额外安装）
const fs = require('fs').promises;
const path = require('path');

/**
 * 读取文件内容（对应 C++ 的 readFileContent 函数）
 * @param {string} filePath - 目标文件路径
 * @returns {Promise<string>} 读取到的文件内容（Promise  resolved 为内容，rejected 为错误信息）
 */
async function readFileContent(filePath) {
    try {
        // 读取文件（utf8 编码确保中文等字符正常）
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (err) {
        // 捕获文件打开/读取错误，提示具体原因
        console.error(`[错误] 无法读取文件：${filePath}`);
        console.error(`错误原因：${err.message}`);
        // 抛出错误，让调用方处理退出逻辑
        throw err;
    }
}

/**
 * 写入文件内容（对应 C++ 的 writeFileContent 函数）
 * @param {string} filePath - 输出文件路径
 * @param {string} content - 要写入的内容
 * @returns {Promise<void>} Promise  resolved 为写入成功，rejected 为错误信息
 */
async function writeFileContent(filePath, content) {
    try {
        // 写入文件（utf8 编码，默认覆盖模式，但此处输出到新文件 output.html，不影响原文件）
        await fs.writeFile(filePath, content, 'utf8');
    } catch (err) {
        console.error(`[错误] 无法写入文件：${filePath}`);
        console.error(`错误原因：${err.message}`);
        throw err;
    }
}

/**
 * 主函数（对应 C++ 的 main 函数）：串联读写和正则替换逻辑
 */
async function main() {
    const htmlFilePath = 'index.html'; // 待处理的 HTML 文件路径
    const jsFilePath = 'main.js'; // 要嵌入的 JS 文件路径
    const outputFilePath = 'output.html'; // 输出的新 HTML 文件路径

    // 1. 读取 main.js 内容（对应 C++ 中读取 main.js 到 repl 变量）
    let jsContent;
    try {
        jsContent = await readFileContent(jsFilePath);
    } catch (err) {
        process.exit(1); // 读取 JS 文件失败，退出程序（对应 C++ 的 return 1）
    }

    // 2. 读取 index.html 内容
    let htmlContent;
    try {
        htmlContent = await readFileContent(htmlFilePath);
    } catch (err) {
        process.exit(1); // 读取 HTML 文件失败，退出程序
    }

    // 3. 正则替换：匹配 <script src="main.js">...</script> 并替换为内嵌脚本
    // 对应 C++ 的 regex pattern，JS 正则需注意：[\S\s]* 匹配所有字符（包括换行），g 表示全局匹配
    const scriptPattern = /<script\s+src\s*=\s*"main.js"\s*>[\S\s]*?<\/script>/gi;
    // 替换内容：<script> + main.js 内容 + </script>（处理 JS 中的 </script> 避免 HTML 误判）
    const replacement = `<script>${jsContent.replace(/<\/script>/gi, '\\x3C/script>')}</script>`;
    const newHtmlContent = htmlContent.replace(scriptPattern, replacement);

    // 4. 写入新文件 output.html
    try {
        await writeFileContent(outputFilePath, newHtmlContent);
    } catch (err) {
        process.exit(1); // 写入文件失败，退出程序
    }

    // 执行成功提示
    console.log(`正则替换完成！文件已保存到：${path.resolve(outputFilePath)}`);
}

// 调用主函数（启动程序）
main();