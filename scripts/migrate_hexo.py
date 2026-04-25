#!/usr/bin/env python3

from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OLD_SITE = ROOT.parent / "zhanlutuzi.github.io"
HEXO_EXPORT = Path("/tmp/zhanlutuzi-hexo-export")
POSTS_DIR = ROOT / "_posts"

ARTICLE_PATH_RE = re.compile(r"^(\d{4})/(\d{2})/(\d{2})/([^/]+)/index\.html$")
FRONT_MATTER_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", re.S)


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(text)).strip()


def strip_tags(text: str) -> str:
    return normalize(re.sub(r"<[^>]+>", "", text))


def yaml_quote(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def yaml_list(values: list[str]) -> str:
    return "[" + ", ".join(yaml_quote(value) for value in values) + "]"


def parse_front_matter(text: str) -> tuple[dict[str, object], str]:
    match = FRONT_MATTER_RE.match(text)
    if not match:
        return {}, text

    front_matter, body = match.groups()
    data: dict[str, object] = {}

    for raw_line in front_matter.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue

        key, raw_value = line.split(":", 1)
        value = raw_value.strip()

        if value.startswith("[") and value.endswith("]"):
            items = [
                item.strip().strip('"').strip("'")
                for item in value[1:-1].split(",")
                if item.strip()
            ]
            data[key] = items
            continue

        if value.startswith('"') and value.endswith('"'):
            value = value[1:-1]
        elif value.startswith("'") and value.endswith("'"):
            value = value[1:-1]

        data[key] = value

    return data, body.lstrip("\n")


def extract_first(pattern: str, text: str, default: str = "") -> str:
    match = re.search(pattern, text, re.S)
    return match.group(1) if match else default


def extract_article_content(text: str) -> str:
    marker = '<div id="articleContent">'
    start = text.find(marker)
    if start == -1:
        raise ValueError("articleContent block not found")

    position = start + len(marker)
    depth = 1
    tag_re = re.compile(r"<div\b[^>]*>|</div>", re.I)

    for match in tag_re.finditer(text, position):
        token = match.group(0).lower()
        if token.startswith("</div"):
            depth -= 1
        else:
            depth += 1

        if depth == 0:
            return text[position:match.start()].strip()

    raise ValueError("articleContent block is not balanced")


def build_generated_articles() -> list[dict[str, object]]:
    articles: list[dict[str, object]] = []

    for path in sorted(OLD_SITE.rglob("index.html")):
        relative = path.relative_to(OLD_SITE).as_posix()
        match = ARTICLE_PATH_RE.match(relative)
        if not match:
            continue

        year, month, day, slug = match.groups()
        text = path.read_text(encoding="utf-8")
        meta_block = extract_first(
            r'<div class="row tag-cate">(.*?)<div class="post-info">',
            text,
        )

        title = strip_tags(
            extract_first(
                r'<h1 class="description center-align post-title">(.*?)</h1>',
                text,
            )
        )
        summary = html.unescape(
            extract_first(r'<meta name="description" content="([^"]*)"', text)
        ).strip()
        cover = html.unescape(
            extract_first(
                r"""<div class="bg-cover pd-header post-cover" style="background-image: url\('([^']+)'\)">""",
                text,
            )
        ).strip()
        tags = [
            strip_tags(tag)
            for tag in re.findall(
                r'<span class="chip bg-color">\s*(.*?)\s*</span>',
                meta_block,
                re.S,
            )
        ]
        categories = [
            strip_tags(category)
            for category in re.findall(
                r'class="post-category">\s*(.*?)\s*</a>',
                meta_block,
                re.S,
            )
        ]

        articles.append(
            {
                "title": title,
                "date": f"{year}-{month}-{day}",
                "permalink": f"/{year}/{month}/{day}/{slug}/",
                "slug": slug,
                "summary": summary,
                "image": cover,
                "tags": tags,
                "categories": categories,
                "content_html": extract_article_content(text),
            }
        )

    return articles


def choose_generated_article(
    metadata: dict[str, object], generated_articles: list[dict[str, object]]
) -> dict[str, object] | None:
    title = normalize(str(metadata.get("title", "")))
    date = str(metadata.get("date", "")).split(" ", 1)[0]

    for article in generated_articles:
        if normalize(str(article["title"])) == title and article["date"] == date:
            return article

    for article in generated_articles:
        if normalize(str(article["title"])) == title:
            return article

    return None


def post_output_path(date_value: str, slug: str) -> Path:
    return POSTS_DIR / f"{date_value}-{slug}.md"


def write_post(front_matter: dict[str, object], body: str, output: Path) -> None:
    lines = ["---"]

    ordered_keys = [
        "layout",
        "title",
        "date",
        "author",
        "permalink",
        "categories",
        "tags",
        "summary",
        "image",
        "comments",
        "render_with_liquid",
    ]

    for key in ordered_keys:
        if key not in front_matter:
            continue

        value = front_matter[key]
        if isinstance(value, list):
            if not value:
                continue
            lines.append(f"{key}: {yaml_list([str(item) for item in value])}")
            continue

        if isinstance(value, bool):
            lines.append(f"{key}: {'true' if value else 'false'}")
            continue

        if value is None or str(value).strip() == "":
            continue

        lines.append(f"{key}: {yaml_quote(str(value))}")

    lines.append("---")
    content = "\n".join(lines) + "\n\n" + body.rstrip() + "\n"
    output.write_text(content, encoding="utf-8")


def import_source_markdown(generated_articles: list[dict[str, object]]) -> set[str]:
    imported: set[str] = set()

    for path in sorted((HEXO_EXPORT / "source" / "_posts").glob("*.md")):
        metadata, body = parse_front_matter(path.read_text(encoding="utf-8"))
        article = choose_generated_article(metadata, generated_articles)

        title = str(metadata.get("title", path.stem))
        date_value = str(metadata.get("date", "1970-01-01 00:00:00"))
        date_only = date_value.split(" ", 1)[0]
        permalink = str(article["permalink"]) if article else ""
        slug = str(article["slug"]) if article else path.stem

        imported.add(permalink)
        front_matter = {
            "layout": "post",
            "title": title,
            "date": f"{date_value} +0800",
            "author": str(metadata.get("author", "zhanlutuzi")),
            "permalink": permalink,
            "categories": metadata.get("categories", []),
            "tags": metadata.get("tags", []),
            "summary": str(
                metadata.get("summary") or (article["summary"] if article else "")
            ),
            "image": str(metadata.get("img") or (article["image"] if article else "")),
            "comments": True,
            "render_with_liquid": False,
        }

        categories = front_matter["categories"]
        if isinstance(categories, str):
            front_matter["categories"] = [categories]

        tags = front_matter["tags"]
        if isinstance(tags, str):
            front_matter["tags"] = [tags]

        write_post(front_matter, body, post_output_path(date_only, slug))

    return imported


def import_generated_fallbacks(
    generated_articles: list[dict[str, object]], imported_permalinks: set[str]
) -> int:
    count = 0

    for article in generated_articles:
        permalink = str(article["permalink"])
        if permalink in imported_permalinks:
            continue

        date_only = str(article["date"])
        front_matter = {
            "layout": "post",
            "title": str(article["title"]),
            "date": f"{date_only} 00:00:00 +0800",
            "author": "zhanlutuzi",
            "permalink": permalink,
            "categories": article["categories"],
            "tags": article["tags"],
            "summary": str(article["summary"]),
            "image": str(article["image"]),
            "comments": True,
            "render_with_liquid": False,
        }

        write_post(
            front_matter,
            str(article["content_html"]),
            post_output_path(date_only, str(article["slug"])),
        )
        count += 1

    return count


def main() -> None:
    if not OLD_SITE.exists():
        raise SystemExit(f"Old site not found: {OLD_SITE}")
    if not HEXO_EXPORT.exists():
        raise SystemExit(
            "Hexo export not found at /tmp/zhanlutuzi-hexo-export. "
            "Export the origin/hexo branch first."
        )

    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    generated_articles = build_generated_articles()
    imported = import_source_markdown(generated_articles)
    fallback_count = import_generated_fallbacks(generated_articles, imported)

    print(
        f"Imported {len(imported)} source posts and {fallback_count} fallback posts "
        f"from generated HTML."
    )


if __name__ == "__main__":
    main()
