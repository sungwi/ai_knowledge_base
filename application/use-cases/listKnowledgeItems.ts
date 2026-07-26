import { getKnowledgeItems } from "../../infrastructure/database/repositories/knowledgeRepository";

// knowledgeの一覧取得
export async function listKnowledgeItems() {
    const knowledgeItems = await getKnowledgeItems();
    return knowledgeItems;
}