import { validateMetadata } from "@/application/validation/validateMetadata";
import { readVaultFile } from "../lib/vault-reader";

export default async function Home() {

  try {
    const {frontmatter, content} = await readVaultFile("ChatGPT/tests.md");
    console.log(frontmatter);
    const validatedFrontmatter = validateMetadata(frontmatter);
    console.log(validatedFrontmatter);
    const {title, created, keywords} = validatedFrontmatter;
    return (
      <main>
        <h1>{title}</h1>
        <div>
          <p>{created.toLocaleDateString()}</p>
          <ul>
            {(keywords).map((keyword:string)=>
            (<li key={keyword}>{keyword}</li>))}
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
