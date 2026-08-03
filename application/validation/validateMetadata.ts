export function validateMetadata(frontmatter: any) {
    if (!frontmatter.title) {
        frontmatter.title = "タイトルなし";
    }
    if (!frontmatter.created) {
        frontmatter.created = new Date();
    }
    if (!Array.isArray(frontmatter.keywords)) {
        frontmatter.keywords = [];
    }
    return frontmatter;
}