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

export async function createKnowledgeItem(title: string, keywords: string[], file_path: string, created_at: Date) {
    const result = await pool.query<KnowledgeItem>(
        `INSERT INTO knowledge_items(title, keywords, file_path, created_at)
         VALUES($1, $2, $3, $4)
         RETURNING *    
        `,
        [title, keywords, file_path, created_at]
    );
    return result.rows[0];
}