import { readVaultFile } from "../lib/vault-reader";

export default async function Home() {

  try {
    const {frontmatter, content} = await readVaultFile("ChatGPT/test.md");
    return (
      <main>
        <h1>{frontmatter.title ?? "タイトルなし"}</h1>
        <div>
          <p>{String(frontmatter.created) ?? "日付不明"}</p>
          <ul>
            {(frontmatter.tags ?? []).map((tag:string)=>
            (<li key={tag}>{tag}</li>))}
          </ul>
        </div>
        <p>{content}</p>
      </main>
    );
  } catch (error) {
    const e_msg = error instanceof Error ? error.message : "エラー発見じゃあ";
    return (
      <main>
        <p>{e_msg}</p>
      </main>
    );
  }
  
}
