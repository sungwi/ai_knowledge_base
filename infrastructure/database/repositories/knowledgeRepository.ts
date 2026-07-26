import { pool } from "../../../infrastructure/database/pool";

// ジェネリクスに渡す型定義
type KnowledgeItem = {
    id: number,
    title: string,
    keywords: string[],
    file_path: string,
    created_at: Date,
    updated_at: Date,
};

export async function getKnowledgeItems() {
    const result = await pool.query<KnowledgeItem>("SELECT * FROM knowledge_items");
    return result.rows;
}