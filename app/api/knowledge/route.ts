import { listKnowledgeItems } from "../../../application/use-cases/listKnowledgeItems";
import { registerKnowledgeItem } from "../../../application/use-cases/registerKnowledgeItem";

export async function GET() {
  try {
    const result = await listKnowledgeItems();

    return Response.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 },
    );
  }
}

// mdファイル登録
export async function POST(request: Request) {
  const {relativePath} = await request.json();
  try {
    const result = await registerKnowledgeItem(relativePath);
    return Response.json(
      {
        success: true,
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to register knowledge item:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to register knowledge item",
      },
      { status: 500 },
    );
  }
}