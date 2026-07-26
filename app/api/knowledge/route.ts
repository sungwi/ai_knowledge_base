import { listKnowledgeItems } from "../../../application/use-cases/listKnowledgeItems";

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