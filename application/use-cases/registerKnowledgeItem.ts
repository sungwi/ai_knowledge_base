import { readVaultFile } from "@/lib/vault-reader";
import { createKnowledgeItem } from "../../infrastructure/database/repositories/knowledgeRepository";
import { validateMetadata } from "../validation/validateMetadata";
import { DatabaseError } from "pg";
const DUPLICATE_ERROR_CODE = "23505";

export async function registerKnowledgeItem(relativePath: string) {
    const {frontmatter, content} = await readVaultFile(relativePath);
    console.log(frontmatter);
    const validatedFrontmatter = validateMetadata(frontmatter);
    const {title, created, keywords} = validatedFrontmatter;
    try {
        const knowledgeItem = await createKnowledgeItem(title, keywords, relativePath, created);
        return knowledgeItem;
    } catch (error) {
        console.error(error);
        if (  typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === DUPLICATE_ERROR_CODE) {
            throw new Error("既に登録されているファイルです");
        }
        throw error;
    }
}