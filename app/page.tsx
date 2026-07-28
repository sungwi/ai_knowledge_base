import { readVaultFile } from "../lib/vault-reader";

export default async function Home() {

  try {
    const content = await readVaultFile("ChatGPT/test.md");
    return (
      <main>
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
