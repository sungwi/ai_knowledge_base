import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const vaultPath = process.env.OBSIDIAN_VAULT_PATH;

export async function readVaultFile(relativePath) {

    // 拡張子確認
    const extension = path.extname(relativePath).toLowerCase();
    if (extension !== ".md") {
        throw new Error("拡張子エラー！");
    }

    // joinの代わりにresolveを使うことで、../ などをいい感じに繋げてくれる。
    const filePath = path.resolve(
            vaultPath,
            relativePath
    );

    try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content} = matter(fileContent);
        return {
            frontmatter: data,
            content  
        };
    } catch (error) {
        // vault外ならエラー
        if (!(filePath.startsWith(vaultPath))) {
            console.log(`フォルダーエラーや：${filePath}`);
            throw new Error("フォルダーエラーやね。。")
        }

        // ファイルの存在確認
        if (
            error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "ENOENT"
        ) {
            throw new Error("そのファイルどっきゃねん！");
        }
        console.error(`Error reading file: ${filePath}`, error);
        throw error;
    }
}
